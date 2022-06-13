import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.shades.white, // #E53935
        secondary: colors.shades.white, // #FFCDD2
        accent: colors.shades.white, // #3F51B5
        error: colors.shades.white
      },
    },
  },
})