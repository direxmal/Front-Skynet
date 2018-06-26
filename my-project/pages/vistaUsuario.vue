<template>
  <v-container fluid class="pa-0">
      <v-layout row  align-center>
        <v-flex xs12 sm12>
          <div class="text-xs-center">
            <div>
              <v-btn color="error" href="/primerPisoUser" dark large>Primer Piso</v-btn>
            </div>
            <div>
              <v-btn color="error" href="/segundoPisoUser" dark large>Segundo Piso</v-btn>
            </div>
            <div>
              <v-btn color="error" href="/tercerPisoUser" dark large>Tercer Piso</v-btn>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios' // Modulo para realizar las peticiones
import config from '../config.vue' //conexion
export default {
  components: { config },
      layout: 'vistaUsuarioUser',
      data: () => ({

      }),
      created () {
      },
      methods: {

      }
}
</script>
