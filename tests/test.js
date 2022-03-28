const Logger = require('../src/Logger');

const path = require('path');


const logger = new Logger({
    level: -1,
    autoFileHandling: true,
    filename: 'latest.log'
});

logger.fatal('123: fatal');
logger.error('123: error');
logger.warn('123: warn');
logger.info('123: info');
logger.debug('123: debug');

setTimeout(() => {
    logger.debug('123: lolololo');

}, 1000);

logger.createModule({
    name: 'VM-CREATION',
})

logger.get('VM-CREATION').info('12331212', { test: 'lol' })

// console.log(logger.modules);