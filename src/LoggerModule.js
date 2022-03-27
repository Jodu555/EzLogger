class LoggerModule {
    constructor(head, name, level) {
        this.head = head;
        this.name = name;
        this.level = level;
    }
    setLevel(level) {
        this.level = this.head.convertLevel(level);
    }
    fatal(...args) {
        this.head.deepLog(this, this.head.levels.fatal.value, ...args);
    }
    error(...args) {
        this.head.deepLog(this, this.head.levels.error.value, ...args);
    }
    warn(...args) {
        this.head.deepLog(this, this.head.levels.warn.value, ...args);
    }
    info(...args) {
        this.head.deepLog(this, this.head.levels.info.value, ...args);
    }
    debug(...args) {
        this.head.deepLog(this, this.head.levels.debug.value, ...args);
    }
}

module.exports = LoggerModule;