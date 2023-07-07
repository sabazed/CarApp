import Product from "../../../../../models/Product";
import { OrderProps } from "./OrderProps";

import engine from '../../../../resources/imgs/engine-icon.svg';
import trans from '../../../../resources/imgs/transmission-icon.svg';
import tacho from '../../../../resources/imgs/tachometer-icon.svg';
import wheel from '../../../../resources/imgs/steering-wheel-icon.svg';

import gel from '../../../../resources/imgs/gel.svg';
import usd from '../../../../resources/imgs/usd.svg';
import check from '../../../../resources/imgs/check.svg';

import chat from '../../../../resources/imgs/chat.svg';
import hide from '../../../../resources/imgs/hide.svg';
import favorite from '../../../../resources/imgs/favorite.svg';

import './Order.css';
import { useContext, useEffect, useRef, useState } from "react";
import StorageContext from "../../../../../stores/StorageContext";
import Locations from "../../../../../models/Locations";

const fuelTypes : { [key: number]: string } = {
    2: 'ბენზინი',
    3: 'დიზელი',
    7: 'ელექტრო',
    6: 'ჰიბრიდი',
    10: 'დატ. ჰიბრიდი',
    8: 'ბუნებრივი გაზი',
    9: 'თხევადი გაზი',
    12: 'წყალბადი'
}
const getFuel = (product: Product) => {
    return fuelTypes[product.fuel_type_id];
}

const transTypes : { [key: number]: string } = {
    1: 'მექანიკა',
    2: 'ავტომატიკა',
    3: 'ტიპტრონიკი',
    4: 'ვარიატორი'
}
const getTrans = (product: Product) => {
    return transTypes[product.gear_type_id];
}

const getPhoto = (product: Product) => {
    return `https://static.my.ge/myauto/photos/${product.photo}/thumbs/${product.car_id}_1.jpg?v=${product.photo_ver}`;
}

const getWheel = (product: Product) => {
    return product.right_wheel ? "მარჯვენა" : "მარცხენა";
}

const getEngine = (product: Product) => {
    const vol = product.engine_volume / 1000;
    return vol % 1 != 0 ? vol : vol + '.0';
}

const getPrice = (product: Product, currencyId: number) => {
    const price = currencyId == 1 ? product.price_usd : product.price_value;
    return Math.floor(price).toLocaleString();
}

const getTimeDiff = (product: Product) => {
    const timestamp : Date = new Date(product.order_date);
    const now : Date = new Date();
    if (timestamp.getFullYear() == now.getFullYear()) {
        if (timestamp.getMonth() == now.getMonth()) {
            if (timestamp.getDate() == now.getDate()) {
                if (timestamp.getHours() == now.getHours()) {
                    return (now.getMinutes() - timestamp.getMinutes()) + ' წუთის';
                }
                else {
                    return (now.getHours() - timestamp.getHours()) + ' საათის';
                }
            }
            else {
                return (now.getDate() - timestamp.getDate()) + ' დღის';
            }
        }
        else {
            return (now.getMonth() - timestamp.getMonth()) + ' თვის';
        }
    }
    else {
        return (now.getFullYear() - timestamp.getFullYear()) + ' წლის';
    }
}

const getPredicted = (product: Product) => {
    if (product.has_predicted_price && product.pred_first_breakpoint && product.pred_second_breakpoint) {
        const state = product.price_value < product.pred_first_breakpoint ? -1 : product.price_value < product.pred_second_breakpoint ? 0 : 1;
        return  <span className={`price-predict ${state == -1 ? "price-low" : state == 0 ? "price-mid" : "price-high"}`}>
                    {state == -1 ? "დაბალი" : state == 0 ? "საშუალო" : "მაღალი"} ფასი
                </span>
    }
    return null;
}

const getCustoms = (product: Product) => {
    return product.customs_passed  
        ? <div className="order-customs customs-passed "><img src={check} className="" /> განბაჟებული</div>
        : <div className="order-customs">განბაჟება</div>
}

const getLocation = (product: Product) => {
    return Locations[product.location_id];
}

const Order = (props: OrderProps) => {
    const product = props.product;
    const model = props.model;
    const manufacturer = props.manufacturer;
    const storage = useContext(StorageContext);
    const [price, setPrice] = useState<string>(getPrice(product, storage.currency));
    const [mobile, setMobile] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const changeCurrency = (e: React.MouseEvent<HTMLElement>) => {
        if (storage.currency == 3 && e.currentTarget != usdIcon.current?.parentElement
            || storage.currency == 1 && e.currentTarget != gelIcon.current?.parentElement) {
            return;
        }
        storage.setCurrency(storage.currency == 1 ? 3 : 1);
    }

    let usdIcon = useRef<HTMLImageElement>(null);
    let gelIcon = useRef<HTMLImageElement>(null);
    
    useEffect(() => {
        setPrice(getPrice(product, storage.currency));
        const [oldCur, newCur] = storage.currency == 3 ? [gelIcon, usdIcon] : [usdIcon, gelIcon];
        oldCur.current?.parentElement?.classList.add('current-currency');
        newCur.current?.parentElement?.classList.remove('current-currency');
    }, [storage.currency]);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      useEffect(() => setMobile(windowWidth <= 400), [windowWidth]);

    return (
        <div className="order">
            {mobile && 
            <div className="order-top-mobile">
                <div className="order-location">თბილისი</div>
                {getCustoms(product)}
            </div>}
            <a href={'https://www.myauto.ge/ka/pr/' + props.product.car_id} className="order-url"><div className="order-pic"><img src={getPhoto(product)}/></div></a>
            <div className="order-info">
                <div className="order-header">
                    <div>                    
                        <a href={'https://www.myauto.ge/ka/pr/' + props.product.car_id} className="order-url"><div className="order-title">{manufacturer?.man_name} {model?.model_name} {product.car_model}</div></a>
                        <div className="order-year">{product.prod_year} წ</div>
                    </div>
                    {!mobile && <div>
                        {getCustoms(product)}
                        <div className="order-location">{getLocation(product)}</div>
                    </div>}
                </div>
                <div className="order-body">
                    <div className="order-stats">
                        <div>
                            <img src={engine} className="order-icon" />
                            <div>{getEngine(product)} {getFuel(product)}</div>
                        </div>
                        <div>
                            <img src={tacho} className="order-icon" />
                            <div>{product.car_run_km} კმ</div>
                        </div>
                        <div>
                            <img src={trans} className="order-icon" />
                            <div>{getTrans(product)}</div>
                        </div>
                        <div>
                            <img src={wheel} className="order-icon" />
                            <div>{getWheel(product)}</div>
                        </div>
                    </div>
                    <div className="order-price-wrapper">
                        {(product.price_value > 0) && 
                        <div className="order-price">
                            <div className="price">{price}</div>
                            <div className="price-switch">
                                <div onClick={changeCurrency}><img ref={usdIcon} src={usd} className="price-icon" /></div>
                                <div onClick={changeCurrency}><img ref={gelIcon} src={gel} className="price-icon" /></div>
                            </div>
                        </div>}
                        {(product.price_value == 0) && 
                        <div className="order-price">
                            <div className="price-negot">ფასი შეთანხმებით</div>
                        </div>}
                        {product.has_predicted_price && product.pred_first_breakpoint && product.pred_second_breakpoint && 
                        <div className="price-predict-wrapper">
                            {getPredicted(product)}
                        </div>}
                    </div>
                </div>
                <div className="order-footer">
                    <div>
                        <div></div>
                        <div className="order-details">{product.views} ნახვა <span className="order-details-splitter"></span> {getTimeDiff(product)} წინ</div>
                    </div>
                    <div className="order-attributes">
                        <img src={chat} className="order-attribute" />
                        <img src={hide} className="order-attribute" />
                        <img src={favorite} className="order-attribute" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;