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

	it('should return matches in order of total score', () => {
		const board = new Scoreboard();

		board.startMatch('team a', 'team b');
		board.updateScore('team a', 1, 0);
		board.startMatch('team c', 'team d');
		board.updateScore('team c', 0, 2);

		assert.deepEqual(board.getMatches(), [{
			homeTeam: 'team c',
			homeScore: 0,
			awayTeam: 'team d',
			awayScore: 2,
		},{
			homeTeam: 'team a',
			homeScore: 1,
			awayTeam: 'team b',
			awayScore: 0,
		}]);
	})
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

		board.startMatch('team a', 'team b');
		assert.equal(board.getMatches().length, 1);
		board.startMatch('team c', 'team d');
		assert.equal(board.getMatches().length, 2);
		board.startMatch('team e', 'team f');
		assert.equal(board.getMatches().length, 3);
		board.startMatch('team g', 'team h');
		assert.equal(board.getMatches().length, 4);
	});
});

describe('endMatch()', () => {
	it('should allow matches to be ended', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');
		board.startMatch('team c', 'team d');

		board.endMatch('team a');

		assert.deepEqual(board.getMatches(), [{
			homeTeam: 'team c',
			homeScore: 0,
			awayTeam: 'team d',
			awayScore: 0,
		}]);
	});
});

describe('updateScore()', () => {
	it('should update the score of a specific match', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');
		board.startMatch('team c', 'team d');

		board.updateScore('team c', 1, 0);
		board.updateScore('team a', 0, 1);

		assert.deepEqual(board.getMatches(), [{
			homeTeam: 'team a',
			homeScore: 0,
			awayTeam: 'team b',
			awayScore: 1,
		},{
			homeTeam: 'team c',
			homeScore: 1,
			awayTeam: 'team d',
			awayScore: 0,
		}]);
	})
});
