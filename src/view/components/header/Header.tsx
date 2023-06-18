import logo from '../../resources/imgs/logo.svg';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className='header-inner'>
                <a href='https://www.myauto.ge/ka/s/'>
                    <img src={logo} className="header-logo" alt="logo" />
                </a>
            </div>
        </div>
    )
}

export default Header;