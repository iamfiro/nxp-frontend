import style from "../../styles/pages/problem.module.scss";
import {Editor, useMonaco} from "@monaco-editor/react";
import {useEffect} from "react";
import XcodeDefaultTheme from 'monaco-themes/themes/Xcode_default.json';

interface MonacoEditorProps {
	code: string;
	setCode: (code: string) => void;
	language: string;
}

const MonacoEditor = ({code, setCode, language}: MonacoEditorProps) => {
	const monaco = useMonaco();

	useEffect(() => {
		if(!monaco) return;
		// @ts-ignore
		type monacoIStandaloneThemeData = monaco.editor.IStandaloneThemeData;

		const XcodeDefaultCustom = {
			...XcodeDefaultTheme,
			colors: {
				...XcodeDefaultTheme.colors,
				"editorLineNumber.foreground": '#B5B5B5',
			}
		}

		monaco.editor.defineTheme('xcode-default', XcodeDefaultCustom as monacoIStandaloneThemeData);

		monaco.editor.setTheme('xcode-default');
	}, [monaco]);

	useEffect(() => {
		if (!monaco) return;
		// 언어가 바뀌었을때 모델의 언어를 바꿔줌
		monaco.editor.setModelLanguage(monaco.editor.getModels()[0], language);
	  }, [language, monaco]);

	return (
		<Editor
			defaultLanguage={language}
			defaultValue={code}
			theme={'github-light'}
			onChange={(value) => setCode(value || '')}
			className={style.editor}
			width={'100%'}
			height={'calc(100% - 50px)'}
			options={{
				fontSize: 16,
				tabSize: 4,
				insertSpaces: false,
			}}
		/>
	)
}

export default MonacoEditor;
