import * as buttonsConstants from 'src/constants/buttons'

import Button from './button'

import { forEach, find } from 'lodash'
import * as utils from 'src/utils/piano-key'

export default class {
  constructor ({ scene, width, buttons, lengthButtons }) {
    this.scene = scene
    this.width = width
    this.length = lengthButtons
    this.whiteButtonWidth = utils.getWhiteButtonWidth(width)
    this.blackButtonWidth = utils.getBlackButtonWidth(width)

    this.buttons = []

    this.addButtons(buttons)
  }

  addButtons (buttons) {
    forEach(buttons, this.addButton.bind(this))
  }

  addButton (button) {
    const color = button.typeId === buttonsConstants.WHITE_ID
      ? 0xffffff
      : 0x000000
    const edgeColor = button.typeId === buttonsConstants.WHITE_ID
      ? 0x3e3e3e
      : 0x969696
    const width = button.typeId === buttonsConstants.WHITE_ID
      ? this.whiteButtonWidth
      : this.blackButtonWidth
    const height = button.typeId === buttonsConstants.WHITE_ID
      ? 20
      : 30
    const length = button.typeId === buttonsConstants.WHITE_ID
      ? this.length
      : this.length - 40
    const textSize = button.typeId === buttonsConstants.WHITE_ID
      ? 13
      : 11
    const textColor = button.typeId === buttonsConstants.WHITE_ID
      ? 0x000000
      : 0xffffff

    const buttonGl = new Button({
      scene: this.scene,
      id: this.createId(button),
      width,
      height,
      length,
      color,
      edgeColor,
      pressColor: utils.getColorForNote(button.noteId),
      text: {
        value: button.text,
        size: textSize,
        color: textColor
      }
    })

    buttonGl.setPosition({
      x: utils.getPositionByCenter(button, this.width),
      y: button.typeId === buttonsConstants.BLACK_ID ? 8 : 0,
      z: length / 2
    })

    this.buttons.push(buttonGl)
  }

  updateButtons (buttons) {
    forEach(buttons, this.updateButton.bind(this))
  }

  updateButton (button) {
    const id = this.createId(button)
    const buttonGl = find(this.buttons, buttonGl => buttonGl.id === id)

    if (!buttonGl) return

    if (button.isPressed) {
      buttonGl.press()
    } else {
      buttonGl.unpress()
    }
  }

  createId (button) {
    return `${button.octaveId}-${button.noteId}`
  }
}
