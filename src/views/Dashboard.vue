<template>
  <center>
    <VCard class="ma-15" max-width="400">
      <img
        src="https://www.geodirectory.ie/getmedia/8aea6228-e440-4a1a-b1c7-5b4ca1e23c12/Aviva-Home-385x260px"
        height="250"
        width="400"
      />
      <VCardText
        >This is the Home page. This contains the details about the developer of this web
        application.</VCardText
      >
      <VBtn @click="$router.push('/home')">GO TO HOME PAGE</VBtn>
    </VCard>

    <VCard class="ma-15" max-width="400">
      <img
        src="https://www.educationquizzes.com/library/11-Plus-English/11-Plus-English-Alphabetising-b.jpg"
        height="250"
        width="400"
      />
      <VCardText
        >This is the String App page. This is a simple system of counting vowels,
        characters, and numbers from the input of the user. It also converts all vowels
        into *</VCardText
      >
      <VBtn @click="$router.push('/stringApp')">GO TO STRING APP PAGE</VBtn>
    </VCard>

    <VCard class="ma-15" max-width="400">
      <img
        src="https://www.westcountrysen.com/content/uploads/2020/04/AdobeStock_328664569-1-1024x576.jpeg"
        height="250"
        width="400"
      />
      <VCardText
        >This is the Math page. It is a simple program that will let the user input 2
        numbers and will show the Sum, Difference, Product, and Quotient.</VCardText
      >
      <VBtn @click="$router.push('/basicMath')">GO TO MATH PAGE</VBtn>
    </VCard>

    <VCard class="ma-15" max-width="400">
      <img
        src="http://blog.markallenwebdeveloper.co.uk/wp-content/uploads/2019/02/vuetify.png"
        height="250"
        width="400"
      />
      <VCardText
        >This is the Vuetify page. This is a research page about Vuetify.</VCardText
      >
      <VBtn @click="$router.push('/vuetify')">GO TO VUETIFY PAGE</VBtn>
    </VCard>

    <VCard class="ma-15" max-width="400">
      <img
        src="https://th.bing.com/th/id/OIP.nu3oSm6bAp3dMfW_JERm3AHaEc?pid=ImgDet&rs=1"
        height="250"
        width="400"
      />
      <VCardText
        >This is the Quiz App page. This contains a simple quiz application about
        sports.</VCardText
      >
      <VBtn @click="$router.push('/quizAppView')">GO TO QUIZ APP PAGE</VBtn>
    </VCard>
  </center>
</template>

<script setup></script>
