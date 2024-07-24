import style from './style.module.scss';
import Logo from '../../../assets/logo.svg';
import ProblemIcon from "../../../assets/icons/problem.png";
import CommunityIcon from "../../../assets/icons/community.png";
import TrophyIcon from "../../../assets/icons/trophy.png";

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
                    <Header.NavItem name={'문제'} href={'/'} icon={ProblemIcon} />
                    <Header.NavItem name={'랭킹'} href={'/'} icon={TrophyIcon} />
                    <Header.NavItem name={'커뮤니티'} href={'/'} icon={CommunityIcon} />
                </div>
                <div className={style.right}>
                    {children}
                </div>
            </div>
        </header>
    );
}

interface NavItemProps {
    icon: string
    href: string
    name: string
}

const NavItem = ({ icon, href, name }: NavItemProps ) => {
    return (
        <a href={href} className={style.navItem}>
            <img src={icon} alt={name}/>
            <span>{name}</span>
        </a>
    )
}

Header.NavItem = NavItem;

export default Header;