<template>
  <v-app inspire>
    <v-navigation-drawer
        fixed
        clipped
        app
        v-model="drawer"
      >
       <v-card-media src="https://image.ibb.co/jOFjrJ/inacap.png"  height="150px">
       </v-card-media>
         <v-list>
            <v-list-group
              v-model="item.active"
              v-for="item in items"
              :key="item.title"
              :prepend-icon="item.action"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="subItem.to" v-for="subItem in item.items" :key="subItem.title" @click="prueba" >
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>{{ subItem.action }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list>
      </v-navigation-drawer>

    <!--aqui empieza la toolbar -->
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="red darken-2"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3" > <!-- La toolbar-->
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">INACAP</span> <!-- Titulo-->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
         <v-btn slot="activator" @click="sumarUno" icon dark><v-icon>home</v-icon></v-btn> <!-- Este va al inicio-->
        <span>Inicio</span>
      </v-tooltip>
      <v-menu offset-y>
        <v-btn slot="activator" icon dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <!-- La lista de la toolbar-->
        <v-list>
           <v-list-group
             v-model="item.active"
             v-for="item in item"
             :key="item.title"

           >
             <v-list-tile slot="activator">
               <v-list-tile-content>
                 <v-list-tile-title>{{ item.title }}</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>
           </v-list-group>
         </v-list>

    </v-menu>
    </v-toolbar>
    <v-content>
    <v-container>
      <nuxt />
    </v-container>
  </v-content>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        item: [
          { title: 'Mi Perfil' },
          { title: 'Cerrar Sesión' }
        ],
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            action: 'assignment',
            title: 'Crear Horario',
            active: false,
            items: [
              { title: 'Primer Piso', to: '/primerPiso' },
              { title: 'Segundo Piso', to: '/segundoPiso' },
              { title: 'Tercer Piso', to: '/tercerPiso' }
            ]
          },
          {
            action: 'edit',
            title: 'Gestión',
            active: false,
            items: [
              { title: 'Gestión Docentes', to: '/crud/gestionDocente' },
              { title: 'Gestión Asignaturas', to: '/crud/gestionAsignatura' },
              { title: 'Gestión Carreras', to: '/crud/gestionCarrera' },
              { title: 'Gestión Sección', to: '/crud/gestionSeccion' },
              { title: 'Gestión Jornada', to: '/crud/gestionJornada' }
            ]
          }
        ],
        miniVariant: false,
        right: true
      }
    },
    methods: {
      prueba () {
      }
    }
  }
</script>
