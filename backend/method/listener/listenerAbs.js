class listenerAbs {
    #_event;
    constructor () {
        this.#_event = {}
    }

    // 發送事件
    #_emit(type, message) {
        if (this.#_event[type]) {
            this.#_event[type].forEach((item) => {
                item.callback(message)
            })
        }
    }

    // 監聽
    #_on(obj, type, callback) {
        this.#_event[type] = this.#_event[type] || []
        this.#_event[type].push({
            obj,
            callback,
        })
    }

    // 關閉
    #_off(obj, type) {
        if (this.#_event[type]) {
            this.#_event[type] = this.#_event[type].filter((item) => item.obj !== obj)
        }
    }

    get _emit() {
        return this.#_emit
    }

    get _on() {
        return this.#_on
    }

    get _off() {
        return this.#_off
    }

}
module.exports = listenerAbs