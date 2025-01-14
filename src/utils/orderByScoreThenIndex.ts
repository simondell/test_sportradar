import { log } from 'console';
import { type Match } from '../types/Match';

export function orderByScoreThenIndex (match1: Match, match2: Match): -1 | 1 {
	const match1Total = match1.homeScore + match1.awayScore;
	const match2Total = match2.homeScore + match2.awayScore;

	if(match1Total === match2Total) match1.index > match2.index ? -1 : 1;

	return match1Total > match2Total ? -1 : 1;
}