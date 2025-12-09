<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-[#FFFBF7]">
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Baloo+Da+2:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div
        class="flex flex-col min-h-full px-6 pt-12 font-baloo bg-[#FFFBF7]"
      >
        <header class="flex items-center justify-between mb-8">
          <div class="flex flex-col">
            <h1
              class="text-3xl font-extrabold text-[#4A4A4A] m-0 tracking-tight"
            >
              স্বাগতম, অভিভাবক!
            </h1>
            <p class="text-[#8C8C8C] text-sm mt-1 font-semibold">
              হাসানের বর্তমান অবস্থা দেখছেন
            </p>
          </div>
          
          <div 
             class="relative cursor-pointer active:scale-95 transition-transform"
             @click="navigateToLink('/choice')"
          >
            <div
              class="w-14 h-14 rounded-full bg-[#FFE4D6] border-2 border-[#FFB380] flex items-center justify-center overflow-hidden"
            >
              <img
                src="https://api.dicebear.com/9.x/avataaars/svg?seed=Oliver&accessories[]&accessoriesColor[]&clothing=collarAndSweater&clothingGraphic[]&eyebrows=raisedExcited&eyes=happy&facialHair[]&facialHairColor[]&hairColor=2c1b18&hatColor[]&mouth=smile&skinColor=fd9841"
                alt="Avatar"
                class="w-12 h-12 mt-2"
              />
            </div>
          </div>
        </header>

        <section class="mb-10">
          <div
            class="relative w-full bg-white rounded-3xl shadow-xl shadow-[#EAE2D6] overflow-hidden border-b-4 border-r-4 transition-all duration-300"
            :class="statusConfig.borderColor"
          >
            <div class="absolute top-[-20px] right-[-20px] w-28 h-28 rounded-full opacity-20 z-0" :class="statusConfig.blobColor"></div>
            <div class="absolute bottom-[-10px] left-[-10px] w-20 h-20 rounded-full opacity-20 z-0" :class="statusConfig.blobColor"></div>

            <div class="relative z-10 p-6 flex flex-col items-center text-center">
              
              <div
                class="text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide mb-4"
                :class="statusConfig.badgeColor"
              >
                মানসিক স্বাস্থ্যের অবস্থা
              </div>

              <div class="mb-4 relative">
                 <svg class="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" class="text-gray-100" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" 
                        :class="statusConfig.textColor"
                        :stroke-dasharray="365" 
                        :stroke-dashoffset="365 - (childScore / 10) * 365" 
                        stroke-linecap="round"
                    />
                 </svg>
                 <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                    <span class="text-4xl font-black text-[#2D3748]">{{ childScore }}</span>
                    <span class="text-xs font-bold text-[#A0AEC0]">/ ১০</span>
                 </div>
              </div>

              <h2 class="text-2xl font-black text-[#2D3748] mb-1">
                {{ statusConfig.title }}
              </h2>

              <p class="text-[#718096] text-sm mb-6 leading-relaxed font-semibold px-2">
                {{ statusConfig.description }}
              </p>

              <ion-button
                @click="handleStatusAction"
                expand="block"
                shape="round"
                class="w-full h-12 font-bold text-lg playful-button transition-all"
                :style="statusConfig.buttonStyle"
                :disabled="isActionCompleted"
              >
                {{ statusConfig.ctaText }}
                <ion-icon slot="end" :icon="statusConfig.icon" class="ml-2"></ion-icon>
              </ion-button>
            </div>
          </div>
        </section>

        <section class="mb-6">
            <div class="flex items-center justify-between mb-3 px-1">
                <h3 class="text-xl font-extrabold text-[#2D3748] m-0">আপনার সন্তানের জন্য</h3>
            </div>
            
            <div
              @click="navigateToLink('/counseling')"
              class="bg-white p-5 rounded-2xl shadow-sm border-b-4 border-[#E2E8F0] active:scale-[0.98] transition-transform flex items-center gap-4 group"
            >
              <div class="w-16 h-16 rounded-2xl bg-[#E3F2FD] text-[#4299E1] flex-shrink-0 flex items-center justify-center text-3xl">
                🩺
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-[#2D3748] text-lg mb-1 group-hover:text-[#4299E1] transition-colors">পরামর্শ নিন</h4>
                <p class="text-xs text-[#718096] font-medium leading-tight">বিশেষজ্ঞ ডাক্তারের সাথে কথা বলুন এবং পরামর্শ নিন।</p>
              </div>
              <div class="w-8 h-8 rounded-full bg-[#F7FAFC] flex items-center justify-center border border-[#EDF2F7]">
                 <ion-icon :icon="chevronForward" class="text-[#CBD5E0]"></ion-icon>
              </div>
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
        
        <button class="flex flex-col items-center gap-1 text-[#A0AEC0] hover:text-[#7FD1B9] transition-colors" @click="navigateToLink('/ai-chat')">
          <ion-icon :icon="chatbubbles" class="text-2xl"></ion-icon>
          <span class="text-[10px] font-bold font-baloo">এআই চ্যাট</span>
        </button>
        
        <button class="flex flex-col items-center gap-1 text-[#A0AEC0] hover:text-[#7FD1B9] transition-colors" @click="navigateToLink('/parent-profile')">
          <ion-icon :icon="person" class="text-2xl"></ion-icon>
          <span class="text-[10px] font-bold font-baloo">প্রোফাইল</span>
        </button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IonPage, IonContent, IonButton, IonIcon, IonFooter, onIonViewWillEnter } from "@ionic/vue";
import { home, chatbubbles, person, chevronForward, medkit, happy, grid, checkmarkCircle } from "ionicons/icons";
import { ref, computed } from "vue";

const router = useRouter();

// State
const childScore = ref(0); // 0-10 Scale
const isActionCompleted = ref(false); // Tracks if the recommended action is done

// Lifecycle Hook
onIonViewWillEnter(() => {
  const savedScore = localStorage.getItem('childMentalHealthScore');

  if (savedScore === null) {
    childScore.value = 8; // Default test value
    localStorage.setItem('childMentalHealthScore', '8');
  } else {
    childScore.value = parseInt(savedScore);
  }

  checkCompletionStatus();
});

const checkCompletionStatus = () => {
    isActionCompleted.value = false;
    const score = childScore.value;

    if (score <= 4) {
        // Check if Counseling is booked
        if (localStorage.getItem('counselingBooked') === 'true') {
            isActionCompleted.value = true;
        }
    } else if (score <= 7) {
        // Check if Magic Balloon (ID 1) is completed
        const completedActivities = JSON.parse(localStorage.getItem('completedActivities') || '[]');
        if (completedActivities.includes(1)) {
            isActionCompleted.value = true;
        }
    } else {
        // Check if Memory Master (ID 2 in Games) is completed
        const completedGames = JSON.parse(localStorage.getItem('completedGames') || '[]');
        if (completedGames.includes(2)) {
            isActionCompleted.value = true;
        }
    }
};

// Computed Configuration for the Status Card
const statusConfig = computed(() => {
    const score = childScore.value;
    const completed = isActionCompleted.value;

    // Common Completed Style
    const completedStyle = {
        '--background': '#E2E8F0',
        '--background-hover': '#E2E8F0',
        '--color': '#A0AEC0',
        '--box-shadow': 'none',
        'opacity': '1'
    };

    // Risky (0 - 4)
    if (score <= 4) {
        return {
            title: "মনোযোগ প্রয়োজন",
            description: "আপনার সন্তানের মানসিক অবস্থা কিছুটা খারাপ। বিশেষজ্ঞের পরামর্শ নেওয়া জরুরি।",
            ctaText: completed ? "বুক করা হয়েছে" : "কাউন্সেলিং বুক করুন",
            borderColor: "border-[#FC8181]", // Red/Pink
            blobColor: "bg-[#FED7D7]",
            badgeColor: "bg-[#FFF5F5] text-[#FC8181]",
            textColor: "text-[#FC8181]",
            icon: completed ? checkmarkCircle : medkit,
            buttonStyle: completed ? completedStyle : {
                '--background': '#FC8181',
                '--background-hover': '#F56565',
                '--color': 'white',
                '--box-shadow': '0 4px 12px rgba(252, 129, 129, 0.3)'
            },
            actionLink: '/counseling'
        };
    } 
    // Medium (5 - 7)
    else if (score <= 7) {
        return {
            title: "উন্নতি প্রয়োজন",
            description: "অবস্থা মোটামুটি। তবে এই শ্বাস-প্রশ্বাসের ব্যায়ামটি করলে হাসান আরও ভালো বোধ করবে।",
            ctaText: completed ? "সম্পন্ন হয়েছে" : "জাদুর বেলুন শুরু করুন",
            borderColor: "border-[#F6AD55]", // Orange
            blobColor: "bg-[#FEEBC8]",
            badgeColor: "bg-[#FFFAF0] text-[#F6AD55]",
            textColor: "text-[#F6AD55]",
            icon: completed ? checkmarkCircle : happy,
            buttonStyle: completed ? completedStyle : {
                '--background': '#F6AD55',
                '--background-hover': '#DD6B20',
                '--color': 'white',
                '--box-shadow': '0 4px 12px rgba(246, 173, 85, 0.3)'
            },
            actionLink: '/activity/balloon' 
        };
    } 
    // Great (8 - 10)
    else {
        return {
            title: "চমৎকার অবস্থা!",
            description: "হাসান দারুণ আছে! তার মনোযোগ আরও বাড়াতে 'মেমোরি মাস্টার' গেমটি খেলতে দিন।",
            ctaText: completed ? "সম্পন্ন হয়েছে" : "মেমোরি গেম খেলুন",
            borderColor: "border-[#68D391]", // Green
            blobColor: "bg-[#C6F6D5]",
            badgeColor: "bg-[#F0FFF4] text-[#48BB78]",
            textColor: "text-[#48BB78]",
            icon: completed ? checkmarkCircle : grid,
            buttonStyle: completed ? completedStyle : {
                '--background': '#48BB78',
                '--background-hover': '#38A169',
                '--color': 'white',
                '--box-shadow': '0 4px 12px rgba(72, 187, 120, 0.3)'
            },
            actionLink: '/activity/memory-master'
        };
    }
});

const navigateToLink = (link: string) => {
  router.push(link);
};

const handleStatusAction = () => {
    if (isActionCompleted.value) return; 
    router.push(statusConfig.value.actionLink);
};
</script>

<style scoped>
.font-baloo { font-family: "Baloo Da 2", "Nunito", sans-serif; }
ion-content { --background: #fffbf7; }
.playful-button { --border-radius: 16px; font-family: "Baloo Da 2", sans-serif; letter-spacing: 0.5px; }
</style>