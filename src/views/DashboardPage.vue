<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-[#FFFBF7]">
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div
        class="flex flex-col h-full px-6 pt-12 pb-24 font-nunito bg-[#FFFBF7]"
      >
        <header class="flex items-center justify-between mb-8">
          <div class="flex flex-col">
            <h1
              class="text-3xl font-extrabold text-[#4A4A4A] m-0 tracking-tight"
            >
              Hi Hasan!
              <span class="animate-wave inline-block origin-[70%_70%]">👋</span>
            </h1>
            <p class="text-[#8C8C8C] text-sm mt-1 font-semibold">
              Ready for an adventure?
            </p>
          </div>
          <div class="relative">
            <div
              class="w-14 h-14 rounded-full bg-[#FFE4D6] border-2 border-[#FFB380] flex items-center justify-center overflow-hidden"
            >
              <img
                src="https://api.dicebear.com/9.x/avataaars/svg?seed=Oliver&accessories[]&accessoriesColor[]&clothing=collarAndSweater&clothingGraphic[]&eyebrows=raisedExcited&eyes=happy&facialHair[]&facialHairColor[]&hairColor=2c1b18&hatColor[]&mouth=smile&skinColor=fd9841"
                alt="Avatar"
                class="w-12 h-12 mt-2"
              />
            </div>
            <div
              class="absolute top-0 right-0 w-3 h-3 bg-[#FF6B6B] rounded-full border-2 border-white"
            ></div>
          </div>
        </header>

        <section class="mb-6">
          <div
            class="relative w-full bg-white rounded-3xl shadow-xl shadow-[#EAE2D6] overflow-hidden border-b-4 border-r-4 border-[#7FD1B9]"
          >
            <div
              class="absolute top-[-20px] right-[-20px] w-24 h-24 bg-[#E0F7FA] rounded-full opacity-50 z-0"
            ></div>
            <div
              class="absolute bottom-[-10px] left-[-10px] w-16 h-16 bg-[#FFF3E0] rounded-full opacity-50 z-0"
            ></div>

            <div
              class="relative z-10 p-6 flex flex-col items-center text-center"
            >
              <div
                class="bg-[#E6F9F5] text-[#38B2AC] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide mb-3"
              >
                Daily Quest
              </div>

              <h2 class="text-2xl font-black text-[#2D3748] mb-1">
                Mood Quest!
              </h2>

              <p
                class="text-[#718096] text-sm mb-4 leading-relaxed font-semibold"
              >
                Answer some questions to collect your daily stars! <br />
                <span class="text-lg mt-2 block">🌱 ⭐ 🎮</span>
              </p>

              <ion-button
                @click="startMission"
                expand="block"
                shape="round"
                class="w-full h-12 font-bold text-lg playful-button"
                style="
                  --background: #ff9f43;
                  --background-hover: #ff8f23;
                  --color: white;
                  --box-shadow: none;
                "
              >
                Start Mission
              </ion-button>
            </div>
          </div>
        </section>

        <section class="mb-8 px-2">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[#4A5568] font-bold text-sm"
              >Weekly Progress</span
            >
            <span class="text-[#FF9F43] font-black text-sm"
              >2 / 5 Missions</span
            >
          </div>
          <div class="w-full bg-[#EDF2F7] rounded-full h-4 p-1">
            <div
              class="bg-gradient-to-r from-[#FF9F43] to-[#FFCB80] h-2 rounded-full w-[40%] transition-all duration-500"
            ></div>
          </div>
          <p class="text-center text-xs text-[#A0AEC0] mt-2 font-semibold">
            You're doing great! Keep it up!
          </p>
        </section>

        <section class="grid grid-cols-3 gap-4 mb-4">
          <div
            class="flex flex-col items-center gap-2"
            @click="navigateToLink('/activities')"
          >
            <div
              class="w-16 h-16 bg-[#E3F2FD] rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <ion-icon
                :icon="bicycle"
                class="text-3xl text-[#42A5F5]"
              ></ion-icon>
            </div>
            <span class="text-xs font-bold text-[#546E7A]">Activities</span>
          </div>

          <div
            class="flex flex-col items-center gap-2"
            @click="navigateToLink('/games')"
          >
            <div
              class="w-16 h-16 bg-[#F3E5F5] rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <ion-icon
                :icon="gameController"
                class="text-3xl text-[#AB47BC]"
              ></ion-icon>
            </div>
            <span class="text-xs font-bold text-[#546E7A]">Mini-Games</span>
          </div>

          <div
            class="flex flex-col items-center gap-2"
            @click="navigateToLink('/help')"
          >
            <div
              class="w-16 h-16 bg-[#FFEBEE] rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <ion-icon
                :icon="heart"
                class="text-3xl text-[#EF5350]"
              ></ion-icon>
            </div>
            <span class="text-xs font-bold text-[#546E7A]">Talk/Help</span>
          </div>
        </section>
      </div>
    </ion-content>

    <ion-footer
      class="ion-no-border bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.03)]"
    >
      <div
        class="flex justify-around items-center h-20 px-6 pb-2 bg-white rounded-t-3xl"
      >
        <button class="flex flex-col items-center gap-1 text-[#FF9F43]">
          <ion-icon :icon="home" class="text-2xl"></ion-icon>
          <span class="text-[10px] font-bold">Home</span>
          <div class="w-1 h-1 bg-[#FF9F43] rounded-full"></div>
        </button>

        <button
          class="flex flex-col items-center gap-1 text-[#A0AEC0] hover:text-[#7FD1B9] transition-colors"
          @click="navigateToLink('/growth')"
        >
          <ion-icon :icon="leaf" class="text-2xl"></ion-icon>
          <span class="text-[10px] font-bold">Growth</span>
        </button>

        <button
          class="flex flex-col items-center gap-1 text-[#A0AEC0] hover:text-[#7FD1B9] transition-colors"
          @click="navigateToLink('/profile')"
        >
          <ion-icon :icon="person" class="text-2xl"></ion-icon>
          <span class="text-[10px] font-bold">Profile</span>
        </button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IonPage, IonContent, IonButton, IonIcon, IonFooter } from "@ionic/vue";
import {
  home,
  leaf,
  person,
  gameController,
  heart,
  bicycle,
} from "ionicons/icons";

const router = useRouter();

const navigateToLink = (link: string) => {
  // router.push(link);
  console.log("Navigating to:", link);
};

const startMission = () => {
  console.log("Starting Quest!");
  router.push("/scale/2");
};
</script>

<style scoped>
/* Child-Friendly Typography
   Using 'Nunito' for rounded, readable, warm text.
*/
.font-nunito {
  font-family: "Nunito", sans-serif;
}

/* Waving Hand Animation */
@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.animate-wave {
  animation: wave 2.5s infinite;
}

/* Specific styling to override Ionic defaults for a softer look */
ion-content {
  --background: #fffbf7; /* Creamy background */
}

/* Playful Button Effect */
.playful-button {
  --border-radius: 16px;
  font-family: "Nunito", sans-serif;
  letter-spacing: 0.5px;
}
</style>
