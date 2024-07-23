import style from './style.module.scss';
import Logo from '../../../assets/logo.svg';

const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.content}>
                <div className={style.logoContainer}>
                    <img src={Logo} alt="NXP Logo" className={style.logo}/>
                    <span>NXP</span>
                </div>
            </div>
        </header>
    );
}

export default Header;