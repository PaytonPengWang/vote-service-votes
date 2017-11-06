import _ from 'lodash'

const LOGGER_MIDDLEWARE = async function (ctx,next){
    var startTime = _.now();
    await next();
    var endTime = _.now();
    var processTime = endTime - startTime;
    console.log(ctx.method + " "+ctx.originalUrl+" "+processTime+"ms "+ctx.status);
};

export {LOGGER_MIDDLEWARE};