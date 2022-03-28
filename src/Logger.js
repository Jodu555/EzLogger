const fs = require('fs');
const path = require('path');
const LoggerModule = require('./LoggerModule');

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
        this.modules = new Map();

        this.levels = {
            fatal: { value: 4, name: 'Fatal' },
            error: { value: 3, name: 'Error' },
            warn: { value: 2, name: 'Warn' },
            info: { value: 1, name: 'Info' },
            debug: { value: 0, name: 'Debug' }
        }
        this.logs = [];

        // console.log(this.options);
        try {
            fs.mkdirSync(this.options.logFolder, { recursive: true });
        } catch (error) {
        }
    }
    /**
     * @param  {Number|String} level The level as number: 1, 2 or name: 'info', 'error'
     */
    setLevel(level) {
        this.level = convertLevel(level);
    }
    convertLevel(smth) {
        return Number.isInteger(smth) ?
            smth :
            this.levels[smth].value;
    }
    levelNumToName(num) {
        return Object.values(this.levels).filter(l => l.value == num)[0].name;
    }
    deepLog(module, level, ...args) {
        const line = `${new Date().toISOString()} #${module == null ? '' : ` [${module.name}]`} ${this.levelNumToName(level)} | ${[...args].join(' ')}`;
        this.logs.push(line);

        let file;
        if (this.options.autoFileHandling == false) {
            file = path.join(this.options.logFolder, this.options.filename);
        } else {
            //TODO: Here the automatic File handling
            file = path.join(this.options.logFolder, 'latest.log');
            if (fs.existsSync(file)) {
                const lines = fs.readFileSync(file, 'utf-8').split('\n');
                const date = this.getDateFromLines(lines);
                if (date.toLocaleDateString() != new Date().toLocaleDateString()) { // Its the same day then the log before
                    console.log(date.toLocaleDateString(), '!=', new Date().toLocaleDateString());
                    fs.renameSync(file, path.join(this.options.logFolder, `${date.toLocaleDateString()}.log`));
                }
            }
        }

        this.writeToFile(file, line + '\n')

        if ((module == null && this.level <= level) || (module != null && module.level <= level))
            console.log(line);

        return line;
    }
    getDateFromLines(lines) {
        let line = lines.length;
        let date = new Date('');
        while (Number.isNaN(date.getTime())) {
            try {
                date = new Date(lines[line].split('#')[0].trim());
            } catch (error) {
                // console.log(error);
            }
            line--;
            if (line == -10) return;
        }
        return date;
    }
    writeToFile(file, line) {
        if (fs.existsSync(file))
            return fs.appendFileSync(file, line, 'utf-8');

        fs.writeFileSync(file, line, 'utf-8');
    }

    /**
     * @typedef {Object} LoggerModuleOptions
     * @property {String} name=Module #1
     * @property {Number|String} level=-1 The level as number or name
     */
    /**
     * @param  {LoggerModuleOptions} options
     */
    createModule(options) {
        const defaultOptions = {
            name: 'Module #1',
            level: -1
        }
        options = { ...defaultOptions, ...options };
        options.level = this.convertLevel(options.level);
        this.modules.set(options.name, new LoggerModule(this, options.name, options.level));
    }

    /**
     * @param {String} name The Logger Module name
     * @returns {LoggerModule}
     */
    get(name) {
        return this.modules.get(name) || null;
    }

    fatal(...args) {
        this.deepLog(null, this.levels.fatal.value, ...args);
    }
    error(...args) {
        this.deepLog(null, this.levels.error.value, ...args);
    }
    warn(...args) {
        this.deepLog(null, this.levels.warn.value, ...args);
    }
    info(...args) {
        this.deepLog(null, this.levels.info.value, ...args);
    }
    debug(...args) {
        this.deepLog(null, this.levels.debug.value, ...args);
    }
}

module.exports = Logger;