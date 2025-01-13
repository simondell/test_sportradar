import { assert } from 'chai';
import { Scoreboard } from './Scoreboard';

describe('Scoreboard', () => {
	it('should allow multiple scoreboards', () => {
		const boardA = new Scoreboard();
		const boardB = new Scoreboard();

		assert.notEqual(boardA, boardB);
	})
})

describe('getMatches()', () => {
	it('should return an empty list of matches when none have been started', () => {
		const board = new Scoreboard();

		assert.equal(board.getMatches(), [])
	})
})