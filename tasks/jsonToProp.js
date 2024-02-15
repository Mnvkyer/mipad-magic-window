const gulpRename = require('gulp-rename');
const { src, dest } = require('gulp');
const through = require('through2');
const gulpIf = require('gulp-if');
const gulpJSONEdit = require('gulp-json-editor');
const { options } = require('../config/process.env');


const buildActionIsTransplant = function () {
  const is_transplant = options.is_transplant
  const is_pad = options.use_platform === 'pad'
  return is_transplant && is_pad
}

const buildActionIsFold = function () {
  const use_platform = options.use_platform
  if (use_platform === 'fold') {
    return true;
  }
  return false;
}

function transformKeyValue(key, value) {
  return `${key}=${value}`;
}

module.exports = function jsonToProp() {
  return src('config/module.config.json')
  .pipe(gulpIf(buildActionIsFold, gulpJSONEdit(function (json) {
    json.description = `适用于HyperOS For Pad/Fold，用于扩展平行视界的支持范围，以及优化平行视界的体验。当前刷入的是[小米折叠屏专用版]。遇到问题先看[问题合集]，反馈问题请提交[应用名]、[系统版本]、[模块版本]、[不适配的现象]。(此版本为酷安 @做梦书 自用版，旨在快速扩充更多应用的平行窗口体验，反馈应用适配问题可前往酷安私信或者Github:https://github.com/sothx/mipad-magic-window)`;
    return json;
  })))
  .pipe(gulpIf(buildActionIsTransplant, gulpJSONEdit(function (json) {
    json.description = `适用于HyperOS For Pad/Fold，用于扩展平行视界的支持范围，以及优化平行视界的体验。当前刷入的是[小米平板6Max移植包专用版]。遇到问题先看[问题合集]，反馈问题请提交[应用名]、[系统版本]、[模块版本]、[不适配的现象]。(此版本为酷安 @做梦书 自用版，旨在快速扩充更多应用的平行窗口体验，反馈应用适配问题可前往酷安私信或者Github:https://github.com/sothx/mipad-magic-window)`;
    return json;
  })))
  .pipe(through.obj((file, enc, cb) => {
    const json = JSON.parse(file.contents.toString());
    const keyValues = Object.keys(json).map(key => {
      const value = json[key];
      return transformKeyValue(key, value);
    }).join('\n');
    if (file.isBuffer()) {
      file.contents = Buffer.from(keyValues);
      cb(null, file);
    }
  }))
  .pipe(gulpRename('module.prop'))
  .pipe(dest('dist'))
}