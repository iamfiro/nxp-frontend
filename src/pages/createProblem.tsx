import style from '../styles/pages/createProblem.module.scss';
import TemplateHeader from "../template/header.tsx";
import MDEditor from '@uiw/react-md-editor';
import {useState} from "react";
import {OptionType} from "../types/component.ts";
import {ProblemRamOptions, ProblemTimeOptions} from "../constant/select.ts";
import {toast} from "react-toastify";
import {request} from "../lib/axios.ts";

interface SelectProps {
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	list: OptionType[];
	title: string;
}

const Select = ({onChange, list, title}: SelectProps) => {
	return (
		<div className={style.select}>
			<label>{title}</label>
			<select onChange={onChange}>
				{
					list.map((item) => (
						<option key={item.value} value={item.value}>{item.label}</option>
					))
				}
			</select>
		</div>
	)
}

const Input = ({onChange, title, placeholder}: {onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, title: string, placeholder: string}) => {
	return (
		<div className={style.input}>
			<label>{title}</label>
			<input onChange={onChange} placeholder={placeholder} />
		</div>
	)
}

const CreateProblem = () => {
	const [markdown, setMarkdown] = useState<string>('');
	const [name, setName] = useState('');
	const [ram, setRam] = useState(128);
	const [time, setTime] = useState(1);

	const handleMarkdownChange = (value?: string) => {
		if (value !== undefined) {
			setMarkdown(value);
		}
	};

	function handleSubmit() {
		if(name === '') return toast.error('문제 제목이 비어있습니다.');
		if(markdown === '') return toast.error('Markdown 내용이 비어있습니다.');



		request.post('/problem', {
			name: name,
			description: markdown,
			ram: ram,
			time: time
		}).then(() => {
			toast.success('문제가 생성되었습니다.');
		}).catch(() => {
			toast.error('문제 생성중 오류가 발생했습니다')
		})
	}

	return (
		<>
			<TemplateHeader />
			<main className={style.container}>
				<h1>문제 생성</h1>
				<section className={style.inputContainer}>
					<Input
						onChange={(e) => setName(e.target.value)}
						title={'제목'}
						placeholder={'문제 제목을 입력해주세요'}
					/>
				</section>
				<section className={style.inputContainer}>
					<Select
						onChange={(e) => setTime(Number(e.target.value))}
						list={ProblemRamOptions}
						title={'램'}
					/>
					<Select
						onChange={(e) => setRam(Number(e.target.value))}
						list={ProblemTimeOptions}
						title={'제한 시간'}
					/>
				</section>
				<section className={style.inputContainer}>
					<label>문제 내용</label>
				</section>
				<MDEditor
					value={markdown}
					onChange={handleMarkdownChange}
					className={style.markdown}
				/>
				<section className={style.inputContainer}>
					<button className={style.submit} onClick={() => handleSubmit()}>생성</button>
				</section>
			</main>
		</>
	)
}

export default CreateProblem;
