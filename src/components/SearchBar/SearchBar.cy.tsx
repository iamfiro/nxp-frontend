import SearchBar from './index.tsx';
import style from './style.module.scss';
import {mount} from "cypress/react18";

describe('<SearchBar /> 컴포넌트 테스트', () => {
    beforeEach(() => {
        mount(<SearchBar />);
    });

    it('SearchBar 컴포넌트가 렌더링되는지 확인', () => {
        cy.get(`.${style.searchBar}`).should('exist');
        cy.get(`.${style.searchIcon}`).should('exist');
    });

    it('텍스트 입력 테스트', () => {
        const inputText = '테스트 입력';

        cy.get(`.${style.searchBar}`)
            .type(inputText)
            .should('have.value', inputText);
    });

    it('아이콘 위치 및 색상 확인', () => {
        cy.get(`.${style.searchIcon}`)
            .should('have.css', 'color', 'rgb(158, 158, 158)') // var(--color-gray-400)의 예상 RGB 값
            .and('have.css', 'margin', '-40px 0px 25px 18px');
    });

    it('placeholder 텍스트 색상 확인', () => {
        cy.get(`.${style.searchBar}`)
            .invoke('attr', 'placeholder')
            .should('equal', '문제의 제목이나 내용을 입력하세요');
    });
});