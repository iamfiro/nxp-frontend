import { mount } from 'cypress/react';
import Selector from './index';
import { OptionType } from '../../../types/component';

describe('Selector 컴포넌트', () => {
    const options: OptionType[] = [
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2' },
        { value: 'option3', label: '옵션 3' },
    ];

    it('초기 값으로 올바르게 렌더링된다', () => {
        const initialValue = 'option2';
        const onChange = cy.stub();

        mount(<Selector options={options} initialValue={initialValue} onChange={onChange} />);

        cy.get('select').should('have.value', initialValue);
    });

    it('모든 옵션이 렌더링된다', () => {
        mount(<Selector options={options} onChange={cy.stub()} />);

        cy.get('option').should('have.length', options.length);
        options.forEach(option => {
            cy.get('option').contains(option.label).should('exist');
        });
    });

    it('옵션 선택 시 onChange 핸들러가 호출된다', () => {
        const initialValue = 'option1';
        const onChange = cy.stub();

        mount(<Selector options={options} initialValue={initialValue} onChange={onChange} />);

        cy.get('select').select('option2');
        cy.wrap(onChange).should('have.been.calledWith', 'option2');
    });

    it('커스텀 스타일이 적용된다', () => {
        const customStyles = { color: 'red' };
        mount(<Selector options={options} onChange={cy.stub()} styles={customStyles} />);

        cy.get('select').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
});