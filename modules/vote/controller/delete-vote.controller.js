import voteModel from '../model/vote.model';

export default async (ctx,next) => {
    ctx.checkParams('voteId').notEmpty();
    
    if(ctx.errors){
        return await next();
    }
	
	let voteDoc = await voteModel.findById(ctx.params.voteId);
    await voteDoc.remove();
    ctx.body = {
        message : "resource deleted"
    }
}