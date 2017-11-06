import {mongoose,db} from '../../../utils/db.utils';
import _ from 'lodash';

const {ObjectId} = mongoose.Schema.Types;

const voterSchema = new mongoose.Schema({
  openId : {
    type : String,
    required : true
  },
  vote : {
    type : ObjectId,
    ref : 'vote'
  },
  voteItem : {
    type : ObjectId,
    ref : 'voteItem'
  },
  voterInfo : {
    openId : String,
    staffId : String,
    staffIdHT : String,
    cName : String,
    eName : String,
    jobTitle : String
  }
});


const voterModel =db.model('voter',voterSchema);

export default voterModel;