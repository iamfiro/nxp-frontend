import style from '../styles/pages/problem.module.scss';
import { useState, useEffect } from "react";
import {Column, Modal, MonacoEditor, Row, setMetaTag} from "../components";
import { FaCode } from "react-icons/fa6";
import TemplateHeader from "../template/header.tsx";
import { MdOutlineTimelapse } from "react-icons/md";
import { FaMemory } from "react-icons/fa6";
import useDebounce from "../hooks/useDebounce.ts";
import {getMemo, UpSertMemo} from "../lib/idb.ts";
import useIsLoggined from "../hooks/useIsLoggined.ts";
import {toast} from "react-toastify";
import {createPortal} from "react-dom";

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

const PageProblem = () => {
    const pathname = window.location.pathname.replace('/problem/', ''); // Get the current pathname as memo id
    const [memoContent, setMemoContent] = useState<string>('');
    const debouncedMemoContent = useDebounce(memoContent, 1000);
	const { isUserLogin } = useIsLoggined();
	const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(true);

	// Editor 관련 상태 변수
	const [editorCode, setEditorCode] = useState<string>(
		'function add(a, b) {'
	);
	const [editorLanguage, setEditorLanguage] = useState<string>('java');

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

    setMetaTag({
        title: "두 수 정하기 - NXP",
        description: "두 수를 입력받아 더하는 문제",
    });

	function handleSubmit() {
		if(!isUserLogin) toast.error('로그인이 필요한 서비스입니다.', {
			position: 'bottom-right'
		});

		setIsSubmitModalOpen(true);
	}

    return (
        <main className={style.container}>
            <TemplateHeader />
            <Row className={style.main}>
                <section className={style.left}>
                    <h1 className={style.title}>가장 많이 받은 선물</h1>
                </section>
                <Column className={style.right}>
                    <button className={style.submit} onClick={() => handleSubmit()}>
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
                        value={memoContent}
						defaultValue={memoContent}
                        onChange={(e) => setMemoContent(e.target.value)}
                    />
                </Column>
            </Row>
			{isSubmitModalOpen && (
				createPortal(
					<>
						<Modal.Backdrop isVisible={isSubmitModalOpen} handleClose={() => setIsSubmitModalOpen(false)}>
							<Modal className={style.submitModal}>
								<MonacoEditor code={editorCode} setCode={setEditorCode} language={editorLanguage}/>
								<select className={style.selectLanguage} value={editorLanguage}
										onChange={(e) => setEditorLanguage(e.target.value)}>
									<option value={'c'}>C</option>
									<option value={'cpp'}>C++</option>
									<option value={'java'}>Java</option>
									<option value={'go'}>GoLang</option>
									<option value={'rust'}>Rust</option>
								</select>
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
