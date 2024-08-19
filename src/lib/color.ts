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


export function TierToTextColor(tier: string): string {
	if(tier.includes('Bronze')) {
		return '#cd7f32';
	} else if(tier.includes('Silver')) {
		return '#c0c0c0';
	} else if(tier.includes('Gold')) {
		return '#ffd700';
	} else if(tier.includes('Platinum')) {
		return '#27c4fd';
	} else if(tier.includes('Diamond')) {
		return '#7f32ff';
	} else if(tier.includes('Ace')) {
		return '#1aa433';
	} else if(tier.includes('Master')) {
		return '#00ff94';
	} else {
		return '#000000';
	}
}
