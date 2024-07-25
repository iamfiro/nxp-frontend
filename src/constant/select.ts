import {OptionType} from "../types/component.ts";

export const OptionsLevel: OptionType[] = [
    {
        label: '전체 레벨',
        value: 'all',
    },
    {
        label: 'Lv. 1',
        value: '1',
    },
    {
        label: 'Lv. 2',
        value: '2',
    },
    {
        label: 'Lv. 3',
        value: '3',
    },
    {
        label: 'Lv. 4',
        value: '4',
    },
    {
        label: 'Lv. 5',
        value: '5',
    },
]

export const OptionsLanguage: OptionType[] = [
    {
        label: '전체 언어',
        value: 'all',
    },
    {
        label: 'C',
        value: 'c',
    },
    {
        label: 'C++',
        value: 'cpp',
    },
    {
        label: 'Java',
        value: 'java',
    },
    {
        label: 'Python',
        value: 'python',
    },
    {
        label: 'JavaScript',
        value: 'javascript',
    },
]

export const OptionsSort: OptionType[] = [
    {
        label: '최신순',
        value: 'latest',
    },
    {
        label: '정답률 낮은 순',
        value: 'hard',
    },
    {
        label: '정답률 높은 순',
        value: 'easy',
    },
]