import Scheduler from 'browser-scheduler'

const instance = new Scheduler({
  getTaskWrapperFunction,
  getFrameFunction
})

instance.start()

function getFrameFunction () {
  return window.requestAnimationFrame
}

function getTaskWrapperFunction () {
  return null
}

export function add (handler) {
  instance.addTask({ handler })
}

export function subscribe (handler) {
  instance.subscribeTask({ handler })
}

export function unsubscribe (handler) {
  instance.unsubscribeTask(handler)
}

export default class Ticker {
  constructor (handler) {
    this.prevTime = 0
    this._handler = handler
  }

  add () {
    instance.addTask(this)
  }

  subscribe () {
    this.prevTime = 0
    instance.subscribeTask(this)
  }

  unsubscribe () {
    instance.unsubscribeTask(this.handler)
  }

  handler = () => {
    const now = window.performance.now()
    const frameTime = this.prevTime > 0 ? now - this.prevTime : 0

    this.prevTime = now

    return this._handler(frameTime)
  }
}
