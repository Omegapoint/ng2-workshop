var gulp = require('gulp');
var sass = require('gulp-sass');
var sassJspm = require('sass-jspm-importer');
var rename = require('gulp-rename');

gulp.task('build-index', function () {
    return gulp.src('index-stage.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('build'));

});

gulp.task('add-reflect', function () {
    return gulp.src(['node_modules/reflect-metadata/Reflect.js', 'node_modules/reflect-metadata/Reflect.js.map'])
        .pipe(gulp.dest('build'));
});

gulp.task('build-fonts', function () {
    return gulp.src('app/assets/fonts/*.*')
        .pipe(gulp.dest('build/app/assets/fonts'));
});

gulp.task('build-images', function () {
    return gulp.src('app/assets/images/*.*')
        .pipe(gulp.dest('build/app/assets/images'));
});

gulp.task('build-assets', ['add-reflect', 'build-index', 'build-fonts', 'build-images'], function() {
    return gulp.src(['app/styles/main.scss'])
        .pipe(sass({
            errLogToConsole: true,
            functions: sassJspm.resolve_function('/app/jspm_packages/'),
            importer: sassJspm.importer
        }))
        .pipe(gulp.dest('build/css'));
});


var fs = require('fs');
var gutil = require('gulp-util');
var es = require("event-stream");
var logger = require('gulp-logger');

function string_src(filename, string) {
    var src = require('stream').Readable({ objectMode: true });
    src._read = function () {
        this.push(new gutil.File({
            cwd: "",
            base: "",
            path: filename,
            contents: new Buffer(string)
        }));
        this.push(null);
    };
    return src;
}

function start() {
    //create a new event stream so this function can be used in a gulp pipe
    return es.map(function(data, callback) {
        return callback(null, data);
    });
}
/**
 * This task reads the jspm configuration file used in normal dev mode, with mappings to all github and npm dependencies.
 * Then the typescriptOptions section is located, and replaced by the definition below.
 * The typescript options used by PhantomJS are not the same as the ones used in development mode,
 * and we cannot use tsconfig.json when running with the karma test runner.
 * When the typescriptOptions sections has been replaced, a new file is created in the test directory, which we
 * refer to in karma.conf.js
 */
gulp.task('prepare-test', function () {
    var typescriptOptions = {
        "module": "system",
        "target": "es5",
        "declaration": false,
        "removeComments": true,
        "noLib": false,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "sourceMap": true,
        "pretty": true,
        "allowUnreachableCode": false,
        "allowUnusedLabels": false,
        "noImplicitAny": true,
        "noImplicitReturns": true,
        "noImplicitUseStrict": false,
        "noFallthroughCasesInSwitch": true
    };

    var fileContent = fs.readFileSync('jspm.config.js', 'utf8');
    var rows = fileContent.split("\n");
    var newRows = [];
    var i;
    for (i = 0; i < rows.length; i++) {
        //we found the typescriptOptions, now add all the new options to the array
        if (rows[i].trim() === 'typescriptOptions: {') {
            newRows.push(rows[i]);
            for (var property in typescriptOptions) {
                if (typescriptOptions.hasOwnProperty(property)) {
                    //add booleans as booleans and strings as strings
                    if (typeof typescriptOptions[property] === 'boolean') {
                        newRows.push('\t\"' + property + '\": ' + typescriptOptions[property] + ',');
                    } else {
                        newRows.push('\t\"' + property + '\": ' + '\"' + typescriptOptions[property] + '\",');
                    }
                }
            }
            newRows[newRows.length-1] = newRows[newRows.length-1].replace(',', '');
            var j;
            for (j=i+1; j < rows.length; j++) {
                if (rows[j].trim() === '},') {
                    i = j;
                    newRows.push(rows[j]);
                    break;
                }
            }

        } else {
            newRows.push(rows[i]);
        }
    }

    var newContent = newRows.join('\n');

    return start()
        .pipe(string_src('jspm.karma.config.js', newContent))
        .pipe(logger({
            before: 'File jspm.karma.config.js created',
            after: 'File moved to test/',
            showChange: false
        }))
        .pipe(gulp.dest('test/'));
});

var Server = require('karma').Server,
    gulp = require('gulp'),
    path = require('path');

/**
 * First run the prepare task which creates the jspm.karma.config.js file,
 * then run karma.
 */
gulp.task('test', ['prepare-test'], function (done) {
    //var filePath = path.join(__dirname, '../', 'karma.conf.js');

    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});