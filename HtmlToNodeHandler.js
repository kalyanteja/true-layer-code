const htmlParser = require('node-html-parser');
const { isValidUri, extractNumber, limitTo256Chars } = require('./Utils.js');

module.exports.handleHTMLData = (htmlText) => {
    const htmlRoot = htmlParser.parse(htmlText);
    // node-html-parser doesn't behave same way as gen query selector, hence seperately done
    // count of content and score nodes should be same, if not there's something wrong in the website and things are missing...
    const contentNodes = htmlRoot.querySelectorAll("tr.athing");
    const scoreNodes = htmlRoot.querySelectorAll("td.subtext");

    if (contentNodes.length !== scoreNodes.length) {
        throw 'missing comments and scores in the website';
    }

    hn_stories = [];

    contentNodes.forEach((node, index) => {
        hn_stories.push({
            ...fetchRankTitleAndLink(node),
            ...fetchAuthorAndScores(scoreNodes[index])
        });
    });

    return hn_stories;
}

fetchRankTitleAndLink = (titleNode) => {
    const rawRank = titleNode.querySelector('.rank').text;
    const rank = extractNumber(rawRank);
    let uri = titleNode.querySelector('.storylink').attributes.href;
    uri = isValidUri(uri) ? uri : "---NA---";
    const title = limitTo256Chars(titleNode.querySelector('.storylink').text);

    return {
        rank,
        title,
        uri
    };
}

fetchAuthorAndScores = (titleNode) => {
    const scoreNode = titleNode.querySelector('.score')
    const points = extractNumber(scoreNode ? scoreNode.text : '');
    const authorNode = titleNode.querySelector('.hnuser');
    const author = authorNode ? limitTo256Chars(authorNode.text) : '';
    const anchorNodes = titleNode.querySelectorAll('a');
    const comments = extractNumber(anchorNodes[anchorNodes.length - 1].text);

    return {
        points,
        author,
        comments
    };
}