<template>
  <v-layout column>
    <h1 class="display-2" v-text="bienvenida">Bienvenidos</h1>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      bienvenida: 'Bienvenidos'
    }
  }
}
</script>
