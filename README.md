# Jira Key To Commit Message
Adds the current branch Jira key to your commits message.

### How it works
* The script adds the Jira KEY for your current branch (if there is one) to your commit message:   
`:~/path (RN-666-husky-add-Jira-Key)$ git commit -m "this is an awesome commit message"`   
results in:   
`[RN-666-husky-add-Jira-KEY b1393246b] RN-666 this is an awesome commit message`
* If the branch has a type, only the KEY will be added to the commit message:   
`:~/path (feature/RN-666-husky-add-Jira-Key)$ git commit -m "this is an awesome commit message"`   
results in:   
`[feature/RN-666-husky-add-Jira-Key b1393246b] RN-666 this is an awesome commit message`
* If the commit message starts with another Jira KEY it will not be changed:
`:~/path (RN-666-husky-add-Jira-Key)$ git commit -m "RN-000 this is an awesome commit message"`   
results in:   
`[RN-666-husky-add-Jira-Key b1393246b] RN-000 this is an awesome commit message`
* If the commit message starts with `Merge` the Jira KEY will not be added:
`:~/path (RN-666-husky-add-Jira-Key)$ git commit -m "Merge branch ..."`   
results in:   
`[RN-666-husky-add-Jira-Key b1393246b] Merge branch ...`
* If the branch has no Jira KEY the commit message will not be changed:
`:~/path (husky-add-Jira-Key)$ git commit -m "this is an awesome commit message"`   
results in:   
`[husky-add-Jira-KEY b1393246b] this is an awesome commit message`

### Dependencies
* Node
* [Husky](https://github.com/typicode/husky) (For Git hooks)

### Setup
* Copy `addJiraKeyToCommitMessage.js` file into your chosen directory in your project
* Add Husky to the project   
`npm install husky --save-dev`   
or   
`yarn add husky --dev`   
* Add pre commit hook to your `package.json`:
```javascript
"scripts": {
    "commitmsg": "node addJiraKeyToCommitMessage.js",
    ...
},
```
* The script will run automatically when you commit your changes
