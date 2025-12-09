<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-[#FFFBF7]">
      <div class="flex flex-col min-h-full font-baloo relative">
        
        <div
          class="bg-gradient-to-b from-[#F3E5F5] to-[#FFFBF7] pt-12 pb-8 px-6 rounded-b-[40px] shadow-sm relative overflow-hidden"
        >
          <div
            class="flex items-center justify-between absolute top-4 left-4 right-4 z-20"
          >
            <ion-button
              fill="clear"
              @click="handleBack"
              class="text-slate-600 hover:text-purple-600 transition-colors -ml-2"
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

            <span class="text-lg font-bold text-[#4A5568]">৫ আঙুলের শক্তি</span>
            <div class="w-8"></div>
          </div>

          <div class="flex justify-center items-center mt-10 relative z-10 h-64">
            <div class="hand-container animate-breathe origin-bottom">
              <svg
                width="200"
                height="220"
                viewBox="0 0 200 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="110" r="90" fill="#E9D8FD" fill-opacity="0.5" />

                <path
                  d="M40 110 C 40 80, 50 60, 60 50 C 65 40, 75 40, 80 50 L 85 80 L 90 40 C 95 30, 105 30, 110 40 L 115 80 L 120 30 C 125 20, 135 20, 140 30 L 145 80 L 150 60 C 155 50, 165 50, 170 60 L 175 130 C 175 180, 140 210, 100 210 C 60 210, 25 180, 25 130 L 30 80 C 35 70, 45 70, 50 80 L 55 110 Z"
                  fill="#9F7AEA"
                  opacity="0.8"
                />

                <path
                  class="tracing-stroke"
                  d="M40 110 C 40 80, 50 60, 60 50 C 65 40, 75 40, 80 50 L 85 80 L 90 40 C 95 30, 105 30, 110 40 L 115 80 L 120 30 C 125 20, 135 20, 140 30 L 145 80 L 150 60 C 155 50, 165 50, 170 60 L 175 130 C 175 180, 140 210, 100 210 C 60 210, 25 180, 25 130 L 30 80 C 35 70, 45 70, 50 80 L 55 110 Z"
                  stroke="#F6AD55"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                />

                <circle cx="60" cy="50" r="5" fill="#F6AD55" /> <circle cx="110" cy="40" r="5" fill="#F6AD55" /> <circle cx="140" cy="30" r="5" fill="#F6AD55" /> <circle cx="170" cy="60" r="5" fill="#F6AD55" /> <circle cx="30" cy="80" r="5" fill="#F6AD55" /> </svg>
            </div>

            <div
              class="absolute top-1/4 right-5 text-xl text-yellow-400 animate-pulse"
              style="animation-delay: 0.2s"
            >✨</div>
            <div
              class="absolute bottom-1/3 left-5 text-xl text-yellow-400 animate-pulse"
              style="animation-delay: 0.8s"
            >✨</div>
            <div
              class="absolute top-10 left-1/4 text-lg text-purple-300 animate-pulse"
              style="animation-delay: 1.5s"
            >✦</div>
          </div>

          <p
            class="text-center text-[#805AD5] font-bold mt-4 text-sm bg-white/50 inline-block px-4 py-1 rounded-full mx-auto block w-max backdrop-blur-sm relative z-20"
          >
            আঙুলের পাশ দিয়ে আঁকো...
          </p>
        </div>

        <div class="px-6 py-6 flex-1">
          <h2 class="text-2xl font-extrabold text-[#2D3748] mb-2">
            কীভাবে করবে?
          </h2>
          <p class="text-[#718096] text-sm mb-6 font-semibold">
            তোমার হাতের দিকে তাকাও। এটা তোমার সুপারপাওয়ার!
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-full bg-[#F3E5F5] text-[#9F7AEA] flex items-center justify-center font-bold flex-shrink-0"
              >
                ১
              </div>
              <p class="text-[#4A5568] text-sm font-bold mt-1">
                এক হাতের পাঁচ আঙুল তারার মতো ছড়িয়ে দাও।
              </p>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-full bg-[#F3E5F5] text-[#9F7AEA] flex items-center justify-center font-bold flex-shrink-0"
              >
                ২
              </div>
              <p class="text-[#4A5568] text-sm font-bold mt-1">
                অন্য হাতের তর্জনী দিয়ে আঙুলের পাশ ঘেঁষে আঁকো।
              </p>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-full bg-[#F3E5F5] text-[#9F7AEA] flex items-center justify-center font-bold flex-shrink-0"
              >
                ৩
              </div>
              <p class="text-[#4A5568] text-sm font-bold mt-1">
                উপরে ওঠার সময় শ্বাস নাও, নিচে নামার সময় ছাড়ো।
              </p>
            </div>
          </div>

          <div
            class="bg-[#FAF5FF] p-4 rounded-2xl border-l-4 border-[#D6BCFA] mb-6"
          >
            <h3 class="text-[#805AD5] font-bold text-base mb-1">উপকারিতা</h3>
            <ul class="list-disc pl-4 text-[#9F7AEA] text-xs font-semibold">
              <li>মনোযোগ শক্তি বৃদ্ধি পায়</li>
              <li>ভয় বা আতঙ্ক কমে যায়</li>
              <li>নিজেকে শক্তিশালী মনে হয়</li>
            </ul>
          </div>
        </div>
      </div>

      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-center justify-center px-6"
        >
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div
            class="bg-white rounded-3xl p-8 w-full max-w-sm text-center relative z-10 shadow-2xl animate-scale-up"
          >
            <div class="text-6xl mb-4">🌟</div>
            <h2 class="text-2xl font-black text-[#FF9F43] mb-2">চমৎকার!</h2>
            <p class="text-[#718096] font-bold text-sm mb-6">
              তুমি এখন ৫ আঙুলের জাদুকর! তোমার মন এখন অনেক শান্ত।
            </p>
          </div>
        </div>
      </transition>
    </ion-content>

    <ion-footer
      class="ion-no-border bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.05)] p-4 rounded-t-3xl"
    >
      <div class="flex items-center gap-4">
        <div class="flex flex-col items-center justify-center w-16">
          <span class="text-xs text-[#A0AEC0] font-bold">সময় বাকি</span>
          <span class="text-xl font-black text-[#4A5568] tabular-nums">
            {{ formattedTime }}
          </span>
        </div>

        <button
          class="flex-1 h-12 rounded-full font-bold font-baloo transition-all duration-300
                 text-white disabled:opacity-50"
          :class="isTimerFinished ? 'bg-purple-500' : 'bg-gray-400'"
          :disabled="!isTimerFinished && !isDemoMode"
          @click="completeTask"
        >
          {{ isTimerFinished ? 'শেষ করেছি' : 'অনুশীলন করো...' }}
        </button>
      </div>
      <div
        @click="skipTimer"
        class="text-[10px] text-center text-gray-300 mt-2"
      >
        Tap here to skip timer (Demo Only)
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonFooter,
  onIonViewWillLeave,
  onIonViewDidEnter,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import confetti from "canvas-confetti";

const router = useRouter();

// Names used in goHome
const childName = ref("");
const parentName = ref("");

// Timer State - Set to 120 seconds (2 mins) for this activity
const totalTime = 120; 
const timeLeft = ref(totalTime);
const timerInterval = ref<any>(null);
const isTimerFinished = ref(false);
const showModal = ref(false);
const isDemoMode = ref(true);

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

onIonViewDidEnter(() => {
  startTimer();
});

onIonViewWillLeave(() => {
  clearInterval(timerInterval.value);
});

const startTimer = () => {
  clearInterval(timerInterval.value);
  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      isTimerFinished.value = true;
      clearInterval(timerInterval.value);
    }
  }, 1000);
};

const skipTimer = () => {
  timeLeft.value = 0;
  isTimerFinished.value = true;
  clearInterval(timerInterval.value);
};

const handleBack = () => {
  router.back();
};

const goHome = () => {
  const profile = localStorage.getItem("selectedProfile");

  if (profile === "child") {
    router.push({
      name: "ChildDashboard",
      query: { name: childName.value },
    });
  } else if (profile === "parent") {
    router.push({
      name: "ParentDashboard",
      query: { name: parentName.value },
    });
  } else {
    router.push("/profile-choice");
  }
};

const completeTask = () => {
  triggerConfetti();
  saveCompletionState();
  showModal.value = true;

  setTimeout(() => {
    showModal.value = false;
    goHome();
  }, 5000);
};

const saveCompletionState = () => {
  const existing = localStorage.getItem("completedActivities");
  const completedList = existing ? JSON.parse(existing) : [];

  // ID 2 corresponds to "Five Fingers" (See Dashboard Data)
  if (!completedList.includes(2)) {
    completedList.push(2);
    localStorage.setItem("completedActivities", JSON.stringify(completedList));
  }
};

const triggerConfetti = () => {
  const duration = 20;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#9F7AEA", "#F6AD55", "#68D391"], // Purple/Orange/Green
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#9F7AEA", "#F6AD55", "#68D391"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
</script>

<style scoped>
.font-baloo {
  font-family: "Baloo Da 2", "Nunito", sans-serif;
}

/* Breathing Animation - Very Slow */
@keyframes breathe {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05); /* Very subtle scale */
  }
}
.animate-breathe {
  animation: breathe 8s ease-in-out infinite; /* Very slow duration */
  transform-origin: bottom center;
}

/* Tracing Stroke Animation */
.tracing-stroke {
  stroke-dasharray: 600; /* Adjust based on path length */
  stroke-dashoffset: 600;
  animation: trace 8s ease-in-out infinite;
}

@keyframes trace {
  0% {
    stroke-dashoffset: 600;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 600;
  }
}

/* Modal Animation */
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes scaleUp {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>