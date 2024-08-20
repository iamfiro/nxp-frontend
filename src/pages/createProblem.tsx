import style from '../styles/pages/createProblem.module.scss';
import TemplateHeader from "../template/header.tsx";
import MDEditor from '@uiw/react-md-editor';
import {useState} from "react";
import {OptionType} from "../types/component.ts";
import {ProblemRamOptions, ProblemTierOptions, ProblemTimeOptions} from "../constant/select.ts";
import {toast} from "react-toastify";
import {request} from "../lib/axios.ts";
import {Column, Modal, MonacoEditor, Row} from "../components";
import { IoMdAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import {createPortal} from "react-dom";

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
	const [editorCode, setEditorCode] = useState<string>('');
	const [tier, setTier] = useState<string>('Bronze 5');
	const language = 'all';

	const [isTestCaseModalOpen, setIsTestCaseModalOpen] = useState(false);
	const [testCaseInput, setTestCaseInput] = useState('');
	const [testCaseOutput, setTestCaseOutput] = useState('');
	const [testCase, setTestCase] = useState<{input: string, output: string}[]>([]);

	const handleMarkdownChange = (value?: string) => {
		if (value !== undefined) {
			setMarkdown(value);
		}
	};

	function handleSubmit() {
		if(name === '') return toast.error('문제 제목이 비어있습니다.');
		if(markdown === '') return toast.error('Markdown 내용이 비어있습니다.');
		if(editorCode === '') return toast.error('예시 코드가 비어있습니다.');
		if(testCase.length === 0) return toast.error('테스트 케이스가 비어있습니다.');

		request.post('/problem/register', {
			subject: name,
			content: markdown,
			ram: ram,
			time: time,
			rank: tier,
			answer: editorCode,
			testcases: testCase
		}).then(() => {
			toast.success('문제가 생성되었습니다.');
		}).catch(() => {
			toast.error('문제 생성중 오류가 발생했습니다')
		})
	}

	function handleTestCaseAdd() {
		if(testCaseInput === '') return toast.error('입력값이 비어있습니다.', { position: 'bottom-right' });
		if(testCaseOutput === '') return toast.error('출력값이 비어있습니다.', { position: 'bottom-right' });

		setTestCase([...testCase, {input: testCaseInput, output: testCaseOutput}]);

		setIsTestCaseModalOpen(false);
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
						onChange={(e) => setTier(e.target.value)}
						list={ProblemTierOptions}
						title={'티어'}
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
					<label>테스트케이스</label>
					<button className={style.addTestCase} onClick={() => setIsTestCaseModalOpen(true)}>
						<IoMdAdd size={16} /> 테스트케이스 추가
					</button>
					{
						testCase.map((item, index) => (
							<Column className={style.testCase} key={index}>
								<Row style={{ justifyContent: 'space-between'}}>
									<span className={style.testCaseTitle}>테스트케이스 #{index+1}</span>
									<FaTrashAlt className={style.testCaseDelete} onClick={() => {
										const newTestCase = testCase.filter((_, idx) => idx !== index);
										setTestCase(newTestCase);
									}} />
								</Row>
								<Row className={style.testCaseItem}>
									<Column>
										<label>입력</label>
										<span>{item.input}</span>
									</Column>
									<Column>
										<label>출력</label>
										<span>{item.output}</span>
									</Column>
								</Row>
							</Column>
						))
					}
				</section>
				<section className={style.inputContainer} style={{height: '400px'}}>
					<label>예시 코드</label>
					<MonacoEditor code={editorCode} setCode={setEditorCode} language={language}/>
				</section>
				<section className={style.inputContainer}>
					<button className={style.submit} onClick={() => handleSubmit()}>생성</button>
				</section>
			</main>
			{
				isTestCaseModalOpen && (
					createPortal(
						<>
							<Modal.Backdrop isVisible={isTestCaseModalOpen} handleClose={() => setIsTestCaseModalOpen(false)}>
								<Modal className={style.modalTestCase}>
									<h2>테스트케이스 추가</h2>
									<section>
										<label>입력</label>
										<textarea onChange={(e) => setTestCaseInput(e.target.value)} />
									</section>
									<section>
										<label>출력</label>
										<textarea onChange={(e) => setTestCaseOutput(e.target.value)} />
									</section>
									<button onClick={() => handleTestCaseAdd()}>추가하기</button>
								</Modal>
							</Modal.Backdrop>
						</>,
						document.body
					)
				)
			}
		</>
	)
}

export default CreateProblem;
