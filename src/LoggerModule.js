class LoggerModule {
    constructor(head, name) {
        this.head = head;
        this.name = name;
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