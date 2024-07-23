import style from './style.module.scss';
import Logo from '../../../assets/logo.svg';
import SearchBar from "../SearchBar";

interface HeaderProps {
    children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
    return (
        <header className={style.header}>
            <div className={style.content}>
                <div className={style.left}>
                    <div className={style.logoContainer}>
                        <img src={Logo} alt="NXP Logo" className={style.logo}/>
                        <span>NXP</span>
                    </div>
                    <SearchBar/>
                </div>
                <div className={style.right}>
                    {children}
                </div>
            </div>
        </header>
    );
}

export default Header;