<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-[#FFFBF7]">
      <div class="flex flex-col h-full font-baloo relative">
        
        <div class="px-6 pt-12 pb-4 flex items-center justify-between z-20">
          <ion-button
            fill="clear"
            @click="goHome"
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
          
          <div class="bg-white/50 backdrop-blur-md px-4 py-1 rounded-full border border-purple-100 shadow-sm">
             <span class="text-purple-600 font-bold tabular-nums text-lg">{{ formattedTime }}</span>
          </div>
          
          <div class="w-8"></div>
        </div>

        <div class="px-6 mb-4 text-center">
            <h1 class="text-2xl font-extrabold text-[#4A5568]">মেমোরি মাস্টার</h1>
            <p class="text-xs text-[#A0AEC0] font-bold">জোড়া মিলিয়ে টাইলস সরাও</p>
        </div>

        <div class="flex-1 flex justify-center items-center px-4 pb-4">
            <div class="grid grid-cols-4 gap-3 max-w-xs mx-auto">
                <div 
                    v-for="(tile, index) in tiles" 
                    :key="index"
                    class="relative w-16 h-20 perspective cursor-pointer group"
                    @click="handleTileClick(index)"
                >
                    <div 
                        class="w-full h-full transition-all duration-500 preserve-3d"
                        :class="{ 'rotate-y-180': tile.isFlipped || tile.isMatched, 'opacity-0 scale-0': tile.isMatched && hideMatched }"
                    >
                        <div class="absolute inset-0 w-full h-full backface-hidden bg-[#3F51B5] rounded-lg shadow-md border-b-4 border-[#283593] flex items-center justify-center">
                            <div class="w-12 h-16 border-2 border-[#5C6BC0] rounded border-dashed opacity-50"></div>
                        </div>

                        <div class="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#FFF] rounded-lg shadow-md border-b-4 border-[#E2E8F0] flex items-center justify-center text-3xl select-none">
                            {{ tile.emoji }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="pb-8 px-6 flex justify-center">
             <button 
                @click="handleWin"
                class="text-[10px] text-gray-400 font-bold border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
             >
                Demo: Finish Early ⏩
             </button>
        </div>

        <transition name="fade">
            <div v-if="showStartModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
                 <div class="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl animate-bounce-in relative overflow-hidden">
                     <div class="absolute top-[-20px] left-[-20px] w-24 h-24 bg-purple-100 rounded-full opacity-50"></div>
                     
                     <div class="text-5xl mb-4 relative z-10">👀</div>
                     <h2 class="text-2xl font-black text-[#2D3748] mb-2 relative z-10">জোড়া টাইলগুলো মিলাও</h2>
                     <p class="text-sm text-gray-500 font-bold mb-6 relative z-10">
                        প্রথমে টাইলগুলো ২ সেকেন্ডের জন্য দেখানো হবে। মনে রেখো কোথায় কী আছে! যত দ্রুত সম্ভব সব জোড়া মিলিয়ে ফেলো।
                     </p>
                     
                     <button 
                        class="font-bold font-baloo h-12 relative z-10 bg-[#3F51B5] text-white rounded-full px-6 py-2"
                        @click="startGameSequence"
                     >
                        খেলা শুরু করো
                        <ion-icon slot="end" :icon="play" class="ml-2"></ion-icon>
                    </button>
                 </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center px-6">
                <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                <div class="bg-white rounded-3xl p-8 w-full max-w-sm text-center relative z-10 shadow-2xl animate-scale-up">
                    <div class="text-6xl mb-4">🏆</div>
                    <h2 class="text-2xl font-black text-[#FF9F43] mb-2">অসাধারণ!</h2>
                    <p class="text-[#718096] font-bold text-sm mb-4">তুমি সব জোড়া মিলিয়েছো!</p>
                    
                    <div class="bg-[#F7FAFC] rounded-xl p-4 mb-6 border border-[#E2E8F0]">
                        <span class="text-xs text-[#A0AEC0] font-bold uppercase">তোমার সময়</span>
                        <div class="text-3xl font-black text-[#48BB78]">{{ formattedTime }}</div>
                    </div>
                </div>
            </div>
        </transition>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonIcon, onIonViewDidEnter, onIonViewWillLeave } from "@ionic/vue";
import { play } from "ionicons/icons";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import confetti from "canvas-confetti";

const router = useRouter();

// names used in goHome – wire with your actual state if needed
const childName = ref("");
const parentName = ref("");

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

// --- Game Configuration (4x4 Grid) ---
const allEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮']; 

interface Tile {
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const tiles = ref<Tile[]>([]);
const flippedTiles = ref<number[]>([]);
const isProcessing = ref(true); 
const showStartModal = ref(true);
const showSuccessModal = ref(false);
const hideMatched = ref(false); 

// Timer State
const timer = ref(0);
const timerInterval = ref<any>(null);
const gameEnded = ref(false);

const formattedTime = computed(() => {
    const m = Math.floor(timer.value / 60);
    const s = timer.value % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
});

onIonViewDidEnter(() => {
    resetGame();
});

onIonViewWillLeave(() => {
    clearInterval(timerInterval.value);
});

const resetGame = () => {
    const shuffledEmojis = shuffle([...allEmojis]).slice(0, 8);
    const cardDeck = [...shuffledEmojis, ...shuffledEmojis];

    tiles.value = shuffle(cardDeck).map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
    }));

    timer.value = 0;
    flippedTiles.value = [];
    isProcessing.value = true;
    showSuccessModal.value = false;
    showStartModal.value = true;
    gameEnded.value = false;   // ✅ allow fresh game run
};

const startGameSequence = async () => {
    if (gameEnded.value) return;  // ⛔ Skip/finish pressed early

    showStartModal.value = false;

    // Reveal tiles
    tiles.value.forEach(t => t.isFlipped = true);
    await wait(2000);

    // If game ended while preview was happening, don't continue
    if (gameEnded.value) return;  // ⛔ Prevent re-start

    // Hide tiles & start game
    tiles.value.forEach(t => t.isFlipped = false);
    isProcessing.value = false;
    
    startTimer();
};

const handleTileClick = (index: number) => {
    const tile = tiles.value[index];

    if (isProcessing.value || tile.isFlipped || tile.isMatched || gameEnded.value) return;

    tile.isFlipped = true;
    flippedTiles.value.push(index);

    if (flippedTiles.value.length === 2) {
        isProcessing.value = true;
        checkForMatch();
    }
};

const checkForMatch = async () => {
    const [index1, index2] = flippedTiles.value;
    const tile1 = tiles.value[index1];
    const tile2 = tiles.value[index2];

    if (!tile1 || !tile2) {
      flippedTiles.value = [];
      isProcessing.value = false;
      return;
    }

    if (tile1.emoji === tile2.emoji) {
        tile1.isMatched = true;
        tile2.isMatched = true;
        flippedTiles.value = [];
        isProcessing.value = false;

        if (tiles.value.every(t => t.isMatched)) {
            handleWin(); // ✅ real completion, keep elapsed time
        }
    } else {
        await wait(800);
        tile1.isFlipped = false;
        tile2.isFlipped = false;
        flippedTiles.value = [];
        isProcessing.value = false;
    }
};

const handleWin = () => {
    gameEnded.value = true;          // 🔐 Lock the game
    clearInterval(timerInterval.value); // ⏱ stop timer, keep elapsed time

    tiles.value.forEach(t => {
        t.isFlipped = true; 
        t.isMatched = true; 
    });

    triggerConfetti();
    saveCompletionState();

    showSuccessModal.value = true;

    setTimeout(() => {
        goHome();
    }, 4000);
};

const startTimer = () => {
    if (gameEnded.value) return;  // ⛔ don't start timer after end

    clearInterval(timerInterval.value);
    timerInterval.value = setInterval(() => {
        timer.value++;
    }, 1000);
};

const shuffle = (array: string[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const saveCompletionState = () => {
    const existing = localStorage.getItem('completedGames');
    let completedList = existing ? JSON.parse(existing) : [];
    
    // ID 2 corresponds to Memory Master
    if (!completedList.includes(2)) {
        completedList.push(2);
        localStorage.setItem('completedGames', JSON.stringify(completedList));
    }
};

const triggerConfetti = () => {
    const duration = 200;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#48BB78', '#4299E1', '#F6AD55']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#48BB78', '#4299E1', '#F6AD55']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
};
</script>

<style scoped>
.font-baloo { font-family: "Baloo Da 2", "Nunito", sans-serif; }

.perspective {
    perspective: 1000px;
}
.preserve-3d {
    transform-style: preserve-3d;
}
.backface-hidden {
    backface-visibility: hidden;
}
.rotate-y-180 {
    transform: rotateY(180deg);
}

@keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); opacity: 1; }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); }
}
.animate-bounce-in {
    animation: bounceIn 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards;
}

@keyframes scaleUp {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
.animate-scale-up {
    animation: scaleUp 0.3s ease-out forwards;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
