import _config from '../config';

import _Promise from 'bluebird';
import mongoose from 'mongoose';


const db = mongoose.createConnection(_config.db.url,{
	promiseLibrary : _Promise
});

// 链接错误
db.on('error', function(error) {
    console.log(error);
});

var Band = db.model('band-promises', { name: String });

db.on('open', function() {
	console.info(Band.collection.findOne().constructor == require('bluebird'));
});

export {mongoose,db};