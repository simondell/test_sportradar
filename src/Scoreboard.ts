import { type ScoreRecord } from "./types/ScoreRecord";
import { type Match } from "./types/Match";
import { orderByScoreThenIndex } from "./utils/orderByScoreThenIndex";

/**
 * Creates a new Scoreboard instance
 * @class
 * 
 * Available methods:
 * - endMatch {Function} - ends a match for a given home team
 * - getMatches {Function} - returns an array of ScoreRecords, sorted by score and start time
 * - startMatch {Function} - starts a match between given home and away teams
 * - updateScore {Function} - allows updating new scores for a match at a given home team's venue
 */
export class Scoreboard {
	// private matches: Match[] = [];
	private matchesByHomeTeam: {[key: string]: Match} = {};
	private matchesByAwayTeam: {[key: string]: Match} = {};
	private matchIndex = 0;

	/**
	 * A private static factory function for Match objects
	 * @param {string} homeTeam The name of the home team
	 * @param {string} awayTeam The name of the away team
	 * @param {number} index An index for the match; must be unique; this is a flaw in design. The method is a private static function, so consumers can't easily use it directly. Therefore the Scoreboard class must manage the indeces. It does this, but the algorithm is opaque and not covered by enough tests.
	 * @returns {Match} Returns an object meeting the Match interface
	 */
	private static createMatch (
		homeTeam: string,
		awayTeam: string,
		index: number
	): Match {
		return {
			homeTeam,
			awayTeam,
			homeScore: 0,
			awayScore: 0,
			index,
		}
	}

	/**
	 * Ends a match involving a given home team
	 * @param {string} homeTeam The name of the home team whose match must end
	 * @return {void} Returns void
	 * @throws Will throw a message if the given homeTeam doesn't reference a current match
	 */
	endMatch (homeTeam: string): void {
		const thisMatch = this.matchesByHomeTeam[homeTeam];

		if(!thisMatch) throw new Error("Cannot end a match which unless it is in progress");

		// thisMatch.hasEnded = true;
		delete this.matchesByHomeTeam[homeTeam];
		delete this.matchesByAwayTeam[thisMatch.awayTeam];
	}

	/**
	 * Returns the current matches
	 * @return {array} Returns an array of ScoreRecord objects, ordered descending by total score and then by most recent kick-off
	 */
	getMatches (): ScoreRecord[] {
		// T: O(2n) + O(n log n)
		//
		// return (this.matches
		// 	.filter(match => !match.hasEnded)
		// 	.sort(orderByScoreThenIndex)
		// 	.map(match => ({
		// 		homeTeam: match.homeTeam,
		// 		homeScore: match.homeScore,
		// 		awayTeam: match.awayTeam,
		// 		awayScore: match.awayScore,
		// 	}))
		// );

		// O(3n) +  O(n log n)
		return (
			Object.entries(this.matchesByHomeTeam)
				.map(([homeTeam, match]) => match)
				.sort(orderByScoreThenIndex)
				.map(match => ({
					homeTeam: match.homeTeam,
					homeScore: match.homeScore,
					awayTeam: match.awayTeam,
					awayScore: match.awayScore,
				}))
		);
	}

	/**
	 * Starts a new match, which means adding a Match instance to the private matches array
	 * @param {string} homeTeam The name of the home team
	 * @param {string} awayTeam The name of the away team
	 * @return {void} Returns void
	 * @throws Will throw a message if either team is currently playing a match
	 */
	startMatch (homeTeam: string, awayTeam: string) {
		if(
			this.matchesByHomeTeam[homeTeam] !== undefined
			|| this.matchesByAwayTeam[awayTeam] !== undefined
		) throw new Error('Cannot start a match with a team currently playing');

		this.matchIndex += 1;
		const newMatch = Scoreboard.createMatch(homeTeam, awayTeam, this.matchIndex);
		this.matchesByHomeTeam[homeTeam] = newMatch;
		this.matchesByAwayTeam[awayTeam] = newMatch;
		// this.matches.push(newMatch);
	}

	/**
	 * Updates the current scores of a match, addressed by the home team
	 * @param {string} homeTeam The home team of the match to update
	 * @param {number} homeScore The new score for the home team (must be absolute)
	 * @param {number} awayScore The new score for the away team (must be absolute)
	 * @throws Will throw if the given homeTeam doesn't reference a current match
	 * @throws Will throw if either score is less than the current score
	 */ 
	updateScore (homeTeam: string, homeScore: number, awayScore: number) {
		const thisMatch = this.matchesByHomeTeam[homeTeam];

		if(!thisMatch) throw new Error('Cannot update missing or ended matches');
		if(homeScore < thisMatch.homeScore || awayScore < thisMatch.awayScore) {
			throw new Error('Scores must advance from their previous state');
		}

		thisMatch.homeScore = homeScore;
		thisMatch.awayScore = awayScore;
	}
}