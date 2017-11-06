import uuid from 'uuid';
import _ from 'lodash';
import voteModel from '../model/vote.model';


/* V_0500 */
export default async (ctx,next) => {

  const {status,voter,populate} = ctx.request.query;
  const {openId}  = ctx.state.user;
  const filterOptions = {};

  // filter by status
  if(status && [0,1].indexOf(status)){
    filterOptions.status = status;
  }

  // filter by voters
  let findObj = voteModel.find(filterOptions);

  // filter by populate
  if(populate && populate === 'items'){
    findObj = findObj.populate('items');
  }

  const votesDoc = await findObj.lean().exec();

  if(voter){
    for(let i=0;i<votesDoc.length;i++){
      let voteDoc = votesDoc[i];
      if(voteDoc.voters && voteDoc.voters.indexOf(openId) != -1){
        voteDoc.voteStatus  = 'Y';
      }else{
        voteDoc.voteStatus  = 'N';
      }
      votesDoc[i] = voteDoc;
    }
  }

  ctx.response.body = votesDoc;

}
