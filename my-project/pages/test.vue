<template>
  <v-container grid-list-md text-xs-center>
     <!-- SnackBar (mensaje de Success)-->
 <v-snackbar
      :timeout="timeout"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn dark flat @click.native="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
    <!-- Fin de SnackBar-->
    <v-container fluid>
       <v-layout row wrap>
         <v-flex xs12 sm6>
         <v-select
             :items="sala"
             item-value="id"
             item-text="nombre"
             v-model="addItem.sala"
             v-on:change="onChangeSelect"
             search-input
             label="Sala"
             autocomplete
           ></v-select>
         </v-flex>
        <v-flex>
          <!-- el primer boton-->
            <span>Guardar</span>
            <v-tooltip bottom>
                <v-btn slot="activator" type="submit" outline large fab color="primary" @click.native="agregarHorario" ref="fAgregarHorario" >
                  <v-icon>add</v-icon>
                </v-btn>
              <span>Guardar</span>
           </v-tooltip>

             <!-- el segundo boton-->
           <v-tooltip bottom>
               <v-btn slot="activator" outline large fab color="primary" @click.native="limpiarTabla">
                 <v-icon>clear</v-icon>
               </v-btn>
             <span>Limpiar</span>
          </v-tooltip>
             <!-- el tercer boton-->
              <v-tooltip bottom>
               <v-btn slot="activator" outline large fab color="primary" @click.native="dialog = true">
                 <v-icon>delete</v-icon>
               </v-btn>
             <span>Borrar</span>
          </v-tooltip>
          <!-- modal de borrar-->
          <v-layout row justify-center>
       <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color= red darken-3>
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Borrar Horarios</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="alerta">Confirmar</v-btn>

            </v-toolbar-items>

          </v-toolbar>
           <v-data-table
            v-model="selected"
            :headers="headers"
            :items="modal"
            :pagination.sync="pagination"
            select-all
            item-key="id"
            class="elevation-1"
          >
    <template slot="headers" slot-scope="props">
      <tr>
        <th>
          <v-checkbox
            :input-value="props.all"
            :indeterminate="props.indeterminate"
            primary
            hide-details
            @click.native="toggleAll"
          ></v-checkbox>
        </th>
        <th
          v-for="header in props.headers"
          :key="header.text"
          :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
          @click="changeSort(header.value)"
        >
          <v-icon small>arrow_upward</v-icon>
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <tr :active="props.selected" @click="props.selected = !props.selected">
        <td>
          <v-checkbox
            :input-value="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.asignatura.nombre }}</td>
        <td class="text-xs-center">{{ props.item.dia.nombre }}</td>
        <td class="text-xs-center">{{ props.item.rangoHora.start }}</td>
        <td class="text-xs-center">{{ props.item.rangoHora.end }}</td>
        <td class="text-xs-center">{{ props.item.sala.nombre }}</td>
      </tr>
    </template>
  </v-data-table>
          <v-divider></v-divider>
          <v-list three-line subheader>
          </v-list>
        </v-card>
      </v-dialog>
      <!-- dialog 2-->
        <v-dialog v-model="dialog2" max-width="290">
        
      <v-card>
        <v-card-title class="headline">Esta seguro de que desea borrar?</v-card-title>

        <v-card-text>
          Al borrar los datos se eliminan los datos para siempre
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            flat="flat"
            @click="dialog2 = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="red darken-3"
            flat="flat"
            @click="borrarDatos"
          >
            Acepto
          </v-btn>
        </v-card-actions>
      </v-card>
        </v-dialog>
      </v-layout>
        <!-- termino el modal2-->
            <!-- lo demas-->
        </v-flex>
       </v-layout>
     </v-container>
     <div>
     </div>
     <!-- fin del dialog modal y vola-->
    <v-layout row wrap>
      <v-flex xs2>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card dark color= red darken-3>
                <v-card-text class="px-0">Seleccione</v-card-text>
              </v-card>
            </v-flex>
            <v-container fluid>
               <v-layout row wrap>
                 <v-flex xs12>
                   <v-select
                    :items="carrera"
                     item-value="id"
                    item-text="nombre"
                    v-model="addItem.carrera"
                    v-on:change="onChangeSelectCarrera"
                    search-input
                    label="Carrera"
                    autocomplete
           ></v-select>
                 </v-flex>
               </v-layout>
             </v-container>
             <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-select
                      :items="seccion"
                      item-value="id"
                      required
                      item-text="nombre"
                      label="Sección"
                      autocomplete
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            <!-- Aqui va lo del cargar-->
            <v-flex xs12 v-for="lesson in asignatura" :key="lesson.id">
              <v-card draggable="true" @dragstart="startDraggingAvailableLesson($event,lesson)">
              <!--  lesson.nombre + " " + lesson.seccion.nombre + " " + lesson.docente.nombre + " "+ lesson.docente.apellido -->
                <v-card-text class="px-0">{{lesson.nombre + " " + lesson.docente.nombre}}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <!-- empieza la tabla en si-->
      <v-flex xs10>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs2>
              <v-card dark color= red darken-3>
                <v-card-text class="px-0">Hora</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs2 v-for="day in days" :key="day.id">
              <v-card dark color= red darken-3>
                <v-card-text class="px-0">{{ day.nombre }}</v-card-text>
              </v-card>
            </v-flex>
            <template v-for="timeslot in timeslots">
              <v-flex xs2>
                <v-card>
                  <v-card-text class="px-0">{{ timeslot.start + " - " +timeslot.end }}</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs2 v-for="day in days" :key="day.id + '' + timeslot.id">
                <v-card>
                  <v-card-text class="px-0" @drop="dropLesson($event, day, timeslot)" @dragover="allowDrop" v-html="content(day, timeslot )"
                   ></v-card-text>
                </v-card>
              </v-flex>
            </template>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  [draggable] {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    /* Required to make elements draggable in old WebKit */
    -webkit-user-drag: element;
    cursor: move;
    cursor: move;
  }
</style>

<script>
import axios from 'axios' // Modulo para realizar las peticiones
import config from '../config.vue' //conexion
  export default {
    data () {
      return {
        pagination: {
        sortBy: 'id'
      },
      selected: [],
      headers: [
        {
        text: 'ID',
        value: 'id',
        sortable: true,
        width: '25%',
        align: 'center'
      },
      { text: 'Asignatura', value: 'idAsignatura', width: '25%', align: 'center' },
      { text: 'Dia', value: 'idDia', width: '25%', align: 'center' },
      { text: 'Inicio', value: 'idRangoHora', width: '25%', align: 'center' },
      { text: 'Termino', value: 'idRangoHora', width: '25%', align: 'center' },
      { text: 'Sala', value: 'idSala', width: '25%', align: 'center' }
      ],
        timetable: [],
        sala: [],
         snackbar: false,
      color: 'red darken-3',
      mode: '',
      timeout: 3000,
      text: 'Se ha agregado con exito',
        carrera: [],
        seccion: [],
        dialog: false,
        dialog2: false,
        carreraSelectID: {},
        carrerSelectIDEdit: {},
        cargas: [],
        modal: [],
        newLessonNombre: '',
        editedIndex: -1,
        newLessonDay: 0,
        newLessonTimeslot: 0,
        newLessonId: 0,
        guardado: [],
        days: [],
        timeslots: [],
        lessons: [],
        asignatura: [],
        addItem: {
        id: 0,
        id_dia: {id: 0},
        id_rango_hora: {id: 0},
        id_asignatura: {id: 0},
        id_sala: {id: 0}
        },
      }
    },
    created () {
      this.cargarSelectSala()
      this.cargarDias()
      this.cargarRangos()
      this.cargarAsignatura()
      this.cargarSelectCarrera()
    },

    methods: {
      alerta(){
        //console.log("holens")
        this.dialog2 = true
        //console.log(this.dialog2)
      },
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.modal.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      onChangeSelect (val) {
        this.initialize()
        this.cargarModal()
      },
      onChangeSelectCarrera (val) {
        this.cargarSelectSeccion()
      },
      cargarDias(){
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
      axios.get(config.API_LOCATION + `/skynet/dia/`, { headers: { Authorization: AuthStr } }) // petición GET a Seccion para traer todos los objetos jornada
        .then((response) => {
          //console.log(response.data)
          this.days = response.data
        })
        .catch(e => {
        })
      },
      cargarRangos(){
         const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
      axios.get(config.API_LOCATION + `/skynet/timeslot/`, { headers: { Authorization: AuthStr } }) // petición GET a Seccion para traer todos los objetos jornada
        .then((response) => {
          //console.log(response.data)
          this.timeslots = response.data
        })
        .catch(e => {
        })

      },
       initialize () { // Función que recarga los datos de la Tabla mediante request a la API REST
        console.log("entraste a las cargas");
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        this.limpiarTabla()
        var sala = this.addItem.sala
        //console.log("estas son las salas: " + sala)
        axios.get(config.API_LOCATION + `/skynet/horario/sala/` + sala, { headers: { Authorization: AuthStr } }) // petición GET a Seccion para traer todos los objetos jornada
        .then((response) => {
          this.cargas = response.data
          console.log("esto viene: " + this.cargas.length);
           for (var prop in this.cargas) {
               if ( this.cargas.hasOwnProperty(prop) ) {
                    const newLesson = {
                   'nombre': this.cargas[prop].asignatura.nombre,
                   'docente': this.cargas[prop].asignatura.docente.nombre,
                    'id': parseInt(this.cargas[prop].id),
                    'day': parseInt(this.cargas[prop].dia.id),
                    'timeslot_id': parseInt(this.cargas[prop].rangoHora.id)
                    }
                    console.log("listo")
              //console.log(newLesson)
              this.lessons.push(newLesson)
               }
            }

        })
        .catch(e => {
          console.log(e)
        })
    },
    cargarModal () { // Función que recarga los datos de la Tabla mediante request a la API REST
        console.log("entraste a las cargas del modal");
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        var sala = this.addItem.sala
        //console.log("estas son las salas: " + sala)
        axios.get(config.API_LOCATION + `/skynet/horario/sala/` + sala, { headers: { Authorization: AuthStr } }) // petición GET a Seccion para traer todos los objetos jornada
        .then((response) => {
          this.modal = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
      agregarHorario (e) { // función para agregar un nuevo Seccion
        console.log("puto");
           var x=1
            const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
            //console.log(this.guardado);
            //console.log("del var: " + cantidad);
            for (var prop in this.guardado) {
               if ( this.guardado.hasOwnProperty(prop) ) {
                   console.log(this.guardado[prop]);

                  const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
                  var dia = this.guardado[prop].day //listo
                  var rango = this.guardado[prop].timeslot_id //listo
                  var asignatura = this.guardado[prop].id //listo
                  //console.log(this.guardado);
                  var sala = 1
                  //console.log(dia + '<dia ' + rango + '<rango ' + asignatura + '<asign ')
                  axios.post(config.API_LOCATION + '/skynet/horario/', { // petición POST a Seccion para agregar
                     dia: {id: dia},
                     rangoHora: {id: rango},
                      asignatura: {id: asignatura},
                      sala: {id: sala},
                   }, { headers: { Authorization: AuthStr } })
                    .then((response) => {
                      this.initialize()
                      var table = this.guardado
                      table.splice(0,table.length)
                      this.snackbar = true
                      this.text = 'Se ha agregado correctamente'
                    }),console.log("listo")
                }
            }
      },
  
      limpiarTabla (){ //para borrar lo de la tabla, pero falta pasarle los datos
        var table = this.lessons
        //console.log("wena wacho perro, pulsaste el boton")
        //console.log(this.lessons)
        table.splice(0,table.length)
        console.log(this.lessons)
      },
      borrarDatos (){
        this.dialog2 = false
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        for (var prop in this.lessons) {
               if ( this.selected.hasOwnProperty(prop) ) {
                   console.log(this.selected[prop]);
                  const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
                  var idBorrar = parseInt(this.selected[prop].id) //listo
                  console.log("id: " + idBorrar)
                  axios.delete(config.API_LOCATION + '/skynet/horario/' + idBorrar + '', { headers: { Authorization: AuthStr } }) // petición GET a Tipo para traer a todos los objetos "tipo"
                    .then((response) => {
                    this.initialize()
                    this.cargarModal()
                      })
                      .catch(e => {
                        })
                 
                }
                console.log("listeilor")
            }
    

      },
      cargarSelectSala () {
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        axios.get(config.API_LOCATION + `/skynet/sala/piso1`, { headers: { Authorization: AuthStr } }) // petición GET a Categoria para traer a todos los objetos "categoria"que contengan como tipo "insumo"
          .then((response) => {
            this.sala = response.data
          })
          .catch(e => {
          })
      },
      cargarSelectCarrera () {
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        axios.get(config.API_LOCATION + `/skynet/carrera/`, { headers: { Authorization: AuthStr } }) // petición GET a Categoria para traer a todos los objetos "categoria"que contengan como tipo "insumo"
          .then((response) => {
            this.carrera = response.data
          })
          .catch(e => {
          })
      },
      cargarSelectSeccion() {
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        var carrera = this.addItem.carrera
        console.log("estas son las carreras: " + carrera)
        axios.get(config.API_LOCATION + `/skynet/horario/carrera/` + carrera, {headers: { Authorization: AuthStr}  }) // petición GET a Categoria para traer a todos los objetos "categoria"que contengan como tipo "insumo"
          .then((response) => {
            this.seccion = response.data
          })
          .catch(e => {
          })
      },
      cargarAsignatura() {
        //console.log('WENAA loquete')
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        axios.get(config.API_LOCATION + `/skynet/asignatura/`, { headers: { Authorization: AuthStr } }) // petición GET a Categoria para traer a todos los objetos "categoria"que contengan como tipo "insumo"
          .then((response) => {
            //console.log('WENAAAAA!!')
            this.asignatura = response.data
          })
          .catch(e => {
            console.log(e)
          })
      },
      addLesson () {
        if (!this.id == this.lessons.id) {
          alert('ASIGNATURA DUPLICADA')
        }
        const newLesson = {
          'nombre': this.newLessonNombre,
          'docente': this.newLessonDocente,
          'id': parseInt(this.newLessonIdAsignatura),
          'day': parseInt(this.newLessonDay),
          'timeslot_id': parseInt(this.newLessonTimeslot)
        }
//        console.log(newLesson)
        this.lessons.push(newLesson)
        this.guardado.push(newLesson)

      },

      //aqui termina el add
      content (day, timeslot) { //contenido de toda la cuestion
  //      console.log('Day:')
  //      
//        console.log('Timeslot:')
//        console.log(timeslot.start)
//        console.log(timeslot.id)
        const lesson = this.lessons.find(function (lesson) {
          return lesson.day === day.id && lesson.timeslot_id === timeslot.id
        })
        return lesson ? lesson.nombre : '&nbsp;'
      },
      allowDrop (e) {
        e.preventDefault()
      },
      dropLesson (e, day, timeslot) {
//        console.log(e)
        const lesson = JSON.parse(e.dataTransfer.getData('lesson'))
//        console.log('Lesson is:', lesson)
//       
//        console.log('Lesson id:', lesson.id)
      //  console.log('Lesson By id:', this.getLessonById(lesson.id))
        // Remove lesson from available asignatura:
        //esta mierda saca los datos de donde estan chantadas las weas
      //(esta wea pa que no se acaben los datas)  this.asignatura.splice(this.availableLessons.indexOf(this.getLessonById(lesson.id)), 1)
      //  console.log('DAY:')
      //  console.log(day)
//        console.log(day.id)
//        console.log('TIMESLOT:')
//        console.log(timeslot)
//        console.log(timeslot.id)
        this.newLessonNombre = lesson.nombre
        this.newLessonDocente = lesson.docente.nombre
        this.newLessonDay = day.id
        this.newLessonTimeslot = timeslot.id
        this.newLessonIdAsignatura = lesson.id
        this.addLesson()
      },
      getLessonById (id) {
        return this.asignatura.find(function (lesson) {
          return lesson.id === id
        })
      },
      startDraggingAvailableLesson (e, lesson) {
//        console.log('Starting drag lesson:')
//       
//        console.log(lesson)
//        console.log('Event:')
//        console.log(e)
        this.newLessonId = lesson.id
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('lesson', JSON.stringify(lesson))
      }
    }
  }
</script>
