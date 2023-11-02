
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter a title for your project.'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description for your project.'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter installation instructions for your project. If applicable, provide a step-by-step description of how to get the development environment running.'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter instructions and examples for use. Include screenshots as needed.'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'If you would like other developers to contribute to this project, enter contribution guidelines for how to do so.'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'If you have tests for your application, enter test instructions and provide examples on how to run them.'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address.'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username.'
    },
    {
        type: 'input',
        name: 'addlquestions',
        message: 'If applicable, enter additional instructions on how to reach you with questions.'
    },
    
    {
        type: 'rawlist',
        name: 'license',
        message: 'Choose a license for your project by selecting a number. Note: it is recommended that you save a separate LICENSE file in the root of the repository. Refer to https://choosealicense.com/ for further details.',
        choices: [
            'Apache license 2.0',
            'Creative Commons Zero v1.0 Universal',
            'Do What The F*ck You Want To Public License',
            'GNU General Public License v3.0',
            'ISC',
            'MIT',
            'The Unlicense'
        ],
        default: 'MIT'
    }
];

let promptUser = () => {
    return inquirer.prompt(questions);
}

const writeToFile = util.promisify(fs.writeFile);

let init = async () => {
    console.log("Welcome to the README.md Generator! You will be guided through a series of questions to create the best README ever! If you don't have an answer right now, you can leave it blank. At the end, you will have a README.md file for your project.");
    try {
        const answers = await promptUser();
        console.log(answers);
        const readme = generateMarkdown(answers);

        await writeToFile("README_demo.md", readme);
        console.log("Successfully created README_demo.md");

    } catch (err) {
        console.log(err);
    }
}

init();