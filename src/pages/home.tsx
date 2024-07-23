import {Header} from "../components";
import ProblemIcon from '../assets/icons/problem.png';
import QuestIcon from '../assets/icons/quest.png';
// import CommunityIcon from '../assets/icons/community.png';

const PageHome = () => {
    return (
        <>
            <Header>
                <Header.NavItem name={'문제'} href={'/'} icon={ProblemIcon} />
                <Header.NavItem name={'퀘스트'} href={'/'} icon={QuestIcon} />
            </Header>
            Hello, World!
        </>
    )
}

export default PageHome;