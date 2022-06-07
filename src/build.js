const fs = require('fs')
const { resolve } = require('path')
var templateEngine = require('art-template');

const configPath = resolve(__dirname, '../config/config.json')
const defaultConfigPath = resolve(__dirname, '../config/default_config.json')
const configTemplatePath = resolve(__dirname, './config/template.art')
const configOutputPath = resolve(__dirname, '../nginx.conf')

const template = fs.readFileSync(configTemplatePath, { encoding: 'utf-8' })

let config = fs.readFileSync(configPath, { encoding: 'utf-8' })
config = JSON.parse(config)

let defaultConfig = fs.readFileSync(defaultConfigPath, { encoding: 'utf-8' })
defaultConfig = JSON.parse(defaultConfig)

var render = templateEngine.compile(template, {
    cache: false,
})
var nginxConfig = render({ ...config, ...defaultConfig })

console.log("output file: " + configOutputPath)
fs.writeFileSync(configOutputPath, nginxConfig)
