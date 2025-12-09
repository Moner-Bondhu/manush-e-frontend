<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-[#FFFBF7]">
      <div class="flex flex-col min-h-full font-baloo relative">
        <div
          class="bg-gradient-to-b from-[#E3F2FD] to-[#FFFBF7] pt-12 pb-8 px-6 rounded-b-[40px] shadow-sm relative overflow-hidden"
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

            <span class="text-lg font-bold text-[#4A5568]">জাদুর বেলুন</span>
            <div class="w-8"></div>
          </div>

          <div class="flex justify-center items-center mt-10 relative z-10 h-64">
            <div class="balloon-container animate-breathe origin-bottom">
              <svg
                width="140"
                height="220"
                viewBox="0 0 140 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M70 160 Q 60 185, 75 210"
                  stroke="#A0AEC0"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                />

                <ellipse cx="70" cy="85" rx="65" ry="75" fill="#42A5F5" />

                <path
                  d="M62 158 L78 158 L74 168 L66 168 Z"
                  fill="#1E88E5"
                />

                <ellipse
                  cx="45"
                  cy="55"
                  rx="12"
                  ry="22"
                  transform="rotate(-30 45 55)"
                  fill="white"
                  fill-opacity="0.3"
                />
              </svg>
            </div>
            <div
              class="absolute top-1/2 left-8 w-10 h-1 bg-white opacity-40 rounded-full animate-wind-1"
            ></div>
            <div
              class="absolute top-1/3 right-8 w-8 h-1 bg-white opacity-40 rounded-full animate-wind-2"
            ></div>
          </div>

          <p
            class="text-center text-[#1E88E5] font-bold mt-2 text-sm bg-white/50 inline-block px-4 py-1 rounded-full mx-auto block w-max backdrop-blur-sm relative z-20"
          >
            বুক ভরে শ্বাস নাও... ছাড়ো...
          </p>
        </div>

        <div class="px-6 py-6 flex-1">
          <h2 class="text-2xl font-extrabold text-[#2D3748] mb-2">
            কীভাবে করবে?
          </h2>
          <p class="text-[#718096] text-sm mb-6 font-semibold">
            চোখ বন্ধ করে মনে করো তোমার পেটে একটা বেলুন আছে।
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-full bg-[#E3F2FD] text-[#42A5F5] flex items-center justify-center font-bold flex-shrink-0"
              >
                ১
              </div>
              <p class="text-[#4A5568] text-sm font-bold mt-1">
                নাক দিয়ে লম্বা শ্বাস নাও, যেন পেটের বেলুনটা ফুলছে।
              </p>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-full bg-[#E3F2FD] text-[#42A5F5] flex items-center justify-center font-bold flex-shrink-0"
              >
                ২
              </div>
              <p class="text-[#4A5568] text-sm font-bold mt-1">
                কিছুক্ষণ শ্বাস ধরে রাখো। ১... ২... ৩...
              </p>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-full bg-[#E3F2FD] text-[#42A5F5] flex items-center justify-center font-bold flex-shrink-0"
              >
                ৩
              </div>
              <p class="text-[#4A5568] text-sm font-bold mt-1">
                মুখ দিয়ে ফুউউ করে শ্বাস ছাড়ো, যেন বেলুন চুপসে যাচ্ছে।
              </p>
            </div>
          </div>

          <div
            class="bg-[#FFF5F5] p-4 rounded-2xl border-l-4 border-[#FC8181] mb-6"
          >
            <h3 class="text-[#E53E3E] font-bold text-base mb-1">উপকারিতা</h3>
            <ul class="list-disc pl-4 text-[#C53030] text-xs font-semibold">
              <li>রাগ ও জেদ কমে যায়</li>
              <li>মন শান্ত ও ফুরফুরে হয়</li>
              <li>রাতে ভালো ঘুম হয়</li>
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
            <div class="text-6xl mb-4">🎉</div>
            <h2 class="text-2xl font-black text-[#FF9F43] mb-2">অভিনন্দন!</h2>
            <p class="text-[#718096] font-bold text-sm mb-6">
              তুমি দারুণভাবে কাজটি শেষ করেছো। তোমার মন এখন আরও শক্তিশালী!
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
          :class="isTimerFinished ? 'bg-green-500' : 'bg-gray-400'"
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

// names used in goHome – adjust if you already get them from elsewhere
const childName = ref("");
const parentName = ref("");

// Timer State
const totalTime = 180;
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

// Updated combined function for completion and redirect
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

  // ID 1 corresponds to "Jadur Bellon"
  if (!completedList.includes(1)) {
    completedList.push(1);
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
      colors: ["#FF9F43", "#42A5F5", "#FF6B6B"],
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#FF9F43", "#42A5F5", "#FF6B6B"],
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

/* Breathing Animation - Adjusted scale for the larger SVG */
@keyframes breathe {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
.animate-breathe {
  animation: breathe 4s ease-in-out infinite;
  transform-origin: bottom center;
}

/* Wind Animations */
@keyframes wind1 {
  0% {
    transform: translateX(0);
    opacity: 0.4;
  }
  50% {
    transform: translateX(20px);
    opacity: 0.2;
  }
  100% {
    transform: translateX(0);
    opacity: 0.4;
  }
}
.animate-wind-1 {
  animation: wind1 3s ease-in-out infinite;
}

@keyframes wind2 {
  0% {
    transform: translateX(0);
    opacity: 0.4;
  }
  50% {
    transform: translateX(-15px);
    opacity: 0.2;
  }
  100% {
    transform: translateX(0);
    opacity: 0.4;
  }
}
.animate-wind-2 {
  animation: wind2 4s ease-in-out infinite;
  animation-delay: 1s;
}

/* Modal Animation */
.animate-scale-up {
  animation: scaleUp 0.3s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
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
