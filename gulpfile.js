const { series, parallel, task, src } = require('gulp');
const { cleanDist,cleanTemp,cleanOutputTemp } = require('./tasks/cleanDir');
const buildTemplate = require('./tasks/buildTemplate');
const integrateConfig = require('./tasks/integrateConfig');
const buildRelease = require('./tasks/buildRelease');
const jsonToProp = require('./tasks/jsonToProp');
const buildEjsTemplate = require('./tasks/buildEjsTemplate');
const adaptivePlatformToFold = require('./tasks/adaptivePlatformToFold');
const buildExtConfig = require('./tasks/buildExtConfig');
const adaptiveTransplantRom = require('./tasks/adaptiveTransplantRom');
const { mergeConfig } = require('./tasks/mergeMagicWindowConfig');
const buildTasks = series(
  cleanDist,
  cleanTemp,
  buildTemplate,
  buildEjsTemplate,
  adaptivePlatformToFold,
  buildExtConfig,
  integrateConfig,
  adaptiveTransplantRom,
  jsonToProp
)

exports.build = buildTasks


exports.release = buildRelease

const packageTasks = series(buildTasks, buildRelease)

exports.package = packageTasks


exports.mergeConfig = mergeConfig

