# Simon Dell's Sportradar Coding Challenge solution

## The challenge

Sportradar would like me to code a "socreboard library". The complete notes are in [./docs/Sportradar\ Coding\ Exercise\ 2024.pdf]().

## Decisions

- TypeScript - As a front-end engineer JavaScript is my core language, with TypeScript my preferred way to write it
- Mocha - the challenge asked to display a TDD approach, and I wanted to use the most minimal/lightweight but not esoteric tools (e.g. [Tape](https://www.npmjs.com/package/tape) is similarly light and I like it's "no globals" API, but it's less popular)
- Chai - for assertions. Just habit. 
- [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) - to keep me neat and tidy
- the Scoreboard will be resposible for maintaining its own list of matches, without relying on another module for this purpose. This enables the Scoreboard to be more portable. 
- in support of the above, the Scoreboard's API will be put together in such a way that consumers/users don't need to know how the Scoreboard represents teams, matches, scores etc

## Analysis

Some observations on the problem domain:

- we're talking about football/soccer
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


