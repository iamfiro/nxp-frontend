export function TierToSummary(tier: string) {
	if(tier.includes('Bronze')) {
		return `B${tier.split('Bronze')[1]}`;
	} else if(tier.includes('Silver')) {
		return `S${tier.split('Silver')[1]}`;
	} else if(tier.includes('Gold')) {
		return `G${tier.split('Gold')[1]}`;
	} else if(tier.includes('Platinum')) {
		return `P${tier.split('Platinum')[1]}`;
	} else if(tier.includes('Diamond')) {
		return `D${tier.split('Diamond')[1]}`;
	} else if(tier.includes('Ace')) {
		return `A${tier.split('Ace')[1]}`;
	} else if(tier.includes('Master')) {
		return `M${tier.split('Master')[1]}`;
	}
}
