'use strict';

var log4js = require('log4js'),
  logger = log4js.getLogger('cheese'),
  config = require('../../config/config').loggerConf;

var init = function() {
  log4js.loadAppender('file');
  log4js.addAppender(log4js.appenders.file(config.filePath), 'cheese');
  logger.setLevel(config.level);
  return logger;
};

module.exports.init = init;
