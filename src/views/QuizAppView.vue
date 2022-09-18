<template>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200&display=swap"
    rel="stylesheet"
  />
  m
  <center>
    <v-card class="ma-15 text-white" max-width="544" color="#443521">
      <div id="app" style="font-family: 'Montserrat', sans-serif" class="text-white">
        <h1 class="mt-10 ml-10">Quiz App</h1>
        <quiz @quiz-completed="handleQuizCompleted" :key="quizKey" /> <br />
        <custom-modal
          v-show="showModal"
          header="Congratulations!"
          subheader="You've completed your Quiz!"
          :score="score"
          @reload="updateQuiz"
          @close="showModal = false"
        />
      </div>
    </v-card>
  </center>
</template>

<script>
import CustomModal from "./CustomModal.vue";
import Quiz from "./Quiz.vue";
export default {
  components: { Quiz, CustomModal },
  el: "#app",
  data() {
    return {
      quizKey: 0,
      showModal: false,
      score: {
        allQuestions: 0,
        answeredQuestions: 0,
        correctlyAnsweredQuestions: 0,
      },
    };
  },
  methods: {
    handleQuizCompleted(score) {
      this.score = score;
      this.showModal = true;
    },
    updateQuiz() {
      this.showModal = false;
      this.quizKey++;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  line-height: 1.6;
}
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}
.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.quiz-info .question {
  color: #8f8f8f;
  font-size: 1.25rem;
}

.quiz-info.score {
  color: #fff;
  font-size: 1.25rem;
}

.options {
  margin-bottom: 1rem;
}

.option {
  padding: 1rem;
  display: block;
  background-color: grey;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.option:hover {
  background-color: rgb(214, 214, 214);
}

.option.correct {
  background-color: #2cce7d;
}

.option.wrong {
  background-color: #ff5a5f;
}

.option:last-of-type {
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display: none;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}

button:disabled {
  opacity: 0.5;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

p {
  color: #8f8f8f;
  font-size: 1.5rem;
  text-align: center;
}
</style>
