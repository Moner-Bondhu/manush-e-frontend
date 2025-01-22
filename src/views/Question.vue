<template>
    <ion-page>
        <ion-header class="">
            <ion-toolbar class="">
                <ion-buttons slot="">
                    <ion-back-button default-href="/"></ion-back-button>
                    <!-- <ion-img src="/public/mb-logo.svg" class="w-[70px] mx-auto "></ion-img> -->
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding bg-red-100">
            <h3 v-if="scale" class="my-0 text-xl text-center mb-8">{{ scale.name }}</h3>
            <!-- <div class="bg-gray-100 p-5 rounded-xl">
                <div class="flex justify-between">
                    <p class="text-xs font-semibold">01 Question</p>
                    <p class="text-xs">3 of 9</p>

                </div>
                <p>= = = = = = = = = = = </p>
                <p class="text-xs mb-8">3 of 9 Questions</p>

                <h3 class="my-0 text-2xl">What is your name?</h3>
                <br>

                <p class="text-xs my-2">Choose your answer </p>
                <div class="grid grid-cols-2 gap-2">
                    <button class="bg-gray-200 text-black w-full px-8 py-2 rounded-xl text-sm">Unlock</button>
                    <button class="bg-gray-200 text-black w-full px-8 py-2 rounded-xl text-sm">Unlock</button>
                    <button class="bg-gray-200 text-black w-full px-8 py-2 rounded-xl text-sm">Unlock</button>
                    <button class="bg-gray-200 text-black w-full px-8 py-2 rounded-xl text-sm">Unlock</button>

                </div>
            </div> -->

            <div class="w-full  rounded-full h-2.5 ">
                <div class="bg-red-600 h-1 " style="width: 45%"></div>
            </div>
            <p v-if="scale" class="text-xs mb-8">{{ currentQuestionIndex + 1 }} of {{ scale.questions.length }} Questions</p>

            <ProgressBar v-if="scale" :number="currentQuestionIndex + 1" :maxStars="scale.questions.length" />

            <template v-if="scale && scale.questions[currentQuestionIndex]">
        <div class="question-container">
            <div class="bg-red-100 py-12 text-center rounded-xl">
                <h3 class="my-0 text-2xl">
                    {{ scale.questions[currentQuestionIndex].text }}
                </h3>
            </div>
            <br>
          <p v-if="scale.questions[currentQuestionIndex].subtext">{{ scale.questions[currentQuestionIndex].subtext }}</p>
          
          <!-- Render options -->
          <template v-if="scale.questions[currentQuestionIndex].type === 'select_one'">
            <ul class="options grid grid-cols-2 gap-2">
              <li v-for="option in scale.questions[currentQuestionIndex].options" :key="option.id">
                <input 
                  class="hidden peer"
                  type="radio" 
                  :id="`option-${option.id}`" 
                  :name="`question-${scale.questions[currentQuestionIndex].id}`"
                  :value="option.value"
                  v-model="answers[scale.questions[currentQuestionIndex].id]"
                  @change="recordAnswer(scale.questions[currentQuestionIndex].id, option.value)"
                />
                <label class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer" :for="`option-${option.id}`">{{ option.text }}</label>
              </li>
            </ul>
          </template>
          
          <template v-else-if="scale.questions[currentQuestionIndex].type === 'select_multiple'">
            <ul class="options grid grid-cols-2 gap-2">
              <li v-for="option in scale.questions[currentQuestionIndex].options" :key="option.id">
                <input 
                  class="hidden peer"
                  type="checkbox" 
                  :id="`option-${option.id}`" 
                  :value="option.value"
                  :checked="answers[scale.questions[currentQuestionIndex].id]?.includes(option.value)"
                  @change="toggleMultipleChoiceAnswer(scale.questions[currentQuestionIndex].id, option.value, $event.target.checked)"

                />
                <label class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-blue-500 peer-checked:text-white cursor-pointer" :for="`option-${option.id}`">{{ option.text }}</label>
              </li>
            </ul>
          </template>
          
          <template v-else-if="scale.questions[currentQuestionIndex].type === 'text'">
            <input 
              type="text" 
              class="text-input" 
              v-model="answers[scale.questions[currentQuestionIndex].id]"
              @input="recordAnswer(scale.questions[currentQuestionIndex].id, $event.target.value)"
            />
          </template>

          <template v-else-if="scale.questions[currentQuestionIndex].type === 'slider'">
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="1" 
              v-model="answers[scale.questions[currentQuestionIndex].id]"
              @input="recordAnswer(scale.questions[currentQuestionIndex].id, $event.target.value)"
            />
          </template>
        </div>

        <!-- Navigation Buttons -->
        <div class="navigation">
          <ion-button @click="prevQuestion" :disabled="currentQuestionIndex === 0">Previous</ion-button>
          <ion-button @click="nextQuestion">Next</ion-button>
        </div>
      </template>



        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import ProgressBar from '@/components/ProgressBar.vue';

const scale = ref<any>(null);
const selectedScale = ref();
const questions = ref([]); // Holds all questions fetched from the API
const currentQuestionIndex = ref(0);
const answers = ref<Record<number, any>>({}); // Answers keyed by question ID

// Define types
interface Option {
  id: number;
  text: string;
  is_image?: string;
  value: number;
  order: number;
}

interface Question {
  id: number;
  text: string;
  subtext?: string | null;
  image?: string | null;
  type: "select_one" | "select_multiple" | "slider" | "text";
  order: number;
  options: Option[];
}

interface Scale {
  id: number;
  name: string;
  questions: Question[];
}

onMounted(() => {
    if (typeof router.currentRoute.value.params.id === 'string') {
        selectedScale.value = router.currentRoute.value.params.id;
        fetchScales(selectedScale.value);
    } else {
        console.log("Something went wrong");
    }
});

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

const fetchScales = async (id: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/scale/${id}`, 
            {headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
        });
        scale.value = response.data.data;        
  } catch (error) {
    console.error('Error fetching scale data:', error);
  }
};

const recordAnswer = (questionId: number, answer: any) => {
  answers.value[questionId] = answer;
};

const toggleMultipleChoiceAnswer = (questionId: number, value: any, isChecked: boolean) => {
  const currentAnswers = answers.value[questionId] || [];
  if (isChecked) {
    answers.value[questionId] = [...currentAnswers, value];
  } else {
    answers.value[questionId] = currentAnswers.filter((v: any) => v !== value);
  }
};

const sendAnswer = async () => {
    const currentQuestion = scale.value.questions[currentQuestionIndex.value];
    const answer = answers.value[currentQuestion.id];
    let payload = {};
    if(currentQuestion.type === 'select_one'){
        const chosenOption = currentQuestion.options.find(
            (option: Option) => option.value === answer
            );

            if (chosenOption) {
            payload = { option_id: chosenOption.id };
            } else {
            console.error("Chosen option not found!");
            return;
            }
    } else if (currentQuestion.type === 'select_multiple'){
        payload = { text_answer: answer.toString() };
    } else if (currentQuestion.type === 'text'){
        payload = { text_answer: answer }
    } else if (currentQuestion.type === 'slider'){
        payload = { numeric_answer: answer }
    }
    console.log(payload);
    const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/question/respond/${currentQuestion.id}`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` } }
    );
}

const nextQuestion = async () => {
  if (currentQuestionIndex.value < (scale.value?.questions.length || 0) - 1) {
    await sendAnswer();
    currentQuestionIndex.value++;
  } else {
    await sendAnswer();
    await submitAnswers();
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const submitAnswers = async () => {
    const profile = scale.value.visible_to;
    router.push({ name: 'Dashboard', query: { profile, refresh: Date.now() } });
};

const router = useRouter();
</script>

<style scoped>
* {
    font-family: 'Poppins', sans-serif !important;
}
</style>