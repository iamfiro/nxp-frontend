import style from '../styles/pages/problem.module.scss';
import {useEffect, useState} from "react";
import {Column, Modal, MonacoEditor, Row, Selector, setMetaTag} from "../components";
import {FaCode, FaMemory} from "react-icons/fa6";
import TemplateHeader from "../template/header.tsx";
import {MdOutlineTimelapse} from "react-icons/md";
import useDebounce from "../hooks/useDebounce.ts";
import {deleteCode, getCode, getMemo, UpSertCode, UpSertMemo} from "../lib/idb.ts";
import useIsLoggined from "../hooks/useIsLoggined.ts";
import {toast} from "react-toastify";
import {createPortal} from "react-dom";
import {IoCloseSharp} from "react-icons/io5";
import {request} from "../lib/axios.ts";
import { MdOutlineRefresh } from "react-icons/md";

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
	status?: boolean;
}

const Submit = () => {
	return (
		<section className={style.submitItem}>
			<Row style={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
				<Column>
					<span className={style.submitLanguage}>C99</span>
					<span className={style.submitStatus}>정답입니다!</span>
				</Column>
				<a className={style.submitDate}>2024-8-15 3:33:42 제출</a>
			</Row>
			<Row style={{justifyContent: 'space-between'}}>
				<span className={style.submitData}>메모리 <b>5592KB</b> · 시간 <b>192ms</b></span>
				<button className={style.submitViewCode}>코드 보기</button>
			</Row>
		</section>
	)
}

const PageProblem = () => {
	const pathname = window.location.pathname.replace('/problem/', ''); // Get the current pathname as memo id
    const [memoContent, setMemoContent] = useState<string>('');
    const debouncedMemoContent = useDebounce(memoContent, 1000);
	const { isUserLogin } = useIsLoggined();
	const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

	// 제출 현황
	const [isSubmitStatusPending, setIsSubmitStatusPending] = useState<boolean>(false);

	// Editor 관련 상태 변수
	const [editorCode, setEditorCode] = useState<string>(
		'function add(a, b) {'
	);
	const [editorLanguage, setEditorLanguage] = useState<string>(localStorage.getItem('recentLanguage') || 'c');

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

    setMetaTag({
        title: "두 수 정하기 - NXP",
        description: "두 수를 입력받아 더하는 문제",
    });

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
		request.post('/submit', {
			problemId: pathname,
			code: editorCode,
		}).then(() => {
			toast.info('코드가 제출 되었습니다', {
				position: 'bottom-right'
			});
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

    return (
        <main className={style.container}>
            <TemplateHeader />
            <Row className={style.main}>
                <section className={style.left}>
                    <h1 className={style.title}>가장 많이 받은 선물</h1>
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
                            <span className={style.limitValue}>128 MB</span>
                        </section>
                    </Row>
                    <ul className={style.problemSummaryContainer}>
                        <ProblemSummary title={'제출 수'} value={'1,000명'} />
                        <ProblemSummary title={'정답 수'} value={'1,000명'} />
                        <ProblemSummary title={'실패 수'} value={'22,293명'} />
                    </ul>

                    <span className={style.memoTitle}>메모</span>
                    <textarea
                        className={style.memo}
                        placeholder={'여기를 눌러 메모를 입력하세요'}
						defaultValue={memoContent}
                        onChange={(e) => setMemoContent(e.target.value)}
                    />

					<Row style={{justifyContent: 'space-between', alignItems: 'center', marginTop: '40px'}}>
						<span className={style.submitTitle}>제출 현황</span>
						<button className={style.submitUpdate} onClick={() => handleUpdateSubmitStatus()}>
							{
								isSubmitStatusPending ? (
									<>
										<MdOutlineRefresh size={16} className={'spinning'} />
									</>
								) : (
									<>
										<MdOutlineRefresh size={16} /> 눌러서 업데이트
									</>
								)
							}
						</button>
					</Row>
					<Column className={style.submitContainer}>
						<Submit  />
					</Column>
				</Column>
			</Row>
			{isSubmitModalOpen && (
				createPortal(
					<>
						<Modal.Backdrop isVisible={isSubmitModalOpen} handleClose={() => setIsSubmitModalOpen(false)}>
							<Modal className={style.submitModal}>
								<Row className={style.submitModalHeader}>
									<h2>코드 제출하기</h2>
									<button className={style.modalClose} onClick={() => setIsSubmitModalOpen(false)}>
										<IoCloseSharp size={20} />
									</button>
								</Row>
								<MonacoEditor code={editorCode} setCode={setEditorCode} language={editorLanguage}/>
								<Selector initialValue={editorLanguage} styles={{ margin: 'auto 0 10px 0', height: '45px'}} className={style.select} options={[
									{
										label: 'C',
										value: 'c'
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
								]} onChange={(e) => setEditorLanguage(e)} />
								<button className={style.submit} style={{width: '100%'}} onClick={() => handleModalSubmit()}>
									<FaCode size={18} /> 제출하기
								</button>
							</Modal>
						</Modal.Backdrop>
					</>,
					document.body
				)
			)}
		</main>
	)
}

export default PageProblem;
