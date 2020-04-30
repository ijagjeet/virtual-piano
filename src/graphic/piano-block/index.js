import * as THREE from 'three'

import * as ticker from 'src/modules/ticker'
import KeyBoard from 'src/graphic/piano-keyboard'
import TrackRoad from 'src/graphic/track-road'

export default class {
  constructor ({ container, buttons }) {
    this.container = container
    this.buttons = buttons

    this.width = null
    this.height = null

    this.scene = null
    this.render = null

    this.keyboard = null
    this.trackRoad = null

    this.lengthButtons = 150

    this.init()
  }

  init () {
    const width = this.container.offsetWidth
    const height = this.container.offsetHeight

    const camera = new THREE.PerspectiveCamera(15, width / height, 0.1, 5000)
    camera.position.y = 1350
    camera.position.z = 980
    camera.rotation.x = -0.9

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    this.container.appendChild(renderer.domElement)

    this.width = width
    this.height = height

    this.scene = scene
    this.render = renderer

    this.addKeyboard(this.buttons)
    this.addTrackRoad()

    ticker.subscribe(() => renderer.render(scene, camera))
  }

  addKeyboard (buttons) {
    this.keyboard = new KeyBoard({
      scene: this.scene,
      width: this.width,
      buttons,
      lengthButtons: this.lengthButtons
    })
  }

  addTrackRoad () {
    this.trackRoad = new TrackRoad({
      scene: this.scene,
      width: this.width,
      minZ: this.lengthButtons
    })
  }
}
