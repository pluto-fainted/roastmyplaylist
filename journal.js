## What happened today

so the fake roast flow was fully working yesterday. Today was supposed to be the day the real AI connects.

Got the Claude API key, set up the api/roast.js serverless function on vercel, wired everything up in script.js.AI

Clicked Roast Button, Nothing happened.

## The bugs I fixed

spent a long time debugging. Here's everything that was wrong in api/roast.js alone:

- Access-Control_Allow instead of Access-Control-Allow (underscore instead of hyphen, took forever to spot)
- basic typo errors like req.setHeader instead of res.setHeader
- Missed spaces at some places like returnres instead of return res.
- Minor mistake but a huge pain finding them.

fixed all of them one by one. App got to 500 error which I guess means progress - function exists but something inside is falling.

## The real problem

When I thought everything was done and now the MVP is ready, turns out the Claude API needs a minimum $5 credit top up to work. I don't have 5$ right now so the whole thing hit a wall.

Checked the vercel logs and saw this:

"Your credit balance is too low to access the Anthropic API"

## The fix

I researched about it and got to know Groq is completely free, runs llama3 which will roast just as hard as Claude 😭.

## What I learned

- CORS is why browsers block direct API calls from frontend code
- Serverless functions act as a middleman to hide your API key and bypass CORS
- Vercel logs are actually useful for debugging - showed me exactly what was failing.
- Always check your API account has credits before spending 3 hrs debugging.

## Whats next

Set up Groq free API tomorrow, swap it in, finally see a real roast generate live..