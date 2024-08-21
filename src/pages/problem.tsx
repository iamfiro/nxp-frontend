import style from '../styles/pages/problem.module.scss';
import {useEffect, useState} from "react";
import {Column, Modal, MonacoEditor, Row, Selector, setMetaTag} from "../components";
import {FaCircleInfo, FaCode, FaMemory} from "react-icons/fa6";
import TemplateHeader from "../template/header.tsx";
import {MdOutlineRefresh, MdOutlineTimelapse} from "react-icons/md";
import useDebounce from "../hooks/useDebounce.ts";
import {deleteCode, getCode, getMemo, UpSertCode, UpSertMemo} from "../lib/idb.ts";
import useIsLoggined from "../hooks/useIsLoggined.ts";
import {toast} from "react-toastify";
import {createPortal} from "react-dom";
import {IoCloseSharp} from "react-icons/io5";
import {request} from "../lib/axios.ts";
import {elapsedTime} from "../lib/time.ts";
import {FaQuestionCircle} from "react-icons/fa";

import Lottie from 'react-lottie';
import LottieCorrect from '../assets/json/lottie_correct.json';

// Markdown 관련 import
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import {TierToTextColor} from "../lib/color.ts";
import {TierToSummary} from "../lib/string.ts";
import {ProblemTierOptions} from "../constant/select.ts";

interface ProblemProps {
    title: string;
    value: string;
}

const ProblemSummary = ({ title, value }: ProblemProps) => {
    return (
        <li>
            <span>{title}</span>
            <span>{value}</span>
        </li>
    )
}

interface SubmitProps {
	status: 'pending' | 'success' | 'fail';
	language: string;
	date: string;
	memory: number;
	time: number;
}

const Submit = ({ status = 'pending', language, date, memory, time }: SubmitProps) => {
	const timestamp = new Date(date).getTime();
	return (
		<section className={style.submitItem}>
			<Row style={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
				<Column>
					<span className={style.submitLanguage}>{language}</span>
					<span
						className={style.submitStatus}
						style={{color: status === 'pending' ? 'var(--color-gray-400)' : status === 'success' ? 'var(--color-green)' : 'var(--color-red)'}}
					>
						{status === 'pending' ? '채점 중' : status === 'success' ? '맞았습니다' : '틀렸습니다'}
					</span>
				</Column>
				<span className={style.submitDate}>{elapsedTime(timestamp)}</span>
			</Row>
			{
				status !== 'pending' && (
					<Row style={{justifyContent: 'space-between'}}>
						<span className={style.submitData}>메모리 <b>{memory}KB</b> · 시간 <b>{time}ms</b></span>
					</Row>
				)
			}
		</section>
	)
}

interface TestCase {
	input: string;
	output: string;
}

const PageProblem = () => {
	const pathname = window.location.pathname.replace('/problem/', ''); // Get the current pathname as memo id
    const [memoContent, setMemoContent] = useState<string>('');
    const debouncedMemoContent = useDebounce(memoContent, 1000);
	const { isUserLogin } = useIsLoggined();
	const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
	const [isCorrectModalOpen, setIsCorrectModalOpen] = useState<boolean>(false);
	const [isRateModalOpen, setIsRateModalOpen] = useState<boolean>(false);
	// API
	const [tier, setTier] = useState<string>('');
	const [subject, setSubject] = useState<string>('');
	const [markdown, setMarkdown] = useState<string>('');
	const [solvedCount, setSolvedCount] = useState<number>(0);
	const [submitCount, setSubmitCount] = useState<number>(0);
	const [testCases, setTestCases] = useState<TestCase[] | null>(null);

	// 기여 모달
	const [rateTier, setRateTier] = useState<string>('');
	const [rateReason, setRateReason] = useState<string>('');

	// 제출 현황
	const [isSubmitStatusPending, setIsSubmitStatusPending] = useState<boolean>(false);

	// Editor 관련 상태 변수
	const [editorCode, setEditorCode] = useState<string>(
		'int main() {\n\tprintf("Hello, World!");\n\treturn 0;\n}'
	);
	const [editorLanguage, setEditorLanguage] = useState<string>(localStorage.getItem('recentLanguage') || 'c');

	// 메모 불러오기
    useEffect(() => {
        // Fetch the memo content when the component mounts
        const fetchMemo = async () => {
            const memo = await getMemo(pathname);
            if (memo) {
                setMemoContent(memo.value);
            }
        };

        fetchMemo();
    }, [pathname]);

	// 최근 Language를 LocalStorage에 저장
	useEffect(() => {
		localStorage.setItem('recentLanguage', editorLanguage);
	}, [editorLanguage]);

	// 메모 업데이트
    useEffect(() => {
        // UpSert memo when debouncedMemoContent changes
        if (debouncedMemoContent) {
            const upsertMemo = async () => {
                await UpSertMemo({
                    key: pathname,
					value: debouncedMemoContent,
                });
            };

            upsertMemo();
        }
    }, [debouncedMemoContent, pathname]);

	// 임시로 코드를 indexDB에 저장
	useEffect(() => {
		if (editorCode) {
			const upsertCode = async () => {
				await UpSertCode({
					key: pathname,
					value: editorCode,
				});
			};
			upsertCode();
		}
	}, [editorCode, pathname]);

	// 모달 열릴 때 IndexedDB에 있는 임시 코드 불러오기
	useEffect(() => {
		const fetchCode = async () => {
			const savedCode = await getCode(pathname);
			if (savedCode) {
				setEditorCode(savedCode.value);
			}
		};
		fetchCode();
	}, [isSubmitModalOpen, pathname]);

	// 커스텀 메타 태그 설정
    setMetaTag({
        title: "두 수 정하기 - NXP",
        description: "두 수를 입력받아 더하는 문제",
    });

	// 문제 정보 불러오기
	useEffect(() => {
		request.get(`/problem/${pathname}`).then((response) => {
			setMarkdown(response.data.content);
			setSolvedCount(response.data.solved_count);
			setSubmitCount(response.data.submit_count);
			setTier(response.data.rankPoint);
			setSubject(response.data.subject);
			setTestCases(response.data.testcases);
		})
	}, []);

	function handleMainSubmitButton() {
		if(!isUserLogin) toast.error('로그인이 필요한 서비스입니다.', {
			position: 'bottom-right'
		});

		setIsSubmitModalOpen(true);
	}

	async function handleModalSubmit() {
		// 임시 코드 삭제
		await deleteCode(pathname);

		// 코드 제출
		request.post(`/problem/${pathname}/solution`, {
			code: editorCode,
			language: editorLanguage
		}).then((res) => {
			if(res.data.ok) {
				setIsCorrectModalOpen(true);
			} else {
				toast.error('제출한 코드가 정답이 아닙니다.', {
					position: 'bottom-right'
				});
			}
		}).catch(() => {
			toast.error('코드 제출 중 오류가 발생했습니다.', {
				position: 'bottom-right'
			});
		}).finally(() => {
			setIsSubmitModalOpen(false);
		});
	}

	function handleUpdateSubmitStatus() {
		console.log('update submit status');

		setIsSubmitStatusPending(true);

		request.get('/submit/status').then(() => {
			toast.info('제출 현황이 업데이트 되었습니다.', {
				position: 'bottom-right'
			});
		}).catch(() => {
			toast.error('제출 현황 업데이트 중 오류가 발생했습니다.', {
				position: 'bottom-right'
			})
		}).finally(() => {
			setIsSubmitStatusPending(false);
		});
	}

	function handleRateSubmit() {
		request.post(`/problem/${pathname}/rate`, {
			votedRank: rateTier.replace(' ', ''),
			comment: rateReason
		}).then((res) => {
			setIsRateModalOpen(false);

			if(res.data.ok) {
				toast.info('성공적으로 문제 티어를 평가하였습니다.', {
					position: 'bottom-right'
				});
			} else {
				toast.error('문제 티어를 평가하는 중 오류가 발생했습니다.', {
					position: 'bottom-right'
				});
			}
		}).catch(() => {
			toast.error('문제 티어를 평가하는 중 오류가 발생했습니다.', {
				position: 'bottom-right'
			})
		})
	}

    return (
		<>
			<TemplateHeader/>
			<main className={style.container}>
				<Row className={style.main}>
					<section className={style.left}>
						<h1 className={style.title}><span style={{color: TierToTextColor(tier), marginRight: '10px'}}>{TierToSummary(tier)}</span>{subject}</h1>
						<ReactMarkdown
							children={markdown}
							remarkPlugins={[remarkGfm, remarkMath]}
							rehypePlugins={[rehypeKatex, rehypeRaw]}
							className={style.markdown}
						/>
						<Column style={{marginTop: '30px'}}>
							<span>테스트케이스</span>
							<Row style={{marginTop: '15px', gap: '10px'}}>
								{
									testCases?.map((testCase, index) => (
										<article className={style.testcase} key={index}>
											<div>
												<span>입력</span>
												<pre>{testCase.input}</pre>
											</div>
											<div>
												<span>출력</span>
												<pre>{testCase.output}</pre>
											</div>
										</article>
									))
								}
							</Row>
						</Column>
					</section>
					<Column className={style.right}>
						<button className={style.submit} onClick={() => handleMainSubmitButton()}>
							<FaCode size={18}/> 코드 제출하기
						</button>
						<Row style={{gap: '10px', marginTop: '15px'}}>
							<section className={style.problemLimit}>
								<Row className={style.limitTitle}>
									<MdOutlineTimelapse/>
									<span>시간 제한</span>
								</Row>
								<span className={style.limitValue}>1초</span>
							</section>
							<section className={style.problemLimit}>
								<Row className={style.limitTitle}>
									<FaMemory/>
									<span>메모리 제한</span>
								</Row>
								<span className={style.limitValue}>256 MB</span>
							</section>
						</Row>
						<ul className={style.problemSummaryContainer}>
							<ProblemSummary title={'제출 수'} value={`${solvedCount}명`}/>
							<ProblemSummary title={'정답 수'} value={`${submitCount}명`}/>
							<ProblemSummary title={'실패 수'} value={'22,293명'}/>
						</ul>

						<span className={style.memoTitle}>메모</span>
						<textarea
							className={style.memo}
							placeholder={'여기를 눌러 메모를 입력하세요'}
							defaultValue={memoContent}
							onChange={(e) => setMemoContent(e.target.value)}
						/>

						<Row className={style.doesntWork}>
							<FaCircleInfo /> 작동하지 않는 컴포넌트
						</Row>
						<Row style={{justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
							<span className={style.submitTitle}>제출 현황</span>
							<button className={style.submitUpdate} onClick={() => handleUpdateSubmitStatus()}>
								{
									isSubmitStatusPending ? (
										<>
											<MdOutlineRefresh size={16} className={'spinning'}/>
										</>
									) : (
										<>
											<MdOutlineRefresh size={16}/> 눌러서 업데이트
										</>
									)
								}
							</button>
						</Row>
						<Column className={style.submitContainer}>
							<Submit
								status={'pending'}
								language={'C99'}
								date={'2024-8-15 3:33:42'}
								memory={5592}
								time={192}
							/>
							<Submit
								status={'success'}
								language={'C99'}
								date={'2024-8-15 3:33:42'}
								memory={5592}
								time={192}
							/>
							<Submit
								status={'fail'}
								language={'C99'}
								date={'2024-8-15 3:33:42'}
								memory={5592}
								time={192}
							/>
							<Submit
								status={'fail'}
								language={'C99'}
								date={'2024-8-15 3:33:42'}
								memory={5592}
								time={192}
							/>
						</Column>
					</Column>
				</Row>
				{isSubmitModalOpen && (
					createPortal(
						<>
							<Modal.Backdrop isVisible={isSubmitModalOpen}
											handleClose={() => setIsSubmitModalOpen(false)}>
								<Modal className={style.submitModal}>
									<Row className={style.submitModalHeader}>
										<h2>코드 제출하기</h2>
										<button className={style.modalClose}
												onClick={() => setIsSubmitModalOpen(false)}>
											<IoCloseSharp size={20}/>
										</button>
									</Row>
									<MonacoEditor code={editorCode} setCode={setEditorCode} language={editorLanguage}/>
									<Selector initialValue={editorLanguage}
										styles={{margin: 'auto 0 10px 0', height: '45px'}}
										className={style.select} options={[
											{
												label: 'C',
												value: 'c'
											},
											{
												label: 'py',
												value: 'python'
											},
											{
												label: 'C++',
												value: 'cpp'
											},
											{
												label: 'Java',
												value: 'java'
											},
											{
												label: 'GoLang',
												value: 'go'
											},
											{
												label: 'Rust',
												value: 'rust'
											}
										]} onChange={(e) => setEditorLanguage(e)}
									/>
									<button className={style.submit} style={{width: '100%'}}
											onClick={() => handleModalSubmit()}>
										<FaCode size={18}/> 제출하기
									</button>
								</Modal>
							</Modal.Backdrop>
						</>,
						document.body
					)
				)}
				{
					isCorrectModalOpen && (
						createPortal(
							<>
								<Modal.Backdrop isVisible={isCorrectModalOpen} handleClose={() => setIsCorrectModalOpen(false)}>
									<Modal className={style.successModal}>
										<h2 className={style.modalTitle}>정답입니다!</h2>
										<Lottie
											options={{
												animationData: LottieCorrect,
												loop: false,
												autoplay: true
											}}
											width={100}
											height={100}
											style={{
												marginBottom: '20px'
											}}
										/>
										<Column style={{gap: '8px', width: '100%'}}>
											<button className={style.successModalRate}><FaQuestionCircle /> 문제 티어가 난이도에 맞지 않나요?</button>
											<button className={style.successModalClose} onClick={() => setIsCorrectModalOpen(false)}>닫기</button>
										</Column>
									</Modal>
								</Modal.Backdrop>
							</>,
							document.body
						)
					)
				}
				{
					isRateModalOpen && (
						createPortal(
							<>
								<Modal.Backdrop isVisible={isRateModalOpen} handleClose={() => setIsRateModalOpen(false)}>
									<Modal className={style.rateModal}>
										<h2 className={style.modalTitle}><b>{subject}</b> 문제 기여</h2>
										<Column style={{
											marginTop: '20px',
											gap: '10px',
											width: '100%'
										}}>
											<label className={style.rateModalLabel}>적합하다고 생각하는 티어</label>
											<select className={style.rateModalSelect}
													onChange={(e) => setRateTier(e.target.value)}>
												{ProblemTierOptions.map((option) => (
													<option value={option.value}>{option.label}</option>
												))}
											</select>
											<div />
											<label className={style.rateModalLabel}>기여 사유</label>
											<textarea className={style.rateModalTextarea} onChange={(e) => setRateReason(e.target.value)} />
											<button className={style.rateModalSubmit} onClick={() => handleRateSubmit()}>제출하기</button>
										</Column>
									</Modal>
								</Modal.Backdrop>
							</>,
							document.body
						)
					)
				}
			</main>
		</>
	)
}

export default PageProblem;
