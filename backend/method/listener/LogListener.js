const listenerAbs = require('./listenerAbs')
const uuid = require('uuid')

class LogListener extends listenerAbs {
    uid
    type
    constructor() {
        super()
        this.uid = uuid.v4()
        // this._emit = this._emit.bind(this)
        // this._event = this._emit.bind(this)
        // this._off = this._emit.bind(this)
        // this._on = this._on.bind(this)
        this.type = 'writeLog'
    }
    
    listen(callback) {
        this._on(this, this.type, callback)
    }

    emit(msg) {
        this._emit(this.type, msg)
    }
}
module.exports = new LogListener()
