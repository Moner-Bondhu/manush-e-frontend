<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="">
          <ion-back-button default-href="/" style="color: #FF3D3D;"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding bg-white">
      <h3 v-if="scale" class="my-0 text-2xl font-semibold text-center mb-4">{{ scale.name }}</h3>

      <p v-if="scale" class="text-sm font-regular mb-1 text-[#FF3D3D]">
        ({{ toBangla(currentQuestionIndex + 1) }}/{{ toBangla(scale.questions.length) }} প্রশ্ন)
      </p>

      <div class="flex flex-row max-w-full gap-5">
        <ProgressBar v-if="scale" :number="currentQuestionIndex + 1" :maxStars="scale.questions.length" />
        <div>
          <p class="ml-auto text-sm font-regular text-white w-fit h-7 bg-[#FF5D5D] px-2 py-1 rounded-lg text-nowrap inline-flex items-center">
            <svg :width="16" :height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="white" stroke="white">
              </path>
            </svg>
            তোমার পয়েন্ট: {{ toBangla(currentQuestionIndex + 1) }}
          </p>
        </div>
      </div>

      <template v-if="scale && scale.questions[currentQuestionIndex]">
        <div class="question-container py-4">
          <div class="bg-red-100 py-6 px-6 text-center rounded-xl">
            <h3 class="my-0 text-xl font-semibold">
              {{ scale.questions[currentQuestionIndex].text }}
            </h3>
          </div>

          <br>
          <p v-if="scale.questions[currentQuestionIndex].subtext">{{ scale.questions[currentQuestionIndex].subtext }}</p>

          <template v-if="scale.questions[currentQuestionIndex].type === 'select_one'">
            <ul class="options flex flex-wrap gap-4 justify-evenly">
              <li v-for="option in scale.questions[currentQuestionIndex].options" :key="option.id" class="w-[calc(50%-1rem)]">
                <input
                  class="hidden peer"
                  type="radio"
                  :id="`option-${option.id}`"
                  :name="`question-${scale.questions[currentQuestionIndex].id}`"
                  :value="option.value"
                  v-model="answers[scale.questions[currentQuestionIndex].id]"
                  @change="recordAnswer(scale.questions[currentQuestionIndex].id, option.value)"
                />
                <label
                  class="w-full h-full inline-flex justify-center items-center bg-gray-100 text-black px-4 py-4 rounded-lg text-lg font-regular text-center transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer"
                  :for="`option-${option.id}`">
                  <span v-if="option.text.includes('/')">
                    <span class="font-semibold">{{ option.text.split('/')[0].trim() }}<br></span>
                    <span class="text-sm font-regular">({{ option.text.split('/')[1].trim() }})</span>
                  </span>
                  <span v-else>{{ option.text }}</span>
                </label>
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
                  @change="onCheckboxChange($event, scale.questions[currentQuestionIndex].id, option.value)"
                />
                <label
                  class="inline-flex bg-gray-100 text-black px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-blue-500 peer-checked:text-white cursor-pointer"
                  :for="`option-${option.id}`">
                  {{ option.text }}
                </label>
              </li>
            </ul>
          </template>

          <template v-else-if="scale.questions[currentQuestionIndex].type === 'text'">
            <input
              type="text"
              class="text-input"
              v-model="answers[scale.questions[currentQuestionIndex].id]"
              @input="onTextInput($event, scale.questions[currentQuestionIndex].id)"
            />
          </template>

          <template v-else-if="scale.questions[currentQuestionIndex].type === 'slider'">
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              v-model="answers[scale.questions[currentQuestionIndex].id]"
              @input="onTextInput($event, scale.questions[currentQuestionIndex].id)"
            />
          </template>
        </div>

        <div class="navigation buttons flex justify-center gap-4">
          <ion-button
            @click="prevQuestion"
            :disabled="currentQuestionIndex === 0"
            style="--background: #FF4D4D;"
            class="text-base font-light tracking-normal">
            পূর্ববর্তী
          </ion-button>
          <ion-button
            @click="nextQuestion"
            :disabled="!isAnswerValid()"
            style="--background: #FF4D4D;"
            class="text-base font-light tracking-normal">
            পরবর্তি
          </ion-button>
        </div>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ProgressBar from '@/components/ProgressBar.vue';

const scale = ref<any>(null);
const selectedScale = ref();
const currentQuestionIndex = ref(0);
const answers = ref<Record<number, any>>({});

const isAnswerValid = () => {
  const currentQuestion = scale.value?.questions[currentQuestionIndex.value];
  if (!currentQuestion) return false;
  const answer = answers.value[currentQuestion.id];

  if (currentQuestion.type === 'select_one') {
    return answer !== undefined && answer !== null;
  }
  if (currentQuestion.type === 'select_multiple') {
    return Array.isArray(answer) && answer.length > 0;
  }
  if (currentQuestion.type === 'text') {
    return typeof answer === 'string' && answer.trim() !== '';
  }
  if (currentQuestion.type === 'slider') {
    return answer !== undefined && answer !== null;
  }

  return false;
};


interface Option {
  id: number;
  text: string;
  is_image?: string;
  value: number;
  order: number;
}

const router = useRouter();

onMounted(() => {
  if (typeof router.currentRoute.value.params.id === 'string') {
    selectedScale.value = router.currentRoute.value.params.id;
    fetchScales(selectedScale.value);
  } else {
    console.log("Something went wrong");
  }
});

const fetchScales = async (id: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/scale/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
    });
    scale.value = response.data.data;
  } catch (error) {
    console.error('Error fetching scale data:', error);
  }
};

const recordAnswer = (questionId: number, answer: any) => {
  answers.value[questionId] = answer;
};

const onTextInput = (event: Event, questionId: number) => {
  const target = event.target as HTMLInputElement;
  recordAnswer(questionId, target.value);
};

const onCheckboxChange = (event: Event, questionId: number, value: any) => {
  const target = event.target as HTMLInputElement;
  toggleMultipleChoiceAnswer(questionId, value, target.checked);
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

  if (currentQuestion.type === 'select_one') {
    const chosenOption = currentQuestion.options.find((option: Option) => option.value === answer);
    if (chosenOption) {
      payload = { option_id: chosenOption.id };
    } else {
      console.error("Chosen option not found!");
      return;
    }
  } else if (currentQuestion.type === 'select_multiple') {
    payload = { text_answer: answer.toString() };
  } else if (currentQuestion.type === 'text') {
    payload = { text_answer: answer };
  } else if (currentQuestion.type === 'slider') {
    payload = { numeric_answer: answer };
  }

  await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/question/respond/${currentQuestion.id}`,
    payload,
    { headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` } }
  );
};

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

function toBangla(num: number): string {
  const banglaNumbers: string[] = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map((digit: string) => banglaNumbers[parseInt(digit)]).join('');
}
</script>
