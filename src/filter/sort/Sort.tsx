import { useRef, useState } from "react"
import "../styles/Filter.css"
import "../styles/test.css"

interface Period {
    id: string
    label: string
}

interface Sort {
    value: number
    label: string
}

interface Prop {
    handleSubmit: Function
}

const Sort: React.FC<Prop> = (props: Prop) => {
    const [dropOnPeriod, setDropOnPeriod] = useState(false);
    const [dropOnSort, setDropOnSort] = useState(false);
    const [currPeriod, setCurrPeriod] = useState<Period>();
    const [currSort, setCurrSort] = useState<number | undefined>(1);
    const perRef = useRef<HTMLSpanElement>(null);
    const sortRef = useRef<HTMLSpanElement>(null);

    const dropDownStyle = "dropDown-cust d-flex align-items-center h-32px px-16px font-size-14 text-gray-850 text-nowrap hover-text-gray-800 transition-all cursor-pointer"

    const periodArr: Period[] = [
        { id: "1h", label: "1 საათი" },
        { id: "3h", label: "3 საათი" },
        { id: "6h", label: "6 საათი" },
        { id: "12h", label: "12 საათი" },
        { id: "24h", label: "24 საათი" }
    ];

    const sortArr: Sort[] = [
        { value: 1, label: "თარიღი კლებადი" },
        { value: 2, label: "თარიღი ზრდადი" },
        { value: 3, label: "ფასი კლებადი" },
        { value: 4, label: "ფასი ზრდადი" },
        { value: 5, label: "გარბენი კლებადი" },
        { value: 6, label: "გარბენი ზრდადი" }
    ];

    const changePeriod = (period: Period) => {
        if (perRef.current) {
            perRef.current.textContent = period.label
        }
        setCurrPeriod(period)
        setDropOnPeriod(false)

        props.handleSubmit(currPeriod?.id, currSort)
    }


    const changeSort = (period: Sort) => {
        if (sortRef.current) {
            sortRef.current.textContent = period.label
        }
        setCurrSort(period.value)
        setDropOnSort(false)

        props.handleSubmit(currPeriod?.id, currSort)
    }

    return (
        <>
            <div className="ml-390px max-width-560px d-flex justify-content-between align-items-center my-12px mt-md-0 mb-md-16px px-16px px-md-0">
                <span className="d-flex font-size-12 font-size-md-14 font-size-m-16 text-gray-800 text-nowrap">260685 განცხადება</span>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center position-relative ml-4px ml-md-8px undefined">
                        <div onClick={() => setDropOnPeriod(!dropOnPeriod)} className="d-flex align-items-center border-solid-1 hover-border-gray-850 border-radius-8 bg-transparent cursor-pointer h-36px h-md-40px pl-6px pl-md-12px pr-0 pr-md-8px font-size-12 font-size-md-13 text-gray-650 text-nowrap cursor-pointer border-gray-750">
                            <span ref={perRef}> პერიოდი </span>
                            <span className="toggle-arrow d-flex transition-all ml-md-4px ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={dropOnPeriod ? { transform: 'rotate(180deg)', transition: "0.5s", borderRadius: '50%' } : { transition: "0.5s", borderRadius: '50%' }}>
                                    <path d="m15 11-3 3-3-3" stroke="#6F7383" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </svg>
                            </span>
                        </div>
                        {
                            dropOnPeriod ?
                                <div className="mt-8px py-6px position-absolute top-100 left-auto left-md-0 right-0 right-md-auto z-index-2 min-width-120px bg-white border-solid-1 border-gray-750 border-radius-8 box-shadow-lg">
                                    {
                                        periodArr.filter((el) => el.id !== currPeriod?.id).map((period) => {
                                            return <>
                                                <span
                                                    id={period.id}
                                                    onClick={() => changePeriod(period)}
                                                    className={dropDownStyle}
                                                >
                                                    {period.label}
                                                </span>
                                            </>
                                        })
                                    }
                                </div>
                                :
                                <></>
                        }
                    </div>
                    <div className="d-flex align-items-center position-relative ml-4px ml-md-8px undefined">
                        <div onClick={() => setDropOnSort(!dropOnSort)} className="d-flex align-items-center border-solid-1 hover-border-gray-850 border-radius-8 bg-transparent cursor-pointer h-36px h-md-40px pl-6px pl-md-12px pr-0 pr-md-8px font-size-12 font-size-md-13 text-gray-650 text-nowrap cursor-pointer border-gray-750">
                            <span ref={sortRef}> თარიღი კლებადი </span>
                            <span className="toggle-arrow d-flex transition-all ml-md-4px ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={dropOnSort ? { transform: 'rotate(180deg)', transition: "0.5s", borderRadius: '50%' } : { transition: "0.5s", borderRadius: '50%' }}>
                                    <path d="m15 11-3 3-3-3" stroke="#6F7383" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </svg>
                            </span>
                        </div>
                        {
                            dropOnSort ?
                                <div className="mt-8px py-6px position-absolute top-100 left-auto left-md-0 right-0 right-md-auto z-index-2 min-width-120px bg-white border-solid-1 border-gray-750 border-radius-8 box-shadow-lg">
                                    {
                                        sortArr.filter((el) => el.value !== currSort).map((period) => {
                                            return <>
                                                <span
                                                    id={String(period.value)}
                                                    onClick={() => changeSort(period)}
                                                    className={dropDownStyle}
                                                >
                                                    {period.label}
                                                </span>
                                            </>
                                        })
                                    }
                                </div>
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sort