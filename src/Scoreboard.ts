interface TMatch {
	homeTeam: string;
	homeScore: number;
	awayTeam: string;
	awayScore: number;
}

class Match implements TMatch {
	public homeScore: number = 0;
	public awayScore: number = 0;

	constructor (public homeTeam: string, public awayTeam: string) {}
}

export class Scoreboard {
	private matches: Match[] = [];

	getMatches (): Match[] {
		return this.matches;
	}

	startMatch (homeTeam: string, awayTeam: string) {
		this.matches.push(new Match(homeTeam, awayTeam));
	}
}