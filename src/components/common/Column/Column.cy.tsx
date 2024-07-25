import { mount } from 'cypress/react18';
import Column from './index';

describe('<Column /> 컴포넌트 테스트', () => {
    it('자식 요소를 올바르게 렌더링 하는지 테스트', () => {
        const childText = '테스트 자식';
        mount(
            <Column>
                <div>{childText}</div>
            </Column>
        );
        cy.contains(childText).should('exist');
    });

    it('className이 올바르게 적용되는지 테스트', () => {
        const className = '테스트-클래스';
        mount(
            <Column className={className}>
                <div>테스트 자식</div>
            </Column>
        );
        cy.get(`.${className}`).should('exist');
    });
});