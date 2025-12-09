<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-[#FFFBF7]">
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Baloo+Da+2:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div class="flex flex-col min-h-full px-6 pt-12 font-baloo bg-[#FFFBF7]">
        <header class="flex items-center justify-between mb-8">
          <div class="flex flex-col">
            <h1 class="text-3xl font-extrabold text-[#4A4A4A] m-0 tracking-tight">
              হ্যালো হাসান! <span class="animate-wave inline-block origin-[70%_70%]">👋</span>
            </h1>
            <p class="text-[#8C8C8C] text-sm mt-1 font-semibold">আজকের মাইন্ড মিশনের জন্য প্রস্তুত?</p>
          </div>
          
          <div 
            class="relative cursor-pointer active:scale-95 transition-transform"
            @click="navigateToLink('/choice')"
          >
            <div class="w-14 h-14 rounded-full bg-[#FFE4D6] border-2 border-[#FFB380] flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Oliver&accessories[]&accessoriesColor[]&clothing=collarAndSweater&clothingGraphic[]&eyebrows=raisedExcited&eyes=happy&facialHair[]&facialHairColor[]&hairColor=2c1b18&hatColor[]&mouth=smile&skinColor=fd9841" alt="Avatar" class="w-12 h-12 mt-2" />
            </div>
          </div>
        </header>

        <section class="mb-8">
          <div
            class="relative w-full bg-white rounded-3xl shadow-xl shadow-[#EAE2D6] overflow-hidden border-b-4 border-r-4 transition-all duration-300"
            :class="isDailyMissionDone ? 'border-[#A0AEC0]' : 'border-[#7FD1B9]'"
          >
            <div class="absolute top-[-20px] right-[-20px] w-24 h-24 bg-[#E0F7FA] rounded-full opacity-50 z-0"></div>
            <div class="absolute bottom-[-10px] left-[-10px] w-16 h-16 bg-[#FFF3E0] rounded-full opacity-50 z-0"></div>
            <div class="relative z-10 p-6 flex flex-col items-center text-center">
              <div class="text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide mb-3" :class="isDailyMissionDone ? 'bg-[#EDF2F7] text-[#A0AEC0]' : 'bg-[#E6F9F5] text-[#38B2AC]'">
                {{ isDailyMissionDone ? 'আজকের মত শেষ' : 'দৈনিক মিশন' }}
              </div>
              <h2 class="text-2xl font-black text-[#2D3748] mb-1">
                {{ isDailyMissionDone ? 'বিশ্রাম নাও!' : 'মনের খোঁজ!' }}
              </h2>
              <p class="text-[#718096] text-sm mb-4 leading-relaxed font-semibold">
                <span v-if="isDailyMissionDone">অভিনন্দন! আজকের সব কাজ শেষ। <br/> আবার আগামীকাল এসো! <span class="text-lg mt-2 block">🌙 ✨ 💤</span></span>
                <span v-else>কিছু প্রশ্নের উত্তর দাও আর সংগ্রহ করো পয়েন্টস! <br /> <span class="text-lg mt-2 block">🌱 ⭐ 🎮</span></span>
              </p>
              <ion-button @click="startMission" expand="block" shape="round" :disabled="isDailyMissionDone" class="w-full h-12 font-bold text-lg playful-button transition-all" :style="buttonStyle">
                {{ isDailyMissionDone ? 'শীঘ্রই আসছে...' : 'মিশন শুরু কর' }}
                <ion-icon v-if="!isDailyMissionDone" slot="end" :icon="play" class="ml-2"></ion-icon>
                <ion-icon v-else slot="end" :icon="lockClosed" class="ml-2"></ion-icon>
              </ion-button>
            </div>
          </div>
        </section>

        <section class="mb-10 px-2">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[#4A5568] font-bold text-sm">সাপ্তাহিক শক্তি</span>
            <span class="text-[#FF9F43] font-black text-sm">{{ currentProgress }} / ৫ মিশন</span>
          </div>
          <div class="w-full bg-[#EDF2F7] rounded-full h-4 p-1">
            <div class="bg-gradient-to-r from-[#FF9F43] to-[#FFCB80] h-2 rounded-full transition-all duration-500 relative" :style="{ width: (currentProgress / 5) * 100 + '%' }">
              <div class="absolute top-0 right-0 w-1 h-full bg-white opacity-50 rounded-full"></div>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <div class="flex items-center justify-between mb-4 px-1">
            <h3 class="text-xl font-extrabold text-[#2D3748] m-0">সুপার হিরো ট্রেনিং</h3>
          </div>
          
          <div class="flex flex-col gap-4">
            <template v-if="filteredActivities.length > 0">
                <div
                v-for="(activity, index) in filteredActivities"
                :key="activity.id"
                @click="navigateToActivity(activity.id)"
                class="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-[#E2E8F0] active:scale-[0.98] transition-transform flex items-center gap-4"
                >
                <div class="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl" :class="activity.bgColor">
                    {{ activity.emoji }}
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-[#2D3748] text-base mb-1 mt-0 truncate">{{ activity.title }}</h4>
                    <p class="text-xs text-[#718096] font-medium leading-tight line-clamp-2">{{ activity.desc }}</p>
                </div>
                <div class="flex flex-col items-center justify-center bg-[#F7FAFC] px-2 py-1 rounded-lg border border-[#EDF2F7]">
                    <ion-icon :icon="timeOutline" class="text-[#A0AEC0] text-sm mb-[2px]"></ion-icon>
                    <span class="text-[10px] font-black text-[#718096] whitespace-nowrap">{{ activity.time }} মি.</span>
                </div>
                </div>
            </template>

            <div v-else class="bg-[#F0FFF4] border-2 border-dashed border-[#68D391] rounded-2xl p-6 text-center">
                <div class="text-4xl mb-2">🎉</div>
                <h4 class="text-[#2F855A] font-bold mb-1">সব ট্রেনিং শেষ!</h4>
                <p class="text-[#68D391] text-xs font-semibold">তুমি এখন একজন সুপার হিরো। কাল আবার নতুন ট্রেনিং আসবে।</p>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <div class="flex items-center justify-between mb-4 px-1">
            <h3 class="text-xl font-extrabold text-[#2D3748] m-0">ফান জোন</h3>
          </div>
          
          <template v-if="filteredGames.length > 0">
             <div class="flex overflow-x-auto pb-4 gap-4 -mx-6 px-6 hide-scrollbar">
                <div
                  v-for="(game, index) in filteredGames"
                  :key="game.id"
                  @click="navigateToLink(game.link)"
                  class="flex-shrink-0 w-36 flex flex-col"
                >
                  <div 
                    class="w-36 h-36 rounded-2xl mb-3 relative overflow-hidden shadow-md border-b-4 active:scale-95 transition-transform flex items-center justify-center" 
                    :class="[game.borderColor, game.bgColor]"
                  >
                     <div class="absolute w-24 h-24 rounded-full opacity-20 bg-white transform scale-150"></div>
                     <ion-icon :icon="game.icon" class="text-6xl relative z-10" :class="game.iconColor"></ion-icon>
                  </div>
                  <span class="text-center text-sm font-bold text-[#4A5568]">{{ game.title }}</span>
                </div>
             </div>
          </template>

          <div v-else class="bg-[#FFF5F5] border-2 border-dashed border-[#FC8181] rounded-2xl p-6 text-center mx-1">
                <div class="text-4xl mb-2">🎮</div>
                <h4 class="text-[#C53030] font-bold mb-1">গেম খেলা শেষ!</h4>
                <p class="text-[#FC8181] text-xs font-semibold">আজকের মত বিশ্রাম নাও।</p>
          </div>

        </section>
      </div>
    </ion-content>
    
    <ion-footer class="ion-no-border bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      <div class="flex justify-around items-center h-20 px-6 pb-2 bg-white rounded-t-3xl">
        <button class="flex flex-col items-center gap-1 text-[#FF9F43]">
          <ion-icon :icon="home" class="text-2xl"></ion-icon>
          <span class="text-[10px] font-bold font-baloo">হোম</span>
          <div class="w-1 h-1 bg-[#FF9F43] rounded-full"></div>
        </button>
        <button class="flex flex-col items-center gap-1 text-[#A0AEC0] hover:text-[#7FD1B9] transition-colors" @click="navigateToLink('/growth')">
          <ion-icon :icon="leaf" class="text-2xl"></ion-icon>
          <span class="text-[10px] font-bold font-baloo">অগ্রগতি</span>
        </button>

      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IonPage, IonContent, IonButton, IonIcon, IonFooter, onIonViewWillEnter } from "@ionic/vue";
import { home, leaf, person, timeOutline, play, lockClosed, grid } from "ionicons/icons";
import { ref, computed } from "vue";

const router = useRouter();

// State
const currentProgress = ref(0);
const isDailyMissionDone = ref(false);
const filteredActivities = ref<any[]>([]);
const filteredGames = ref<any[]>([]);

// Data arrays
const allActivities = [
  { id: 1, title: "জাদুর বেলুন", desc: "বেলুনের মতো পেট ফুলিয়ে শ্বাস নাও, দুশ্চিন্তা ফু দিয়ে উড়িয়ে দাও!", time: 3, emoji: "🎈", bgColor: "bg-[#E3F2FD] text-[#42A5F5]" },
  { id: 2, title: "৫ আঙুলের শক্তি", desc: "হাতের পাঁচ আঙুল গুনে মনকে শান্ত করার জাদুর কৌশল।", time: 2, emoji: "🖐️", bgColor: "bg-[#F3E5F5] text-[#AB47BC]" },
];

const allGames = [
  // { 
  //     id: 3, 
  //     title: "গোয়েন্দা চোখ", 
  //     icon: eye,
  //     bgColor: "bg-[#E0F2F1]",
  //     iconColor: "text-[#26A69A]",
  //     borderColor: "border-[#26A69A]",
  //     link: "/activity/spy-eyes"
  // },
  { 
      id: 2, 
      title: "মেমোরি মাস্টার", 
      icon: grid,
      bgColor: "bg-[#E8EAF6]",
      iconColor: "text-[#3F51B5]",
      borderColor: "border-[#3F51B5]",
      link: "/activity/memory-master"
  },
];

// Lifecycle Hook
onIonViewWillEnter(() => {
  loadProgress();
  loadActivitiesAndGames();
});

const loadProgress = () => {
  const savedProgress = localStorage.getItem('userMissionProgress');
  if (savedProgress === null) {
    currentProgress.value = 3;
    localStorage.setItem('userMissionProgress', '3');
  } else {
    currentProgress.value = parseInt(savedProgress);
  }
  isDailyMissionDone.value = currentProgress.value >= 5; 
};

const loadActivitiesAndGames = () => {
    // Activities Filtering
    const completedActivitiesRaw = localStorage.getItem('completedActivities');
    const completedActivityIds = completedActivitiesRaw ? JSON.parse(completedActivitiesRaw) : [];
    filteredActivities.value = allActivities.filter(act => !completedActivityIds.includes(act.id));

    // Games Filtering
    const completedGamesRaw = localStorage.getItem('completedGames');
    const completedGameIds = completedGamesRaw ? JSON.parse(completedGamesRaw) : [];
    filteredGames.value = allGames.filter(game => !completedGameIds.includes(game.id));
};

const buttonStyle = computed(() => {
    if (isDailyMissionDone.value) {
        return { '--background': '#E2E8F0', '--background-hover': '#E2E8F0', '--color': '#A0AEC0', '--box-shadow': 'none' }
    }
    return { '--background': '#ff9f43', '--background-hover': '#ff8f23', '--color': 'white', '--box-shadow': 'none' }
});

const navigateToLink = (link: string) => {
  router.push(link);
};

const navigateToActivity = (id: number) => {
    if(id === 1) {
        router.push('/activity/balloon'); 
    } else {
        router.push('/activity/five-fingers');
    }
}

const startMission = () => {
  if (!isDailyMissionDone.value) {
      router.push("/scale/2");
  }
};
</script>

<style scoped>
.font-baloo { font-family: "Baloo Da 2", "Nunito", sans-serif; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
.animate-wave { animation: wave 2.5s infinite; }
ion-content { --background: #fffbf7; }
.playful-button { --border-radius: 16px; font-family: "Baloo Da 2", sans-serif; letter-spacing: 0.5px; }
</style>