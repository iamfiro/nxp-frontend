import { Avatar, Button, Header, Row } from "../components";
import { ButtonSize, ButtonType } from "../types/component.ts";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import sampleAvatar from '../assets/sample_avatar.png';
import style from './header.module.scss';
import {useEffect, useState} from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const TemplateHeader = () => {
    const navigate = useNavigate();
    const isLogin = true;
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleAvatarClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (dropdownVisible && !target.closest(`.${style.avatarContainer}`)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [dropdownVisible]);

    return (
        <Header>
            <Row style={{ gap: '5px' }}>
                {isLogin ? (
					<>
						<Button onClick={() => {
							navigate('/rank');
						}} size={ButtonSize.Medium} type={ButtonType.White} classname={style.addButton}>
							<MdAdd size={16}/> 문제 만들기
						</Button>
						<div className={style.avatarContainer}>
							<Avatar
								src={sampleAvatar}
								className={style.avatar}
								alt={'사용자 프로필 이미지'}
								size={35}
								onClick={handleAvatarClick}
							/>
							{dropdownVisible && (
								<div className={style.dropdown}>
									<a>
										<FaUserCircle />
										<span>프로필</span>
									</a>
									<a>
										<FiLogOut />
										<span>로그아웃</span>
									</a>
								</div>
							)}
						</div>
					</>
				) : (
					<>
						<Button onClick={() => {
							navigate('/login');
						}} size={ButtonSize.Small} type={ButtonType.White}>
							로그인
						</Button>
						<Button onClick={() => {
							navigate('/register');
						}} size={ButtonSize.Small} type={ButtonType.Primary}>
							가입하기
						</Button>
					</>
				)}
            </Row>
        </Header>
    );
}

export default TemplateHeader;
