import {mongoose,db} from '../../../utils/db.utils';
import _ from 'lodash';

const {ObjectId} = mongoose.Schema.Types;

const voteItemSchema = new mongoose.Schema({
  // Vote Item 描述
  vote : {
    type : ObjectId,
    ref : 'vote'
  },
  description : {
    type : String,
    required : true
  },
  voters : [{
    type : ObjectId,
    ref : 'voter'
  }]
});


const voteItemModel =db.model('voteItem',voteItemSchema);

export default voteItemModel;
