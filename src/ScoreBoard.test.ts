import { assert } from 'chai';
import { Scoreboard } from './Scoreboard';

describe('Scoreboard', () => {
	it('should allow multiple scoreboards', () => {
		const boardA = new Scoreboard();
		const boardB = new Scoreboard();

		assert.notEqual(boardA, boardB);
	});
});

describe('getMatches()', () => {
	it('should return an empty list of matches when none have been started', () => {
		const board = new Scoreboard();

		assert.deepEqual(board.getMatches(), []);
	});
});

describe('startMatch()', () => {
	it('should all new matches to be started', () => {
		const board = new Scoreboard();

		board.startMatch('Mock home team', 'Mock away team');

		assert.deepEqual(board.getMatches(), [
			{
				homeTeam: 'Mock home team',
				homeScore: 0,
				awayTeam: 'Mock away team',
				awayScore: 0,
			}
		]);
	});
});