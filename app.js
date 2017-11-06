import koa                      from 'koa';
import koaValidate              from 'koa-validate';
import koaBody                  from 'koa-body';
import path                     from 'path';
import _                        from 'lodash';
import restc					from 'restc';
import cors						from '@koa/cors'
import jwt						from 'koa-jwt';
import config 					from './config';

import {REST_FORM_MIDDLEWARE,LOGGER_MIDDLEWARE,ERROR_HANDLER_500,ERROR_HANDLER_404,ERROR_HANDLER_VALIDATOR} from './middleware';

import CONFIG from './config';

import modules from './modules';

var app = new koa();
koaValidate(app);
app.use(cors());
app.use(koaBody());
app.use(restc.koa2());
/* form不支持put请求，使用post，加上隐藏字段的方式提交 */
app.use(REST_FORM_MIDDLEWARE);

/* 日志处理 */
app.use(LOGGER_MIDDLEWARE);

/* 错误处理 500 */
app.use(ERROR_HANDLER_500);

app.use(jwt({ secret: config.project.secret}));

/* modules */
for(let module of modules){
    app.use(module);
}

/* 404错误处理 */
app.use(ERROR_HANDLER_404);


/* validator错误处理 */
app.use(ERROR_HANDLER_VALIDATOR);

export default app;
