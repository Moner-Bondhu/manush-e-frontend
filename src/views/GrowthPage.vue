<template>
  <ion-page>
    <ion-header class="ion-no-border pt-4 pb-2 bg-[#FFFBF7]">
      <ion-toolbar class="">
        <ion-title class="flex font-baloo text-xl font-extrabold text-[#4A4A4A] bg-[#FFFBF7]">
          মিশন ম্যাপ
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="bg-[#FFFBF7] relative">
        <div class="bg-[#FFFBF7]">
      <div class="flex flex-col items-center justify-items-center text-center pb-4 px-4 relative font-baloo">
        <template v-for="day in progressData" :key="day.date">
          <div class="w-full relative flex items-center my-6">
            <div
              class="absolute left-0 text-xs font-bold text-[#A0AEC0] bg-[#FFFBF7] pr-2 py-1 whitespace-nowrap"
            >
              {{ day.date }}
            </div>
            <div class="w-full h-0 border-b-2 border-dashed border-[#E2E8F0]"></div>
          </div>

          <div class="flex flex-col w-full items-center relative">
            <template v-for="mission in day.missions" :key="mission.id">
              <div
                class="relative flex flex-col items-center my-4 transition-transform duration-300"
                :class="getNodeOffsetClass(mission.globalIndex)"
              >
                <!-- connector: no z, no hitbox -->
                <div
                  v-if="shouldShowConnector(mission.globalIndex)"
                  class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-3 h-8 rounded-full"
                  :class="getConnectorColor(mission.globalIndex)"
                  :style="getConnectorTransform(mission.globalIndex)"
                ></div>

                <div class="relative flex flex-col items-center">
                  <div
                    class="w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-all duration-300 relative"
                    :class="getNodeStyles(mission.state)"
                    @click="handleMissionClick(mission)"
                  >
                    <div
                      v-if="mission.state === 'active'"
                      class="absolute inset-0 rounded-full animate-ping opacity-30 bg-[#FF9F43]"
                    ></div>

                    <ion-icon
                      v-if="mission.state === 'completed'"
                      :icon="checkmark"
                      class="text-4xl text-white"
                    ></ion-icon>
                    <ion-icon
                      v-else-if="mission.state === 'locked' || mission.state === 'coming_soon'"
                      :icon="lockClosed"
                      class="text-3xl text-[#A0AEC0] opacity-70"
                    ></ion-icon>
                    <ion-icon
                      v-else
                      :icon="getMissionIcon(mission.type)"
                      class="text-4xl text-white"
                    ></ion-icon>

                    <div
                      v-if="mission.state === 'completed'"
                      class="absolute -top-1 -right-1 text-yellow-400 text-lg animate-bounce-short"
                    >
                      ✨
                    </div>
                  </div>

                  <!-- ACTIVE: bubble on the right side with side-bounce -->
                  <div
                    v-if="mission.state === 'active'"
                    class="absolute left-full ml-3 top-1/2 -translate-y-1/2"
                  >
                    <div
                      class="relative bg-white border-2 border-[#FF9F43] px-3 py-1 rounded-xl shadow-sm whitespace-nowrap z-50 animate-bounce-side"
                    >
                      <span class="text-xs font-bold text-[#FF9F43]">শুরু করো</span>
                      <!-- arrow pointing toward the circle -->
                      <div
                        class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l-2 border-b-2 border-[#FF9F43] transform rotate-45 z-50"
                      ></div>
                    </div>
                  </div>

                  <!-- COMING SOON: same layout, no bounce -->
                  <div
                    v-if="mission.state === 'coming_soon'"
                    class="absolute left-full ml-3 top-1/2 -translate-y-1/2"
                  >
                    <div
                      class="relative bg-[#EDF2F7] border border-[#CBD5E0] px-2 py-1 rounded-xl whitespace-nowrap"
                    >
                      <span class="text-[10px] font-bold text-[#718096]">
                        শীঘ্রই আসছে...
                      </span>
                      <div
                        class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#EDF2F7] border-l border-b border-[#CBD5E0] transform rotate-45"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    </ion-content>

    <ion-footer class="ion-no-border bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      <div class="flex justify-around items-center h-20 px-6 pb-2 bg-white rounded-t-3xl">
        <button class="flex flex-col items-center gap-1 text-[#A0AEC0] hover:text-[#FF9F43] transition-colors" @click="goHome">
          <ion-icon :icon="home" class="text-2xl"></ion-icon>
          <span class="text-[10px] font-bold font-baloo">হোম</span>
        </button>
        
        <button class="flex flex-col items-center gap-1 text-[#7FD1B9]">
          <ion-icon :icon="leaf" class="text-2xl"></ion-icon>
          <span class="text-[10px] font-bold font-baloo">অগ্রগতি</span>
          <div class="w-1 h-1 bg-[#7FD1B9] rounded-full"></div>
        </button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonFooter,
  onIonViewWillEnter,
} from "@ionic/vue";
import {
  checkmark,
  lockClosed,
  star,
  book,
  gameController,
  home,
  leaf,
} from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const childName = ref(localStorage.getItem("childName") || "");
const parentName = ref(localStorage.getItem("parentName") || "");

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

type MissionState = "completed" | "active" | "locked" | "coming_soon";
type MissionType = "quiz" | "reading" | "game";

interface Mission {
  id: number;
  globalIndex: number;
  title: string;
  type: MissionType;
  state: MissionState;
}

interface DayProgress {
  date: string;
  missions: Mission[];
}

const missionLayout: Record<
  number,
  { offset: string; connector?: string; hideConnector?: boolean }
> = {
  0: { offset: "translate-x-0", hideConnector: true },
  1: {
    offset: "-translate-x-12 translate-y-4",
    connector: "transform: rotate(25deg) translateX(12px) translateY(-15px)",
  },
  2: {
    offset: "translate-x-12",
    connector: "transform: rotate(-40deg) translateX(-55px) translateY(-25px)",
  },
  3: {
    offset: "translate-x-0",
    connector: "transform: rotate(25deg) translateX(10px) translateY(-20px)",
  },
  4: {
    offset: "-translate-x-12 translate-y-4",
    connector: "transform: rotate(25deg) translateX(12px) translateY(-10px)",
  },
  5: {
    offset: "translate-x-12",
    connector: "transform: rotate(-40deg) translateX(-55px) translateY(-25px)",
  },
  6: {
    offset: "translate-x-0",
    connector: "transform: rotate(25deg) translateX(10px) translateY(-20px)",
  },
  7: {
    offset: "-translate-x-12 translate-y-4",
    connector: "transform: rotate(25deg) translateX(12px) translateY(-10px)",
  },
  8: {
    offset: "translate-x-12",
    connector: "transform: rotate(-40deg) translateX(-55px) translateY(-25px)",
  },
};

const getNodeOffsetClass = (globalIndex: number) =>
  missionLayout[globalIndex]?.offset ?? "translate-x-0";

const shouldShowConnector = (globalIndex: number) =>
  !missionLayout[globalIndex]?.hideConnector;

const getConnectorTransform = (globalIndex: number) =>
  missionLayout[globalIndex]?.connector ?? "";

const progressData = ref<DayProgress[]>([]);
const currentProgress = ref(0);

onIonViewWillEnter(() => {
  initProgress();
  loadData();
});

const initProgress = () => {
  const saved = localStorage.getItem("userMissionProgress");

  if (saved === null) {
    currentProgress.value = 3;
    localStorage.setItem("userMissionProgress", "3");
  } else {
    currentProgress.value = parseInt(saved);
  }
};

const loadData = () => {
  progressData.value = [
    {
      date: "গতকাল",
      missions: [
        {
          id: 1,
          globalIndex: 0,
          title: "শব্দ কুইজ",
          type: "quiz",
          state: "locked",
        },
        {
          id: 2,
          globalIndex: 1,
          title: "গল্প পড়া",
          type: "reading",
          state: "locked",
        },
        {
          id: 3,
          globalIndex: 2,
          title: "গণিত গেম",
          type: "game",
          state: "locked",
        },
      ],
    },
    {
      date: "আজ",
      missions: [
        {
          id: 4,
          globalIndex: 3,
          title: "নতুন শব্দ",
          type: "quiz",
          state: "locked",
        },
        {
          id: 5,
          globalIndex: 4,
          title: "কবিতা আবৃত্তি",
          type: "reading",
          state: "locked",
        },
        {
          id: 6,
          globalIndex: 5,
          title: "পাজল সমাধান",
          type: "game",
          state: "locked",
        },
      ],
    },
    {
      date: "আগামীকাল",
      missions: [
        {
          id: 7,
          globalIndex: 6,
          title: "সাধারণ জ্ঞান",
          type: "quiz",
          state: "locked",
        },
        {
          id: 8,
          globalIndex: 7,
          title: "গল্প লেখা",
          type: "reading",
          state: "locked",
        },
        {
          id: 9,
          globalIndex: 8,
          title: "মেমরি গেম",
          type: "game",
          state: "locked",
        },
      ],
    },
  ];

  progressData.value.forEach((day) => {
    day.missions.forEach((mission) => {
      if (mission.globalIndex < currentProgress.value) {
        mission.state = "completed";
      } else if (mission.globalIndex === currentProgress.value) {
        if (currentProgress.value < 4) {
          mission.state = "active";
        } else {
          mission.state = "coming_soon";
        }
      } else {
        mission.state = "locked";
      }
    });
  });
};

const getNodeStyles = (state: MissionState) => {
  switch (state) {
    case "completed":
      return "bg-[#FFCB80] border-[#E6A955] cursor-default";
    case "active":
      return "bg-[#7FD1B9] border-[#4DB6AC] shadow-[0_4px_0_#4DB6AC] scale-110 cursor-pointer";
    case "coming_soon":
      return "bg-[#F7FAFC] border-[#CBD5E0] shadow-[0_4px_0_#CBD5E0] cursor-not-allowed";
    case "locked":
    default:
      return "bg-[#EDF2F7] border-[#E2E8F0] shadow-none scale-90 grayscale opacity-60";
  }
};

const getMissionIcon = (type: MissionType) => {
  switch (type) {
    case "quiz":
      return star;
    case "reading":
      return book;
    case "game":
      return gameController;
    default:
      return star;
  }
};

const getConnectorColor = (missionGlobalIndex: number) => {
  if (missionGlobalIndex === 0) return "bg-[#E2E8F0]";
  return missionGlobalIndex - 1 < currentProgress.value
    ? "bg-[#FFCB80]"
    : "bg-[#E2E8F0]";
};

const handleMissionClick = (mission: Mission) => {
  if (mission.state === "active") {
    router.push("/scale/2");
  }
};
</script>

<style scoped>
.font-baloo {
  font-family: "Baloo Da 2", "Nunito", sans-serif;
}

/* ✨ badge bounce (currently horizontal, as you wrote) */
@keyframes bounce-short {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-3px);
  }
}
.animate-bounce-short {
  animation: bounce-short 2s infinite ease-in-out;
}

/* Side bounce for the active bubble */
@keyframes bubble-bounce-side {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
}
.animate-bounce-side {
  animation: bubble-bounce-side 2s infinite ease-in-out;
}
</style>
