<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-[#FFFBF7]">
      <div class="flex flex-col min-h-full font-baloo relative">
        
        <!-- Header -->
        <div
          class="px-4 flex items-center justify-items-center z-20 bg-white/95 backdrop-blur-md shadow-sm sticky top-0"
        >
          <ion-button
            fill="clear"
            @click="goHome"
            class="text-slate-600 hover:text-purple-600 transition-colors -ml-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
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
          
          <h1 class="text-lg font-extrabold text-[#4A5568] my-0">
            পরামর্শ নিন
          </h1>
          
          <div class="w-7"></div>
        </div>

        <div class="px-6 pb-6 flex-1 bg-[#FFFBF7]">
            
            <div class="mb-8">
                <h3 class="font-extrabold text-[#2D3748] text-lg mb-4">সময় নির্ধারণ করুন</h3>

                <div class="bg-white rounded-3xl p-4 shadow-sm border border-[#E2E8F0] mb-6">
                    <div class="flex items-center justify-between mb-4 px-2">
                        <button
                          @click="changeMonth(-1)"
                          class="w-8 h-8 rounded-full bg-[#EDF2F7] flex items-center justify-center text-[#4A5568] hover:bg-[#E2E8F0]"
                        >
                             <ion-icon :icon="chevronBack" class="text-sm"></ion-icon>
                        </button>
                        <span class="text-lg font-black text-[#2D3748]">
                          {{ currentMonthName }} {{ currentYear }}
                        </span>
                        <button
                          @click="changeMonth(1)"
                          class="w-8 h-8 rounded-full bg-[#EDF2F7] flex items-center justify-center text-[#4A5568] hover:bg-[#E2E8F0]"
                        >
                             <ion-icon :icon="chevronForward" class="text-sm"></ion-icon>
                        </button>
                    </div>

                    <div class="grid grid-cols-7 text-center mb-2">
                        <span
                          v-for="day in weekDays"
                          :key="day"
                          class="text-[10px] font-bold text-[#A0AEC0] uppercase"
                        >
                          {{ day }}
                        </span>
                    </div>

                    <div class="grid grid-cols-7 gap-1">
                        <div
                          v-for="n in startDayOfWeek"
                          :key="'empty-'+n"
                          class="h-10"
                        ></div>
                        
                        <div 
                            v-for="date in daysInMonth" 
                            :key="date.fullDate"
                            @click="selectDate(date)"
                            class="h-10 flex items-center justify-center rounded-xl transition-all text-sm font-bold relative"
                            :class="getDayClass(date)"
                        >
                            {{ date.day }}
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <span class="text-xs font-bold text-[#A0AEC0] uppercase mb-2 block tracking-wide">
                      সময় বাছাই করুন
                    </span>
                    <div class="grid grid-cols-3 gap-3">
                        <div 
                            v-for="(time, index) in timeSlots" 
                            :key="index"
                            @click="selectedTime = time"
                            class="py-3 px-2 rounded-xl border-2 text-center text-xs font-bold cursor-pointer transition-all active:scale-95"
                            :class="selectedTime === time 
                                ? 'bg-[#4FD1C5] border-[#4FD1C5] text-white shadow-md' 
                                : 'bg-white border-[#E2E8F0] text-[#718096]'"
                        >
                            {{ time }}
                        </div>
                    </div>
                </div>

                <button 

                    class="h-12 font-bold font-baloo shadow-lg shadow-orange-100 w-full rounded-full bg-blue-500 text-white text-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!selectedDate || !selectedTime || isBooking"
                    @click="bookSession"
                >
                    <span v-if="!isBooking">সেশন বুক করুন</span>
                    <span v-else>প্রসেসিং...</span>
            </button>
            </div>

            <hr class="border-[#E2E8F0] mb-8" />

            <div>
                <h3 class="font-extrabold text-[#2D3748] text-lg mb-4 flex items-center justify-between">
                    সন্তানের সেশনসমূহ
                    <span class="bg-[#EDF2F7] text-[#718096] text-[10px] px-2 py-1 rounded-full">
                      {{ bookedSessions.length }}
                    </span>
                </h3>

                <div v-if="bookedSessions.length > 0" class="flex flex-col gap-3">
                    <div 
                        v-for="(session, index) in bookedSessions" 
                        :key="index"
                        class="bg-white p-4 rounded-2xl border-l-4 border-[#4FD1C5] shadow-sm flex items-center justify-between"
                    >
                        <div>
                            <p class="text-sm font-black text-[#2D3748]">
                              {{ session.formattedDate }}
                            </p>
                            <p class="text-xs font-semibold text-[#718096] mt-0.5">
                              {{ session.time }}
                            </p>
                        </div>
                        <div class="text-[#4FD1C5] bg-[#E6FFFA] px-3 py-1 rounded-full text-[10px] font-bold">
                            কনফার্মড
                        </div>
                    </div>
                </div>

                <div
                  v-else
                  class="text-center py-8 bg-[#F7FAFC] rounded-2xl border border-dashed border-[#CBD5E0]"
                >
                    <span class="text-2xl block mb-2">📅</span>
                    <p class="text-xs font-bold text-[#A0AEC0]">
                      কোনো সেশন বুক করা নেই
                    </p>
                </div>
            </div>
        </div>

        <transition name="fade">
            <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center px-6">
                <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                <div class="bg-white rounded-3xl p-6 w-full max-w-sm text-center relative z-10 shadow-2xl animate-scale-up">
                    <div class="w-16 h-16 bg-[#F0FFF4] rounded-full flex items-center justify-center mx-auto mb-4">
                        <ion-icon :icon="checkmark" class="text-3xl text-[#48BB78]"></ion-icon>
                    </div>
                    <h2 class="text-xl font-black text-[#2D3748] mb-1">সেশন বুক করা হয়েছে!</h2>
                    <p class="text-[#718096] font-bold text-xs">আপনার অনুরোধটি গ্রহণ করা হয়েছে।</p>
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
  IonIcon,
  onIonViewWillEnter,
} from "@ionic/vue";
import { checkmark, chevronBack, chevronForward } from "ionicons/icons";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();

// Case-wise home nav (child / parent / fallback)
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

// State
const selectedDate = ref<string | null>(null);
const selectedDateDisplay = ref<string>("");
const selectedTime = ref<string | null>(null);
const isBooking = ref(false);
const showSuccessModal = ref(false);
const bookedSessions = ref<any[]>([]);

// Calendar State
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

// Data
const timeSlots = [
  "সকাল ১০:০০",
  "সকাল ১১:৩০",
  "বিকাল ০৪:০০",
  "বিকাল ০৫:৩০",
  "রাত ০৮:০০",
];
const weekDays = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];
const monthNames = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

// Calendar Computed
const currentMonthName = computed(() => monthNames[currentMonth.value]);

const daysInMonth = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1);
  const days: { day: number; fullDate: string; obj: Date }[] = [];

  while (date.getMonth() === currentMonth.value) {
    days.push({
      day: date.getDate(),
      fullDate: date.toISOString().split("T")[0], // YYYY-MM-DD
      obj: new Date(date),
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
});

const startDayOfWeek = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

// Helpers
const getTodayString = () => new Date().toISOString().split("T")[0];

const isPastOrToday = (date: any) => {
  return date.fullDate <= getTodayString();
};

const isSelected = (date: any) => selectedDate.value === date.fullDate;

const getDayClass = (date: any) => {
  if (isPastOrToday(date)) {
    return "text-gray-300 cursor-not-allowed bg-gray-50";
  }
  if (isSelected(date)) {
    return "bg-[#FF9F43] text-white shadow-md cursor-pointer";
  }
  return "text-[#4A5568] hover:bg-[#FFFAF0] cursor-pointer";
};

// Methods
const changeMonth = (delta: number) => {
  currentMonth.value += delta;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
};

const selectDate = (date: any) => {
  // Block past or today
  if (isPastOrToday(date)) return;

  selectedDate.value = date.fullDate;
  const dayName = weekDays[date.obj.getDay()];
  const monthName = monthNames[date.obj.getMonth()].slice(0, 3);
  selectedDateDisplay.value = `${date.day} ${monthName}, ${dayName}`;
};

// Lifecycle
onIonViewWillEnter(() => {
  loadSessions();
});

const loadSessions = () => {
  const saved = localStorage.getItem("bookedSessions");
  bookedSessions.value = saved ? JSON.parse(saved) : [];
};

const bookSession = () => {
  if (!selectedDate.value || !selectedTime.value) return;

  isBooking.value = true;

  setTimeout(() => {
    const newSession = {
      date: selectedDate.value,
      formattedDate: selectedDateDisplay.value,
      time: selectedTime.value,
      id: Date.now(),
    };

    bookedSessions.value.unshift(newSession);
    localStorage.setItem("bookedSessions", JSON.stringify(bookedSessions.value));
    localStorage.setItem("counselingBooked", "true");

    isBooking.value = false;
    showSuccessModal.value = true;
    selectedTime.value = null;
    selectedDate.value = null;

    setTimeout(() => {
      showSuccessModal.value = false;
    }, 2000);
  }, 1000);
};
</script>

<style scoped>
.font-baloo {
  font-family: "Baloo Da 2", "Nunito", sans-serif;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
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
