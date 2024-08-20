import style from '../styles/pages/userProfile.module.scss';
import TemplateHeader from "../template/header.tsx";
import {Column} from "../components";

const PageUserProfile = () => {
	// TODO : API 요청
	return (
		<>
			<TemplateHeader />
			<main className={style.container}>
				<img className={style.banner} src={'https://images.unsplash.com/photo-1718973818150-9c0c855d33b0?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt={'배너 이미지'} />
				<div className={style.profileContainer}>
					<Column>
						<img src={'https://avatars.githubusercontent.com/u/72495729?v=4'} className={style.profileImage}
							 alt={'프로필 사진'}/>
						<h1 className={style.profileName}>iamfiro</h1>
					</Column>

				</div>
			</main>
		</>
	)
}

export default PageUserProfile;
