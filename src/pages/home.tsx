import {Banner, Button, Column, Header, Row, SearchBar, Selector} from "../components";
import {ButtonSize, ButtonType} from "../types/component.ts";
import style from '../styles/pages/home.module.scss';
import {OptionsLanguage, OptionsLevel, OptionsSort} from "../constant/select.ts";

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
                <Column className={style.problemLeft}>
                    <SearchBar />
                    <Row style={{ gap: '10px' }}>
                        <Selector options={OptionsLevel} onChange={() => {}} styles={{ minWidth: '130px'}} />
                        <Selector options={OptionsLanguage} onChange={() => {}} styles={{ minWidth: '180px'}} />
                        <Selector options={OptionsSort} onChange={() => {}} styles={{ minWidth: '160px'}} />
                    </Row>
                    <h3>230 문제</h3>
                </Column>
                <section className={style.problemRight}>

                </section>
            </div>
            Hello, World!
        </>
    )
}

export default PageHome;