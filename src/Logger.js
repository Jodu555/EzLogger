const fs = require('fs');

class Logger {
    /**
     * @typedef {Object} LoggerOptions
     * @property {Number|String} level=-1 The level as number or name
     * @property {Boolean} autoFileHandling=true 
     * @property {String} logFolder='logs/' 
     * @property {String} filename=null When the autoFilehandling is activated the filename isnt necessary
     */
    /**
     * @param  {LoggerOptions} options
     */
    constructor(options) {
        const defaultOptions = {
            level: -1,
            autoFileHandling: true,
            logFolder: path.join(process.cwd(), 'logs'),
            filename: null,
        }
        this.options = { ...defaultOptions, ...options };

        this.level = this.options.level;

        this.levels = {
            fatal: { value: 4, name: 'Fatal' },
            error: { value: 3, name: 'Error' },
            warn: { value: 2, name: 'Warn' },
            info: { value: 1, name: 'Info' },
            debug: { value: 0, name: 'Debug' }
        }
        this.logs = [];
    }
    /**
     * @param  {Number|String} level The level as number: 1, 2 or name: 'info', 'error'
     */
    setLevel(level) {
        Number.isInteger(level) ?
            this.level = level :
            this.level = this.levels[level].value;
    }
    levelNumToName(num) {
        return Object.values(this.levels).filter(l => l.value == num)[0].name;
    }
    deepLog(level, ...args) {
        const line = `${new Date().toLocaleString()} - ${this.levelNumToName(level)} | ${[...args].join(' ')}`;
        this.logs.push(line);

        if (this.autoFileHandling == false) {
            fs.appendFileSync(path.join(process.cwd(), this.options.logFolder, this.options.filename), line + '\n');
        } else {

        }

        if (this.level <= level)
            console.log(line);

        return line;
    }
    fatal(...args) {
        this.deepLog(this.levels.fatal.value, ...args);
    }
    error(...args) {
        this.deepLog(this.levels.error.value, ...args);
    }
    warn(...args) {
        this.deepLog(this.levels.warn.value, ...args);
    }
    info(...args) {
        this.deepLog(this.levels.info.value, ...args);
    }
    debug(...args) {
        this.deepLog(this.levels.debug.value, ...args);
    }
}

module.exports = Logger;