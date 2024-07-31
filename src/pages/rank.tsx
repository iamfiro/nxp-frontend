import TemplateHeader from "../template/header.tsx";
import style from '../styles/pages/rank.module.scss';
import {Avatar, Row} from "../components";
import SampleAvatar from '../assets/sample_avatar.png';

const PageRank = () => {
	return (
		<>
			<TemplateHeader />
			<main className={style.container}>
				<h1 className={style.title}>NXP 랭킹</h1>
				<table className={style.table}>
					<thead>
					<tr>
						<th className={style.ranking}>#</th>
						<th>아이디</th>
						<th>레이팅</th>
						<th>푼 문제</th>
						<th>문제 제작</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>1,228,271</td>
						<td>
							<Row style={{gap: '10px'}}>
								<Avatar src={SampleAvatar} alt={'iamfiro\'s Avatar'} size={25}/>
								<span>iamfiro</span>
							</Row>
						</td>
						<td className={style.rating}>972,902</td>
						<td className={style.solved}>12,928</td>
						<td className={style.solved}>28</td>
					</tr>
					</tbody>
				</table>
			</main>
		</>
	)
}

export default PageRank;
