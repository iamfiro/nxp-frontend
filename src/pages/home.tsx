import {Banner, Button, Header, SearchBar} from "../components";
import {ButtonSize, ButtonType} from "../types/component.ts";
import style from '../styles/pages/home.module.scss';

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
            <div className={style.problemContainer}>
                <section className={style.problemLeft}>
                    <SearchBar />
                </section>
                <section className={style.problemRight}>

                </section>
            </div>
            Hello, World!
        </>
    )
}

export default PageHome;