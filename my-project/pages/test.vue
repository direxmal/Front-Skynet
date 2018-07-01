<template>
  <v-container grid-list-md text-xs-center>
    <v-container fluid>
       <v-layout row wrap>
         <v-flex xs12 sm6>
           <v-select
             :items="sala"
             item-value="id"
             item-text="nombre"
             label="Sala"
             autocomplete
           ></v-select>
         </v-flex>
        <v-flex>
          <!-- el primer boton-->
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
        </v-flex>
       </v-layout>
     </v-container>
     <div>
     </div>
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
                   required
                   item-text="nombre"
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
                <v-card-text class="px-0">{{lesson.id + " " + lesson.nombre}}</v-card-text>
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
        timetable: [],
        sala: [],
        carrera: [],
        seccion: [],
        carreraSelectID: {},
        carrerSelectIDEdit: {},
        newLessonNombre: '',
        value: '',
        editedIndex: -1,
        newLessonDay: 0,
        newLessonTimeslot: 0,
        newLessonId: 0,
        days: [
          {
            'id': 1,
            'nombre': 'Lunes'
          },
          {
            'id': 2,
            'nombre': 'Martes'
          },
          {
            'id': 3,
            'nombre': 'Miercoles'
          },
          {
            'id': 4,
            'nombre': 'Jueves'
          },
          {
            'id': 5,
            'nombre': 'Viernes'
          }
        ],
        timeslots: [
          {
            'id': 1,
            'start': '08:30',
            'end': '09:15'
          },
          {
            'id': 2,
            'start': '09:15',
            'end': '10:00'
          },
          {
            'id': 3,
            'start': '10:00',
            'end': '10:45'
          },
          {
            'id': 4,
            'start': '10:45',
            'end': '11:30'
          },
          {
            'id': 5,
            'start': '11:30',
            'end': '12:15'
          },
          {
            'id': 6,
            'start': '12:15',
            'end': '13:00'
          },
          {
            'id': 7,
            'start': '13:00',
            'end': '13:45'
          },
          {
            'id': 8,
            'start': '13:45',
            'end': '13:30'
          },
          {
            'id': 9,
            'start': '13:30',
            'end': '14:15'
          },
          {
            'id': 10,
            'start': '14:15',
            'end': '15:00'
          },
          {
            'id': 11,
            'start': '15:00',
            'end': '15:45'
          },
          {
            'id': 12,
            'start': '15:45',
            'end': '16:30'
          },
          {
            'id': 13,
            'start': '16:30',
            'end': '17:15'
          },
          {
            'id': 14,
            'start': '17:15',
            'end': '18:00'
          }
        ],
        lessons: [],
        asignatura: [],
        addItem: {
        id: 0,
        dia: '',
        rango_hora: '',
        id_asignatura: {id: 0},
        id_sala: {id: 0}
        },
      }
    },
    created () {
      this.cargarSelectSala()
      this.cargarSelectCarrera()
      this.cargarSelectSeccion()
      this.cargarAsignatura()
    },

    methods: {
      agregarHorario (e) { // función para agregar un nuevo Seccion
        console.log("puto");
           var x=1
            const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
            //console.log(this.lessons);
            //console.log("del var: " + cantidad);
            for (var prop in this.lessons) {
               if ( this.lessons.hasOwnProperty(prop) ) {
                   console.log(this.lessons[prop]);

                  const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
                  var dia = this.lessons[prop].day //listo
                  var rango = this.lessons[prop].timeslot_id //listo
                  var asignatura = this.lessons[prop].id //listo
                  //console.log(this.lessons);
                  var sala = 1
                  //console.log(dia + '<dia ' + rango + '<rango ' + asignatura + '<asign ')
                  axios.post(config.API_LOCATION + '/skynet/horario/', { // petición POST a Seccion para agregar
                     dia: '' + dia + '',
                      rangoHora: '' + rango + '',
                      asignatura: {id: asignatura},
                      sala: {id: sala},
                   }, { headers: { Authorization: AuthStr } })
                    .then((response) => {}),console.log("listo")
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
      onChangeSelect (val) {
        this.id = val.target.value
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
        var id_carrera = this.carrera
        const AuthStr = 'Bearer '.concat(this.$store.state.auth.accessToken)
        axios.get(config.API_LOCATION + `/skynet/seccion/`,{headers: { Authorization: AuthStr}  }) // petición GET a Categoria para traer a todos los objetos "categoria"que contengan como tipo "insumo"
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
          })
      },
      addLesson () {
        const newLesson = {
          'nombre': this.newLessonNombre,
          'id': parseInt(this.newLessonIdAsignatura),
          'day': parseInt(this.newLessonDay),
          'timeslot_id': parseInt(this.newLessonTimeslot)
        }
//        console.log(newLesson)
        this.lessons.push(newLesson)

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
