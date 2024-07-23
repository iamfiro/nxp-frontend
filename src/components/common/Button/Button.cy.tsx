import React from 'react';
import Button from './index';
import { ButtonSize, ButtonType } from '../../../types/component.ts';

/**
 * Helper function to mount the Button component.
 *
 * @param {Function} onClick - Click event handler for the button.
 * @param {React.ReactNode} children - Child elements to be rendered inside the button.
 * @param {ButtonSize} size - Size of the button.
 * @param {ButtonType} type - Type of the button.
 */
const mountButton = (onClick: () => void, children: React.ReactNode, size: ButtonSize, type: ButtonType) => {
    cy.mount(
        <Button onClick={onClick} size={size} type={type}>
            {children}
        </Button>
    );
};

describe('<Button /> 컴포넌트 테스트', () => {
    it('버튼이 정상적으로 렌더링되는지 테스트', () => {
        mountButton(() => {}, 'Button', ButtonSize.Small, ButtonType.Primary);
    });

    it('children이 제대로 렌더링되는지 테스트', () => {
        mountButton(() => {}, 'Hello, World!', ButtonSize.Small, ButtonType.Primary);
        cy.get('button').contains('Hello, World!');
    });

    it('onClick 이벤트가 정상적으로 동작하는지 테스트', () => {
        const onClickSpy = cy.spy().as('onClickSpy');
        mountButton(onClickSpy, 'Button', ButtonSize.Small, ButtonType.Primary);

        // Button을 찾아서 클릭 이벤트 발생시키기
        cy.contains('Button').click();

        // 클릭 이벤트가 발생했는지 확인
        cy.get('@onClickSpy').should('have.been.calledOnce');
    });

    Object.values(ButtonSize).forEach((size) => {
        it(`ButtonSize: ${size} 테스트`, () => {
            mountButton(() => {}, `Button - ${size}`, size as ButtonSize, ButtonType.Primary);
            cy.get('button').should('have.attr', 'data-btn-size', size);
        });
    });

    Object.values(ButtonType).forEach((type) => {
        it(`ButtonType: ${type} 테스트`, () => {
            mountButton(() => {}, `Button - ${type}`, ButtonSize.Small, type as ButtonType);
            cy.get('button').should('have.attr', 'data-btn-type', type);
        });
    });
});