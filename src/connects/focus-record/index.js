import * as usersRecordsTypes from 'src/store/types/users-records'

import { connect } from 'vuex-connect'
import db from 'src/modules/database'
import Comp from 'src/components/focus-track/index.vue'

export default connect({
  stateToProps: {
    record (state) {
      const { userUid, recordUid } = this.$route.params
      const userRecords = state.usersRecords[userUid]

      return userRecords
        ? userRecords[recordUid]
        : null
    }
  },
  lifecycle: {
    created: async function ({ commit }) {
      if (this.record) return

      const { userUid, recordUid } = this.$route.params
      const [ err, [ record ] ] = await to(db.getUserRecords(userUid, [recordUid]))

      if (err || !record) return

      commit(usersRecordsTypes.ADD, { userUid, recordUid, record })
    }
  },
  methodsToProps: {
    close () {
      this.$router.push('/')
    }
  }
})('focus-record', Comp)
