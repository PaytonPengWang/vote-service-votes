const REST_FORM_MIDDLEWARE =  async function (ctx,next){
    var method = ctx.request.query._method;
    if(method){
        ctx.method = method.toUpperCase();
    }
    await next();
}

export {REST_FORM_MIDDLEWARE};