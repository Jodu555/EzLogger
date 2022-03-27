class LoggerModule {
    constructor(head, name, level) {
        this.head = head;
        this.name = name;
        this.level = level;
    }
    fatal(...args) {
        this.head.deepLog(this, this.levels.fatal.value, ...args);
    }
    error(...args) {
        this.head.deepLog(this, this.levels.error.value, ...args);
    }
    warn(...args) {
        this.head.deepLog(this, this.levels.warn.value, ...args);
    }
    info(...args) {
        this.head.deepLog(this, this.levels.info.value, ...args);
    }
    debug(...args) {
        this.head.deepLog(this, this.levels.debug.value, ...args);
    }
}

module.exports = LoggerModule;