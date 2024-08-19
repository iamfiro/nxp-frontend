import TemplateHeader from "../template/header.tsx";
import style from '../styles/pages/setting.module.scss';
import {Row} from "../components";
import {ChangeEvent, useState} from "react";
import {request} from "../lib/axios.ts";

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

const Setting = () => {
	// TODO: 로그인 여부 체크
	const [profileImage, setProfileImage] = useState<string>('https://avatars.githubusercontent.com/u/72495729?v=4');
	const [description, setDescription] = useState<string>('');

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePhoto', file);

			const userId = 'ninejuan'; // TODO: Get the user ID from the context

            try {
                const response = await request.post(`/auth/profilePhoto/${userId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Assuming the response contains the new image URL
                setProfileImage(response.data.imageUrl);
            } catch (error) {
                console.error('Failed to upload the profile photo', error);
            }
        }
    };

	return (
		<>
			<TemplateHeader />
			<main className={style.container}>
				<h1 className={style.title}>프로필 설정</h1>
				<section>
					<h2 className={style.sectionTitle}>프로필 사진</h2>
					<div className={style.profile}>
						<img src={profileImage} alt="프로필 사진" className={style.profileImage} />
						<Row style={{gap: '10px'}}>
							<CustomFileButton onChange={handleFileChange} />
						</Row>
					</div>
				</section>
				<section>
					<h2 className={style.sectionTitle}>내 설명</h2>
					<textarea className={style.textarea} defaultValue={description} onChange={(e) => setDescription(e.target.value)} placeholder="내 설명을 입력하세요." />
				</section>
			</main>
		</>
	)
}

export default Setting;
