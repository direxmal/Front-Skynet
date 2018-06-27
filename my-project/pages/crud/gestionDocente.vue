<template>
	<div>
		<!-- Dialog Agregar Docente -->
			<v-dialog v-model="dialogAdd" max-width="500px">
				<v-btn dark color="red dark-2"  slot="activator" >Agregar Docente</v-btn>
							<v-form @submit.prevent="agregarDocente" v-model="valid" ref="fAgregarDocente" lazy-validation>
				<v-card>
					<v-card-title>
						<span class="headline">Agregar Docente</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12 sm12 md12>
									<v-text-field label="Nombre"  :counter="20" :rules="textoRules" name="nombre" ref="txtNombre" v-model="addItem.nombre" required></v-text-field>
								</v-flex>
							 <v-flex xs12 sm12 md12>
									<v-text-field label="Apellido"  :counter="20" :rules="textoRules" name="apellido" ref="txtApellido" v-model="addItem.apellido"  required></v-text-field>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" flat @click="clearAddModal">Cancelar</v-btn>
						<v-btn color="blue darken-1" type="submit" flat >Guardar</v-btn>
					</v-card-actions>
				</v-card>
				</v-form>
			</v-dialog>
			<!-- Fin Dialog Agregar Docente -->

		 <!-- Dialog Detalle docente -->
			 <v-dialog v-model="dialogDetail" max-width="500px">
			 <form @submit.prevent="">
		 <v-card>

				 <v-card-title><h1> Detalle de Docente</h1></v-card-title>
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
					 <v-list-tile class="hoverMouse">
						 <v-list-tile-title>Apellido</v-list-tile-title>
						 <v-list-tile-title class="text-lg-center">:</v-list-tile-title>
						 <v-list-tile-title>{{ detailItem.apellido }}</v-list-tile-title>
					 </v-list-tile>
				 </v-list>
			 <v-card-actions>
				 <v-spacer></v-spacer>
				 <v-btn color="blue darken-1" flat @click.native="cerrarModalDetail">Cerrar</v-btn>
			 </v-card-actions>
		 </v-card>
			</form>
		</v-dialog>
	 <!-- Fin Dialog Detalle docente -->

	 <!-- Dialog Editar Jornada -->
	    <v-dialog v-model="dialogEdit" max-width="500px">
	     <v-form @submit.prevent="editDocente" ref="fEditarDocente">
	   <v-card>
	     <v-card-title>
	       <span class="headline">Editar Docente</span>
	     </v-card-title>
	     <v-card-text>
	       <v-container grid-list-md>
	         <v-layout wrap>
	           <v-flex xs12 sm6 md4 style="display:none;">
	             <v-text-field label="Id" v-model="editedItem.id" name="idEdit"></v-text-field>
	           </v-flex>
	           <v-flex xs12 sm12 md12>
	             <v-text-field label="Nombre" :counter="20" :rules="textoRules" v-model="editedItem.nombre" name="nombreEdit"></v-text-field>
	           </v-flex>
	           <v-flex xs12 sm12 md12>
	             <v-text-field label="Apellido" :counter="20" :rules="textoRules" v-model="editedItem.apellido" name="detalleEdit"></v-text-field>
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
	  <!-- Fin Dialog Editar Jornada -->

	 <!-- Dialog Eliminar Jornada -->
	 <v-dialog v-model="dialogDelete" max-width="500px">
	  <v-form @submit.prevent="eliminarDocente" ref="fBorrarDocente">
	 <v-card>
	  <v-card-title>
	 	 <span class="headline">¿Estás seguro de eliminar este Docente?</span>
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
	 			 <v-list-tile class="hoverMouse">
	 				 <v-list-tile-title>Apellido</v-list-tile-title>
	 				 <v-list-tile-title class="text-lg-center">:</v-list-tile-title>
	 				 <v-list-tile-title>{{ deleteItem.apellido }}</v-list-tile-title>
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
	 <!-- Fin Dialog Eliminar Jornada -->

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
      :items="items"
      :search="search"
      must-sort
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.nombre }}</td>
				<td class="text-xs-center">{{ props.item.apellido }}</td>
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
import axios from 'axios' // Modulo para realizar las peticiones
import config from '../../config.vue' //conexion
import validaciones from '../../validaciones.vue' //validaciones de las cosas
export default {
	components: { config },
		layout: 'default',
	data: () => ({
		errorMessages: [],
		dialogAdd: false, // prop para abrir y cerrar modal de Agregar Subcategoría
		dialogEdit: false, // prop para abrir y cerrar modal de Editar Subcategoría
		dialogDetail: false, // prop para abrir y cerrar modal de Detalle Subcategoría
		dialogDelete: false, // prop para abrir y cerrar modal de Delete Subcategoría
		pagination: {}, // paginación de la tabla
		editedIndex: -1,
		deleteIndex: -1,
		value: '',
		search: '',
		snackbar: false,
		color: 'red darken-3',
		mode: '',
		timeout: 3000,
		text: 'Se ha agregado con exito',
		headers: [ // Encabezados de  la tabla
			{
				text: 'ID',
				value: 'id',
				sortable: true,
				width: '25%',
				align: 'center'
			},
			{ text: 'Nombre', value: 'nombre', width: '25%', align: 'center' },
			{ text: 'Apellido', value: 'apellido', width: '25%', align: 'center' },
			{ text: 'Opciones', sortable: false, width: '25%', align: 'center' }
		],
		textoRules: validaciones.textoRules,
		items: [],
		valid: true,
		addItem: {
			id: 0,
			apellido: '',
			nombre: ''
		},
		editedItem: { // prop temporal que guarda el objeto a editar o eliminar
			id: 0,
			apellido: '',
			nombre: ''
		},
		detailItem: {
			id: 0,
			apellido: '',
			nombre: ''
		},
		deleteItem: {
			id: 0,
			apellido: '',
			nombre: ''

		},
		defaultItem: {
			name: '',
			calories: 0,
			fat: 0,
			carbs: 0,
			protein: 0
		}
	}),
	computed: {
		formTitle () {
			return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
		}
	},
	watch: {
		dialog (val) {
			val || this.close()
		},
		verVal (val) {
			console.log(val)
			console.log(this.value)
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize () { // Función que recarga los datos de la Tabla mediante request a la API REST
			const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
			axios.get(config.API_LOCATION + `/skynet/docente/`, { headers: { Authorization: AuthStr } }) // petición GET a Subcategoría para traer todos los objetos jornada
				.then((response) => {
				//	console.log(response.data)
					this.items = response.data
				})
				.catch(e => {
				})
		},
		agregarDocente (e) { // función para agregar un nuevo Subcategoría
			const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
			var nombre = this.addItem.nombre
			var apellido = this.addItem.apellido
			if (this.$refs.fAgregarDocente.validate()) {
				console.log(nombre + '**** ' + apellido)
				axios.post(config.API_LOCATION + '/skynet/docente/', { // petición POST a Subcategoría para agregar
				nombre: '' + nombre + '',
				apellido: '' + apellido + ''
			}, { headers: { Authorization: AuthStr } })
					.then((response) => {
						this.initialize()
						this.dialogAdd = false // cerrar el modal
						this.text = 'Se ha agregado correctamente'
						this.snackbar = true
						this.$refs.fAgregarDocente.reset()
					}
					)
			}
		},
		editDocente () { // función para editar la Subcategoría	const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
			const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
			var id = this.editedItem.id // obtener id del objeto que se desea editar formulario
			var nombre = this.editedItem.nombre // obtener nombre del objeto que se desea editar formulario
			var apellido = this.editedItem.apellido
			if (this.$refs.fEditarDocente.validate()) {
				axios.put(config.API_LOCATION + '/skynet/docente/' + id + '', {// petición put para editar el tipo
					nombre: '' + nombre + '',
					apellido: '' + apellido + ''
				}, { headers: { Authorization: AuthStr } })
					.then(response => {
						this.initialize()
						this.text = 'Se ha modificado correctamente'
						this.snackbar = true
						this.dialogEdit = false // cerrar modal
					})
					.catch(function (error) {
						console.log(error)
					})
			}
		},
		eliminarDocente (e) {
			const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
		axios.delete(config.API_LOCATION + '/skynet/docente/' + this.deleteItem.id + '', { headers: { Authorization: AuthStr } }) // petición GET a Tipo para traer a todos los objetos "tipo"
			.then((response) => {
				this.initialize()
				this.dialogDelete = false
			})
			.catch(e => {
			})
	},
	modalEdit (item) {
	//  this.editedIndex = this.secciones.indexOf(item)
		this.editedItem = Object.assign({}, item)
		this.dialogEdit = true
	},
	modalDelete (item) {
		this.deleteItem = item
		this.dialogDelete = true
	},
cerrarModalEdit () {
			this.dialogEdit = false
		},
modalDetalle (item) {
	this.detailItem = this.items.indexOf(item) // obtener posición del array
	this.detailItem = Object.assign({}, item)
	this.dialogDetail = true
},
cerrarModalDelete () {
		this.dialogDelete =  false
	},
cerrarModalDetail () {
			this.dialogDetail = false
		},
		clearAddModal () {
				this.$refs.txtNombre.reset()
				this.$refs.txtApellido.reset()
				this.dialogAdd = false
			}


	}
}</script>
