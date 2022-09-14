<template>
<center>
 <v-card
    class="ma-15"
    max-width="544"
 >
  <v-card-title> String Manipulator </v-card-title>

   <v-text-field label="Enter a String" v-model="stringInput"></v-text-field>

   <center><v-btn @click="doCountVowel" color="success">
        Count Vowel
   </v-btn></center>

     <v-card-title>Vowel</v-card-title>
     {{vowelCount}}
     <v-card-title>Consonant</v-card-title>
     {{charCount}}
     <v-card-title>Number</v-card-title>
     {{numCount}}
     <v-card-title>Convert Vowel into *</v-card-title>
     {{convert}}
</v-card>
</center>

</template>

<script setup>
import {ref} from 'vue'

const stringInput = ref('')
const vowelCount = ref(0)
const charCount = ref(0)
const numCount = ref(0)
const convert = ref('')

function doCountVowel () {
     vowelCount.value = stringInput.value.match(/[aeiou]/gi).length;
     charCount.value = stringInput.value.match(/[bcdfghjklmnpqrstvwxyz]/gi).length;
     numCount.value = stringInput.value.match(/[0-9]/gi).length;
     convert.value = stringInput.value.replace(/[aeiou]/gi, "*");
}

</script>
