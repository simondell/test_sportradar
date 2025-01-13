import { assert } from 'chai';
import { Scoreboard } from './Scoreboard';

describe('Scoreboard', () => {
	it('should allow multiple scoreboards', () => {
		const boardA = new Scoreboard();
		const boardB = new Scoreboard();

		assert.notEqual(boardA, boardB);
	})
})