<template>
  <div class="container">
    <div class="correctAnswers">
      You have
      <strong>{{ correctAnswers }} correct {{ pluralizeAnswer }}!</strong>
    </div>
    <div class="correctAnswers">
      Currently at question {{ index + 1 }} of {{ questions.length }}
    </div>

    <h1 v-html="loading ? 'Loading...' : currentQuestion.question"></h1>

    <form v-if="currentQuestion">
      <button
        v-for="answer in currentQuestion.answers"
        :index="currentQuestion.key"
        :key="answer"
        v-html="answer"
        @click.prevent="handleClick"
      ></button>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, toDisplayString } from "vue";
import { auth } from "../firebase";
import DataService from "../services/DataService";
export default {
  data() {
    return {
      questions: [],
      loading: true,
      index: 0,
    };
  },
  computed: {
    currentQuestion() {
      if (this.questions !== []) {
        return this.questions[this.index];
      }
      return null;
    },
    correctAnswers() {
      if (this.questions && this.questions.length > 0) {
        let streakCounter = 0;
        this.questions.forEach(function (question) {
          if (!question.rightAnswer) {
            return;
          } else if (question.rightAnswer === true) {
            streakCounter++;
          }
        });
        return streakCounter;
      } else {
        return "--";
      }
    },
    pluralizeAnswer() {
      // For grammatical correctness
      return this.correctAnswers === 1 ? "Answer" : "Answers";
    },
    quizCompleted() {
      if (this.questions.length === 0) {
        return false;
      }
      /* Check if all questions have been answered */
      let questionsAnswered = 0;
      this.questions.forEach(function (question) {
        question.rightAnswer !== null ? questionsAnswered++ : null;
      });
      return questionsAnswered === this.questions.length;
    },
    score() {
      if (this.questions !== []) {
        return {
          allQuestions: this.questions.length,
          answeredQuestions: this.questions.reduce((count, currentQuestion) => {
            if (currentQuestion.userAnswer) {
              // userAnswer is set when user has answered a question, no matter if right or wrong
              count++;
            }
            return count;
          }, 0),
          correctlyAnsweredQuestions: this.questions.reduce((count, currentQuestion) => {
            if (currentQuestion.rightAnswer) {
              // rightAnswer is true, if user answered correctly
              count++;
            }
            return count;
          }, 0),
        };
      } else {
        return {
          allQuestions: 0,
          answeredQuestions: 0,
          correctlyAnsweredQuestions: 0,
        };
      }
    },
  },
  watch: {
    quizCompleted(completed) {
      completed &&
        setTimeout(() => {
          this.saveHistory();
          this.$emit("quiz-completed", this.score);
        }, 3000);
    },
  },
  methods: {
    saveHistory() {
      const today = new Date();
      var data = {
        averageScore:
          Math.floor(
            (this.score.correctlyAnsweredQuestions / this.score.allQuestions) * 100
          ) + "%",
        timeTaken: this.timeTake,
        timeFinished: today.toGMTString(),
      };
      DataService.create(data)
        .then(() => {
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async fetchQuestions() {
      const taken = new Date();
      this.timeTake = taken.toGMTString();
      this.loading = true;
      //fetching questions from api
      let response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=20&difficulty=hard"
      );
      let index = 0; //To identify single answer
      let data = await response.json();
      let questions = data.results.map((question) => {
        question.answers = [question.correct_answer, ...question.incorrect_answers];
        //shuffle above array
        for (let i = question.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.answers[i], question.answers[j]] = [
            question.answers[j],
            question.answers[i],
          ];
        }
        //add right answers and key
        question.rightAnswer = null;
        question.key = index;
        index++;
        return question;
      });
      this.questions = questions;
      this.loading = false;
    },
    handleClick(e) {
      let index = e.target.getAttribute("index");
      let pollutedUserAnswer = e.target.innerHTML; // innerHTML is polluted with decoded HTML entities e.g ' from &#039;
      /* Clear from pollution with ' */
      let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");
      //set answer
      this.questions[index].userAnswer = userAnswer;
      /* Set class "clicked" on button with userAnswer -> for CSS Styles; Disable other sibling buttons */
      e.target.classList.add("clicked");
      let allButtons = document.querySelectorAll(`[index="${index}"]`);
      for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] === e.target) continue;
        allButtons[i].setAttribute("disabled", "");
      }
      this.checkCorrectAnswer(e, index);
    },
    checkCorrectAnswer(e, index) {
      let question = this.questions[index];
      if (question.userAnswer) {
        if (this.index < this.questions.length - 1) {
          setTimeout(
            function () {
              this.index += 1;
            }.bind(this),
            3000
          );
        }
        if (question.userAnswer === question.correct_answer) {
          /* Set class on Button if user answered right, to celebrate right answer with animation joyfulButton */
          e.target.classList.add("rightAnswer");
          /* Set rightAnswer on question to true, computed property can track a streak out of 20 questions */
          this.questions[index].rightAnswer = true;
        } else {
          /* Mark users answer as wrong answer */
          e.target.classList.add("wrongAnswer");
          this.questions[index].rightAnswer = false;
          /* Show right Answer */
          let correctAnswer = this.questions[index].correct_answer;
          let allButtons = document.querySelectorAll(`[index="${index}"]`);
          allButtons.forEach(function (button) {
            if (button.innerHTML === correctAnswer) {
              button.classList.add("showRightAnswer");
            }
          });
        }
      }
    },
  },
  mounted() {
    this.fetchQuestions();
  },

  setup() {
    const admin = DataService.isAdmin();
    const store = useStore();
    const router = useRouter();
    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });
    const user = computed(() => {
      return store.getters.user;
    });
    const signOut = async () => {
      await store.dispatch("logOut");
      router.push("/login");
    };
    return { user, signOut, admin };
  },
};
</script>

<style scoped>
.container {
  margin: 1rem auto;
  padding: 1rem;
  max-width: 750px;
}
form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
button {
  font-size: 1.1rem;
  box-sizing: border-box;
  padding: 1rem;
  margin: 0.5rem;
  width: 40%;
  background-color: rgba(100, 100, 100, 0.3);
  border: none;
  border-radius: 0.4rem;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
}
button:hover:enabled {
  transform: scale(1.02);
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
button:focus {
  outline: none;
}
button:active:enabled {
  transform: scale(1.05);
}
@keyframes flashButton {
  0% {
    opacity: 1;
    transform: scale(1.01);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
button.clicked {
  pointer-events: none;
}
button.rightAnswer {
  animation: flashButton;
  animation-duration: 700ms;
  animation-delay: 200ms;
  animation-iteration-count: 3;
  animation-timing-function: ease-in-out;
  color: black;
  background: linear-gradient(210deg, rgba(0, 178, 72, 0.25), rgba(0, 178, 72, 0.5));
}
button.wrongAnswer {
  color: black;
  background: linear-gradient(210deg, rgba(245, 0, 87, 0.25), rgba(245, 0, 87, 0.5));
}
button.showRightAnswer {
  animation: flashButton;
  animation-duration: 700ms;
  animation-delay: 200ms;
  animation-iteration-count: 2;
  animation-timing-function: ease-in-out;
  color: black;
  background: linear-gradient(210deg, rgba(0, 178, 72, 0.25), rgba(0, 178, 72, 0.5));
}
</style>
