import { useEffect, useState } from 'react';
import Filter from '../../../../filter/Filter';
import filterIcon from '../../../resources/imgs/filter.svg';

import './FilterMenu.css';

const FilterMenu = () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [mobile, setMobile] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        <div className="filter-menu">
            {!mobile && <Filter handleSubmit={() => {}}/>}
            {mobile && <div>
                {!expanded && <div className='filter-opener-wrapper'>
                    <div className='filter-btn-wrapper' onClick={() => setExpanded(true)}><img src={filterIcon} /> ფილტრი</div>
                </div>}
                {expanded && <div className='filter-btn-wrapper expanded-wrapper' onClick={() => setExpanded(false)}><img src={filterIcon} /> ფილტრი</div>}
                {expanded && <Filter handleSubmit={() => setExpanded(false)} />}
            </div>}
        </div>
    );
}

export default FilterMenu;