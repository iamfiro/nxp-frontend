import TemplateHeader from "../template/header.tsx";
import style from '../styles/pages/setting.module.scss';
import {Row} from "../components";
import {ChangeEvent, useState} from "react";

interface CustomFileButtonProps {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Create a new functional component for file upload
const CustomFileButton = ({ onChange }: CustomFileButtonProps) => {
	  return (
			<label className={style.customFileButton}>
			  사진 업로드
			  <input type="file" onChange={onChange} className={style.fileInput} accept={'image/*'} />
			</label>
	  );
};

// TODO: 시간나면 디자인 다시 하도록

const Setting = () => {
	// TODO: 로그인 여부 체크

	const [description, setDescription] = useState<string>('');

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		// TODO: 파일 업로드 API 호출
    	const file = event.target.files?.[0];
		if (file) {
		    // Implement logic to handle file upload, e.g., updating profile picture
		    console.log('Selected file:', file);
		}
  	};

	const handleDeletePhoto = () => {
		// TODO: 사진 삭제 API 호출
		console.log('Photo deleted');
	};
	return (
		<>
			<TemplateHeader />
			<main className={style.container}>
				<h1 className={style.title}>프로필 설정</h1>
				<section>
					<h2 className={style.sectionTitle}>프로필 사진</h2>
					<div className={style.profile}>
						<img src="https://avatars.githubusercontent.com/u/72495729?v=4" alt="프로필 사진" className={style.profileImage} />
						<Row style={{gap: '10px'}}>
							<CustomFileButton onChange={handleFileChange} />
						    <button onClick={handleDeletePhoto} className={style.deleteButton}>
							  사진 삭제
						    </button>
						</Row>
					</div>
				</section>
				<section>
					<h2 className={style.sectionTitle}>내 설명</h2>
					<textarea className={style.textarea} onChange={(e) => setDescription(e.target.value)} placeholder="내 설명을 입력하세요." />
				</section>
			</main>
		</>
	)
}

export default Setting;
