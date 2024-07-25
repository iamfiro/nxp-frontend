/**
 * 문제 레벨에 따라 텍스트 색상을 반환합니다.
 * @param {number} level - 문제 레벨.
 * @returns {string} - 해당 레벨에 대한 텍스트 색상.
 */
export function levelToTextColor(level: number): string {
    switch (level) {
        case 1:
            return '#00b0f0';
        case 2:
            return '#00b050';
        case 3:
            return '#ffc000';
        case 4:
            return '#ff0000';
        case 5:
            return '#7030a0';
        default:
            return '#000000';
    }
}
