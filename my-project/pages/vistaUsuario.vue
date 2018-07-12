<template>
  <v-container fluid class="pa-0">
      <v-layout row  align-center>
        <v-flex xs12 sm12>
          <div class="text-xs-center">
            <div xs12 sm12>
              <v-btn color="error" href="/primerPisoUser" style="height:199px;width:1000px;font-size : 100px" dark round  >Primer Piso</v-btn>
            </div>
            <div>
              <v-btn color="error" href="/segundoPisoUser" style="height:199px;width:1000px;font-size : 100px" dark round >Segundo Piso</v-btn>
            </div>
            <div>
              <v-btn color="error" href="/tercerPisoUser" style="height:199px;width:1000px;font-size : 100px" dark round  >Tercer Piso</v-btn>
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

