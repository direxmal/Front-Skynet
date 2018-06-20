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

     <td class="text-xs-right">{{ props.item.calories }}</td>
     <td class="text-xs-right">{{ props.item.fat }}</td>
     <td class="text-xs-right">{{ props.item.carbs }}</td>
     <td class="text-xs-right">{{ props.item.protein }}</td>
     <td class="text-xs-right">{{ props.item.iron }}</td>
   </template>
   <template slot="no-data">
     <v-alert :value="true" color="error" icon="warning">
       No hay datos cargados aún :(
     </v-alert>
   </template>
 </v-data-table>
</div>

</template>
<script>
import axios from 'axios' // Modulo para realizar las peticiones
import config from '../config.vue' //conexion
export default {
  components: { config },
    layout: 'default',
      data: () => ({
          sala: [],
          customFilter (item, queryText, itemText) {
         const hasValue = val => val != null ? val : ''
         const text = hasValue(item.name)
         const query = hasValue(queryText)
         return text.toString()
           .toLowerCase()
           .indexOf(query.toString().toLowerCase()) > -1
       },
       headers: [ // Encabezados de  la tabla
   			{ text: 'Lunes', align: 'center' },
   			{ text: 'Martes', align: 'center' },
   			{ text: 'Miercoles', align: 'center' },
        { text: 'Jueves', align: 'center' },
        { text: 'Viernes', align: 'center' },
      	{ text: 'Sabado', align: 'center' }
   		],
      }),
      created () {
        this.cargarSelectCat()
      },
      methods: {
        cargarSelectCat () {
          axios.get(config.API_LOCATION + `/skynet/sala/`) // petición GET a Categoria para traer a todos los objetos "categoria"que contengan como tipo "insumo"
            .then((response) => {
              this.sala = response.data
            })
            .catch(e => {
            })
        },
      }
}
</script>
