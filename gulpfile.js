const { src, dest, parallel, watch, task } = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
const cssClean = require('gulp-clean-css');
const htmlMin = require('gulp-htmlmin');
/**
 *  -- Top level gulp function --
 *        task  - define tasks
 *        src    - point to files to use
 *        dest   - points to folder to output
 *        watch   - watch files and folders for changes 
 */

// Optimize html
function html() {
    return src('src/*.html')
        .pipe(changed('build'))
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest('build'))
}
// copy xml
function xml() {
    return src('src/*.xml')
        .pipe(changed('build'))
        .pipe(dest('build'));
}

// Optimize images
function img() {
    return src('src/img/**')
        .pipe(changed('build/img'))
        .pipe(imagemin())
        .pipe(dest('build/img'));
}

// Compile & Optimize sass to regular css
function css() {
    return src('./src/sass/main.scss')
        .pipe(changed('./build/css'))
        // Compile SASS files
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        // Minify the file
        .pipe(cssClean())
        // Output
        .pipe(dest('./build/css'))
}
// compile sass to regular css without minifying it
function scss() {
    return src('./src/sass/main.scss')
        .pipe(changed('src/css'))
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(dest('src/css'));
}

// Optimize js
function js() {
    return src('src/js/*.js')
        .pipe(changed('build/js'))
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.js'
            },
            noSource: true
        }))
        .pipe(dest('build/js'));
}
// exports.html = html;
// exports.img = img;
// exports.js = js;
// exports.scss = scss;
// exports.css = css;
// exports.xml = xml;
// exports.default = parallel(html, img, js, scss, css, xml);
task('html', html);
task('img', img);
task('scss', scss);
task('css', css);
task('xml', xml);
task('scripts', js);
task('parallel', parallel(html, img, js, scss, css, xml));
const watcher = watch(['src/sass/*.scss', 'src/js/*.js', 'src/*.html', 'src/*.xml', 'src/img/**']);
task('watch', function() {
    watcher.on('change', parallel(html, img, js, scss, css, xml));
    // watch('./src/*.html', ['html']);
    // watch('./src/*.xml', ['xml']);
    // watch('./src/js/*.js', ['scripts']);
    // watch('./src/sass/*.scss', ['scss', 'css']);
    // watch('./src/img/*.jpg', ['img']);
});
// watcher.close();