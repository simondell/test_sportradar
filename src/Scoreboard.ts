import { homedir } from "os";

interface ScoreRecord {
	homeTeam: string;
	homeScore: number;
	awayTeam: string;
	awayScore: number;
}

interface Match extends ScoreRecord {
	hasEnded: boolean;
}

export class Scoreboard {
	private matches: Match[] = [];
	private matchesByHomeTeam: {[key: string]: Match} = {};

	private static createScoreRecord (homeTeam: string, awayTeam: string): Match {
		return {
			homeTeam,
			awayTeam,
			homeScore: 0,
			awayScore: 0,
			hasEnded: false,
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
			.map(match => ({
				homeTeam: match.homeTeam,
				homeScore: match.homeScore,
				awayTeam: match.awayTeam,
				awayScore: match.awayScore,
			}))
		);
	}

	startMatch (homeTeam: string, awayTeam: string) {
		const newMatch = Scoreboard.createScoreRecord(homeTeam, awayTeam);
		this.matchesByHomeTeam[homeTeam] = newMatch;
		this.matches.push(newMatch);
	}

	updateScore (homeTeam: string, homeScore: number, awayScore: number) {
		const thisMatch = this.matchesByHomeTeam[homeTeam];
		thisMatch.homeScore = homeScore;
		thisMatch.awayScore = awayScore;
	}
}