import style from './style.module.scss';
import Logo from '../../../assets/logo.svg';
import CommunityIcon from "../../../assets/icons/community.png";
import CommunityColorIcon from "../../../assets/icons/community-color.png";
import TrophyIcon from "../../../assets/icons/trophy.png";
import TrophyColorIcon from "../../../assets/icons/trophy-color.png";
import {useLocation} from "react-router-dom";

interface HeaderProps {
    children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
    return (
        <header className={style.header}>
            <div className={style.content}>
                <div className={style.left}>
                    <a className={style.logoContainer}>
                        <img src={Logo} alt="NXP Logo" className={style.logo}/>
                        <span>NXP</span>
                    </a>
                    <Header.NavItem name={'랭킹'} href={'/rank'} icon={TrophyIcon} iconSelect={TrophyColorIcon} />
                    <Header.NavItem name={'커뮤니티'} href={'/community'} icon={CommunityIcon} iconSelect={CommunityColorIcon} />
                </div>
                <div className={style.right}>
                    {children}
                </div>
            </div>
        </header>
    );
}

interface NavItemProps {
    icon: string;
	iconSelect: string;
    href: string;
    name: string;
}

const NavItem = ({ icon, href, name, iconSelect }: NavItemProps ) => {
	const isVisited = useLocation().pathname === href;
    return (
        <a href={href} className={style.navItem} data-visited={isVisited}>
            <img
				src={isVisited ? iconSelect : icon}
				alt={name}
			/>
            <span>{name}</span>
        </a>
    )
}

Header.NavItem = NavItem;

export default Header;
