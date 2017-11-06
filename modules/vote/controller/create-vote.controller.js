import _ from 'lodash';
import uuid from 'uuid';
import voteModel from '../model/vote.model';
import voteItemModel from '../model/vote-item.model';

const VOTE_ID = uuid.v4();

/*
    创建Vote
    ID: V_0100
*/
export default async (ctx, next) => {
    ctx.checkBody('title').notEmpty();
    ctx.checkBody('type').default(0).in([0, 1], '不支持的Vote类型');
    ctx.checkBody('items').len(2, '请最少填写两个items')
    const userInfo = ctx.state.user;

    if (ctx.errors) {
        return await next();
    }

    // assign default values
    const requestBody = _.assign({}, ctx.request.body, {
        endTime: _.now(),
        createBy : userInfo.openId
    });


    // Save Vote information - start
    const vote = _.transform(requestBody, (result, n, key) => {
        if (["title", "description", "type", "status", "endTime","createBy"].indexOf(key) !== -1) {
            result[key] = n;
        }
    });

    const voteDoc = await voteModel.create(vote);
    // - end

    // create items start - start
    const items = requestBody.items;
    const itemIds = [];
    for (let item of items) {
        let voteItemDoc = await voteItemModel.create({
            description: item,
            vote: voteDoc._id
        });
        itemIds.push(voteItemDoc._id);
    }
    // - end

    // update vote items - start
    await voteModel.update({
        _id: voteDoc._id
    }, {
        $set: {
            items: itemIds
        }
    });
    // end

    ctx.response.body = {
        message: "resource created"
    };

    ctx.set('Location', `/votes/${voteDoc._id}`);

    await next();
}
