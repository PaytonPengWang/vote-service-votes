import uuid from 'uuid';
import _ from 'lodash';
import voteModel from '../model/vote.model'

/* V_0500 */
export default async (ctx,next) => {
    ctx.checkParams('voteId').notEmpty();

    const {populate,voter} = ctx.request.query;

    if(ctx.errors){
        return await next();
    }

    let vote = await voteModel.findById(ctx.params.voteId).populate('items');

    if(populate && populate === 'items.voters'){
      vote = await voteModel.populate(vote,[{path:"items.voters",model : "voter"}]);
    }





    ctx.response.body = vote;
    await next();

}
