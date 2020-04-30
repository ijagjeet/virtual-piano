const requireContext = require.context('static/musical-texts/', true, /\.txt$/)

export default requireContext.keys().map(v => v.split('/')[1].split('.')[0])
