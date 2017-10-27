#!/usr/bin/env node

const fs = require('fs');
const childProcess = require('child_process');

// Get Git commit message
const commitEnv = process.env.GIT_PARAMS;
const commit = fs.readFileSync(commitEnv, { encoding: 'utf-8' });

// Removes the type of the branch, e.g. feature/RN-345-branch-name
const removeBranchType = (branch) => {
  if (branch.indexOf('/') > 0) {
    return branch.split('/')[1];
  }
  return branch;
};

// Checks that the commit is not a Merge commit
const startsWithMerge = str => str.indexOf('Merge') === 0;

// Returns the Jira tag, e.g. RN-345 or REG-2, if present, else null
const getJiraTag = (str) => {
  const tag = str.match(/([A-Z]{1,4}-[0-9]{1,5})+/i);
  if (tag) {
    return tag[0];
  }
  return null;
};

// Don't add Jira TAG if commits message already has one or starts with 'Merge...'
if (!startsWithMerge(commit) && !getJiraTag(commit)) {
  // Gets the current branch name
  const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' });
  // Removes the branch type from the branch name and gets the TAG
  const JiraTag = getJiraTag(removeBranchType(branch));
  if (JiraTag) {
    // Adds the Jira TAG and rewrites
    fs.writeFileSync(commitEnv, `${JiraTag.toUpperCase()} ${commit}`, { encoding: 'utf-8' });
  }
}
