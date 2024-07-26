import {DailyQuest} from "../index.ts";
import style from './style.module.scss';

describe('<DailyQuest /> 컴포넌트 테스트', () => {
	  beforeEach(() => {
			cy.mount(
				  <DailyQuest>
					<DailyQuest.Problem level={1} title="Test Quest 1" ratio={75} solved={false} />
					<DailyQuest.Problem level={2} title="Test Quest 2" ratio={50} solved={true} />
				  </DailyQuest>
			);
	  });

	  it('일일 퀘스트 컴포넌트가 렌더링 되는지 테스트', () => {
			cy.get(`.${style.container}`).should('exist');
	  });

	  it('타이틀이 올바른지 테스트', () => {
			cy.get(`.${style.title}`).contains('일일 퀘스트');
	  });

	  it('CircularProgressbar 렌더링 되는지 테스트', () => {
			cy.get('.CircularProgressbar').should('exist');
	  });

	  it('QuestProblem 컴포넌트가 렌더링 되는지 테스트', () => {
			cy.get(`.${style.problem}`).should('have.length', 2);
	  });

	  it('QuestProblem에 올바르게 정보가 표시 되는지 테스트', () => {
			cy.get(`.${style.problem}`).first().within(() => {
				  cy.get(`.${style.level}`).contains('Lv. 1');
				  cy.contains('Test Quest 1');
				  cy.contains('정답률 75%');
			});
	  		cy.get(`.${style.problem}`).last().within(() => {
				  cy.get(`.${style.level}`).contains('Lv. 2');
				  cy.contains('Test Quest 2');
				  cy.contains('정답률 50%');
				  cy.get('svg').should('exist'); // Check if the check icon is displayed
			});
	  });

	  it('풀린 Problem의 투명도가 잘 수정 되었는지 테스트', () => {
			cy.get(`.${style.problem}`).last().should('have.css', 'opacity', '0.5');
	  });

	  it('못 푼 Problem의 투명도가 잘 수정 되었는지 테스트', () => {
			cy.get(`.${style.problem}`).first().should('have.css', 'opacity', '1');
	  });
});
