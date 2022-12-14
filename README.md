# generator-rails-react-webpack

> [Yeoman](http://yeoman.io) generator

[![NPM](https://nodei.co/npm/generator-rails-react-webpack.png?downloads=true)](https://nodei.co/npm/generator-rails-react-webpack/)

## Related project - Consider using [koa-react-isomorphic](https://github.com/hung-phan/koa-react-isomorphic)

Consider to see koa-react-isomorphic project for testing component and [Redux](https://github.com/rackt/redux) usage

## Getting Started

To install `generator-rails-react-webpack` from npm, run:

```bash
$ npm install -g generator-rails-react-webpack
```

## Up and Running

Create Ruby on Rails project with normal `rails` command, but skip gem bundling:

```bash
$ rails new app-name --skip-bundle
```

Then, initiate the generator:

```bash
$ cd app-name
$ yo rails-react-webpack
```

Answer 'Yes' to all 'Overwrite' actions. Then, update 'config/database.yml' if you use different database than 'sqlite3'.

## Application template

### Javascript modules

All javascript modules are placed in `app/frontend/javascripts` folder, which will be compiled into `app/assets/javascript/build`
folder. In addition, `app/assets/javascript/build` is appended to `.gitignore` (Webpack built bundles will be ignored and rebuilt every deployment).

Control your application assets via [webpack](http://webpack.github.io/docs/) or [sprockets](https://github.com/sstephenson/sprockets).
However, for javascript files, prefer `webpack` over `sprockets` for the reason that those will run through loaders before getting
serve at the browser.

### package.json

Manage built tools and application dependencies

### Webpack

- `config.json`: loads additional configurations into `javascript-build.js` via `config = require('./config.json');`

  ```json
    {
      "webpack": {
        "path": "./app/frontend/javascripts/",
        "test": "./__tests__/**/*-test.js",
        "build": "./app/assets/javascripts/build"
      }
    }
  ```

### Code splitting

Refer to [webpack code spliting](http://webpack.github.io/docs/code-splitting.html) for detail implementations.
Bundles are created by `require` or `require.ensure` will be automatically loaded. Additionally, all the settings in
`devlopment.config.js` and `production.config.js` for `optimizing common chunk` have been added to config files.

```javascript
  new webpack.optimize.CommonsChunkPlugin('common', 'common.js'), // development.config.js
  new webpack.optimize.CommonsChunkPlugin('common', 'common-[chunkhash].bundle.js'), // production.config.js
```

Uncomment those and add this tag `<%= webpack_bundle_tag 'common.js' %>` before your main bundle in your layout:

```
<%= webpack_bundle_tag 'common.js' %>
<%= webpack_bundle_tag 'main.js' %>
```

### Available gulp task

```bash
$ gulp clean # remove the build folder placed at 'app/assets/javascripts/build'
$ gulp build # should use this for testing only, please read Assets compile
```

## Start developing

Run these commands, and start coding

```bash
$ npm run dev
$ rails server
```

## Assets compile
```bash
$ rake assets:precompile RAILS_ENV=production
```

## Heroku deploy
Configure Heroku to use `ddollar's multi-buildpack`:

```bash
$ heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

Add the `heroku-nodejs buildpack` and `heroku-ruby buildpack` to .buildpacks:

```
$ cat .buildpacks
https://github.com/heroku/heroku-buildpack-nodejs
https://github.com/heroku/heroku-buildpack-ruby
```

## Options

Name: mongoid (for mongodb)

add `--skip-active-record` option to your `rails new app --skip-active-record` command before selecting this option.

## Task

## Enable flowtype in development
```bash
$ npm run flow:watch
$ npm run flow:stop # to terminate the server
```

## Testing
Test files are placed in the same folder with component.

```
??? home/
    home-test.js
    home.js
```

```bash
npm test # unit test
```

```bash
npm run test:converage # generate test coverage using istanbul
```

You need to add annotation to the file to enable flowtype (`// @flow`)

## Structure

```
application/
  |- app/
  |  |- apis/
  |  |  |- v1/
  |  |  |  |- base.rb
  |  |  |  |- person_api.rb
  |  |  |- base.rb
  |  |- assets/
  |  |  |- images/
  |  |  |- javascripts/
  |  |  |  |- build/
  |  |  |  |  |- page-module.bundle.js
  |  |  |  |- application.js
  |  |  |- stylesheets/
  |  |  |  |- application.css
  |  |- frontend/
  |  |  |- javascripts/
  |  |  |  |- <page-module-dependencies>/
  |  |  |  |- <page-module>.js
  |  |- controllers/
  |  |- helpers/
  |  |- mailers/
  |  |- models/
  |  |- views/
  |  |  |- application/
  |  |  |  |- index.html # default template for the application
  |  |  |- layouts/
  |  |  |  |- application.html.erb
  |- bin/
  |- config/
  |  |- initializers/
  |  |  |- *.rb
  |  |  |- webpack.rb # webpack manifest config
  |  |- webpack/
  |  |  |- config.json
  |  |  |- default.config.js
  |  |  |- development.config.js
  |  |  |- javascript-build.js
  |  |  |- production.config.js
  |- db/
  |- lib/
  |  |- assets/
  |  |- tasks/
  |  |  |- webpack.rake # built task
  |- log/
  |- public/
  |- test/
  |- config.ru
  |- gulpfile.js
  |- package.json
  |- config.ru
  |- Gemfile
  |- Gemfile.lock
  |- Rakefile
  |- README.rdoc
```
## Changelog
0.3 -> 0.4: Add [babel-plugin-typecheck](https://github.com/codemix/babel-plugin-typecheck), fixed redundant event listeners from
`dev-server` and `only-dev-server`, and update code to es6

## Acknowledgement

Thanks Dave Clark for this wonderful [post](http://clarkdave.net/2015/01/how-to-use-webpack-with-rails/)

## Example project

- [rails-react-webpack](https://github.com/hung-phan/rails-react-webpack)

## Running example

![alt text](https://raw.githubusercontent.com/hung-phan/generator-rails-react-webpack/master/screenshot.png "application screenshot")

## Contribution

All contributions are welcomed.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
