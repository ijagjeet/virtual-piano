import * as THREE from 'three'
import { isNumber } from 'lodash'
import ThreeHelvetick from 'three/examples/fonts/helvetiker_regular.typeface.json'

const loader = new THREE.FontLoader()
const font = loader.parse(ThreeHelvetick)

export default class {
  constructor ({ scene, id, width, height, length, color, edgeColor, pressColor, text }) {
    this.box = this.getBox(width, height, length, color)
    this.edges = this.getEdges(this.box, edgeColor)
    this.text = this.getText(text, height, length)

    this.box.add(this.edges, this.text)

    scene.add(this.box)

    this.id = id
    this.isPressed = false
    this.pressDelta = 10
    this.color = color
    this.pressColor = pressColor
    this.width = width
    this.height = height
    this.length = length
  }
  getBox (width, height, length, color) {
    const geometry = new THREE.BoxBufferGeometry(width, height, length)
    const material = new THREE.MeshBasicMaterial({ color })
    return new THREE.Mesh(geometry, material)
  }
  getEdges (box, edgeColor) {
    const geometry = new THREE.EdgesGeometry(box.geometry)
    const material = new THREE.LineBasicMaterial({ color: edgeColor, linewidth: 1 })

    return new THREE.LineSegments(geometry, material)
  }
  getText (text, height, length) {
    const geometry = new THREE.TextBufferGeometry(text.value, {
      font,
      size: text.size,
      height: 1
    })

    geometry.computeBoundingBox()

    const material = new THREE.MeshBasicMaterial({ color: text.color })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.x = -geometry.boundingBox.max.x / 2
    mesh.position.y = height / 2
    mesh.position.z = length / 2 - text.size
    mesh.rotation.x = -Math.PI / 2

    return mesh
  }
  setPosition ({ x, y, z }) {
    isNumber(x) && (this.box.position.x = x)

    if (isNumber(y)) {
      this.box.position.y = y
    }

    if (isNumber(z)) {
      this.box.position.z = z
    }
  }
  press () {
    const { position, material } = this.box

    if (!this.isPressed) {
      this.isPressed = true

      material.color.setHex(this.pressColor)
      position.y -= this.pressDelta
    }
  }
  unpress () {
    const { position, material } = this.box

    if (this.isPressed) {
      this.isPressed = false

      material.color.setHex(this.color)
      position.y += this.pressDelta
    }
  }
}
