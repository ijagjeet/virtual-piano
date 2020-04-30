import * as types from 'src/store/types/keyboard'
import { remove } from 'lodash'
import store from 'src/store/index'
import Ticker from 'src/modules/ticker'

export default class TrackPlayer {
  constructor ({ track, onPlay, onLoop, onStop, onPause, onStart, onEnd }) {
    this.time = 0
    this._track = [ ...track ]
    this.track = track
    this.onPlay = onPlay
    this.onLoop = onLoop
    this.onStop = onStop
    this.onPause = onPause
    this.onStart = onStart
    this.onEnd = onEnd

    this.started = false
    this.nowPlaying = []
    this.requrcive = false
    this.ticker = new Ticker(this.tick)
  }

  reset () {
    this.time = 0
    this.track = [ ...this._track ]
  }

  tick = (frameTime) => {
    this.time += frameTime
    this.tryPlay()
  }

  tryPlay () {
    const item = this.track[0]

    if (!item) {
      return this.end()
    }

    if (this.time > item.payload.time) {
      this.playItem(this.track.shift())
      this.tryPlay()
    }
  }

  playItem (item) {
    store.commit(item.type, item.payload)

    this.modifyNowPlaying(item)
  }

  modifyNowPlaying (item) {
    if (item.type === types.KEYDOWN) {
      this.nowPlaying.push(item)
    } else if (item.type === types.KEYUP) {
      remove(this.nowPlaying, _item =>
        _item.payload.octaveId === item.payload.octaveId &&
        _item.payload.noteId === item.payload.noteId
      )
    }
  }

  keyUpAll () {
    this.nowPlaying.forEach(item => store.commit(types.KEYUP, item.payload))
  }

  start () {
    if (!this.started) {
      this.onStart && this.onStart()
    }

    this.started = true
    this.ticker.subscribe()
  }

  end () {
    this.ticker.unsubscribe()
    this.started = false
    this.onEnd && this.onEnd()
    this.keyUpAll()
    this.reset()

    if (this.requrcive) {
      this.start()
    }
  }

  play () {
    this.requrcive = false
    this.onPlay && this.onPlay()
    this.start()
  }

  loop (cb) {
    this.requrcive = true
    this.onLoop && this.onLoop()
    this.start()
  }

  pause () {
    this.ticker.unsubscribe()
    this.keyUpAll()
    this.onPause && this.onPause()
  }

  stop () {
    this.requrcive = false
    this.ticker.unsubscribe()
    this.keyUpAll()
    this.onStop && this.onStop()
    this.reset()
  }
}
