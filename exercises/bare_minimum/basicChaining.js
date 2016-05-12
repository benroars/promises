/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var githubGet = require('./promisification');
var github = require('./promiseConstructor');
// promisification


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return new Promise(function (resolve, reject) {
    github.pluckFirstLineFromFileAsync(readFilePath)
      .then(githubGet.getGitHubProfileAsync)
      .then(function(json) {
        console.log('json:', json);
        return fs.writeFile(writeFilePath, JSON.stringify(json), function (error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } 
    );   
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};