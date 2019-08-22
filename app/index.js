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
      },
      {
        type: 'input',
        name: 'gitlab',
        message: 'Gitlab resources? (y|n)'
      },
      {
        when: (answers) => answers.gitlab === 'y',
        type: 'input',
        name: 'gitlabGroupOrUser',
        message: 'Gitlab group or user?'
      }
    ])

    const { appName } = this.options

    const {
      appDescription,
      appAuthor,
      gitlab,
      gitlabGroupOrUser
    } = this.answers

    this.appName = appName
    this.appDescription = appDescription
    this.appAuthor = appAuthor
    this.appTitle = helpers.toTitle(appName)
    this.gitlab = gitlab === 'y'
    this.gitlabGroupOrUser = gitlabGroupOrUser
    this.gitlabRepo = `https://gitlab.com/${gitlabGroupOrUser}/${appName}`

    this.log('App name: ', appName)
    this.log('App description: ', appDescription)
    this.log('App author: ', appAuthor)
  }

  writing() {
    let destinationPath = `${this.appName}/`
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

    if (this.gitlab) {
      this.fs.copy(
        this.templatePath(`${templatePath}gitlab-ci.yml`),
        this.destinationPath(`${destinationPath}gitlab-ci.yml`)
      )
    }

    this.fs.copyTpl(
      this.templatePath(`${templatePath}jest.config.json.ejs`),
      this.destinationPath(`${destinationPath}jest.config.json`),
      { appName: this.appName }
    )

    this.fs.copyTpl(
      this.templatePath(`${templatePath}package.json.ejs`),
      this.destinationPath(`${destinationPath}package.json`),
      {
        appName: this.appName,
        description: this.appDescription,
        author: this.appAuthor
      }
    )

    this.fs.copy(
      this.templatePath(`${templatePath}postcss.config.js`),
      this.destinationPath(`${destinationPath}postcss.config.js`)
    )

    this.fs.copyTpl(
      this.templatePath(`${templatePath}README.md.ejs`),
      this.destinationPath(`${destinationPath}README.md`),
      {
        appTitle: this.appTitle,
        appName: this.appName,
        gitlab: this.gitlab,
        gitlabGroupOrUser: this.gitlabGroupOrUser
      }
    )

    this.fs.copyTpl(
      this.templatePath(`${templatePath}rollup.config.js.ejs`),
      this.destinationPath(`${destinationPath}rollup.config.js`),
      { appTitle: helpers.toCamel(this.appName) }
    )

    this.fs.copy(
      this.templatePath(`${templatePath}webpack.config.babel.js`),
      this.destinationPath(`${destinationPath}webpack.config.babel.js`)
    )

    // Storybook

    destinationPath = `${this.appName}/.storybook/`
    templatePath = '.storybook/'

    this.fs.copyTpl(
      this.templatePath(`${templatePath}config.js.ejs`),
      this.destinationPath(`${destinationPath}config.js`),
      { appTitle: this.appTitle }
    )

    this.fs.copy(
      this.templatePath(`${templatePath}webpack.config.babel.js`),
      this.destinationPath(`${destinationPath}webpack.config.babel.js`)
    )

    // Config files

    destinationPath = `${this.appName}/config/`
    templatePath = 'config/'

    this.fs.copy(
      this.templatePath(`${templatePath}`),
      this.destinationPath(`${destinationPath}`)
    )

    // Dev files

    destinationPath = `${this.appName}/dev/`
    templatePath = 'dev/'

    this.fs.copyTpl(
      this.templatePath(`${templatePath}App.jsx.ejs`),
      this.destinationPath(`${destinationPath}App.jsx`),
      { appTitle: this.appTitle }
    )

    this.fs.copyTpl(
      this.templatePath(`${templatePath}index.html.ejs`),
      this.destinationPath(`${destinationPath}index.html`),
      { appTitle: this.appTitle }
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

    destinationPath = `${this.appName}/src/`
    templatePath = 'src/'

    this.fs.copy(
      this.templatePath(`${templatePath}`),
      this.destinationPath(`${destinationPath}`)
    )

    // Test

    destinationPath = `${this.appName}/test/`
    templatePath = 'test/'

    this.fs.copy(
      this.templatePath(`${templatePath}`),
      this.destinationPath(`${destinationPath}`)
    )
  }
}
