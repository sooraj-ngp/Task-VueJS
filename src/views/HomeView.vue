<template>
  <div class="home">
    <Arithmetic msg="Hello!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Arithmetic from '@/components/ArithmeticOperations.vue'

export default {
  name: 'HomeView',
  components: {
    Arithmetic  
  },
  data(){
    return {
      // name: ''
    }
  }
}
</script>
