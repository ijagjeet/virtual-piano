import Ticker from 'src/modules/ticker'

export default class TimeLine {
  constructor ({ container, duration, color = '#20a0ff' }) {
    const width = container.clientWidth
    const height = container.clientHeight

    this.ctx = container.getContext('2d')
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
    this.ctx.lineWidth = height
    this.ctx.strokeStyle = color

    this.started = false
    this.maxX = width
    this.deltaX = width / duration

    this._x = 0
    this._y = height / 2

    this.moveTicker = new Ticker(this.move)
  }

  start () {
    !this.started && this.moveTicker.subscribe()
    this.started = true
  }

  stop () {
    this.started = false
    this.moveTicker.unsubscribe()
  }

  goToStart () {
    this._x = 0
    this.render()
  }

  goToEnd () {
    this._x = this.maxX
    this.render()
  }

  move = (timeFrame) => {
    this._x += this.deltaX * timeFrame

    if (this._x > this.maxX) {
      this._x = this.maxX
    }

    this.render()
  }

  render () {
    const { ctx } = this

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.beginPath()
    ctx.moveTo(0, this._y)
    ctx.lineTo(this._x, this._y)
    ctx.stroke()
  }
}
