import { type } from "os";
import { RefObject, useEffect, useRef, useState } from "react";


interface Prop {
    handleOptionChange: Function
    setSelectedTypes: Function
    selectedTypes: any[]
    placeholder: string
    options: any[]
    type: number
    selectedMan: any[]
}

const ModelDrop: React.FC<Prop> = (prop: Prop) => {
    const ref = useRef<HTMLSpanElement>(null);
    const clickRef = useRef<HTMLDivElement>(null);
    const valRef = useRef<HTMLInputElement>(null);
    const [dropOn, setDropOn] = useState<boolean>(false);
    const suppRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<string>("")


    const handleModelChange = (id: number, ref: RefObject<HTMLSpanElement>) => {
        let tmp = prop.selectedTypes;
        let model = prop.options.find((model) => model.model_id == id)

        if (model != null) {
            const isIdIncluded = prop.selectedTypes.some((model) => model.model_id == id);

            if (isIdIncluded) {
                tmp = prop.selectedTypes.filter((man) => man.model_id != id);
            } else {
                tmp = [...prop.selectedTypes, model];
            }

            prop.setSelectedTypes(tmp)

            const spanElement = ref.current;
            const treshHold = 320
            if (spanElement) {
                const { clientWidth } = spanElement;
                let arrayContent = '';
                if (tmp.length > 0)
                    arrayContent = tmp[0].model_name;

                if (tmp.length === 0) {
                    spanElement.innerText = prop.placeholder;
                    return
                }

                tmp = tmp.slice(1)

                tmp.forEach((man) => arrayContent += ", " + man.model_name)

                if (clientWidth > treshHold) {
                    let truncatedContent = '';
                    let i = 0;
                    while (i < tmp.length && spanElement.clientWidth <= treshHold) {
                        truncatedContent += `${tmp[i].model_name}, `;
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
        if (dropOn && prop.selectedMan.length > 0) {
            e.stopPropagation()
        }
    }

    function checker(option: any): boolean {
        return prop.selectedTypes.some((model) =>
            model.model_id === option.model_id &&
            model.man_id === option.man_id &&
            model.model_name === option.model_name &&
            model.model_group === option.model_group &&
            model.sort_order === option.sort_order &&
            model.cat_man_id === option.cat_man_id &&
            model.cat_model_id === option.cat_model_id &&
            model.cat_modif_id === option.cat_modif_id &&
            model.is_car === option.is_car &&
            model.is_moto === option.is_moto &&
            model.is_spec === option.is_spec &&
            model.show_in_salons === option.show_in_salons &&
            model.shown_in_slider === option.shown_in_slider);
    }

    function manChecker(option: any): boolean {
        return prop.selectedMan.some((man) =>
            man.man_id === option.man_id &&
            man.man_name === option.man_name &&
            man.is_car === option.is_car &&
            man.is_spec === option.is_spec &&
            man.is_moto === option.is_moto)
    }

    // let filteredOpts = prop.options.filter((e) => e.model_name.toLowerCase().includes(value.toLowerCase()))
    const filteredManVal = prop.selectedMan.filter((e) => e.man_name.toLowerCase().includes(value.toLowerCase()))
    const filteredOpts = prop.options.filter((e) => e.model_name.toLowerCase().includes(value.toLowerCase())
        || filteredManVal.map((x) => Number(x.man_id)).includes(e.man_id))
    const filteredMan = prop.selectedMan.filter((e) => filteredOpts.map((x) => x.man_id).includes(Number(e.man_id)))


    return (
        <div>
            <label className="font-size-12 text-gray-800 font-medium mb-8px mt-20px">მოდელი</label>
            <div ref={clickRef}>
                <div className="dropdown-button d-flex align-items-center justify-content-between position-relative w-100 border-radius-8 border-solid-1 border-gray-300 hover-bg-white hover-border-gray-520 focus-bg-white bg-white undefined border-gray-300">
                    <div onClick={() => !dropOn && prop.selectedMan.length > 0 ? setDropOn(true) : setDropOn(dropOn)} className={(prop.selectedMan.length > 0 ? "cursor-pointer" : "") + " w-100 h-44px h-md-40px pl-12px pr-8px  d-flex align-items-center justify-content-between"}>
                        <span id={prop.type + "id"} className="dropdown-text font-size-13 text-line-1 text-gray-850" ref={ref}>მოდელი</span>
                        <input ref={valRef} className="d-flex z-index-1 position-absolute left-0 top-0 w-100 h-100 border-0 font-size-13 text-gray-800 pl-12px pr-36px outline-none bg-transparent" value={value} type="hidden" onChange={(e) => setValue(e.target.value)} />
                        <span className="d-flex arr z-index-1"
                            onClick={(e) => stopProp(e)}>
                            {dropOn && prop.selectedTypes.length > 0 && prop.selectedMan.length > 0 ?
                                <svg className="x" onClick={setZero} width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m10.5 5.5-5 5M5.5 5.5l5 5" stroke="#272A37" stroke-width="1.4" stroke-linecap="round">
                                    </path>
                                </svg>
                                :
                                <svg onClick={() => setDropOn(!dropOn)
                                } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={dropOn ? { transform: 'rotate(180deg)', transition: "0.5s", borderRadius: '50%' } : { transition: "0.5s", borderRadius: '50%' }}>
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
                                filteredOpts.length == 0 || filteredMan.length == 0 ?
                                    <span className="d-flex align-items-center h-32px px-16px font-size-14 text-gray-850">ჩანაწერი არ არის</span> :
                                    <div>
                                        {filteredMan.map((man) => {
                                            return <>
                                                <label className="checkbox-wrapper d-flex position-relative cursor-pointer mb-0 filter-checkbox dropdown-checkbox parent-checkbox">
                                                    <input
                                                        className="form-check-input ml-1"
                                                        type="checkbox"
                                                        name={man.man_name}
                                                        id={man.man_id}
                                                        value={man.man_id}
                                                        onChange={(e) => prop.handleOptionChange ? prop.handleOptionChange(e.target.value, ref) : setDropOn(dropOn)}
                                                        checked={manChecker(man)}
                                                        style={{ zIndex: 999 }}
                                                    />
                                                    <div className="checkbox-item d-flex align-items-center w-100">
                                                        <span className="checkbox flex-shrink-0 d-flex w-16px h-16px border-solid-1 border-radius-4 position-relative mr-12px opacity-0" >
                                                        </span>
                                                        <span className="checkbox-text d-flex font-size-14 transition-all">{man.man_name}</span>
                                                    </div>
                                                </label>

                                                {filteredOpts.filter((el) => el.man_id == man.man_id)
                                                    .map((option) => {
                                                        return <>
                                                            <label className="checkbox-wrapper d-flex position-relative cursor-pointer mb-0 filter-checkbox dropdown-checkbox">
                                                                <input
                                                                    className="form-check-input ml-1"
                                                                    type="checkbox"
                                                                    name={option.model_name}
                                                                    id={option.model_id}
                                                                    value={option.model_id}
                                                                    onChange={(e) => handleModelChange(Number(e.target.value), ref)}
                                                                    checked={checker(option)}
                                                                />
                                                                <div className="checkbox-item d-flex align-items-center w-100">
                                                                    <span className="checkbox flex-shrink-0 d-flex w-16px h-16px border-solid-1 border-radius-4 position-relative mr-12px opacity-0" >
                                                                    </span>
                                                                    <span className="checkbox-text d-flex font-size-14 transition-all">{option.model_name}</span>
                                                                </div>
                                                            </label>
                                                        </>
                                                    })}
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
        </div >
    )

}
export default ModelDrop