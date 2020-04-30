import { connect } from 'vuex-connect'
import { signout } from 'src/actions/user/index'
import Comp from 'src/components/menu/index.vue'

export default connect({
  stateToProps: {
    isAuth: state => state.user.user !== null
  },
  methodsToProps: {
    signout
  }
})('main-menu', Comp)
