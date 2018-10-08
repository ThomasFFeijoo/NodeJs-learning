console.log('Before');
getUser(1, (user) => {
    //console.log('User', user);
    getRepositories(user.gitHubUsername, (repositories) => {
        getCommits(repositories, (commits) => {
            // CALLBACK HELL
        })
    })
});


console.log('After');

// ways of dealing with async
// Callbacks
// Promises
// async/await

//callback will be called when the result is ready
function getUser(id, callback) {
    setTimeout(() => { //simulating an db connection
        console.log("reading an user from a database");
        callback({id: id, gitHubUsername: 'thomas'});
    },2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3'])
    },2000);
}