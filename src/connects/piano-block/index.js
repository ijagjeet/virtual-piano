import * as keyboardTypes from 'src/store/types/keyboard'

import { connect } from 'vuex-connect'
import events from 'src/modules/event-bus'

import Comp from 'src/components/piano-block/index.vue'

export default connect({
  stateToProps: {
    buttons: (state) => state.keyboard.buttons
  },
  methodsToProps: {
    onKeyup (_, cb) {
      events.on(keyboardTypes.KEYUP, cb)
    },
    onKeydown (_, cb) {
      events.on(keyboardTypes.KEYDOWN, cb)
    }
  }
})('piano-block', Comp)
