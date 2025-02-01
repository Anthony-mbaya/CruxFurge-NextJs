# Authentication using Auth.js || Nextauth
*auth.js site -> installation
    >> follow steps
*auth.js site -> Authentication -> OAuth
    >> For guidance -> select github > connections > providers - Github Provider > creating oath app
*Github > settings > developer settings > OAuth Apps > create
    >> at the Authorization callback url - connections > providers > github > callback url
    >> at the calllback replace example
*env
    >> copy client ID  at > .env.local file AUTH_GITHUB_ID
    >> Generate client secrest > .env.local file AUTH_GITHUB_SECRET
*Final
    >>at tthe github provider configuration copy auth.ts and replace with current