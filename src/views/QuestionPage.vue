<template>
  <ion-page>
    <div
      class="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#F0F4F8]"
    >
      <div
        class="absolute -top-20 -left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
      ></div>
      <div
        class="absolute top-0 -right-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="w-full pt-12 px-6 flex justify-between items-center z-20">
      <ion-button
        fill="clear"
        @click="handleBack"
        class="text-slate-600 hover:text-purple-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </ion-button>

      <div
        class="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm text-purple-600 font-bold text-sm border border-purple-100 flex items-center gap-2"
      >
        <span>✨</span> {{ toBangla(currentQuestionIndex + 1) }} /
        {{ toBangla(scale?.questions?.length || 0) }}
      </div>
    </div>

    <ion-content
      :fullscreen="true"
      class="bg-transparent ion-padding"
      style="--background: transparent"
    >
      <div
        class="flex flex-col h-full justify-between pb-10 max-w-md mx-auto relative"
      >
        <div
          class="flex flex-col items-center justify-center mt-2 mb-6 h-32 relative"
        >
          <div
            class="relative w-24 h-full flex flex-col justify-end items-center"
          >
            <!-- Pot/Tub at the bottom -->
            <div
              class="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-12 h-10 bg-[#8D6E63] rounded-b-xl rounded-t-sm shadow-md"
            >
              <div
                class="absolute -top-1 w-[110%] -left-[5%] h-2 bg-[#795548] rounded-full"
              ></div>
            </div>

            <!-- Plant stem starting from top of pot -->
            <div
              class="z-10 w-2 bg-green-500 rounded-t-full transition-all duration-1000 ease-out absolute bottom-10 left-1/2 -translate-x-1/2"
              :style="{
                height: `${Math.max(
                  2,
                  (progressPercentage / 100) * (100 - 40)
                )}%`,
              }"
            >
              <div
                v-if="progressPercentage > 20"
                class="absolute bottom-4 -left-6 text-2xl animate-pop-in"
              >
                🍃
              </div>
              <div
                v-if="progressPercentage > 50"
                class="absolute bottom-12 -right-6 text-2xl animate-pop-in"
                style="animation-delay: 100ms"
              >
                🌿
              </div>
              <div
                v-if="progressPercentage > 80"
                class="absolute top-0 -left-4 text-3xl animate-pop-in"
                style="animation-delay: 200ms"
              >
                🌸
              </div>
            </div>
          </div>
          <p class="text-xs text-slate-400 font-medium mt-2">
            তোমার গাছটি বড় হচ্ছে!
          </p>
        </div>

        <transition name="slide-fade" mode="out-in">
          <div
            v-if="scale && scale.questions[currentQuestionIndex]"
            :key="currentQuestionIndex"
            class="flex-1 flex flex-col justify-center"
          >
            <div class="text-center mb-8 px-2">
              <h2
                class="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-3"
              >
                {{ scale.questions[currentQuestionIndex].text }}
              </h2>
              <p
                v-if="scale.questions[currentQuestionIndex].subtext"
                class="text-slate-500 text-lg font-medium"
              >
                {{ scale.questions[currentQuestionIndex].subtext }}
              </p>
            </div>

            <div
              v-if="scale.questions[currentQuestionIndex].type === 'select_one'"
              class="flex flex-col gap-3"
            >
              <div
                v-for="(option, idx) in scale.questions[currentQuestionIndex]
                  .options"
                :key="option.id"
                @click="
                  handleSelection(
                    scale.questions[currentQuestionIndex].id,
                    option.value
                  )
                "
                :class="[
                  'relative overflow-hidden group w-full bg-white rounded-2xl p-4 shadow-sm border-2 transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-between',
                  isSelected(
                    scale.questions[currentQuestionIndex].id,
                    option.value
                  )
                    ? 'border-purple-400 bg-purple-50 shadow-purple-200 shadow-md scale-[1.02]'
                    : 'border-transparent hover:border-purple-200 hover:shadow-md',
                ]"
                :style="{ animationDelay: `${idx * 100}ms` }"
                class="animate-slide-up"
              >
                <div
                  :class="[
                    'absolute left-0 top-0 bottom-0 w-2 transition-all duration-300',
                    isSelected(
                      scale.questions[currentQuestionIndex].id,
                      option.value
                    )
                      ? 'bg-purple-500'
                      : 'bg-slate-100 group-hover:bg-purple-200',
                  ]"
                ></div>

                <div class="pl-4 flex flex-col">
                  <span
                    class="text-lg font-bold text-slate-700 group-hover:text-purple-700 transition-colors"
                  >
                    {{ option.text.split("/")[0].trim() }}
                  </span>
                  <span
                    v-if="option.text.includes('/')"
                    class="text-xs text-slate-400"
                  >
                    {{ option.text.split("/")[1].trim() }}
                  </span>
                </div>

                <div
                  v-if="
                    isSelected(
                      scale.questions[currentQuestionIndex].id,
                      option.value
                    )
                  "
                  class="text-purple-600 animate-bounce-short"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  v-else
                  class="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-purple-300"
                ></div>
              </div>
            </div>

            <div v-else class="bg-white p-6 rounded-2xl shadow-sm">
              <input
                v-if="scale.questions[currentQuestionIndex].type === 'text'"
                type="text"
                class="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="আপনার উত্তর লিখুন..."
                v-model="answers[scale.questions[currentQuestionIndex].id]"
                @change="
                  manualRecord(scale.questions[currentQuestionIndex].id, $event)
                "
              />

              <div
                v-if="scale.questions[currentQuestionIndex].type === 'slider'"
                class="py-4"
              >
                <ion-range
                  min="1"
                  max="5"
                  snaps="true"
                  pin="true"
                  v-model="answers[scale.questions[currentQuestionIndex].id]"
                  @ionChange="
                    manualRecord(
                      scale.questions[currentQuestionIndex].id,
                      $event
                    )
                  "
                  style="
                    --bar-background: #e2e8f0;
                    --bar-background-active: #a855f7;
                    --knob-background: #9333ea;
                  "
                >
                </ion-range>
              </div>

              <ion-button
                expand="block"
                class="mt-4 font-bold"
                shape="round"
                color="tertiary"
                @click="nextQuestion"
              >
                পরবর্তী
              </ion-button>
            </div>
          </div>
        </transition>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonRange,
  IonBackButton,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const router = useRouter();
const scale = ref<any>(null);
const selectedScale = ref();
const currentQuestionIndex = ref(0);
const answers = ref<Record<number, any>>({});
const isAnimating = ref(false);

// --- Computed ---
const progressPercentage = computed(() => {
  if (!scale.value) return 0;
  return (currentQuestionIndex.value / scale.value.questions.length) * 100;
});

// --- Logic ---

const handleBack = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  } else {
    router.back();
  }
};

const isSelected = (qId: number, val: number) => {
  return answers.value[qId] === val;
};

const handleSelection = async (questionId: number, value: number) => {
  if (isAnimating.value) return;

  answers.value[questionId] = value;
  isAnimating.value = true;

  setTimeout(async () => {
    await sendAnswer();

    if (currentQuestionIndex.value < (scale.value?.questions.length || 0) - 1) {
      currentQuestionIndex.value++;
    } else {
      await submitAnswers();
    }
    isAnimating.value = false;
  }, 600);
};

const manualRecord = (qId: number, event: any) => {
  const val = event.target ? event.target.value : event.detail.value;
  answers.value[qId] = val;
};

const nextQuestion = async () => {
  await sendAnswer();
  if (currentQuestionIndex.value < (scale.value?.questions.length || 0) - 1) {
    currentQuestionIndex.value++;
  } else {
    await submitAnswers();
  }
};

// --- Helpers ---
function toBangla(num: number): string {
  const banglaNumbers: string[] = [
    "০",
    "১",
    "২",
    "৩",
    "৪",
    "৫",
    "৬",
    "৭",
    "৮",
    "৯",
  ];
  return num
    .toString()
    .split("")
    .map((digit: string) => banglaNumbers[parseInt(digit)])
    .join("");
}

onMounted(() => {
  if (typeof router.currentRoute.value.params.id === "string") {
    selectedScale.value = router.currentRoute.value.params.id;
    fetchScales(selectedScale.value);
  }
});

const fetchScales = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/scale/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("api_token")}`,
        },
      }
    );
    scale.value = response.data.data;
  } catch (error) {
    console.error("Error fetching scale data:", error);
  }
};

const sendAnswer = async () => {
  const currentQuestion = scale.value.questions[currentQuestionIndex.value];
  const answer = answers.value[currentQuestion.id];
  let payload = {};

  if (currentQuestion.type === "select_one") {
    const chosenOption = currentQuestion.options.find(
      (option: any) => option.value === answer
    );
    if (chosenOption) payload = { option_id: chosenOption.id };
  } else if (currentQuestion.type === "text") {
    payload = { text: answer };
  } else if (currentQuestion.type === "slider") {
    payload = { value: answer };
  }

  try {
    await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/question/respond/${
        currentQuestion.id
      }`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("api_token")}`,
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
};

const submitAnswers = async () => {
  // 1. SIMULATION: Save progress to LocalStorage
  // In a real app, the API would return the new level, or we fetch it again.
  const currentProgress = parseInt(localStorage.getItem('userMissionProgress') || '0');
  localStorage.setItem('userMissionProgress', (currentProgress + 1).toString());

  console.log("Mission Completed! Level Up.");

  // 2. Redirect to Dashboard
  // We pass a query param 'refresh' so dashboard knows something changed
  const profile = scale.value.visible_to;
  // router.push({ name: "Dashboard", query: { profile, refresh: Date.now() } });
  // router push to /child-dashboard or /parent-dashboard based on profile
  if (profile === 'child') {
    router.push({ name: "ChildDashboard", query: { refresh: Date.now() } });
  } else if (profile === 'parent') {
    router.push({ name: "ParentDashboard", query: { refresh: Date.now() } });
  }
};
</script>

<style scoped>
/* --- Animations for Dopamine Hits --- */

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

/* Question Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* Option Entrance */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-up {
  animation: slideUp 0.5s ease-out backwards;
}

/* Plant Pop */
@keyframes popIn {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.animate-pop-in {
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Checkmark Bounce */
@keyframes bounceShort {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
.animate-bounce-short {
  animation: bounceShort 0.3s ease-in-out;
}
</style>
