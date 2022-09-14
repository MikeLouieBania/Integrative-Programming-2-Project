<template>
  <center>
<v-card
  class="ma-15"
  max-width="500"
>
  <v-card-title>Arithmethic Operation</v-card-title>
  <v-text-field label="First Input" v-model.number="fNumber"></v-text-field><br>
  <v-text-field label="Second Input" v-model.number="sNumber"></v-text-field>

  <center><v-btn @click="doSum" color="success">Result</v-btn></center>

    <v-card-title>
      Sum: {{sum}}
    </v-card-title>
    <v-card-title>
      Difference: {{diff}}
    </v-card-title>
    <v-card-title>
      Product: {{prod}}
    </v-card-title>
    <v-card-title>
      Quotient: {{quot}}
    </v-card-title>
</v-card>
</center>

 </template>

<script setup>
  import {ref} from 'vue'

  const fNumber=ref(0)
  const sNumber=ref(0)
  const sum=ref(0)
  const diff=ref(0)
  const prod=ref(0)
  const quot=ref(0)

  function doSum(){
    sum.value = fNumber.value + sNumber.value
    diff.value = fNumber.value - sNumber.value
    prod.value = fNumber.value * sNumber.value
    quot.value = fNumber.value / sNumber.value
  }
</script>



