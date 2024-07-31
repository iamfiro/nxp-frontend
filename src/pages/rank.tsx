import TemplateHeader from "../template/header.tsx";
import style from '../styles/pages/rank.module.scss';
import {Avatar, Column, Row} from "../components";
import SampleAvatar from '../assets/sample_avatar.png';

const PageRank = () => {
	return (
		<>
			<TemplateHeader />
			<main className={style.container}>
				<h1 className={style.title}>NXP 랭킹</h1>
				<Row style={{gap: '20px'}}>
					<Column className={style.left}>
						{/* 내 테이블 */}
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
						{/* 전체 랭킹 테이블 */}
						<table className={style.allRankTable}>
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
								<td>1</td>
								<td>
									<Row style={{gap: '10px'}}>
										<Avatar src={SampleAvatar} alt={'iamfiro\'s Avatar'} size={25}/>
										<span>iamfiro</span>
									</Row>
								</td>
								<td className={style.rating}>972,902</td>
								<td className={style.solved}>12,928</td>
								<td className={style.create}>28</td>
							</tr>
							<tr>
								<td>2</td>
								<td>
									<Row style={{gap: '10px'}}>
										<Avatar src={SampleAvatar} alt={'iamfiro\'s Avatar'} size={25}/>
										<span>iamfiro</span>
									</Row>
								</td>
								<td className={style.rating}>972,806</td>
								<td className={style.solved}>11,858</td>
								<td className={style.create}>75</td>
							</tr>
							<tr>
								<td>3</td>
								<td>
									<Row style={{gap: '10px'}}>
										<Avatar src={SampleAvatar} alt={'iamfiro\'s Avatar'} size={25}/>
										<span>iamfiro</span>
									</Row>
								</td>
								<td className={style.rating}>972,482</td>
								<td className={style.solved}>11,273</td>
								<td className={style.create}>75</td>
							</tr>
							<tr>
								<td>4</td>
								<td>
									<Row style={{gap: '10px'}}>
										<Avatar src={SampleAvatar} alt={'iamfiro\'s Avatar'} size={25}/>
										<span>RE:제로 부터 시작하는 디버깅 생활</span>
									</Row>
								</td>
								<td className={style.rating}>971,806</td>
								<td className={style.solved}>9,283</td>
								<td className={style.create}>15</td>
							</tr>
							<tr>
								<td>5</td>
								<td>
									<Row style={{gap: '10px'}}>
										<Avatar src={SampleAvatar} alt={'iamfiro\'s Avatar'} size={25}/>
										<span>iamfiro</span>
									</Row>
								</td>
								<td className={style.rating}>971,482</td>
								<td className={style.solved}>8,273</td>
								<td className={style.create}>15</td>
							</tr>

							</tbody>
						</table>
					</Column>
					<div className={style.right}>

					</div>
				</Row>
			</main>
		</>
	)
}

export default PageRank;
