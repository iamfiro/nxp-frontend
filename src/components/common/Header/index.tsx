import style from './style.module.scss';
import Logo from '../../../assets/logo.svg';
import ProblemIcon from "../../../assets/icons/problem.png";
import QuestIcon from "../../../assets/icons/quest.png";

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
                    <Header.NavItem name={'퀘스트'} href={'/'} icon={QuestIcon} />
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

const Divider = () => {
    return (
        <div className={style.divider} />
    )
}

Header.Divider = Divider;
Header.NavItem = NavItem;

export default Header;