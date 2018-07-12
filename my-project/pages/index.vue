<template>
  <v-carousel hide-controls>
    <div>
        <h1>Bienvenido</h1>
    </div>
    <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i" ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          src: 'https://image.ibb.co/fbTmEo/IMG_20180628_105037_948.jpg'
        },
        {
          src: 'http://img.soy-chile.cl/Fotos/2015/01/08/file_20150108121509.jpg'
        }
      ]
    }
  }
}
</script>
