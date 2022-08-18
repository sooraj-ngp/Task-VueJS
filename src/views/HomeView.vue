<template>
  <div class="home">
    <HelloWorld msg="Hello!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/ArithmeticOperations.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data(){
    return {
      name: ''
    }
  }
}
</script>
