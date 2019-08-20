const Generator = require('yeoman-generator')
const helpers = require('../lib/helpers')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)



    this.argument('appName', {
      type: String,
      required: true
    })
  }

  initializing() {
    const { appName } = this.options

    this.log(`Initializing react-create-module generator in ${appName}`)
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'appDescription',
        message: 'Enter with project description',
        default: ''
      },
      {
        type: 'input',
        name: 'appAuthor',
        message: 'Enter with project author',
        default: ''
      }
    ])

    const { appName } = this.options

    const {
      appDescription,
      appAuthor
    } = this.answers

    this.log('App name: ', appName)
    this.log('App description: ', appDescription)
    this.log('App author: ', appAuthor)
  }

  writing() {
    const { appName } = this.options
    const appTitle = helpers.toTitle(appName)

    let destinationPath = `${appName}/`
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

    this.fs.copy(
      this.templatePath(`${templatePath}.editorconfig`),
      this.destinationPath(`${destinationPath}.editorconfig`)
    )

    this.fs.copy(
      this.templatePath(`${templatePath}.env.sample`),
      this.destinationPath(`${destinationPath}.env.sample`)
    )

    this.fs.copy(
      this.templatePath(`${templatePath}.eslintrc.js`),
      this.destinationPath(`${destinationPath}.eslintrc.js`)
    )

    this.fs.copy(
      this.templatePath(`${templatePath}.nvmrc`),
      this.destinationPath(`${destinationPath}.nvmrc`)
    )

    this.fs.copy(
      this.templatePath(`${templatePath}dotenv.js`),
      this.destinationPath(`${destinationPath}dotenv.js`)
    )

    this.fs.copyTpl(
      this.templatePath(`${templatePath}jest.config.json.ejs`),
      this.destinationPath(`${destinationPath}jest.config.json`),
      { appName }
    )

    this.fs.copyTpl(
      this.templatePath(`${templatePath}package.json.ejs`),
      this.destinationPath(`${destinationPath}package.json`),
      {
        appName,
        description: this.description,
        author: this.author
      }
    )

    this.fs.copy(
      this.templatePath(`${templatePath}postcss.config.js`),
      this.destinationPath(`${destinationPath}postcss.config.js`)
    )

    this.fs.copy(
      this.templatePath(`${templatePath}webpack.config.babel.js`),
      this.destinationPath(`${destinationPath}webpack.config.babel.js`)
    )

    // Config files

    destinationPath = `${appName}/config/`
    templatePath = 'config/'

    this.fs.copy(
      this.templatePath(`${templatePath}webpackEnvs.js`),
      this.destinationPath(`${destinationPath}webpackEnvs.js`)
    )

    this.fs.copy(
      this.templatePath(`${templatePath}index.js`),
      this.destinationPath(`${destinationPath}index.js`)
    )

    // Dev files

    destinationPath = `${appName}/dev/`
    templatePath = 'dev/'

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

    this.fs.copy(
      this.templatePath(`${templatePath}store.js`),
      this.destinationPath(`${destinationPath}store.js`)
    )

    // Src files

    destinationPath = `${appName}/src/`
    templatePath = 'src/'

    this.fs.copy(
      this.templatePath(`${templatePath}index.js`),
      this.destinationPath(`${destinationPath}index.js`)
    )

    // Test

    destinationPath = `${appName}/test/`
    templatePath = 'test/'

    this.fs.copy(
      this.templatePath(`${templatePath}`),
      this.destinationPath(`${destinationPath}`)
    )
  }
}
