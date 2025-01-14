import { log } from 'console';
import { type Match } from '../types/Match';

/**
 * Sorts Match objects by total score and by index (most recent first). Use as a callback argument in calls Array.prototype.sort()
 * @param {Match} match1 The first Match to sort
 * @param {Match} match2 The second Match to sort
 * @return {-1 | 1} Returns -1 if the first argument should be sorted earlier; 1 if the second argument should be sorted earlier
 */
export function orderByScoreThenIndex (match1: Match, match2: Match): -1 | 1 {
	const match1Total = match1.homeScore + match1.awayScore;
	const match2Total = match2.homeScore + match2.awayScore;

	if(match1Total === match2Total) return match1.index > match2.index ? -1 : 1;

	return match1Total > match2Total ? -1 : 1;
}