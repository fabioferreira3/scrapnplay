const readline = require('readline-sync');
const robots = {
    text: require('./robots/text.js')
};

async function start() {
    const content = {
        maximumSentences: 7
    };
    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();
    content.lang = askAndReturnLanguage();
    content.sentences = [];

    await robots.text(content);

    function askAndReturnSearchTerm()  {
        return readline.question('Type a search term:')
    }

    function askAndReturnPrefix() {
        const prefixes = ['Who is', 'What is', 'The history of'];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option:');

        return prefixes[selectedPrefixIndex];
    }

    function askAndReturnLanguage() {
        const prefixes = ['en', 'pt'];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option:');

        return prefixes[selectedPrefixIndex];
    }

    console.log(JSON.stringify(content, null, 4));

};

start();