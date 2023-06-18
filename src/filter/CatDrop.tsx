import { type } from "os";
import { RefObject, useEffect, useRef, useState } from "react";
import Drop from "../models/Drop";




const CatDrop: React.FC<Drop> = (prop: Drop) => {
    const ref = useRef<HTMLSpanElement>(null);
    const clickRef = useRef<HTMLDivElement>(null);
    const valRef = useRef<HTMLInputElement>(null);
    const [dropOn, setDropOn] = useState<boolean>(false);
    const suppRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<string>("")


    const handleCatChange = (id: number, ref: RefObject<HTMLSpanElement>) => {
        let tmp = prop.selectedTypes;
        let cat = prop.options.find((cat) => cat.category_id == id)

        if (cat != null) {
            const isIdIncluded = prop.selectedTypes.some((cat) => cat.category_id == id);

            if (isIdIncluded) {
                tmp = prop.selectedTypes.filter((cat) => cat.category_id != id);
            } else {
                tmp = [...prop.selectedTypes, cat];
            }

            prop.setSelectedTypes(tmp)

            const spanElement = ref.current;
            const treshHold = 320
            if (spanElement) {
                const { clientWidth } = spanElement;
                let arrayContent = '';
                if (tmp.length > 0)
                    arrayContent = tmp[0].title;

                if (tmp.length === 0) {
                    spanElement.innerText = prop.placeholder;
                    return
                }

                tmp = tmp.slice(1)

                tmp.forEach((man) => arrayContent += ", " + man.title)

                if (clientWidth > treshHold) {
                    let truncatedContent = '';
                    let i = 0;
                    while (i < tmp.length && spanElement.clientWidth <= treshHold) {
                        truncatedContent += `${tmp[i].title}, `;
                        spanElement.innerText = truncatedContent + '...';
                        i++;
                    }
                } else {
                    spanElement.innerText = arrayContent;
                }
            }
        }
    };



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (clickRef.current) {
                if (suppRef.current) {
                    if (!suppRef.current.contains(event.target as Node) && !clickRef.current.contains(event.target as Node)) {
                        setDropOn(false);
                        if (ref.current)
                            ref.current.innerText = ref.current.innerText == "" ? prop.placeholder : ref.current.innerText
                    }
                } else {
                    if (!clickRef.current.contains(event.target as Node)) {
                        setDropOn(false);
                        if (ref.current)
                            ref.current.innerText = ref.current.innerText == "" ? prop.placeholder : ref.current.innerText
                    }
                }
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (valRef.current) {
            valRef.current.type = dropOn ? "text" : "hidden"
        }
        if (!dropOn) {
            setValue("")
        }
    }, [dropOn])

    useEffect(() => {
        if (value.length > 0) {
            if (ref.current) {
                ref.current.style.opacity = "0"
            }
        } else {
            if (ref.current) {
                ref.current.style.opacity = "1"
            }
        }
    }, [value])

    const setZero = () => {
        if (ref.current)
            if (value.length == 0)
                ref.current.innerText = prop.placeholder
        setDropOn(true)

        setTimeout(() => {
            prop.setSelectedTypes([])
        }, 0.1)
    }

    const stopProp = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (dropOn && prop.selectedTypes.length > 0) {
            e.stopPropagation()
        }
    }


    function checker(option: any): boolean {
        return prop.selectedTypes.some((category) =>
            category.category_id === option.category_id &&
            category.category_type === option.category_type &&
            category.has_icon === option.has_icon &&
            category.title === option.title &&
            category.seo_title === option.seo_title &&
            category.vehicle_types[0] === option.vehicle_types[0]
        );
    }

    const filteredOpts = prop.options.filter((e) => e.title.toLowerCase().includes(value.toLowerCase()))

    return (
        <div>
            <label className="font-size-12 text-gray-800 font-medium mb-8px mt-20px">კატეგორია</label>
            <div ref={clickRef}>
                <div className="dropdown-button d-flex align-items-center justify-content-between position-relative w-100 border-radius-8 border-solid-1 border-gray-300 hover-bg-white hover-border-gray-520 focus-bg-white bg-white undefined border-gray-300">
                    <div onClick={() => !dropOn ? setDropOn(true) : setValue(value)} className="cursor-pointer w-100 h-44px h-md-40px pl-12px pr-8px  d-flex align-items-center justify-content-between">
                        <span id={prop.type + "id"} className="dropdown-text font-size-13 text-line-1 text-gray-850" ref={ref}>კატეგორია</span>
                        <input ref={valRef} className="d-flex z-index-1 position-absolute left-0 top-0 w-100 h-100 border-0 font-size-13 text-gray-800 pl-12px pr-36px outline-none bg-transparent" value={value} type="hidden" onChange={(e) => setValue(e.target.value)} />
                        <span className="d-flex arr z-index-1"
                            onClick={(e) => stopProp(e)}>
                            {dropOn && prop.selectedTypes.length > 0 ?
                                <svg className="x" onClick={setZero} width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m10.5 5.5-5 5M5.5 5.5l5 5" stroke="#272A37" stroke-width="1.4" stroke-linecap="round">
                                    </path>
                                </svg>
                                :
                                <svg onClick={() => setDropOn(!dropOn)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={dropOn ? { transform: 'rotate(180deg)', transition: "0.5s", borderRadius: '50%' } : { transition: "0.5s", borderRadius: '50%' }}>
                                    <path d="m15 11-3 3-3-3" stroke="#6F7383" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </svg>
                            }
                        </span>
                    </div>
                </div>
                {dropOn ?
                    <div className="checkbox-container overflow-hidden z-index-22222 bg-white border-radius-8 mt-8px py-8px border-solid-1 border-gray-300 box-shadow-md">
                        <div className="scroll-box max-height-306px">
                            {
                                filteredOpts.length === 0 ?
                                    <span className="d-flex align-items-center h-32px px-16px font-size-14 text-gray-850">ჩანაწერი არ არის</span> :
                                    <div>
                                        {filteredOpts
                                            .map((option) => {
                                                return <>
                                                    <label className="checkbox-wrapper d-flex position-relative cursor-pointer mb-0 filter-checkbox dropdown-checkbox">
                                                        <input
                                                            className="form-check-input ml-1"
                                                            type="checkbox"
                                                            name={option.title}
                                                            id={option.category_id}
                                                            value={option.category_id}
                                                            onChange={(e) => handleCatChange(Number(e.target.value), ref)}
                                                            checked={checker(option)}
                                                        />
                                                        <div className="checkbox-item d-flex align-items-center w-100">
                                                            <span className="checkbox flex-shrink-0 d-flex w-16px h-16px border-solid-1 border-radius-4 position-relative mr-12px opacity-0" >
                                                            </span>
                                                            <span className="checkbox-text d-flex font-size-14 transition-all">{option.title}</span>
                                                        </div>
                                                    </label>
                                                </>
                                            })}
                                    </div>
                            }
                        </div>
                        {prop.selectedTypes.length > 0 ?
                            <div ref={suppRef} className="w-100 border-top border-solid-1 border-gray-300 bottom-0 left-0 bg-white p-8px d-flex align-items-center justify-content-between">
                                <span className="d-flex align-items-center h-28px px-8px bg-transparent border-radius-6 text-gray-850 hover-text-gray-800 hover-bg-white font-size-12 cursor-pointer" onClick={setZero}>ფილტრის გასუფთავება</span>
                                <span className="d-flex align-items-center h-28px px-8px bg-orange border-radius-6 text-white font-medium font-size-12 cursor-pointer" onClick={() => setDropOn(false)}>არჩევა</span>
                            </div>
                            :
                            <>
                            </>
                        }
                    </div>
                    :
                    <>
                    </>
                }
            </div>
        </div>
    )
}
export default CatDrop











