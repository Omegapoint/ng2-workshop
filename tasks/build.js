var Builder = require('jspm').Builder;
var builder = new Builder();

console.log("Starting application build...");
builder.buildStatic("app", "build/build.js", { rollup: true })
    .then(function() {
        console.log('Build complete');
    })
    .catch(function(err) {
        console.log(err);
    });
