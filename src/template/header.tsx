import {Button, Header, Row} from "../components";
import {ButtonSize, ButtonType} from "../types/component.ts";
import {useNavigate} from "react-router-dom";

const TemplateHeader = () => {
	const navigate = useNavigate();
	return (
		<Header>
			<Row style={{ gap: '5px' }}>
				<Button onClick={() => {
					navigate('/login');
				}} size={ButtonSize.Small} type={ButtonType.White}>
				로그인
				</Button>
				<Button onClick={() => {
					navigate('/register');
				}} size={ButtonSize.Small} type={ButtonType.Primary}>
					가입하기
				</Button>
			</Row>
		</Header>
	)
}

export default TemplateHeader;
