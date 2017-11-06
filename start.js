import app from './app';
import CONFIG from './config';

app.listen(CONFIG.project.port,() => {
    console.info('koa starting linten with :' + CONFIG.project.port);
});



