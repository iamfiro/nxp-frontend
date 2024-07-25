import { mount } from 'cypress/react';
import {ProblemType} from "../../types/component.ts";
import {ProblemTable} from "../index.ts";

describe('<ProblemTable /> 컴포넌트 테스트', () => {
    const sampleData: ProblemType[] = [
        { level: 1, title: '문제 1', solved: 100, ratio: 90 },
        { level: 2, title: '문제 2', solved: 80, ratio: 70 },
        { level: 3, title: '문제 3', solved: 60, ratio: 50 },
        { level: 4, title: '문제 4', solved: 40, ratio: 30 },
        { level: 5, title: '문제 5', solved: 20, ratio: 10 }
    ];

    beforeEach(() => {
        mount(<ProblemTable data={sampleData} />);
    });

    it('테이블 헤더를 올바르게 렌더링합니다.', () => {
        cy.get('th').eq(0).should('have.text', '난이도');
        cy.get('th').eq(1).should('have.text', '문제 제목');
        cy.get('th').eq(2).should('have.text', '완료한 사람');
        cy.get('th').eq(3).should('have.text', '정답 비율');
    });

    it('문제 데이터를 올바르게 렌더링합니다.', () => {
        cy.get('tbody tr').should('have.length', sampleData.length);

        sampleData.forEach((problem, index) => {
            cy.get('tbody tr').eq(index).within(() => {
                cy.get('td').eq(0).should('have.text', `Lv. ${problem.level}`);
                cy.get('td').eq(1).should('have.text', problem.title);
                cy.get('td').eq(2).should('have.text', `${problem.solved}명`);
                cy.get('td').eq(3).should('have.text', `${problem.ratio}%`);
            });
        });
    });

    it('문제 레벨에 따른 올바른 텍스트 색상을 적용합니다.', () => {
        const colors = ['rgb(0, 176, 240)', 'rgb(0, 176, 80)', 'rgb(255, 192, 0)', 'rgb(255, 0, 0)', 'rgb(112, 48, 160)'];

        sampleData.forEach((problem, index) => {
            cy.get('tbody tr').eq(index).within(() => {
                cy.get('td').eq(0).should('have.css', 'color', colors[problem.level - 1]);
            });
        });
    });
});
