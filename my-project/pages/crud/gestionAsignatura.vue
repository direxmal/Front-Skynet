<template>
  <div>

    <!-- Dialog Agregar Asignaturaasda -->
      <v-dialog v-model="dialogAdd" max-width="500px">
        <v-btn dark color="red dark-2"  slot="activator" >Agregar Asignatura</v-btn>
              <v-form @submit.prevent="agregarAsignatura" v-model="valid" ref="fAgregarAsignatura" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="headline">Agregar Asignatura</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field label="Nombre"  :counter="40" :rules="textoRules2" name="nombre" ref="txtNombre" v-model="addItem.nombre" required></v-text-field>
                </v-flex>
                <v-flex xs3>
                 <v-subheader>Seccion : </v-subheader>
              </v-flex>
              <v-flex xs9>
          <v-select
            :items="seccion"
            item-text="nombre"
            item-value="id"
            v-model="addItem.seccion"
            search-input
            v-on:change="onChangeSelectAgregar"
            :rules="[v => this.selectValidado || 'Campo Vacío']"
            required
            autocomplete
            label="Seccion"
            single-line
          ></v-select>
        </v-flex>

        <v-flex xs3>
                 <v-subheader>Docente : </v-subheader>
              </v-flex>
              <v-flex xs9>
          <v-select
            :items="docente"
            item-text="nombre"
            item-value="id"
            v-model="addItem.docente"
            search-input
            v-on:change="onChangeSelectAgregar2"
            :rules="[v => this.selectValidado2 || 'Campo Vacío']"
            required
            autocomplete
            label="Docente"
            single-line
          ></v-select>
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
      <!-- Fin Dialog Agregar Asignatura -->

   <!-- Dialog Eliminar Asignatura -->
   <v-dialog v-model="dialogDelete" max-width="500px">
    <v-form @submit.prevent="eliminarAsignatura" ref="fBorrarAsignatura">
   <v-card>
    <v-card-title>
     <span class="headline">¿Estás seguro de eliminar esta Asignatura?</span>
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
           <v-list-tile-title>Seccion</v-list-tile-title>
           <v-list-tile-title class="text-lg-center">:</v-list-tile-title>
           <v-list-tile-title>{{ deleteItem }}</v-list-tile-title>
         </v-list-tile>
         <v-list-tile class="hoverMouse">
           <v-list-tile-title>Docente</v-list-tile-title>
           <v-list-tile-title class="text-lg-center">:</v-list-tile-title>
           <v-list-tile-title>{{ deleteItem }}</v-list-tile-title>
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
   <!-- Fin Dialog Eliminar Asignatura-->

   <!-- Dialog Editar Asignatura -->
   <v-dialog v-model="dialogEdit" max-width="500px">
   <v-form @submit.prevent="editSubCat" ref="fEditarSubCat">
 <v-card>
   <v-card-title>
     <span class="headline">Editar Asignatura</span>
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
            <v-subheader>Seccion : </v-subheader>
         </v-flex>
         <v-flex xs9>
          <v-select
          :items="seccion"
          item-text="nombre"
          item-value="id"
          v-model="editedItem.seccion"
          search-input
          v-on:change="onChangeSelect"
          :rules="[v => this.selectValidado || 'Campo Vacío']"
          required
          autocomplete
          label="Seccion"
          single-line
          ></v-select>
        </v-flex>
        <v-flex xs3>
          <v-subheader>Docente: </v-subheader>
       </v-flex>
       <v-flex xs9>
        <v-select
        :items="docente"
        item-text="nombre"
        item-value="id"
        v-model="editedItem.docente"
        search-input
        v-on:change="onChangeSelect2"
        :rules="[v => this.selectValidado2 || 'Campo Vacío']"
        required
        autocomplete
        label="Docente"
        single-line
        ></v-select>
      </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="clearEditModal">Cancelar</v-btn>
        <v-btn color="blue darken-1" type="submit" flat>Guardar</v-btn>
      </v-card-actions>
    </v-card>
    </v-form>
    </v-dialog>
       <!-- Fin Dialog Editar Asignatura -->

   <!-- Dialog Detalle Asignatura-->
     <v-dialog v-model="dialogDetail" max-width="500px">
     <form @submit.prevent="">
   <v-card>

       <v-card-title><h1> Detalle de Asignatura</h1></v-card-title>
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
           <v-list-tile-title>Seccion</v-list-tile-title>
           <v-list-tile-title class="text-lg-center">:</v-list-tile-title>
           <v-list-tile-title>{{ detailItem }}</v-list-tile-title>
         </v-list-tile>
         <v-list-tile class="hoverMouse">
           <v-list-tile-title>Docente</v-list-tile-title>
           <v-list-tile-title class="text-lg-center">:</v-list-tile-title>
           <v-list-tile-title>{{ detailItem }}</v-list-tile-title>
         </v-list-tile>
       </v-list>
     <v-card-actions>
       <v-spacer></v-spacer>
       <v-btn color="blue darken-1" flat @click.native="cerrarModalDetail">Cerrar</v-btn>
     </v-card-actions>
   </v-card>
    </form>
  </v-dialog>
 <!-- Fin Dialog Detalle Asignatura -->

  <!-- Tabla -->
    <v-card>
    <v-card-title>
        <h1>Asignatura</h1>
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
        <td class="text-xs-center">{{ props.item.seccion.nombre }}</td>
        <td class="text-xs-center">{{ props.item.docente.nombre }}</td>
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
    dialogAdd: false, // prop para abrir y cerrar modal de Agregar Seccion
    dialogEdit: false, // prop para abrir y cerrar modal de Editar Seccion
    dialogDetail: false, // prop para abrir y cerrar modal de Detalle Seccion
    dialogDelete: false, // prop para abrir y cerrar modal de Delete Seccion
    pagination: {}, // paginación de la tabla
    editedIndex: -1,
    deleteIndex: -1,
    seccionSelectID: {},
    seccionSelectIDEdit: {},
    docenteSelectID: {},
    docenteSelectIDEdit: {},
    selectValidado: false,
    selectValidado2: false,
    seccion: [],
    docente: [],
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
      { text: 'Seccion', value: 'idSeccion', width: '25%', align: 'center' },
      { text: 'Docente', value: 'idDocente', width: '25%', align: 'center' },
      { text: 'Opciones', sortable: false, width: '25%', align: 'center' }
    ],
    textoRules: validaciones.textoRules,
    textoRules2: validaciones.textoRules2,
    items: [],
    valid: true,
    addItem: {
      id: 0,
      nombre: ''
    },
    editedItem: { // prop temporal que guarda el objeto a editar o eliminar
      id: 0,
      nombre: '',
      id_seccion: {id: 0},
      id_docente: {id: 0}
    },
    detailItem: {
      id: 0,
      nombre: ''

    },
    deleteItem: {
      id: 0,
      nombre: '',
      seccion: '',
      docente: ''
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

    }
  },
  created () {
    this.initialize()
    this.cargarSelectCat()
    this.cargarSelectCat2()
  },
  methods: {
    onChangeSelect (val) {
      this.editedItem.seccion = val.target.value
    },
    onChangeSelect2 (val) {
      this.editedItem.docente = val.target.value
    },
    onChangeSelectAgregar (val) {
      this.selectValidado = true
    },
    onChangeSelectAgregar2 (val) {
      this.selectValidado2 = true
    },
    cargarSelectCat () {
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
      axios.get(config.API_LOCATION + `/skynet/seccion/`, { headers: { Authorization: AuthStr } }) // petición GET a Categoria para traer a todos los objetos "categoria"que contengan como tipo "insumo"
        .then((response) => {
          this.seccion = response.data
        })
        .catch(e => {
        })
    },
    cargarSelectCat2 () {
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
      axios.get(config.API_LOCATION + `/skynet/docente/`, { headers: { Authorization: AuthStr } }) // petición GET a Categoria para traer a todos los objetos "categoria"que contengan como tipo "insumo"
        .then((response) => {
          this.docente = response.data
        })
        .catch(e => {
        })
    },
    initialize () { // Función que recarga los datos de la Tabla mediante request a la API REST
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
      axios.get(config.API_LOCATION + `/skynet/asignatura/`, { headers: { Authorization: AuthStr } }) // petición GET a Seccion para traer todos los objetos jornada
        .then((response) => {
          //console.log(response.data)
          this.items = response.data
        })
        .catch(e => {
        })
    },
    agregarAsignatura (e) { // función para agregar un nuevo Seccion
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
      var nombre = this.addItem.nombre
      var seccion = this.addItem.seccion
      var docente = this.addItem.docente
      if (this.$refs.fAgregarAsignatura) {
        //console.log(nombre + '**** ' + carrera + '**** ' + jornada)
        axios.post(config.API_LOCATION + '/skynet/asignatura/', { // petición POST a Seccion para agregar
          nombre: '' + nombre + '',
          seccion : {id: seccion},
          docente : {id: docente}
        }, { headers: { Authorization: AuthStr } })
          .then((response) => {
            this.initialize()
            this.dialogAdd = false // cerrar el modal
            this.text = 'Se ha agregado correctamente'
            this.snackbar = true
            this.$refs.fAgregarAsignatura.reset()
            this.selectValidado = false
            this.selectValidado2 = false
          }
          )
      }
    },
    editAsignatura () { // función para editar la Subcategoría
      const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        var id = this.editedItem.id // obtener id del objeto que se desea editar formulario
        var nombre = this.editedItem.nombre // obtener nombre del objeto que se desea editar formulario
        var idSeccion = this.editedItem.seccion
        var idDocente = this.editedItem.docente
        if (this.$refs.fEditarAsignatura.validate()) {
          axios.put(config.API_LOCATION + '/skynet/asignatura' + id + '', {// petición put para editar el tipo
            nombre: '' + nombre + '', id_seccion: { id: idSeccion }, id_docente: { id: idDocente }
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
    eliminarAsignatura (e) {
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
    axios.delete(config.API_LOCATION + '/skynet/asignatura/' + this.deleteItem.id + '', { headers: { Authorization: AuthStr } }) // petición GET a Tipo para traer a todos los objetos "tipo"
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
    this.deleteIndex = this.items.indexOf(item) // obtener posición del array
            this.deleteItem = Object.assign({}, item)
            this.dialogDelete = true
  },
cerrarModalEdit () {
      this.dialogEdit = false
    },
modalDetalle (item) {
//  this.detailItem = this.items.indexOf(item) // obtener posición del array
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
            // this.$refs.fAgregarSubCat.reset()
            this.$refs.fAgregarAsignatura.reset()
            this.selectValidado = false
             this.selectValidado2 = false
          }

  }
}
</script>
