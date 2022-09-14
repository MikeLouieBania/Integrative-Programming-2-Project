<template>
    <main class="app">
        <h1>Quiz App</h1>

        <section class="quiz" v-if="!quizCompleted">
            <div class="quiz-info">
                <span class="question"> {{getCurrentQuestion.question}} </span>
                <span class="score">Score {{score}} / {{questions.length}}</span>
            </div>

            <div class="options">
                <label
                    v-for= "(option, index) in getCurrentQuestion.options"
                    :key= "index"
                    :class= "`option ${
                        getCurrentQuestion.selected == index
                        ? index == getCurrentQuestion.answer
                            ? 'correct'
                            : 'wrong'
                        : ''
                    } ${
                        getCurrentQuestion.selected != null &&
                        index != getCurrentQuestion.selected
                            ? 'disabled'
                            : ''
                    }` ">

                    <input type="radio"
                    :name="getCurrentQuestion.index" 
                    :value="index"
                    v-model="getCurrentQuestion.selected"
                    :disabled="getCurrentQuestion.selected"
                    @change = "SetAnswer"
                    />
                    <span> {{ option }}</span>
                </label>
            </div>

            <center><v-btn
            @click="NextQuestion"
            :disabled="!getCurrentQuestion.selected"
            > {{
                getCurrentQuestion.index == questions.length - 1
                ? 'Finish'
                : getCurrentQuestion.selected == null
                    ? 'Select an Option'
                    : 'Next Question'
                }}</v-btn></center>
        </section>

        <section v-else>
            <h2>Quiz Finished</h2>
            <p>Your Score is {{score}} / {{questions.length}}</p>
        </section>
    </main>
</template>

<script setup>
    import {ref, computed} from 'vue';

    const questions = ref([
        {
            question: 'Who is the god of Thunder?',
            answer: 1,
            options: [
                'Zeus',
                'Thor',
                'Amaterasu',
                'Ira Lorenzo Llabres'
            ],
            selected: null
        },
        {
            question: 'Who is the Greek Goddess of the hearth?',
            answer: 0,
            options: [
                'Hestia',
                'Aphrodite',
                'Hera',
                'Athena'
            ],
            selected: null
        },
        {
            question: 'What is the Greek Pantheon called?',
            answer: 2,
            options: [
                'Olympus',
                'Olympics',
                'Olympians',
                'Domus Olympus'
            ],
            selected: null
        },
        {
            question: 'Who is the person that blinded Polyphemus?',
            answer: 1,
            options: [
                'Jason',
                'Odysseus',
                'Heracles',
                'Orion'
            ],
            selected: null
        },
        {
            question: 'Who was the ancient Egyptian God of the sun?',
            answer: 2,
            options: [
                'Anubis',
                'Horus',
                'Ra',
                'Slifer the Sky Dragon'
            ],
            selected: null
        },
        {
            question: 'Which day of the week named after a Roman God?',
            answer: 3,
            options: [
                'Tuesday',
                'Friday',
                'Monday',
                'Saturday'
            ],
            selected: null
        },
        {
            question: 'What is the name of the city that Athena won against Poseidon?',
            answer: 0,
            options: [
                'Athens',
                'Delphi',
                'Ithaca',
                'Corinth'
            ],
            selected: null
        },
        {
            question: 'What head does Anubis have?',
            answer: 1,
            options: [
                'Dog',
                'Jackal',
                'Wolf',
                'Lion'
            ],
            selected: null
        },
        {
            question: 'What killed Orion the hunter?',
            answer: 0,
            options: [
                'Scorpion',
                'Lion',
                'Hydra',
                'Titan'
            ],
            selected: null
        },
        {
            question: 'What is the treasure that the Argonauts are finding?',
            answer: 1,
            options: [
                'Aegis',
                'Golden Fleece',
                'Tartarus',
                'Bow and Arrow of Cupid'
            ],
            selected: null
        }
    ])

    const quizCompleted = ref(false)
    const currentQuestion = ref(0)
    const score = computed(() => {
        let value = 0
        questions.value.map(q =>{
            if(q.selected == q.answer) {
                value++
            }
        })
        return value
    })

    const getCurrentQuestion = computed(() => {
        let question = questions.value[currentQuestion.value]
        question.index = currentQuestion.value
        return question
    })

    const SetAnswer = evt => {
        questions.value[currentQuestion.value].selected = evt.target.value
        evt.target.value = null
    }

    const NextQuestion = () => {
        if(currentQuestion.value < questions.value.length -1){
            currentQuestion.value++
        }
        else {
            quizCompleted.value = true
        }
    }
</script>

<style>
    .app {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        min-height: 100vh;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    .quiz {
        background-color: #e07c39;
        padding: 1rem;
        width: 100%;
        max-width: 640px;
        border-radius: 0.5rem;
    }

    .quiz-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    .quiz-info .question {
        color: #000000;
        font-size: 1.25rem;
    }

    .quiz-info .score {
        color: white;
        font-size: 1.25rem;
    }

    .options {
        margin-bottom: 1rem;
    }

    .option {
        display: block;
        padding: 1rem;
        background-color: rgb(236, 177, 128);
        margin-bottom: 0.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .option:hover {
        background-color: rgb(106, 106, 236);
    }

    .option.correct {
        background-color: aqua;
    }

    .option.wrong {
        background-color: rgb(223, 33, 33);
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
</style>