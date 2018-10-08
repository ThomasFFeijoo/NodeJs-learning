console.log('Before');

getUser(1, getRepositories);

console.log('After');

function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
    getCommits(repositories, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}



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