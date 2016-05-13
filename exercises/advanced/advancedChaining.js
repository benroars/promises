 /**
 * Your task is to write a function that uses a deep learning
 * algorithm to determine the common set of tags between
 * multiple github profile pictures
 * 
 * Given an array of github handles, searchCommonTagsFromGitHubProfiles should:
 *   1) get the public profile associated with each handle
 *   2) extract the avatar_url of each profile
 *   4) get the set of tags for each avatar_url (requires authentication)
 *   5) find the intersection of the tags
 * 
 * Much of the heavy lifting has been done already in `lib/advancedChainingHelpers`,
 * you just have to wire everything up together! Once you pass this one, you'll
 * be a promise chaining master! Have fun!
 */

var Promise = require('bluebird');
//var lib = require('../../lib/advancedChainingLib.js');
var lib = Promise.promisifyAll(require('../../lib/advancedChainingLib.js'));
var _ = require('underscore');


// We're using Clarifai's API to recognize different an image into a list of tags
// Visit the following url to sign up for a free account
//     https://developer.clarifai.com/accounts/login/?next=/applications/
// Then, create a new Application and pass your Client Id and Client Secret into the method below
lib.setImageTaggerCredentials('P9QlUCV00tIjY1a_C97w3JBMbfS7EPHlcqpurG1A', '31anD55gW8TVIbKfTDPBM8zYq0iwgKHm-Qe8kR5Y');

var searchCommonTagsFromGitHubProfiles = function(githubHandles) {
  var files = [];
  // _.each(githubHandles, function(file) {
  //   files.push(lib.getGitHubProfile(file));
  // });

  // return Promise.all(files)
  //   .then(function(profile) {
  //     console.log('prof', profile);
  //     return [profile[0].avatarUrl, lib.authenticateImageTagger()];
  //   })
  //   .spread(function(url, token){
  //     return lib.tagImage(url, token);
  //   }).then(function(data){
  //     console.log('data', data);
  //     return lib.getIntersection([data]);
  //   })

  _.each(githubHandles, function(file) {
    files.push(lib.getGitHubProfile(file)
      .then(function(profile) {
        console.log('prof', profile);
        return [profile.avatarUrl, lib.authenticateImageTagger()];
      })
      .spread(function(url, token){
        return lib.tagImage(url, token);
      })
      // .then(function(data){
      //    console.log('firstdata', data);
      //    return lib.getIntersection([data]);
      // })
    );
  });

  return Promise.all(files)
    .then(function(data){
      console.log('data', data);
      return lib.getIntersection(data);
    });
    
};

// Export these functions so we can unit test them
module.exports = {
  searchCommonTagsFromGitHubProfiles: searchCommonTagsFromGitHubProfiles
};
