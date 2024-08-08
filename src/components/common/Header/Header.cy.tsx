import Header from "./index.tsx";
import Logo from '../../../assets/logo.svg'
import TrophyIcon from '../../../assets/icons/trophy.png';

describe('<Header /> 컴포넌트 테스트', () => {
    it('로고와 서비스 이름이 렌더링 되는지 테스트', () => {
        cy.mount(
            <Header>
                null
            </Header>
        )
        cy.get('span').contains('NXP')
        cy.get('img').should('have.attr', 'src', Logo);
    });

    it('NavItem 컴포넌트가 정상적으로 렌더링되는지 테스트', () => {
        cy.mount(
            <Header.NavItem name={'랭킹'} href={'/rank'} icon={TrophyIcon} />
        )
        cy.get('span').contains('랭킹')
        cy.get('img').should('have.attr', 'src', TrophyIcon);
        cy.get('a').should('have.attr', 'href', '/rank');
    })

    it('children이 제대로 렌더링되는지 테스트', () => {
        cy.mount(
            <Header>
                <button>Button</button>
            </Header>
        )
        cy.get('button').contains('Button');
    })
});
