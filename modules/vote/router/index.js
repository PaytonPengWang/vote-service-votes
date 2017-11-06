import ___ from 'babel-polyfill';

import {CREATE_VOTE,DELETE_VOTE,GET_VOTE_DETAIL,GET_VOTES,UPDATE_VOTE} from '../controller';

import koaRouter      from 'koa-router';


let router = koaRouter();

router.post('/votes',CREATE_VOTE);
router.delete('/votes/:voteId',DELETE_VOTE);
router.get('/votes/:voteId',GET_VOTE_DETAIL);
router.get('/votes',GET_VOTES);
router.put('/votes/:voteId',UPDATE_VOTE);


export default router.routes();

