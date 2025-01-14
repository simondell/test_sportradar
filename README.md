# Simon Dell's Sportradar Coding Challenge solution

## The challenge

Sportradar would like me to code a "socreboard library". The complete notes are in [./docs/Sportradar\ Coding\ Exercise\ 2024.pdf]().

## Analysis

Some observations on the problem domain:

- we're talking about football/soccer
- the score board is for the world cup, so there's probably only one of them at a time, in a given application
- two sides
- one home, one away side
- sides have arbitrary names
- scores are positive integers starting at 0
- scores for new matches start at 0 - 0
- scores only go up
- only tracking scores, not team members, colour cards etc
- teams, both home and away, can only play one match at a time
- matches have a venue - the "home" team's grounds
- we're not tracking the venue
- because grounds have one team, and teams can only play one match at a time, the home team name can be used to identify the match
- because teams can only play one match at a time, a new score record that includes teams currently playing _other_ teams, is invalid
- matches have starts and ends
- ended matches don't show in the scores

## Decisions

- TypeScript - As a front-end engineer JavaScript is my core language, with TypeScript my preferred way to write it
- Mocha - the challenge asked to display a TDD approach, and I wanted to use the most minimal/lightweight but not esoteric tools (e.g. [Tape](https://www.npmjs.com/package/tape) is similarly light and I like it's "no globals" API, but it's less popular)
- Chai - for assertions. Just habit. 
- [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) - to keep me neat and tidy
- the Scoreboard will be resposible for maintaining its own list of matches, without relying on another module for this purpose. This enables the Scoreboard to be more portable. 
- in support of the above, the Scoreboard's API will be put together in such a way that consumers/users don't need to know how the Scoreboard represents teams, matches, scores etc
- I'll [write tickets](https://github.com/simondell/test_sportradar/issues); then commits and PRs will be linked to tickets.
- tickets will use `"AS A, I WANT, SO THAT"`` format user stories
- in tickets, the `AS A` clauses can have these personas
	- `user` refers to a user of the library (likely another engineer because this is a library, but we could imagine it as an end-user assembling a dashboard with a no-code interface too)
	- `developer` the developer working on the project (me; these are tickets to add DX)
- initially I felt "matches" could be modelled as a class. They're discrete data, and `new Match(homeTeam, awayTeam)` felt like a nice interface for them. 
- later, having both an interface `TMatch` with just the scores, and a class `Match` with the other settings seemed to highlight how the Match class was poorly factored. Matches aren't used outside of the Scoreboard. Nothing else consumes them. Some of their concerns (`hasEnded`, `totalScore`) are only relevant to the internal workings of Scoreboard. So, instead, I think better to have a private static method to create them and to lose the class.
- ordering matches for display could be implemented by a callback passed to Array.prototye.sort(). This makes the sort rules unit-testable.
- in order to order the Matches, the Match models needed an index. I could have used the original match array and **not** done an in-place sort with `Array.prototype.sort()` to get the output results, but I'm comfortable with this solution. It allows the sort rules to sit together in one function. I was able to unit test that function, with a "casual" integration test in the main class' test suite. 


