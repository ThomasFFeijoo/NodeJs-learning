function log(req, res, next)  {
    console.log('Logging...');
    //need this one to terminate response cycle
    next();
}

module.exports = log;