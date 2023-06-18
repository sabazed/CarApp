import { RefObject, useRef, useEffect, useState } from "react";
import Drop from "../models/Drop";


const DealDrop: React.FC<Drop> = (prop: Drop) => {
    const ref = useRef<HTMLInputElement>(null);
    const clickRef = useRef<HTMLDivElement>(null);
    const suppRef = useRef<HTMLSpanElement>(null);
    const [dropOn, setDropOn] = useState<boolean>(false);


    // option Changes
    const handleOptionChange = (value: string, ref: RefObject<HTMLInputElement>) => {
        let tmp = prop.selectedTypes;

        if (value === "ქირავდება" || value === "იყიდება") {
            if (tmp.includes(value)) {
                prop.setSelectedTypes([])
                if (ref.current) {
                    ref.current.innerText = prop.placeholder
                }
                return
            }
            tmp = [value]
        } else {
            if (tmp.includes(value)) {
                tmp = tmp.filter((e) => e != value)
            } else {
                tmp.push(value)
                if (!prop.selectedTypes.includes("ქირავდება")) {
                    tmp.push("ქირავდება")
                } tmp = tmp.filter((e) => e !== "იყიდება")
            }
        }
        prop.setSelectedTypes(tmp)

        const spanElement = ref.current;
        const treshHold = 320
        if (spanElement) {
            const { clientWidth } = spanElement;
            const arrayContent = tmp.join(', ');

            if (clientWidth > treshHold) {
                let truncatedContent = '';
                let i = 0;
                while (i < tmp.length && spanElement.clientWidth <= treshHold) {
                    truncatedContent += `${tmp[i]}, `;
                    spanElement.innerText = truncatedContent + '...';
                    i++;
                }
            } else {
                spanElement.innerText = arrayContent;
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (clickRef.current) {
                if (suppRef.current) {
                    if (!suppRef.current.contains(event.target as Node) && !clickRef.current.contains(event.target as Node)) {
                        setDropOn(false);
                    }
                } else {
                    if (!clickRef.current.contains(event.target as Node)) {
                        setDropOn(false);
                    }
                }
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const setZero = () => {
        setTimeout(() => {
            prop.setSelectedTypes([])
        }, 0.1)
        if (ref.current)
            ref.current.innerText = prop.placeholder
    }

    const stopProp = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (dropOn && prop.selectedTypes.length > 0) {
            e.stopPropagation()
        }
    }

    function checker(option: any): boolean {
        return prop.selectedTypes.includes(option.value)
    }
    return (
        <div>
            <label className="font-size-12 text-gray-800 font-medium mb-8px mt-20px">გარიგების ტიპი</label>
            <div ref={clickRef}>
                <div className="dropdown-button d-flex align-items-center justify-content-between position-relative w-100 border-radius-8 border-solid-1 border-gray-300 hover-bg-white hover-border-gray-520 focus-bg-white bg-white undefined border-gray-300">
                    <div onClick={() => setDropOn(!dropOn)} className="z-index-11111 cursor-pointer w-100 h-44px h-md-40px pl-12px pr-8px  d-flex align-items-center justify-content-between">
                        <span id={prop.type + "id"} className="dropdown-text font-size-13 text-line-1 text-gray-850" ref={ref}>გარიგების ტიპი</span>
                        <span className={"d-flex"}
                            onClick={(e) => stopProp(e)}>
                            {dropOn && prop.selectedTypes.length > 0 ?
                                <svg className="x" onClick={setZero} width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m10.5 5.5-5 5M5.5 5.5l5 5" stroke="#272A37" stroke-width="1.4" stroke-linecap="round">
                                    </path>
                                </svg>
                                :
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={dropOn ? { transform: 'rotate(180deg)', transition: "0.5s", borderRadius: '50%' } : { transition: "0.5s", borderRadius: '50%' }}>
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
                            {prop.options
                                .map((option) => {
                                    return <>
                                        <div className={option.type === "enum" ? "ml-24px border-left border-solid-1 border-gray-200" : ""}>
                                            <label className="checkbox-wrapper d-flex position-relative cursor-pointer mb-0 filter-checkbox dropdown-checkbox">
                                                <input
                                                    className="form-check-input ml-1"
                                                    type="checkbox"
                                                    name={option.value}
                                                    id={option.value}
                                                    value={option.value}
                                                    onChange={(e) => handleOptionChange(e.target.value, ref)}
                                                    checked={checker(option)}
                                                />
                                                <div className="checkbox-item d-flex align-items-center w-100">
                                                    <span className="checkbox flex-shrink-0 d-flex w-16px h-16px border-solid-1 border-radius-4 position-relative mr-12px" style={{ opacity: "0" }}>
                                                    </span>
                                                    <span className="checkbox-text d-flex font-size-14 transition-all">{option.value}</span>
                                                </div>
                                            </label>
                                        </div>
                                    </>
                                })}

                            {prop.selectedTypes.length > 0 ?
                                <div className="w-100 border-top border-solid-1 border-gray-300 bottom-0 left-0 bg-white p-8px d-flex align-items-center justify-content-between">
                                    <span className="d-flex align-items-center h-28px px-8px bg-transparent border-radius-6 text-gray-850 hover-text-gray-800 hover-bg-white font-size-12 cursor-pointer" ref={suppRef} onClick={setZero}>ფილტრის გასუფთავება</span>
                                    <span className="d-flex align-items-center h-28px px-8px bg-orange border-radius-6 text-white font-medium font-size-12 cursor-pointer" onClick={() => setDropOn(false)}>არჩევა</span>
                                </div>
                                :
                                <>
                                </>
                            }
                        </div>
                    </div>
                    :
                    <>
                    </>
                }
            </div>
        </div>
    )
}
export default DealDrop