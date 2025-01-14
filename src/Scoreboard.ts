import { type ScoreRecord } from "./types/ScoreRecord";
import { type Match } from "./types/Match";
import { orderByScoreThenIndex } from "./utils/orderByScoreThenIndex";

export class Scoreboard {
	private matches: Match[] = [];
	private matchesByHomeTeam: {[key: string]: Match} = {};
	private matchIndex = 0;

	private static createScoreRecord (
		homeTeam: string,
		awayTeam: string,
		index: number
	): Match {
		return {
			homeTeam,
			awayTeam,
			homeScore: 0,
			awayScore: 0,
			hasEnded: false,
			index,
		}
	}

	endMatch (homeTeam: string) {
		const thisMatch = this.matchesByHomeTeam[homeTeam];
		thisMatch.hasEnded = true;
		delete this.matchesByHomeTeam[homeTeam];
	}

	getMatches (): ScoreRecord[] {
		return (this.matches
			.filter(match => !match.hasEnded)
			.sort(orderByScoreThenIndex)
			.map(match => ({
				homeTeam: match.homeTeam,
				homeScore: match.homeScore,
				awayTeam: match.awayTeam,
				awayScore: match.awayScore,
			}))
		);
	}

	startMatch (homeTeam: string, awayTeam: string) {
		if(this.matchesByHomeTeam[homeTeam] !== undefined) throw "Cannot start a match with a team currently playing";

		this.matchIndex += 1;
		const newMatch = Scoreboard.createScoreRecord(homeTeam, awayTeam, this.matchIndex);
		this.matchesByHomeTeam[homeTeam] = newMatch;
		this.matches.push(newMatch);
	}

	updateScore (homeTeam: string, homeScore: number, awayScore: number) {
		const thisMatch = this.matchesByHomeTeam[homeTeam];
		thisMatch.homeScore = homeScore;
		thisMatch.awayScore = awayScore;
	}
}