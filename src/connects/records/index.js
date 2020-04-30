import { connect } from 'vuex-connect'
import Comp from 'src/components/records/index.vue'

export default connect({
  stateToProps: {
    records: state => state.records.list.sort((a, b) => b.recordTime - a.recordTime)
  },
  methodsToProps: {
    getSharedLink ({ state }, recordUid) {
      const { user } = state.user

      return user
        ? [window.location.host, '#', 'user-records', user.uid, recordUid].join('/')
        : ''
    },
    shareRecord ({ state }, input) {
      const { user } = state.user

      if (!user) {
        return this.$message.error('You must be logged in')
      }

      try {
        input.select()
        const response = document.execCommand('copy')

        if (!response) {
          throw new Error('negative response by document.execCommand')
        }
        this.$message.success('Link copy to shared buffer')
      } catch (err) {
        this.$message.error('Something went wrong! :(')
        console.error(err)
      }
    }
  }
})('main-menu', Comp)
