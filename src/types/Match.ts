import { type ScoreRecord } from './ScoreRecord';

export interface Match extends ScoreRecord {
	hasEnded: boolean;
	index: number;
}

