<template>
  <v-app >

    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="red darken-2"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3" > <!-- La toolbar-->
        <!--<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>  ESTA PARTE DE AQUI ES EL ICONO-->
        <span class="hidden-sm-and-down">INACAP</span> <!-- Titulo-->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
         <v-btn slot="activator" href="/vistaUsuario" icon dark><v-icon>home</v-icon></v-btn> <!-- Este va al inicio-->
        <span>Inicio</span>
      </v-tooltip>
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


    }),
    props: {
      source: String
    }
  }
</script>
