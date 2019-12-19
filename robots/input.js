const readline = require('readline-sync');
const state = require('./state.js');

function robot() {
    const content = {
        maximumSentences: 7
    };
    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();
    content.lang = askAndReturnLanguage();
    content.sentences = [];
    state.save(content);

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
}

module.exports = robot;
