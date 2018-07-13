<template>
  <v-container grid-list-md text-xs-center>
    <v-container fluid>
       <v-layout row wrap>
         <v-flex xs12 sm5>
         <v-select
             :items="jornada"
             item-text="nombre"
             item-value="id"
             value=""
             v-model="addItem.jornada"
             search-input
             v-on:change="onChangeSelect2"
             required
             label="Jornada"
             autocomplete
             single-line 
           ></v-select>
         </v-flex>
         <v-flex xs12 sm5>
         <v-select
             :items="sala"
             item-text="nombre"
             item-value="id"
             value=""
             v-model="addItem.sala"
             search-input
             v-on:change="onChangeSelect"
             required
             label="Sala"
             autocomplete
             single-line 
           ></v-select>
         </v-flex>
         <v-flex xs12 sm2>
          <div>
            <v-btn large round color="error" @click.native="dialog = true">Detalle</v-btn>
          </div>
          <!-- modal de detalle-->
            <v-layout row justify-center>
       <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>         
          <v-toolbar dark color= red darken-3>
            <v-btn icon dark large @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Detalle</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
    <template>
     <v-data-table
        :headers="headers"
        :items="cargas"
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator">
              {{ props.header.text }}
            </span>
            <span>
            {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.asignatura.nombre }}</td>
         <td class="text-xs-center">{{ props.item.asignatura.docente.nombre + " " +  props.item.asignatura.docente.apellido }}</td>
         <td class="text-xs-center">{{ props.item.rangoHora.start }}</td>
          <td class="text-xs-center">{{ props.item.rangoHora.end  }}</td>
        </template>
      </v-data-table>
    </template>
          
        </v-card>
      </v-dialog>
      <!-- dialog 2-->
      </v-layout>
         </v-flex>
      </v-layout>
      <v-flex>
       
          <v-layout>
            <!-- Aqui va lo del cargar-->
            <v-flex xs12 v-for="lesson in asignatura" :key="lesson.id">
              <v-card draggable="true" @dragstart="startDraggingAvailableLesson($event,lesson)">
              <!--  lesson.nombre + " " + lesson.seccion.nombre + " " + lesson.docente.nombre + " "+ lesson.docente.apellido -->
                <v-card-text class="px-0">{{lesson.nombre + " " + lesson.docente.nombre}}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
           </v-flex>
        </v-container>
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
   layout: 'vistaUsuarioUser',
    data () {
      return {
        timetable: [],
        sala: [],
         snackbar: false,
      color: 'red darken-3',
      mode: '',
      timeout: 3000,
      text: 'Se ha agregado con exito',
        carrera: [],
         headers: [
        {
        text: 'Nombre Asignatura',
        value: 'idAsignatura',
        sortable: true,
        width: '25%',
        align: 'center'
      },

      { text: 'Docente', value: '', width: '25%', align: 'center' },
      { text: 'Inicio', value: 'idRangoHora', width: '25%', align: 'center' },
      { text: 'Termino', value: 'idRangoHora', width: '25%', align: 'center' }
      ],
        seccion: [],
        dialog: false,
        carreraSelectID: {},
        carrerSelectIDEdit: {},
        cargas: [],
        jornada: [],
        modal: [],
        value: '',
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
      this.cargarSelectJornada()
    },

    methods: {
      onChangeSelect (val) {
        console.log("cambiado los selects: " + val);
        this.initialize(val)
      },
      onChangeSelect2 (val) {
        console.log("cambiado los selects jornada: " + val);
        this.cargarRangos(val)
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
      cargarRangos(val){
         const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
      axios.get(config.API_LOCATION + `/skynet/timeslot/jornada/` + val, { headers: { Authorization: AuthStr } }) // petición GET a Seccion para traer todos los objetos jornada
        .then((response) => {
          //console.log(response.data)
          this.timeslots = response.data
        })
        .catch(e => {
        })

      },
       initialize (val) { // Función que recarga los datos de la Tabla mediante request a la API REST
        console.log("Holi "+ val);
        console.log("wena wnea")
        console.log("entraste a las cargas");
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        this.limpiarTabla()
        axios.get(config.API_LOCATION + `/skynet/horario/sala/` + val, { headers: { Authorization: AuthStr } }) // petición GET a Seccion para traer todos los objetos jornada
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
      limpiarTabla (){ //para borrar lo de la tabla, pero falta pasarle los datos
        var table = this.lessons
        //console.log("wena wacho perro, pulsaste el boton")
        //console.log(this.lessons)
        table.splice(0,table.length)
        console.log(this.lessons)
      },
      cargarSelectSala () {
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        axios.get(config.API_LOCATION + `/skynet/sala/piso1`, { headers: { Authorization: AuthStr } }) // petición GET a Categoria para traer a todos los objetos "categoria"que contengan como tipo "insumo"
          .then((response) => {
            //alert(JSON.stringify(response.data));
            this.sala = response.data
          })
          .catch(e => {
          })
      },
      cargarSelectJornada () {
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        axios.get(config.API_LOCATION + `/skynet/jornada/`, { headers: { Authorization: AuthStr } }) // petición GET a Categoria para traer a todos los objetos "categoria"que contengan como tipo "insumo"
          .then((response) => {
            //alert(JSON.stringify(response.data));
            this.jornada = response.data
          })
          .catch(e => {
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
