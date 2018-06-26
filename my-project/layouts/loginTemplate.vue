<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md3>
            <v-card class="elevation-12">
              <H1>LOGIN</H1>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Usuario" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Contraseña" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-flex xs12 sm12 md12>
                <v-spacer></v-spacer>
                <v-btn block color="secondary" dark>Login</v-btn>
              </v-flex>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<!-- :src="require('@/assets/images/fondo.jpg')" -->
<template>
  <v-app id="inspire">
    <v-card-media  :src="require('@/assets/style/ColorSunnyOfficeBackground.png')"  height="100%" width:="100%">
    <v-content>
      <div class="text-xs-center">
        <v-btn round color=red darken-3 dark @click="logearseUser">Iniciar como Usuario</v-btn>
      </div>
      <v-container fluid fill-height>
          <v-layout align-center justify-center>
          <v-flex xs12 sm3>
            <v-card class="elevation-12">
              <v-toolbar color= red darken-3 dark>

                  <v-toolbar-title style="font-size:16px;">SKYNET</v-toolbar-title>
                    <v-spacer></v-spacer>
            </v-toolbar>
            <v-form @submit.prevent="logearse">
              <v-card-text>

                  <v-text-field prepend-icon="person" id="user" name="login" label="Usuario" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" id="password" name="password" label="Contraseña" type="password"></v-text-field>

              </v-card-text>
              <v-card-actions>
                <v-flex xs12 sm12 md12>
                <v-spacer></v-spacer>
                <v-btn block color= red darken-3 dark type="submit">Entrar</v-btn>
                <!--
                <v-btn block color="blue" dark @click="postLogin">Prueba</v-btn>
                -->
              </v-flex>
              </v-card-actions>
              </v-form>
            </v-card
          </v-flex>
          </v-flex>
          </v-layout>
      </v-container>
    </v-content>
    </v-card-media>
  </v-app>
</template>

<script>
import axios from 'axios'
import Cookie from 'js-cookie'
// Modulo para realizar las peticiones
  import config from '../config.vue'
  export default {

    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    },
    methods: {
      logearse () {
        var user = document.getElementById('user').value
        var password = document.getElementById('password').value
      //  console.log(user + '**** ' + password)
        axios.post(config.API_LOCATION + `/auth`,
         { username: user,
	          password: password }) // petición GET a Tipo para traer a todos los objetos "tipo"
          .then((response) => {
            console.log("tomado")
            console.log(response)
            alert('BIENVENIDO')
            //this.setJwtToken(response.data.token)
            const auth = {
              accessToken: response.data.token
            }
            this.$store.commit('update', auth) // mutating to store for client rendering
            Cookie.set('auth', auth) // saving token in cookie for server rendering
            this.$router.push('/')
            //window.location.replace('http://localhost:3000/')
            //this.$store.commit('setearToken', '' + response.data.token + '')
            //var token = this.getJwtToken()
            //console.log(token)
            /*
            window.location.replace('http://localhost:3000/')
            */
              /*
              axios.get(config.API_LOCATION + '/user', { headers: { "Authorization": "Bearer " + token }})
                .then((response) => {
                  response.data.authorities
                })
                .catch(e => {
                })
              */
          })

        /*
        if (user === 'admin' && password === 'admin') {

          window.location.replace('http://localhost:3000/')
        } else {
          alert('Clave o Usuario Incorrecto')
        }
        */
      },
      logearseUser () {
        var user = "user"
        var password = "password"
        console.log(user + '**** ' + password)
        axios.post(config.API_LOCATION + `/auth`,
         { username: user,
            password: password }) // petición GET a Tipo para traer a todos los objetos "tipo"
          .then((response) => {
            console.log("tomado")
            console.log(response)
            alert('BIENVENIDO Usuario')
            //this.setJwtToken(response.data.token)
            const auth = {
              accessToken: response.data.token
            }
            this.$store.commit('update', auth) // mutating to store for client rendering
            Cookie.set('auth', auth) // saving token in cookie for server rendering
            this.$router.push('/vistaUsuario')
            //window.location.replace('http://localhost:3000/')
            //this.$store.commit('setearToken', '' + response.data.token + '')
            //var token = this.getJwtToken()
            //console.log(token)
            /*
            window.location.replace('http://localhost:3000/')
            */
              /*
              axios.get(config.API_LOCATION + '/user', { headers: { "Authorization": "Bearer " + token }})
                .then((response) => {
                  response.data.authorities
                })
                .catch(e => {
                })
              */
          })

        /*
        if (user === 'admin' && password === 'admin') {

          window.location.replace('http://localhost:3000/')
        } else {
          alert('Clave o Usuario Incorrecto')
        }
        */
      },
      postLogin () {
      setTimeout(() => {
        const auth = {
          accessToken: 'someSddddddddddddddddddddddddddddddddtringGotFromApiServiceWithAjax'
        }
        this.$store.commit('update', auth) // mutating to store for client rendering
        Cookie.set('auth', auth) // saving token in cookie for server rendering
        this.$router.push('/')
      }, 1000)
    },
      prueba () {

      },
      getJwtToken() {
        var TOKEN_KEY = "jwtToken"
        //console.log(localStorage.getItem(TOKEN_KEY)) Imprime el Token
        return localStorage.getItem(TOKEN_KEY)

      },
      setJwtToken(token) {
           var TOKEN_KEY = "jwtToken"
           //store(TOKEN_KEY, token)
           //alert('asd')
          localStorage.setItem(TOKEN_KEY, token)
      },
      removeJwtToken() {
          var TOKEN_KEY = "jwtToken"
          localStorage.removeItem(TOKEN_KEY)
      }
    }
  }
</script>
