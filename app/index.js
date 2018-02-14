const Generator = require('yeoman-generator')
const helpers = require('../lib/helpers')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.appName = process.argv[3]

    this.log('Initializing react-create-module generator')
  }

  start () {
    this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: `Enter a name for the application ${this.appName ? `or keep ${this.appName}` : ''}`
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter with project description'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Enter with project description'
      }
    ])
    .then(answers => {
      const _appName = answers.appName || this.appName
      const appTitle = helpers.toTitle(_appName)

      let destinationPath = `${_appName}/`
      let templatePath = ''

      // Root files

      this.fs.copy(
        this.templatePath(`${templatePath}_.gitignore`),
        this.destinationPath(`${destinationPath}.gitignore`)
      )

      this.fs.copy(
        this.templatePath(`${templatePath}.babelrc`),
        this.destinationPath(`${destinationPath}.babelrc`)
      )

      this.fs.copyTpl(
        this.templatePath(`${templatePath}package.json.ejs`),
        this.destinationPath(`${destinationPath}package.json`),
        {
          appName: _appName,
          description: this.description,
          author: this.author
        }
      )

      this.fs.copy(
        this.templatePath(`${templatePath}webpack.config.babel.js`),
        this.destinationPath(`${destinationPath}webpack.config.babel.js`)
      )

      // Config files

      destinationPath = `${_appName}/config/`
      templatePath = 'config/'

      this.fs.copy(
        this.templatePath(`${templatePath}webpackEnvs.js`),
        this.destinationPath(`${destinationPath}webpackEnvs.js`)
      )

      this.fs.copy(
        this.templatePath(`${templatePath}index.js`),
        this.destinationPath(`${destinationPath}index.js`)
      )

      // Demo files

      destinationPath = `${_appName}/demo/`
      templatePath = 'demo/'

      this.fs.copyTpl(
        this.templatePath(`${templatePath}App.jsx.ejs`),
        this.destinationPath(`${destinationPath}App.jsx`),
        { appName: appTitle }
      )

      this.fs.copyTpl(
        this.templatePath(`${templatePath}index.html.ejs`),
        this.destinationPath(`${destinationPath}index.html`),
        { appName: appTitle }
      )

      this.fs.copy(
        this.templatePath(`${templatePath}index.js`),
        this.destinationPath(`${destinationPath}index.js`)
      )

      // Src files

      destinationPath = `${_appName}/src/`
      templatePath = 'src/'

      this.fs.copy(
        this.templatePath(`${templatePath}index.js`),
        this.destinationPath(`${destinationPath}index.js`)
      )
    })
  }
}