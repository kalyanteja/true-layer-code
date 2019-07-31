#!/usr/bin/env node
const rest = require('restler');
const async = require('async');
const { handleHTMLData } = require('./HtmlToNodeHandler.js');
const args = require('yargs').argv;

const HACKER_RANK_BASE_URL = 'https://news.ycombinator.com/news';

let areInputsInvalid = true;
const postsValue = args.posts;
let message;

// input argument validations
if (postsValue == null || postsValue === "" || postsValue === true){
    message = "Please enter a no. of posts you'd want to see, eg. --posts 22"
} else if (typeof postsValue != 'number'){
    message = "Please enter a legit value for posts (it should be a number)"
} else if (postsValue > 100 || postsValue < 0){
    message = "Number of posts must be positive number not more than 100!"
} else {
    areInputsInvalid = false;
}

if (areInputsInvalid){
    console.log(message);
    console.log("Please try again...");
}else{
    console.log('fetching Hacker News for you...')
    const PAGE_SIZE = 30;
    const totalPages = Math.ceil(postsValue / PAGE_SIZE);
    const HN_STORIES = [];
    // no of pages required to fetch data from based on posts count input by user
    const parameterArray = Array.from({length: totalPages}, (v, i) => i + 1);
    async.eachLimit(parameterArray, totalPages, function(param, noop) {
        const url = `${HACKER_RANK_BASE_URL}?p=${param}`;
        rest.get(url).on('complete', (data) => {
            const processedData = handleHTMLData(data);
            HN_STORIES.push(...processedData);
            noop(null);
        });
    }, function(err) {
        // done with all page calls
        // sort by rank and display the exact count out of the last page
        HN_STORIES.sort(function (a, b) {
            return a.rank - b.rank;
            });

        const OUTPUT = HN_STORIES.slice(0, postsValue);

        console.log(OUTPUT);
    });
}