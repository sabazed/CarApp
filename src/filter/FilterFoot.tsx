import { StorageContextProps } from "../stores/ContextProps"

interface Prop {
    storage: any
    setMinPrice: Function
    setMaxPrice: Function
    minPrice: string
    maxPrice: string
    handleSubmit: any
    clear: any
}

const FilterFoot: React.FC<Prop> = (prop: Prop) => {
    const dummy = () => {

    }
    return (
        <div className="px-24px pb-24px border-bottom border-solid-1 border-gray-200">
            <div className="d-flex align-items-center justify-content-between">
                <label className="font-size-12 text-gray-800 font-medium mb-20px mt-20px">ფასი</label>
                <div className="d-flex">
                    <span className={(prop.storage.currency == 1 ?
                        "bg-gray-350 text-gray-800 icon-gray-800 " : "bg-transparent text-gray-800-20 icon-gray-800-20 ") +
                        "d-flex align-items-center justify-content-center w-24px h-24px rounded-circle cursor-pointer"}
                        onClick={() => prop.storage.currency != 1 ? prop.storage.setCurrency(1) : dummy()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="9px" height="14px" viewBox="0 0 9 14">
                            <path id="_" data-name="$" d="M1.974-3.248H0A3.8,3.8,0,0,0,1.022-.742a3.783,3.783,0,0,0,2.45.966v1.19H4.3V.224A4.359,4.359,0,0,0,6.02-.2a3.707,3.707,0,0,0,1.071-.8,2.62,2.62,0,0,0,.553-.917A2.6,2.6,0,0,0,7.8-2.688a7.425,7.425,0,0,0-.049-.8,2.226,2.226,0,0,0-.315-.9,3.024,3.024,0,0,0-.826-.861,4.839,4.839,0,0,0-1.6-.693q-.2-.056-.371-.1L4.3-6.118V-8.6A1.033,1.033,0,0,1,5.11-8.2a1.472,1.472,0,0,1,.35.952H7.448a3.209,3.209,0,0,0-.308-1.26A2.783,2.783,0,0,0,6.454-9.4a3.178,3.178,0,0,0-.973-.56A5.033,5.033,0,0,0,4.3-10.234v-1.078H3.472v1.078a4.667,4.667,0,0,0-1.218.245,3.291,3.291,0,0,0-1.036.574A2.8,2.8,0,0,0,.5-8.5a2.782,2.782,0,0,0-.273,1.26A2.569,2.569,0,0,0,.462-6.069a2.325,2.325,0,0,0,.637.784,3.337,3.337,0,0,0,.9.5q.5.189,1.022.329.14.028.259.063t.189.063V-1.4a1.955,1.955,0,0,1-1.078-.588A1.72,1.72,0,0,1,1.974-3.248ZM4.3-1.4V-4.088a3.381,3.381,0,0,1,1.169.5.983.983,0,0,1,.343.819,1.152,1.152,0,0,1-.14.581,1.385,1.385,0,0,1-.357.413,1.641,1.641,0,0,1-.49.259A2.555,2.555,0,0,1,4.3-1.4ZM3.472-8.6v2.282a2.3,2.3,0,0,1-.966-.406.889.889,0,0,1-.294-.714,1.162,1.162,0,0,1,.1-.511A1.048,1.048,0,0,1,2.6-8.309a1.219,1.219,0,0,1,.406-.217A1.54,1.54,0,0,1,3.472-8.6Z" transform="translate(0.544 11.812)" fill="#272a37" stroke="rgba(0,0,0,0)" stroke-width="1">
                            </path>
                        </svg>
                    </span>
                    <span className={(prop.storage.currency == 3 ?
                        "bg-gray-350 text-gray-800 icon-gray-800 " : "bg-transparent text-gray-800-20 icon-gray-800-20 ") +
                        "d-flex align-items-center justify-content-center w-24px h-24px rounded-circle cursor-pointer"}
                        onClick={() => prop.storage.currency != 3 ? prop.storage.setCurrency(3) : dummy()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="11px" viewBox="0 0 10 11">
                            <path id="GEL" d="M313.914-18v-1.689h-3.663a2.938,2.938,0,0,1-1.643-.46,3,3,0,0,1-1.089-1.3,4.608,4.608,0,0,1-.384-1.94,5,5,0,0,1,.343-1.987,2.543,2.543,0,0,1,1.112-1.225v3.372h.894v-3.64a2.492,2.492,0,0,1,.48-.044,2.936,2.936,0,0,1,.5.044v3.64h.894V-26.6a2.469,2.469,0,0,1,1.134,1.24,5.547,5.547,0,0,1,.343,2.132H315a6.022,6.022,0,0,0-.439-2.324,4.874,4.874,0,0,0-1.263-1.8,4.534,4.534,0,0,0-1.939-1.019V-29h-.894v.472l-.236-.007q-.081-.007-.236-.007-.347,0-.51.015V-29h-.894v.631a4.67,4.67,0,0,0-1.891.982,4.823,4.823,0,0,0-1.256,1.671A4.872,4.872,0,0,0,305-23.67a5.7,5.7,0,0,0,.229,1.61,4.62,4.62,0,0,0,.672,1.4,3.294,3.294,0,0,0,1.056.968v.058h-1.411V-18Z" transform="translate(-305 29)" fill="#272a37">
                            </path>
                        </svg>
                    </span>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <input value={prop.minPrice} onChange={(e) => prop.setMinPrice(e.target.value)} type="text" placeholder="დან" className="filter-input w-100 h-40px border-solid-1 border-gray-300 border-radius-8 font-size-13 text-gray-400 px-12px outline-none" />
                <span className="d-flex flex-shrink-0 w-6px h-2px bg-gray-500 mx-4px">
                </span>
                <input value={prop.maxPrice} onChange={(e) => prop.setMaxPrice(e.target.value)} type="text" placeholder="მდე" className="filter-input w-100 h-40px border-solid-1 border-gray-300 border-radius-8 font-size-13 text-gray-400 px-12px outline-none" />
            </div>
            <div className="d-flex z-index-9 bg-white py-16px px-24px border-radius-md-10-bottom position-sticky ">
                <button onClick={prop.handleSubmit} className="d-flex align-items-center justify-content-center bg-orange text-white font-medium font-size-14 w-100 border-0 border-radius-6 h-32px mb-md-12px mx-4px mx-md-0">მოძებნე</button>
                <div className="ml-8px tooltip-parent">
                    <button onClick={prop.clear} type="button" className="flex-shrink-0 d-flex align-items-center justify-content-center border-solid-1 border-gray-300 bg-transparent w-32px h-32px border-radius-6">
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.458 1.452c-.213.076-.316.254-.316.548 0 .294.103.472.316.548.151.054 4.933.054 5.084 0 .213-.076.316-.254.316-.548 0-.294-.103-.472-.316-.548-.151-.054-4.933-.054-5.084 0M1.764 4.44c-.232.072-.349.257-.35.554-.001.307.118.496.356.567.104.03.3.039.888.039h.755v4.063c0 3.894.002 4.068.05 4.213.091.277.289.496.564.627l.146.07h7.654l.152-.071c.213-.1.404-.287.508-.499l.086-.175.007-4.114.007-4.114h.755c.588 0 .784-.009.888-.039.236-.071.357-.26.357-.561 0-.197-.049-.337-.154-.447-.155-.162.238-.153-6.445-.151-5.069.001-6.128.008-6.224.038m9.643 5.06-.007 3.9H4.6l-.007-3.9-.007-3.9h6.828l-.007 3.9" fill-rule="evenodd" fill="#454857">
                            </path>
                        </svg>
                    </button>
                    <div className="tooltip-item position-absolute z-index-11 align-items-center border-radius-8  tooltip-desktop tooltip-item tooltip-light mt-0 align-items-center bg-white px-16px h-36px font-size-13 text-gray-800">ფილტრის გასუფთავება</div>
                </div>
            </div>
        </div>
    )
}
export default FilterFoot