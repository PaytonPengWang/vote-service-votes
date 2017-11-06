const ERROR_HANDLER_500 = async function (ctx,next){
    try{
        await next();
    }catch(err){
        ctx.response.status = err.status || 500;
        ctx.response.body = {
            errorMsg : err.message,
            errorCode : err.errorCode,
            fieldMsgs : err.fieldMsgs
        }
        //ctx.response.statusString = err.message;
        //ctx.response.body = err.message;
    }
};

const ERROR_HANDLER_404 = async function (ctx,next){
    let status;
    let error;
    try{
        await next();
        status = ctx.status;
    }catch(err){
        status = err.status;
        error = err;
    }
    
    if(status==404){
        ctx.throw(404,'resource not fould');
    }else if(error){
        throw error;
    }
};

const ERROR_HANDLER_VALIDATOR = async function (ctx,next){
    if(ctx.errors){
        ctx.throw(500,'field validate failed',{
            errorCode : 'C_0000_002',
            fieldMsgs : ctx.errors
        })
    }
    await next();
};

export {ERROR_HANDLER_500,ERROR_HANDLER_404,ERROR_HANDLER_VALIDATOR};