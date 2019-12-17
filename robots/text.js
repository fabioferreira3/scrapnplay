const algorithmia = require('algorithmia');
const apiKey = require('../credentials/algorithmia.json').apiKey;
const sentenceBoundaryDetection = require('sbd');

async function robot(content) {
    await fetchContentFromWikipedia(content);
    sanitizeContent(content);
    breakContentIntoSentences(content);

    async function fetchContentFromWikipedia() {
        const algorithmiaAutenticated = algorithmia(apiKey);
        const wikipediaAlgorithm = algorithmiaAutenticated.algo('web/WikipediaParser/0.1.2');
        console.log('Please wait, fetching data from wikipedia...');
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm);
        const wikipediaContent = wikipediaResponse.get();

        content.sourceContentOriginal = wikipediaContent.content;
    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal);
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown);

        content.sourceContentSanitized = withoutDatesInParentheses;

        function removeBlankLinesAndMarkdown(text) {
            const allLines = text.split('\n');

            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                return !(line.trim().length === 0 || line.trim().startsWith('='));
            });

            return withoutBlankLinesAndMarkdown.join(' ')
        }

        function removeDatesInParentheses(text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ');
        }

    }

    function breakContentIntoSentences(content) {
        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized);
        sentences.forEach((sentence) => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            });
        })
    }
}

module.exports = robot;