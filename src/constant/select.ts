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

export const ProblemTimeOptions: OptionType[] = [
	{
		label: '1초',
		value: 1,
	},
	{
		label: '2초',
		value: 2,
	},
	{
		label: '3초',
		value: 3,
	},
	{
		label: '4초',
		value: 4,
	},
	{
		label: '5초',
		value: 5,
	},
]

export const ProblemRamOptions: OptionType[] = [
	{
		label: '32MB',
		value: 32,
	},
	{
		label: '64MB',
		value: 64,
	},
	{
		label: '128MB',
		value: 128,
	},
	{
		label: '256MB',
		value: 256,
	},
]
