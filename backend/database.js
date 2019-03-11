const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
.then(db => console.log('DB successfully connected'))
.catch(err => console.error(err));