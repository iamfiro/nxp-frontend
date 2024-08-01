import style from "../../styles/pages/problem.module.scss";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import XcodeDefaultTheme from "monaco-themes/themes/Xcode_default.json";

interface MonacoEditorProps {
    code: string;
    setCode: (code: string) => void;
    language: string;
}

const MonacoEditor = ({ code, setCode, language }: MonacoEditorProps) => {
    const monaco = useMonaco();

    useEffect(() => {
        if (!monaco) return;
        // @ts-ignore
        type monacoIStandaloneThemeData = monaco.editor.IStandaloneThemeData;

        const XcodeDefaultCustom = {
            ...XcodeDefaultTheme,
            colors: {
                ...XcodeDefaultTheme.colors,
                "editorLineNumber.foreground": "#B5B5B5",
            },
        };

        monaco.editor.defineTheme(
            "xcode-default",
            XcodeDefaultCustom as monacoIStandaloneThemeData
        );

        monaco.editor.setTheme("xcode-default");
    }, [monaco]);

    useEffect(() => {
        if (!monaco) return;

        // Register completion providers for each language
        registerCompletionProviders(monaco);

        // Update model language when language prop changes
        monaco.editor.setModelLanguage(
            monaco.editor.getModels()[0],
            language
        );
    }, [language, monaco]);

    return (
        <Editor
            defaultLanguage={language}
            defaultValue={code}
            theme={"github-light"}
            onChange={(value) => setCode(value || "")}
            className={style.editor}
            width={"100%"}
            height={"calc(100% - 50px)"}
            options={{
                fontSize: 16,
                tabSize: 4,
                insertSpaces: false,
            }}
        />
    );
};

const registerCompletionProviders = (monaco: any) => {
    const languages = ["java", "c", "cpp", "go", "rust"];

    languages.forEach((language) => {
        monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: () => {
                const suggestions = getSuggestionsForLanguage(language, monaco);
                return { suggestions };
            },
        });
    });
};

// Pass the monaco instance as a parameter
const getSuggestionsForLanguage = (language: string, monaco: any) => {
    switch (language) {
        case "java":
            return [
                {
                    label: "System.out.println",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "System.out.println(${1});",
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Prints a message to the standard output.",
                },
                {
                    label: "class",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: "class ${1:ClassName} {\n\t$0\n}",
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Defines a new class.",
                },
                // Add more Java suggestions...
            ];
        case "c":
            return [
                {
                    label: "printf",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: 'printf("${1:format}", ${2:args});',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Prints formatted output to stdout.",
                },
                {
                    label: "include",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: "#include <${1:header.h}>",
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Includes a header file.",
                },
                // Add more C suggestions...
            ];
        case "cpp":
            return [
                {
                    label: "cout",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "std::cout << ${1:output} << std::endl;",
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Outputs to the standard output stream.",
                },
                {
                    label: "vector",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: "std::vector<${1:int}> ${2:name};",
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Defines a dynamic array.",
                },
                // Add more C++ suggestions...
            ];
        case "go":
            return [
                {
                    label: "fmt.Println",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "fmt.Println(${1});",
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Prints a message to the standard output.",
                },
                {
                    label: "func",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: "func ${1:name}(${2:params}) ${3:returnType} {\n\t$0\n}",
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Defines a new function.",
                },
                // Add more Go suggestions...
            ];
        case "rust":
            return [
                {
                    label: "println!",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: 'println!("${1}");',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Prints a line to the standard output.",
                },
                {
                    label: "fn",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: "fn ${1:name}(${2:params}) -> ${3:ReturnType} {\n\t$0\n}",
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "Defines a new function.",
                },
                // Add more Rust suggestions...
            ];
        default:
            return [];
    }
};

export default MonacoEditor;
