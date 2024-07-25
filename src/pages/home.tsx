import {Banner, Button, Column, Header, Row, SearchBar, Selector} from "../components";
import {ButtonSize, ButtonType, OptionType} from "../types/component.ts";
import style from '../styles/pages/home.module.scss';

const category: OptionType[] = [
    {
        label: '전체',
        value: 'all'
    }
]


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
                    <Row>

                    </Row>
                </Column>
                <section className={style.problemRight}>

                </section>
            </div>
            Hello, World!
        </>
    )
}

export default PageHome;