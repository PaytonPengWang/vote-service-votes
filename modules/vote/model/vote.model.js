import {mongoose,db} from '../../../utils/db.utils';
import _ from 'lodash';

const {ObjectId} = mongoose.Schema.Types;

const voteSchema = new mongoose.Schema({
  // Vote 标题
  title : {
    type : String,
    required : true,
  },
  // Vote 描述
  description : String,
  // Vote 类型， 0 单选， 1 多选
  type : {
    type : Number,
    required : true,
    default : 0
  },
  // Vote 状态， 0 未发布，1 已发布，100 已删除
  status : {
    type : Number,
    required : true,
    default : 0
  },
  // Vote Items
  items : [{
    type : ObjectId,
    ref : 'voteItem'
  }],
  voters : [String],
  // 创建人
  createBy : {
    type : String
  },
  // 创建时间
  createTime : {
    type : Number,
    required : true,
    default : _.now()
  },
  endTime : {
    type : Number
  }
});


const voteModel =db.model('vote',voteSchema);

export default voteModel;
