# QA Archax CryptoE2E Web Automation

Welcome to QA Archax Automation.

## Folder Structure

- e2e - contains UI and API Functional test cases

- integration - contains websocket test cases

- plugins - deals with operations outside the application under tests (i.e, faker, cypress-mochawesome-reporter)

- support - contains the custom commands and function libraries to support the automation

## Installation

- from the command(windows)/shell(linux), send the command "npm install". This will install all dependencies including the cypress. for references of the needed items to install are mentioned in package.json

## Requirements

As for those who wishes to use this automation, the IDE that we are using is Visual Studio Code.

- [GIT] - a free and open source distributed version control system. you need to install and configure to connect to github

- [Visual Studio] - A text editor suitable for any javascript coding
  Link : https://code.visualstudio.com/
  Installer: https://code.visualstudio.com/

++ [Extensions] - Once you have installed the VS Code, from the left navigation bar, open the extension icon (box icon) and it will show the list of the extensions. Please install the following
Beautify - This is to beautify the code
GitHub - Connects to GitHub repository
TODO Highlight - This will help you to comment the codes that are yet to be done

++ [VS Code Settings] - To change the settings on the VS Code, I would recommend to change the following settings
From File > Preferences > Settings, Navigate to Text Editor > Formatting and check the following options
_ Format on Paste - automatically formats once you paste the code copied from other scripts
_ Format on Save - automatically formats the code once you save the file

## Post-Requisite

After the cloning of this repository, please run "npm install" on windows and "sudo npm install" on linux / mac to install the dependencies.

## Running

To run the application, there are few ways to perform.

For UI view, just send the command
"npm run cy:open".
For details on the script, please check the package.json on script section.

For headless view,

Run all specs

"npm run test:headles"
