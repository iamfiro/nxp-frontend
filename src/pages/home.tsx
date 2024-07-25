import {Banner, Button, Column, DailyQuest, Header, ProblemTable, Row, SearchBar, Selector} from "../components";
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
                    <ProblemTable data={[
                        {
                            level: 1,
                            title: '가장 많이 받은 선물',
                            solved: 1234,
                            ratio: 53,
                        },
                        {
                            level: 2,
                            title: '도넛과 막대 그래프',
                            solved: 2345,
                            ratio: 64,
                        },
                        {
                            level: 3,
                            title: 'k진수에서 소수 개수 구하기',
                            solved: 3456,
                            ratio: 75,
                        },
                    ]} />
                </Column>
                <Column className={style.problemRight}>
					<DailyQuest>
						<DailyQuest.Problem
							level={1}
							title="가장 많이 받은 선물"
							ratio={53}
						/>
						<DailyQuest.Problem
							level={1}
							title="가장 많이 받은 선물"
							ratio={53}
							solved
						/>
					</DailyQuest>
                </Column>
            </div>
            Hello, World!
        </>
    )
}

export default PageHome;
