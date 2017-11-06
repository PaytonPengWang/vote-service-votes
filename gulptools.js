var gulp = require('gulp');
var template = require('gulp-template');
var babel = require('gulp-babel')
var constants = require('./all.constants');
console.info(constants);
module.exports = {
    /* copy file */
    copyFile : function (sourceFile,distDirectory,fileType) {
        return function(){
            var temp = gulp.src(sourceFile);
            if(fileType != null){
                /*temp = temp.pipe(template(constants,{
                    interpolate: /\$\{([\s\S]+?)\}/g
                }));*/
            }
            if(fileType == 'js'){
                temp = temp.pipe(babel());
            }
            temp = temp.pipe(gulp.dest(distDirectory));
            return temp;
        }
    }
}