import { assert } from 'chai';
import { orderByScoreThenIndex } from './orderByScoreThenIndex';

describe('orderByScoreThenIndex', () => {
	it('returns -1 when the first match has a higher total score than the second', () => {
		const match1 = {
			homeTeam: 'team a',
			homeScore: 1,
			awayTeam: 'team b',
			awayScore: 1,
			hasEnded: false,
			index: 0,
		};
		const match2 = {
			homeTeam: 'team c',
			homeScore: 1,
			awayTeam: 'team d',
			awayScore: 0,
			hasEnded: false,
			index: 1,
		};

		const ordered = orderByScoreThenIndex(match1, match2);
		assert.equal(ordered, -1);
	});

	it('returns 1 when the second match has a higher total score than the first', () => {
		const match1 = {
			homeTeam: 'team a',
			homeScore: 1,
			awayTeam: 'team b',
			awayScore: 0,
			hasEnded: false,
			index: 0,
		};
		const match2 = {
			homeTeam: 'team c',
			homeScore: 1,
			awayTeam: 'team d',
			awayScore: 1,
			hasEnded: false,
			index: 1,
		};

		const ordered = orderByScoreThenIndex(match1, match2);
		assert.equal(ordered, 1);
	});

	it('order by non-ascending match index if scores are equal', () => {
		const match1 = {
			homeTeam: 'team a',
			homeScore: 1,
			awayTeam: 'team b',
			awayScore: 1,
			hasEnded: false,
			index: 3,
		};
		const match2 = {
			homeTeam: 'team c',
			homeScore: 1,
			awayTeam: 'team d',
			awayScore: 1,
			hasEnded: false,
			index: 1,
		};

		const ordered = orderByScoreThenIndex(match1, match2);
		assert.equal(ordered, -1);
	});
});
