import voteModel from '../model/vote.model';
import voteItemModel from '../model/vote-item.model';
import voterModel from '../model/voter.model';
import _ from 'lodash';
import mongoose from 'mongoose';

// update information
const DEFAULT = async (ctx,next) => {
	ctx.checkParams('voteId').notEmpty();
    ctx.checkBody('items').optional().len(2,'至少有两项item存在');

    if(ctx.errors){
        return await next();
    }



	// update the vote
	const body = ctx.request.body;
	const voteId = ctx.params.voteId;
	if(body.items){
		// -> the body have items
		// -> find the vote
		let voteDoc = await voteModel.findById(voteId);

		// -> compare vote items
		const newItems = [];
		let oldItems = voteDoc.items;
		for(let item of body.items){
			if(typeof(item) === 'string'){
				let voteItem = await voteItemModel.create({
					description : item,
					vote : voteDoc._id
				});
				newItems.push(voteItem._id);
			}else{
				await voteItemModel.update({_id:item._id},{$set:{
					description : item.description,
					vote : voteDoc._id
				}})
				newItems.push(mongoose.Types.ObjectId(item._id));
			}
		}

		for(let item of oldItems){
			if(item && (!_.find(newItems,mongoose.Types.ObjectId(item)))){
				let voteItemDoc = await voteItemModel.findById(item);
				if(voteItemDoc){
					await voteItemDoc.remove();
				}
			}
		}


		// -> update vote items
		body.items = newItems;

	}


	await voteModel.update({_id:voteId},{$set : body})



    ctx.response.body = {
        message : "resource updated"
    }
}

// voter
const VOTE = async (ctx,next) => {

	ctx.response.body = {
      message : "resource updated"
  }



	const {voteId} = ctx.params;
	const {items} = ctx.request.body;

	const userInformation = ctx.state.user;
	const {openId} = userInformation;

	setTimeout(async () => {
		// 更新items
		if(typeof(items) === "string"){
			let _items = [];
			_items.push(items);
			items = _items;
		}

		// 删除该用户对该vote的投票，重新创建
		await voterModel.remove({openId:openId,vote:voteId});

		// 创建voters
		for(let item of items){
			// 创建voter
			let voterDoc = await voterModel.create({
				openId : openId,
				vote : voteId,
				voteItem : item,
				voterInfo : userInformation
			});

		}


		// 更新voteItemsVoters
		const voteItems = await voteItemModel.find({vote:voteId});
		for(let voteItem of voteItems){
			let itemVoters = await voterModel.find({voteItem : voteItem._id},['_id']).exec();
			let itemVoterIds = [];
			for(var itemVoter of itemVoters){
				itemVoterIds.push(itemVoter._id);
			}
			voteItem.voters = itemVoterIds;
			await voteItem.save();
		}


		// 更新vote信息
		let voteDoc = await voteModel.findById(voteId);

		if(voteDoc.voters.indexOf(openId) === -1){
			voteDoc.voters.push(openId);
		}

		await voteDoc.save();
	},1)

	await next();



}

// release vote
const RELEASE = async (ctx,next) => {
	const {voteId} = ctx.params;
	const {status} = ctx.request.body;
	await voteModel.update({_id:voteId},{$set:{status:status}});
	ctx.response.body = {
        message : "resource updated"
    }
}

const ACTIONS = {
  "VOTE" : VOTE,
	"RELEASE" : RELEASE,
	"DEFAULT" : DEFAULT
}


export default async (ctx,next) => {
	let {actionId} = ctx.request.body;
	if(!actionId){
		actionId = "DEFAULT"
	}
    if(ACTIONS[actionId]){
        await ACTIONS[actionId](ctx,next);
    }else{
        ctx.throw(404);
    }

}
