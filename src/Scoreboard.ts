import { homedir } from "os";

interface TMatch {
	homeTeam: string;
	homeScore: number;
	awayTeam: string;
	awayScore: number;
}

class Match implements TMatch {
	public homeScore: number = 0;
	public awayScore: number = 0;
	public hasEnded = false;

	constructor (public homeTeam: string, public awayTeam: string) {}
}

export class Scoreboard {
	private matches: Match[] = [];
	private matchesByHomeTeam: {[key: string]: Match} = {};

	endMatch (homeTeam: string) {
		const thisMatch = this.matchesByHomeTeam[homeTeam];
		thisMatch.hasEnded = true;
		delete this.matchesByHomeTeam[homeTeam];
	}

	getMatches (): TMatch[] {
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
		const newMatch = new Match(homeTeam, awayTeam);
		this.matchesByHomeTeam[homeTeam] = newMatch;
		this.matches.push(newMatch);
	}

	updateScore (homeTeam: string, homeScore: number, awayScore: number) {
		const thisMatch = this.matchesByHomeTeam[homeTeam];
		thisMatch.homeScore = homeScore;
		thisMatch.awayScore = awayScore;
	}
}