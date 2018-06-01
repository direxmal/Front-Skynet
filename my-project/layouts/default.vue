<template>
  <v-app inspire>
    <v-navigation-drawer
      clipped
      v-model="drawer"
      fixed
      app
    >
      <v-list dense
        router
         :to="item.to"
         :key="i"
         v-for="(item, i) in items"
         exact >
        <v-card-media src="https://image.ibb.co/jOFjrJ/inacap.png" height="150px"> <!-- la imagen de la navbar-->
        </v-card-media>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading"> <!--Carga todo lo de las listas -->
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
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
         <v-btn slot="activator" icon dark><v-icon>home</v-icon></v-btn> <!-- Este va al inicio-->
        <span>Inicio</span>
      </v-tooltip>
      <v-menu offset-y>
        <v-btn slot="activator" icon dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
      <v-list>
        <v-list-tile v-for="(item, index) in item" :key="index" @click=""> <!-- modal que se despliega el modal-->
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
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
    data: () => ({
      dialog: false,
      drawer: null,
      items: [

        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Gestión de Salas',
          model: false,
          children: [

            { text: 'Primer Piso', to: '/primerPiso' },
            { text: 'Segundo Piso' },
            { text: 'Tercer Piso' }
          ]
        }
      ],
      item: [
        { title: 'Mi Perfil' },
        { title: 'Cerrar Sesión' }
      ],
      miniVariant: false
    }),
    props: {
      source: String
    }
  }
</script>
