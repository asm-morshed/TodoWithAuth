if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');
}
else {
    module.exports = require('./keys_dev');

}

// module.exports = {
//     dbUrl: 'mongodb://asmmorshed:asmmorshed5@ds119150.mlab.com:19150/todoauth',
//     secretKey: 'asmmorshedlksjdklfjskaldfjl'
// }