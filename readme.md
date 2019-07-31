## Requirements

1. Install **Node** and **npm** from here https://nodejs.org/en/download/
2. Check no firewalls are blocking any traffic to HN

## Steps To Run the App
1. Clone the repo from: **https://github.com/kalyanteja/true-layer-code**
2. Open a cmd prompt at project root folder
3. run -> ''npm install'' (this will install all the required packages for the app)
4. run -> ''npm link'' (this is make it sort of a standalone console app)
5. Now restart console(close cmd and open again) (sometimes console acts all weird)
6. run 'HackerNews --posts `n`' (n -> no. of posts you want to see..) in cmd and wait till records appear for ROBOTS to read!

7. you can unlink by 'npm unlink' cmd


## Packages Used (npm)

1. restler - HTTP client library for node.js, simplifies a lot of things.
2. aysnc - used to asynchronous javascript api calls, in this case to handle parallel api calls made to HN when the posts count is more than 30.
3. node-html-parser - a simple HTML text parser, it converts to a tree data structure and makes parsing of html elements easier
4. yargs - to handle the inputs entered by the user
5. mocha - for unit testing