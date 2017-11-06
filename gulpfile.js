var gulp = require('gulp'),
    gulptools = require('./gulptools'),
    template = require('gulp-template');
/* All need copy files and task name */
var copyTasks = [{
    name : 'copyApp',
    source : './app.js',
    dist : 'dist',
    fileType : 'js'
},{
    name : 'copyStart',
    source : './start.js',
    dist : 'dist',
    fileType : 'js'
},{
    name : 'copyModules',
    source : './modules/**/*',
    dist : './dist/modules',
    fileType : 'js'
},{
    name : 'copyConfig',
    source : './config/**/*',
    dist : './dist/config',
    fileType : 'js'
},{
    name : 'copyUtils',
    source : './utils/**/*',
    dist : './dist/utils',
    fileType : 'js'
},{
    name : 'copyMiddleware',
    source : './middleware/**/*',
    dist : './dist/middleware',
    fileType : 'js'
},{
    name : 'copyPackage',
    source : './package.json',
    dist : './dist',
    fileType : 'json'
}];

/* All copy task name, need push to the array */
var copyTasksName = [];
/* Parse copy tasks */
for(var i=0; i < copyTasks.length; i++){
    var copyTask = copyTasks[i];
    /* Push the task name to copyTaskName */
    copyTasksName.push(copyTask.name);
    /* Create copy tasks */
    gulp.task(copyTask.name,gulptools.copyFile(copyTask.source,copyTask.dist,copyTask.fileType));
}

/* Create copy task */
gulp.task('copy',copyTasksName);
gulp.task('watch',function(){
    gulp.watch('./modules/**/*',['copy']);
})

/* Create default task */
gulp.task('default',['copy']);
