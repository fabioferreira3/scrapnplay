const readline = require('readline-sync');
const robots = {
    text: require('./robots/text.js')
};

async function start() {
    const content = {};
    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();
    content.sourceContentOriginal = '';
    content.sourceContentSanitized = '';
    content.sentences = [
        {
            text: '',
            keywords: [],
            images: []
        }
    ];

    await robots.text(content);

    function askAndReturnSearchTerm()  {
        return readline.question('Type a search term:')
    }

    function askAndReturnPrefix() {
        const prefixes = ['Who is', 'What is', 'The history of'];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option:');

        return prefixes[selectedPrefixIndex];
    }

    console.log(content);

};

start();