export enum ButtonSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export enum ButtonType {
    Primary = 'primary',
    Black = 'black',
    White = 'white',
}

export interface OptionType {
    value: string | number;
    label: string;
}

export interface ProblemType {
    level: number;
    title: string;
    solved: number;
    ratio: number;
}
