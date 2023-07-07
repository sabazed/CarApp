import "../filter/styles/test.css"
import "../filter/styles/Filter.css"
import { useContext, useState } from "react";
import StorageContext from "../stores/StorageContext";
import { Prop } from "../filter/sort/Sort";


const PageLayout: React.FC<Prop> = (props: Prop) => {
    const [lastWindow, setLastWindow] = useState<number>(1);
    const storage = useContext(StorageContext)

    const renderPageNumbers = () => {
        if (storage.currPage > storage.lastPage) {
            storage.setCurrPage(1)
        }
        const pageNumbers = [];
        if (storage.currPage < 3) {
            let lastPage = storage.lastPage < 7 ? storage.lastPage : 7
            for (let i = 1; i <= lastPage; i++) {
                pageNumbers.push(
                    <li key={i} onClick={() => { storage.setCurrPage(i); }}>
                        <span className={(storage.currPage == i ? " active pointer-events-none" : "text-gray-400 opacity-50 ") + " actived-flex p-12px font-size-18 font-size-md-14 font-medium cursor-pointer"}
                        >{i}</span>
                    </li>
                );
            }
        } else {
            let tmp = storage.currPage - lastWindow > 3 ? storage.currPage - 3 : lastWindow;
            if (storage.lastPage - storage.currPage < 3) {
                for (let i = storage.lastPage - 6; i <= storage.lastPage; i++) {
                    pageNumbers.push(
                        <li key={i} onClick={() => { storage.setCurrPage(i); }}>
                            <span className={(storage.currPage == i ? " active pointer-events-none" : "text-gray-400 opacity-50 ") + " actived-flex p-12px font-size-18 font-size-md-14 font-medium cursor-pointer"}
                            >{i}</span>
                        </li>
                    );
                }
            } else {

                for (let i = tmp; i <= tmp + 6; i++) {
                    pageNumbers.push(
                        <li key={i} onClick={() => { storage.setCurrPage(i); }}>
                            <span className={(storage.currPage == i ? " active pointer-events-none" : "text-gray-400 opacity-50 ") + " actived-flex p-12px font-size-18 font-size-md-14 font-medium cursor-pointer"}
                            >{i}</span>
                        </li>
                    );
                }
            }
        }




        return pageNumbers;
    };

    return (
        <>
            <div className=" bg-white border-radius-md-10 h-56px h-md-40px d-flex align-items-center justify-content-center mt-16px">
                <ul style={{ margin: 0 }} className="pagination d-flex align-items-center list-unstyled">
                    {storage.currPage == 1 ? <></>
                        :
                        <>
                            <li>
                                <span className="d-flex p-12px cursor-pointer">
                                    <svg onClick={() => { storage.setCurrPage(1); }} xmlns="http://www.w3.org/2000/svg" width="13.414" height="8.829" viewBox="0 0 13.414 8.829">
                                        <g transform="translate(1 1.414)">
                                            <path d="M12,12,9,9l3-3" transform="translate(-1 -6)" style={{ fill: "none", stroke: " rgb(253, 65, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2px" }}>
                                            </path>
                                            <path d="M12,12,9,9l3-3" transform="translate(-6 -6)" style={{ fill: "none", stroke: " rgb(253, 65, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2px" }}>
                                            </path>
                                            <line y2="6" transform="translate(0)" style={{ fill: "none", stroke: " rgb(253, 65, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2px" }}>
                                            </line>
                                        </g>
                                    </svg>
                                </span>
                            </li>
                            <li>
                                <span onClick={() => { storage.setCurrPage(storage.currPage - 1); }} className="d-flex p-12px cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="5.414" height="8.829" viewBox="0 0 5.414 8.829">
                                        <path d="M12,12,9,9l3-3" transform="translate(-8 -4.586)" style={{ fill: "none", stroke: " rgb(253, 65, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2px" }}>
                                        </path>
                                    </svg>
                                </span>
                            </li>
                        </>
                    }
                    {renderPageNumbers()}
                    {
                        storage.currPage == storage.lastPage ? <></>
                            :
                            <>
                                <li>
                                    <span onClick={() => { storage.setCurrPage(storage.currPage + 1); }} className="d-flex p-12px cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5.414" height="8.829" viewBox="0 0 5.414 8.829">
                                            <path d="M9,12l3-3L9,6" transform="translate(-7.586 -4.586)" style={{ fill: "none", stroke: " rgb(253, 65, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2px" }}>
                                            </path>
                                        </svg>
                                    </span>
                                </li>
                                <li>
                                    <span onClick={() => { storage.setCurrPage(storage.lastPage); }} className="d-flex p-12px cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.414" height="8.829" viewBox="0 0 13.414 8.829">
                                            <g transform="translate(-1134.586 -2682.586)">
                                                <path d="M9,12l3-3L9,6" transform="translate(1127 2678)" style={{ fill: "none", stroke: " rgb(253, 65, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2px" }}>
                                                </path>
                                                <path d="M9,12l3-3L9,6" transform="translate(1132 2678)" style={{ fill: "none", stroke: " rgb(253, 65, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2px" }}>
                                                </path>
                                                <line y2="6" transform="translate(1147 2684)" style={{ fill: "none", stroke: " rgb(253, 65, 0)", strokeLinecap: "round", strokeWidth: "2px" }}>
                                                </line>
                                            </g>
                                        </svg>
                                    </span>
                                </li >
                            </>
                    }
                </ul >
            </div >
        </>
    )
}

export default PageLayout