<template>
<div>
  <v-container fluid>
     <v-layout row wrap>
       <v-flex xs12 sm6>
         <v-select
           :items="sala"
           :filter="customFilter"
           item-value="idSala"
           item-text="nombreSala"
           label="Sala"
           autocomplete
         ></v-select>
       </v-flex>
     </v-layout>
   </v-container>
   <!--La tabla de la tabla -->
   <v-data-table
   :headers="headers"
   :items="desserts"
   hide-actions
   class="elevation-1"
 >
   <template slot="items" slot-scope="props">
     <td>
         <span>Detalle</span>
     </td>
     <td class="text-xs-right">{{ props.item.calories }}</td>
     <td class="text-xs-right">{{ props.item.fat }}</td>
     <td class="text-xs-right">{{ props.item.carbs }}</td>
     <td class="text-xs-right">{{ props.item.protein }}</td>
     <td class="text-xs-right">{{ props.item.iron }}</td>
   </template>
 </v-data-table>
</div>

</template>
<script>
import axios from 'axios' // Modulo para realizar las peticiones
import config from '../config.vue' //conexion
export default {
  components: { config },
    layout: 'vistaUsuarioUser',
      data: () => ({
          sala: [],
          desserts: [],
          customFilter (item, queryText, itemText) {
         const hasValue = val => val != null ? val : ''
         const text = hasValue(item.name)
         const query = hasValue(queryText)
         return text.toString()
           .toLowerCase()
           .indexOf(query.toString().toLowerCase()) > -1
       },
       headers: [ // Encabezados de  la tabla
        { text: 'Hora', sortable: false, align: 'center' },
   			{ text: 'Lunes', sortable: false, align: 'center' },
   			{ text: 'Martes', sortable: false, align: 'center' },
   			{ text: 'Miercoles', sortable: false, align: 'center' },
        { text: 'Jueves', sortable: false, align: 'center' },
        { text: 'Viernes', sortable: false, align: 'center' },
      	{ text: 'Sabado', sortable: false, align: 'center' }
   		],
      }),
      created () {

      },
      methods: {

      }
}
</script>
