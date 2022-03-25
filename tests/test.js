const Logger = require('../src/Logger');

const path = require('path');


const logger = new Logger({

});
logger.setLevel(-1);

logger.fatal('123: fatal');
logger.error('123: error');
logger.warn('123: warn');
logger.info('123: info');
logger.debug('123: debug');