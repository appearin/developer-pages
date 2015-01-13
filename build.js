var Metalsmith = require('metalsmith');
var templates = require('metalsmith-templates');
var markdown = require('metalsmith-markdown');
var pkg = require("./package.json");
var highlight = require('highlight').Highlight;
var sass = require('metalsmith-sass');

function addGlobalMetaData(files, metalsmith, done) {
    var metadata = metalsmith.metadata();

    // Uses this for versioning the SDK (for now)
    metadata.version = pkg.version;
    done();
}

// Set up our metalsmith, and configure cwd
var metalsmith = new Metalsmith(__dirname);

// Set up all sources to pull from, and where to dump everything
metalsmith
    .source("./files")
    .destination("./public");

// .path is not chainable, so these need to be on separate lines
metalsmith.path("./assets")
metalsmith.path("./templates");

// Configure the build steps, these are in order of execution
metalsmith
    .use(addGlobalMetaData)
    .use(markdown({
        gfm: true,
        highlight: function (code) {
            return highlight(code);
        }
    }))
    .use(templates({
        engine: 'handlebars'
    }))
    .use(sass({
        outputStyle: "compressed",
        outputDir: "css/"
    }));

// And finally build everything
metalsmith.build(function (err) {
        if (err) throw err;
    });
