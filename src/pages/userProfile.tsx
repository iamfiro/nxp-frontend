import style from '../styles/pages/userProfile.module.scss';
import TemplateHeader from "../template/header.tsx";

const PageUserProfile = () => {
	return (
		<>
			<TemplateHeader />
			<main className={style.container}>
				<section className={style.profile}>
					<img src={'https://avatars.githubusercontent.com/u/72495729?v=4'} className={style.profileImage} alt={'프로필 사진'} />
					<h1 className={style.profileName}>iamfiro</h1>
				</section>
			</main>
		</>
	)
}

export default PageUserProfile;
