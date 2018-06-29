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
          src: 'https://image.ibb.co/bZqCJJ/3.jpg'
        },
        {
          src: 'https://image.ibb.co/io4uXd/4.jpg'
        },
        {
          src: 'https://image.ibb.co/ha4pyJ/2.jpg'
        },
        {
          src: 'https://image.ibb.co/iAW8sd/5.jpg'
        }
      ]
    }
  }
}
</script>
