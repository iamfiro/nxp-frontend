import {Button, Header} from "../components";
import {ButtonSize, ButtonType} from "../types/component.ts";
import Banner from "../components/Banner";
// import CommunityIcon from '../assets/icons/community.png';

const PageHome = () => {
    return (
        <>
            <Header>
                <div style={{ gap: '5px' }}>
                    <Button onClick={() => {}} size={ButtonSize.Small} type={ButtonType.White}>
                    로그인
                    </Button>
                    <Button onClick={() => {}} size={ButtonSize.Small} type={ButtonType.Primary}>
                        가입하기
                    </Button>
                </div>
            </Header>
            <Banner />
            Hello, World!
        </>
    )
}

export default PageHome;