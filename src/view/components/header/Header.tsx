import logo from '../../resources/imgs/logo.svg';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className='header-inner'>
                <img src={logo} className="header-logo" alt="logo" />
            </div>
        </div>
    )
}

export default Header;