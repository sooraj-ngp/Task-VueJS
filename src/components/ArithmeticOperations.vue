<template>
  <div>
    <div class="hello">
      <button @click="display">{{nameClick ? "Cancel" : "Display name"}}</button>
      <button @click="arith">{{arithClick ? "Cancel" : "Arithmetic Operations"}}</button>
      <div v-if="nameClick">
        <h2>Display name</h2>
        <input type="text" v-model="name"><br><br>
        <p>Hello {{name}}!</p><br><br>
      </div>
      <div v-if="arithClick">
        <h2>Arithmetic Operations</h2>
        <input type="number" v-model="number1" placeholder="Number 1"><br><br>
        <input type="number" v-model="number2" placeholder="Number 2"><br><br>
        <button @click="add">Add</button>
        <button @click="sub">Subtract</button>
        <button @click="mul">Multiply</button>
        <button @click="div">Divide</button>
        <p v-if="result>0" class="positive">{{ resultString }} {{ result }}</p>
        <p v-else-if="result<0" class="negative">{{ resultString }} {{ result }}</p>
        <p v-else>{{ resultString }}{{result}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: '',
      arithClick: false,
      nameClick: false,
      number1: '',
      number2: '',
      result: 0,
      resultString: '',
      sum: '',
      diff: '',
      prod: '',
      quot: ''
    }
  },
  methods:{
    add(){
      this.result = (Number(this.number1)+Number(this.number2))
      console.log(this.result);
      this.resultString = "Sum :"
    },
    sub(){
      this.result = (this.number1-this.number2)
      this.resultString = "Difference :"
    },
    mul(){
      this.result = (this.number1*this.number2)
      this.resultString = "Product :"
    },
    div(){
      this.resultString = ''
      if(this.number2 != 0){
        this.result = (this.number1/this.number2)
        this.resultString = "Quotient :"
      }
      else
        this.result = 'Divisor cannot be 0'
    },
    display(){
      this.nameClick = !this.nameClick
      this.arithClick = false
    },
    arith(){
      this.arithClick = !this.arithClick
      this.nameClick = false 
      this.resultString = ''
      this.result = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p{
  font-weight: bold;
  font-size: larger;
}
button{
  margin-left: 3px;
}
div{
  margin-top: 5%;
}
button{
  font-size: medium;
}
.positive{
  color: blue; 
}
.negative{
  color: green;
}
</style>
