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
	it('should allow new matches to be started', () => {
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

	it('should allow multiple matches to be started', () => {
		const board = new Scoreboard();

		board.startMatch('team A', 'team b');
		assert.equal(board.getMatches().length, 1);
		board.startMatch('team c', 'team d');
		assert.equal(board.getMatches().length, 2);
		board.startMatch('team e', 'team f');
		assert.equal(board.getMatches().length, 3);
		board.startMatch('team g', 'team h');
		assert.equal(board.getMatches().length, 4);
	});
});