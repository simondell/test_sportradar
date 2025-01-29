import { assert } from 'chai';
import { Scoreboard } from './Scoreboard';

describe('Scoreboard', () => {
	it('should allow multiple scoreboards', () => {
		const boardA = new Scoreboard();
		const boardB = new Scoreboard();

		assert.notEqual(boardA, boardB);
	});

	it('should produce the expected results for the challenge provided test data', () => {
		const board = new Scoreboard();

		type TestMatch = [string, number, number, string]

		const matches: TestMatch[] = [
			['Mexico', 0, 5, 'Canada'],
			['Spain', 10, 2, 'Brazil'],
			['Germany', 2, 2, 'France'],
			['Uruguay', 6, 6, 'Italy'],
			['Argentina', 3, 1, 'Australia'],
		]
		matches.forEach(([home,,,away]) => {board.startMatch(home, away)});
		matches.forEach(([home,homeScore,awayScore,]) => {board.updateScore(home, homeScore, awayScore)});

		assert.deepEqual(board.getMatches(), [
			{ homeTeam: 'Uruguay', homeScore: 6, awayTeam: 'Italy', awayScore: 6, },
			{ homeTeam: 'Spain', homeScore: 10, awayTeam: 'Brazil', awayScore: 2, },
			{ homeTeam: 'Mexico', homeScore: 0, awayTeam: 'Canada', awayScore: 5, },
			{ homeTeam: 'Argentina', homeScore: 3, awayTeam: 'Australia', awayScore: 1, },
			{ homeTeam: 'Germany', homeScore: 2, awayTeam: 'France', awayScore: 2, },
		]);
	})
});

describe('getMatches()', () => {
	it('should return an empty list of matches when none have been started', () => {
		const board = new Scoreboard();

		assert.deepEqual(board.getMatches(), []);
	});

	it('should return matches in order of total score', () => {
		const board = new Scoreboard();

		board.startMatch('team a', 'team b');
		board.updateScore('team a', 0, 2);
		board.startMatch('team c', 'team d');
		board.updateScore('team c', 1, 0);

		assert.deepEqual(board.getMatches(), [{
			homeTeam: 'team a',
			homeScore: 0,
			awayTeam: 'team b',
			awayScore: 2,
		},{
			homeTeam: 'team c',
			homeScore: 1,
			awayTeam: 'team d',
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

	it('should not start new matches if the home team is already playing', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');

		const actual = () => {board.startMatch('team a', 'team c');}

		assert.throws(actual, 'Cannot start a match with a team currently playing');
	})

	it('should not start new matches if the away team is already playing', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');

		const actual = () => {board.startMatch('team c', 'team b');}

		assert.throws(actual, 'Cannot start a match with a team currently playing');
	})
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

	it('should block ending a match that has not started yet', () => {
		const board = new Scoreboard();
	
		const premature = () => { board.endMatch('team a'); };

		assert.throws(premature, 'Cannot end a match which unless it is in progress')
	})

	it('should block ending a match that has already ended', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');
		board.endMatch('team a');

		const premature = () => { board.endMatch('team a'); };

		assert.throws(premature, 'Cannot end a match which unless it is in progress')
	})
});

describe('updateScore()', () => {
	it('should update the score of a specific match', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');
		board.startMatch('team c', 'team d');

		board.updateScore('team c', 1, 0);
		board.updateScore('team a', 0, 1);

		assert.deepEqual(board.getMatches(), [{
			homeTeam: 'team c',
			homeScore: 1,
			awayTeam: 'team d',
			awayScore: 0,
		},{
			homeTeam: 'team a',
			homeScore: 0,
			awayTeam: 'team b',
			awayScore: 1,
		}]);
	});

	it('should use absolute score values', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');

		board.updateScore('team a', 1, 0);
		board.updateScore('team a', 3, 1);

		assert.deepEqual(board.getMatches(), [{
			homeTeam: 'team a',
			homeScore: 3,
			awayTeam: 'team b',
			awayScore: 1,
		}]);
	});

	it('should throw an error when regressing the home team score', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');
		board.updateScore('team a', 1, 2);

		const regression = () => {board.updateScore('team a', 0, 2)};

		assert.throws(regression, 'Scores must advance from their previous state');
	});

	it('should throw an error when regressing the away team score', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');
		board.updateScore('team a', 2, 1);

		const regression = () => {board.updateScore('team a', 2, 0)};

		assert.throws(regression, 'Scores must advance from their previous state');
	});

	it('should throw an error when updating with a negative', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');

		const negativeScore = () => {board.updateScore('team a', -1, 0)};

		assert.throws(negativeScore, "Scores must advance from their previous state");
	});

	it('should throw an error when updating a missing match', () => {
		const board = new Scoreboard();

		const missingMatch = () => {board.updateScore('team a', 1, 0)};

		assert.throws(missingMatch, "Cannot update missing or ended matches");
	});

	it('should throw an error when updating an ended match', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');
		board.endMatch('team a');

		const endedMatch = () => {board.updateScore('team a', 1, 0)};

		assert.throws(endedMatch, "Cannot update missing or ended matches");
	});
});

describe(`getScore()`, () => {
	const mockScores = 	[[3, 1], [0, 6], [1, 1], [0, 0], [10, 23]];

	mockScores.forEach(([homeScore, awayScore]) => {
		it('should return the current score for the given home team', () => {
			const board = new Scoreboard();
			board.startMatch('team a', 'team b');
			board.updateScore('team a', homeScore, awayScore);

			assert.equal(board.getScore('team a'), homeScore);
		});
	});

	mockScores.forEach(([homeScore, awayScore]) => {
		it('should return the current score for the given away team', () => {
			const board = new Scoreboard();
			board.startMatch('team a', 'team b');
			board.updateScore('team a', homeScore, awayScore);

			assert.equal(board.getScore('team b'), awayScore);
		});
	});

	it('should throw an error when the given team has no current matches', () => {
		const board = new Scoreboard();
		board.startMatch('team a', 'team b');
		board.updateScore('team a', 3, 1);

		assert.throw(
			() => {board.getScore('team c')},
			"Cannot find given team in current matches"
		);
	})
});