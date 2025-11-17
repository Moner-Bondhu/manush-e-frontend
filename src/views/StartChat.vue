<!-- src/views/StartChat.vue -->
<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-gray-100">
      <div class="ion-padding flex flex-col justify-center items-center h-full text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">MonerBondhu Chat</h1>
        <p class="text-sm text-gray-600 mb-6">
          Start a safe and supportive conversation with our intelligent assistant.
        </p>

        <button
          @click="goToChat"
          class="bg-[#CE2327] hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full text-sm transition"
        >
          Start Chatting
        </button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goToChat = () => {
  router.push("/chat");
};
</script>
