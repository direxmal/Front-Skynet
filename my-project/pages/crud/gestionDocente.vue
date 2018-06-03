<template>
	<div>
		 <!--Dialog Agregar Modulo -->
     <v-dialog v-model="dialogAdd" max-width="500px" >
  		 <v-btn dark color="red darken-2"  slot="activator" >Agregar Docente</v-btn>
  					 <v-form @submit.prevent="agregarSeccion" v-model="valid" ref="fAgregarSeccion" lazy-validation>
  		 <v-card>
  			 <v-card-title>
  				 <span class="headline">Nuevo Docente</span>
  			 </v-card-title>
  			 <v-card-text>
  				 <v-container grid-list-md>
  					 <v-layout wrap>
  						 <v-flex xs12>
  							 <v-text-field label="Nombre" :counter="20" :rules="textoRules" ref="txtNombre" id="nombreSeccion"  required></v-text-field>
  						 </v-flex>
							 <v-flex xs12>
								<v-text-field label="Apellido" :counter="20" :rules="textoRules" ref="txtNombre" id="nombreSeccion"  required></v-text-field>
							</v-flex>
  					 </v-layout>
  				 </v-container>
  			 </v-card-text>
  			 <v-card-actions>
  				 <v-spacer></v-spacer>
  				 <v-btn color="blue darken-1" @click="clearAddModal" flat>Cancelar</v-btn>
  				 <v-btn color="blue darken-1" type="submit" flat >Guardar</v-btn>
  			 </v-card-actions>
  		 </v-card>
  		 </v-form>
  	 </v-dialog>
	 <!-- Fin Dialog Agregar Modulo -->
	 <!--Dialog Editar Subcategoria
	 	 <v-dialog v-model="dialogEdit" max-width="500px">
	 		<v-form @submit.prevent="editSeccion" ref="fEditarSeccion">
	 	<v-card>
	 		<v-card-title>
	 			<span class="headline">Editar Seccion</span>
	 		</v-card-title>
	 		<v-card-text>
	 			<v-container grid-list-md>
	 				<v-layout wrap>
	 					<v-flex xs12 sm6 md4 style="display:none;">
	 						<v-text-field label="Nombre" v-model="editedItem.id" name="idEdit"></v-text-field>
	 					</v-flex>
	 					<v-flex xs12 sm12 md12>
	 						<v-text-field label="Nombre" :counter="20" :rules="textoRules" v-model="editedItem.nombre" name="nombreEdit"></v-text-field>
	 					</v-flex>
	 					 <v-flex xs3>
	 						 <v-subheader>Modulo : </v-subheader>
	 					</v-flex>
	 					<v-flex xs9>
	 			<v-select
	 				:items="modulo"
	 				item-text="nombre"
	 				item-value="id"
	 				@select='onChangeSelect'
	 				v-model="editedItem.id_modulo.id"
	 				:error-messages="errorMessages"
	 				search-input
	 				autocomplete
	 				label="Modulo"
	 				single-line
	 			></v-select>
	 		</v-flex>
	 				</v-layout>
	 			</v-container>
	 		</v-card-text>
	 		<v-card-actions>
	 			<v-spacer></v-spacer>
	 			<v-btn color="blue darken-1" flat @click.native="	cerrarModalEdit">Cancelar</v-btn>
	 			<v-btn color="blue darken-1" type="submit" flat>Guardar</v-btn>
	 		</v-card-actions>
	 	</v-card>
	 </v-form>
	 </v-dialog>
	 Fin Dialog Editar Subcategoria -->
     <!-- Dialog Detalle Modulo
        <v-dialog v-model="dialogDetail" max-width="500px">
        <form @submit.prevent="">
      <v-card>

          <v-card-title><h1> Detalle de Modulo</h1></v-card-title>
          <v-divider></v-divider>
          <v-list dense >
              <v-list-tile class="hoverMouse">
              <v-list-tile-title>ID</v-list-tile-title>
              <v-list-tile-title class="text-lg-center">:</v-list-tile-title>
              <v-list-tile-title>{{ detailItem.id }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile class="hoverMouse">
              <v-list-tile-title>Nombre</v-list-tile-title>
              <v-list-tile-title class="text-lg-center">:</v-list-tile-title>
              <v-list-tile-title>{{ detailItem.nombre }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cerrarModalDetail">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
       </form>
     </v-dialog>
 Fin Dialog Detalle Modulo -->

     <!-- Dialog Eliminar Modulo
       <v-dialog v-model="dialogDelete" max-width="500px">
        <v-form @submit.prevent="eliminarModulo" ref="fEditarHerramientas">
      <v-card>
        <v-card-title>
          <span class="headline">¿Estás seguro de eliminar este módulo?</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
              <v-list dense >
                <v-list-tile class="hoverMouse">
                <v-list-tile-title>ID</v-list-tile-title>
                <v-list-tile-title class="text-lg-center">:</v-list-tile-title>
                <v-list-tile-title>{{ deleteItem.id }}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile class="hoverMouse">
                <v-list-tile-title>Nombre</v-list-tile-title>
                <v-list-tile-title class="text-lg-center">:</v-list-tile-title>
                <v-list-tile-title>{{ deleteItem.nombre }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cerrarModalDelete">Cancelar</v-btn>
          <v-btn color="blue darken-1" type="submit" flat>Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    </v-dialog>
   Fin Dialog Eliminar Modulo -->

	<!-- Tabla -->
    <v-card>
    <v-card-title>
        <h1>Docentes</h1>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Buscar"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
    <v-data-table
      :headers="headers"
      :items="secciones"
      :search="search"
      must-sort
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.nombre }}</td>
				<td class="text-xs-center">{{ props.item.id_modulo.nombre }}</td>
			 <td class="text-xs-center" style="display:none;">{{ props.item.id_modulo.id }}</td>
        <td class="justify-center layout px-0">
        <v-tooltip top>
          <v-btn icon slot="activator" class="mx-0" @click="modalDetalle(props.item)" >
            <v-icon color="blue">search</v-icon>
          </v-btn>
          <span>Detalle</span>
          </v-tooltip>
        <v-tooltip top>
          <v-btn icon slot="activator" class="mx-0" @click="modalEdit(props.item)" >
            <v-icon color="green">edit</v-icon>
          </v-btn>
          <span>Editar</span>
          </v-tooltip>
          <v-tooltip top>
          <v-btn icon slot="activator" class="mx-0" @click="modalDelete(props.item)" >
            <v-icon color="red">delete</v-icon>
          </v-btn>
          <span>Eliminar</span>
          </v-tooltip>
        </td>
      </template>

      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        De {{ pageStart }} a {{ pageStop }}
      </template>
    </v-data-table>
    </v-card>
<!-- Fin Tabla-->


	</div>
</template>
<script>
export default {
  data: () => ({
    pagination: {},
    search: ''
  })

}
</script>
