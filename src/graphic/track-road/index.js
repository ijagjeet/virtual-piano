import * as buttonsConstants from 'src/constants/buttons'

import * as utils from 'src/utils/piano-key'

import Road from './road'

export default class {
  constructor ({ scene, width, minZ }) {
    this.scene = scene
    this.width = width
    this.minZ = minZ
    this.whiteButtonWidth = utils.getWhiteButtonWidth(width)
    this.blackButtonWidth = utils.getBlackButtonWidth(width)

    this.roads = {}
  }

  addRoad (button) {
    const typeId = utils.getButtonTypeId(button)
    const width = typeId === buttonsConstants.WHITE_ID
      ? this.whiteButtonWidth
      : this.blackButtonWidth
    const y = typeId === buttonsConstants.WHITE_ID
      ? -10
      : 2

    const road = new Road({
      id: button.id,
      width,
      height: 20,
      length: 5,
      color: utils.getColorForNote(button.noteId),
      edgeColor: 0x000000,
      x: utils.getPositionByCenter(button, this.width),
      y
    })

    this.roads[button.id] = road

    this.scene.add(road.get())
  }

  moveRoad (id) {
    const road = this.roads[id]

    if (!road) return

    road.move()
  }

  growRoad (id) {
    const road = this.roads[id]

    if (!road) return

    road.grow()
  }
}
