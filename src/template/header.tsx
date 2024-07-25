import {Button, Header, Row} from "../components";
import {ButtonSize, ButtonType} from "../types/component.ts";

const TemplateHeader = () => {
	return (
		<Header>
			<Row style={{ gap: '5px' }}>
				<Button onClick={() => {}} size={ButtonSize.Small} type={ButtonType.White}>
				로그인
				</Button>
				<Button onClick={() => {}} size={ButtonSize.Small} type={ButtonType.Primary}>
					가입하기
				</Button>
			</Row>
		</Header>
	)
}

export default TemplateHeader;
