import * as THREE from 'three'
import * as ticker from 'src/modules/ticker'

export default class Road {
  constructor ({ id, width, height, length, color, edgeColor, x, y }) {
    const geometry = new THREE.BoxBufferGeometry(width, height, length)
    const material = new THREE.MeshBasicMaterial({ color })
    const box = new THREE.Mesh(geometry, material)

    box.position.x = x
    box.position.y = y
    box.position.z = -length / 2

    const edges = new THREE.EdgesGeometry(box.geometry)
    const edgesMaterial = new THREE.LineBasicMaterial({ color: edgeColor })
    const wireframe = new THREE.LineSegments(edges, edgesMaterial)

    box.add(wireframe)

    this.id = id
    this.box = box
    this.length = length
  }
  get () {
    return this.box
  }
  move () {
    ticker.subscribe(this._move)
    ticker.unsubscribe(this._grow)
  }
  _move = () => {
    this.box.position.z -= 1

    if (this.box.position.z < -550) {
      this.destroy()
    }
  }
  grow () {
    ticker.subscribe(this._grow)
    ticker.unsubscribe(this._move)
  }
  _grow = () => {
    this.box.scale.z += this.length * 0.04
    this.box.position.z -= 0.5
  }
  destroy () {
    ticker.unsubscribe(this._grow)
    ticker.unsubscribe(this._move)

    if (this.box.parent && this.box.parent.remove) {
      this.box.parent.remove(this.box)
    }
  }
}
