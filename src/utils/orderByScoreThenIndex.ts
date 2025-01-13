import { log } from 'console';
import { type Match } from '../Scoreboard';

export function orderByScoreThenIndex (match1: Match, match2: Match): -1 | 0 | 1 {
	const match1Total = match1.homeScore + match1.awayScore;
	const match2Total = match2.homeScore + match2.awayScore;

	return match1Total > match2Total ? -1 : 1; 
}