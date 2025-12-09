<template>
  <ion-page>
    <ion-header
      class=""
    >
      <div class="flex items-center gap-3 bg-[#FFFBF7]">
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

        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-[#F3E5F5] border border-[#E9D8FD] flex items-center justify-center relative"
          >
            <span class="text-xl">🤖</span>
            <div
              class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#48BB78] border-2 border-white rounded-full"
            ></div>
          </div>
          <div class="flex flex-col">
            <h1 class="font-baloo font-bold text-[#2D3748] text-lg my-0">
              প্যারেন্টিং এআই
            </h1>
            <span class="text-[10px] text-[#48BB78] font-bold">অনলাইন</span>
          </div>
        </div>
      </div>
    </ion-header>

    <ion-content :fullscreen="true" class="bg-[#FFFBF7]" id="chat-container">
      <div class="flex flex-col px-4 pt-6 pb-4 mb-24 gap-6 font-baloo min-h-full">
        
        <div class="flex justify-center">
          <span class="text-[10px] font-bold text-[#A0AEC0] bg-[#EDF2F7] px-3 py-1 rounded-full">
            আজ, সকাল ১০:৩০
          </span>
        </div>

        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="flex w-full"
          :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div v-if="msg.sender === 'bot'" class="flex-shrink-0 mr-3 self-end mb-1">
             <div class="w-8 h-8 rounded-full bg-[#F3E5F5] flex items-center justify-center border border-[#E9D8FD]">
                <span class="text-sm">🤖</span>
             </div>
          </div>

          <div
            class="max-w-[75%] p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed relative"
            :class="[
              msg.sender === 'user'
                ? 'bg-[#9F7AEA] text-white rounded-br-none'
                : 'bg-white text-[#4A5568] rounded-bl-none border border-[#E2E8F0]'
            ]"
          >
            {{ msg.text }}
            
            <div 
                class="text-[9px] font-bold mt-2 text-right"
                :class="msg.sender === 'user' ? 'text-purple-200' : 'text-gray-400'"
            >
                {{ msg.time }}
            </div>
          </div>

           <div v-if="msg.sender === 'user'" class="flex-shrink-0 ml-3 self-end mb-1">
             <div class="w-8 h-8 rounded-full bg-[#FFE4D6] border border-[#FFB380] overflow-hidden">
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Oliver" alt="User" class="w-full h-full object-cover" />
             </div>
          </div>
        </div>

        <div class="flex w-full justify-start" v-if="isTyping">
             <div class="flex-shrink-0 mr-3 self-end mb-1">
                <div class="w-8 h-8 rounded-full bg-[#F3E5F5] flex items-center justify-center border border-[#E9D8FD]">
                    <span class="text-sm">🤖</span>
                </div>
            </div>
            <div class="bg-white border border-[#E2E8F0] p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                <div class="w-2 h-2 bg-[#CBD5E0] rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-2 h-2 bg-[#CBD5E0] rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-[#CBD5E0] rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
        </div>

      </div>
      <div class="fixed bottom-0 bg-white p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] min-w-full">
        <div class="flex items-center gap-3 bg-[#F7FAFC] p-2 rounded-full border border-[#E2E8F0]">
          <input
            type="text"
            placeholder="এখানে লিখুন..."
            class="flex-1 bg-transparent border-none outline-none px-3 text-[#4A5568] font-baloo placeholder:text-[#A0AEC0]"
            v-model="newMessage"
            @keyup.enter="sendMessage"
          />
          <button
            @click="sendMessage"
            class="w-10 h-10 rounded-full bg-[#9F7AEA] flex items-center justify-center text-white shadow-md active:scale-95 transition-transform"
          >
            <ion-icon :icon="send" class="text-lg ml-1"></ion-icon>
          </button>
        </div>
      </div>
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonContent, IonFooter, IonButton, IonIcon } from "@ionic/vue";
import { send } from "ionicons/icons";
import { useRouter } from "vue-router";
import { ref, nextTick } from "vue";

const router = useRouter();
const newMessage = ref("");
const isTyping = ref(false);

// Pre-mocked Conversation about Breathing Exercises
const messages = ref([
  {
    id: 1,
    sender: "user",
    text: "আমার সন্তান প্রায়ই রেগে যায়। শ্বাস-প্রশ্বাসের ব্যায়াম বা ব্রিদিং এক্সারসাইজ কীভাবে তাকে সাহায্য করতে পারে?",
    time: "১০:৩০"
  },
  {
    id: 2,
    sender: "bot",
    text: 
      "হ্যালো! এটি খুব গুরুত্বপূর্ণ একটি প্রশ্ন। গভীর শ্বাস-প্রশ্বাস বা Deep Breathing শিশুদের নার্ভাস সিস্টেমকে শান্ত করতে সরাসরি সাহায্য করে।\n\n" +
      "যখন শিশুরা রেগে যায়, তাদের শরীর 'ফাইট অর ফ্লাইট' মোডে চলে যায়। ধীরে শ্বাস নিলে মস্তিষ্কে সংকেত যায় যে 'সব ঠিক আছে', ফলে হৃদস্পন্দন কমে এবং তারা দ্রুত শান্ত হতে পারে।",
    time: "১০:৩১"
  },
  {
    id: 3,
    sender: "user",
    text: "আচ্ছা বুঝলাম। কিন্তু ওকে এটা শেখাবো কীভাবে? ও তো ছোট।",
    time: "১০:৩২"
  },
  {
    id: 4,
    sender: "bot",
    text:
      "খেলার ছলে শেখানো সবচেয়ে ভালো! যেমন 'বেলুন শ্বাস' (Balloon Breath)। তাকে কল্পনা করতে বলুন তার পেটের ভেতর একটা বেলুন আছে।\n\n" +
      "শ্বাস নেওয়ার সময় বেলুন (পেট) ফোলাতে বলুন, আর শ্বাস ছাড়ার সময় বেলুন চুপসে ফেলতে বলুন। এটা তাদের মনোযোগ নিজের শরীরের দিকে নিয়ে আসে এবং রাগ কমাতে সাহায্য করে।",
    time: "১০:৩৩"
  }
]);


// Back Button Logic as requested
const handleBack = () => {
    // Standard router back since this is a chat view, 
    // but structure matches the requested snippet logic visually
    router.back();
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  // Add User Message
  messages.value.push({
    id: Date.now(),
    sender: "user",
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  newMessage.value = "";
  scrollToBottom();

  // Simulate Bot Response
  isTyping.value = true;
  scrollToBottom();
  
  setTimeout(() => {
    isTyping.value = false;
    messages.value.push({
      id: Date.now() + 1,
      sender: "bot",
      text: "ধন্যবাদ! আমি এই বিষয়টি নিয়ে আরও বিস্তারিত তথ্য খুঁজছি...",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    scrollToBottom();
  }, 2000);
};

const scrollToBottom = async () => {
    await nextTick();
    const content = document.querySelector('ion-content');
    if (content) {
        content.scrollToBottom(300);
    }
}
</script>

<style scoped>
.font-baloo {
  font-family: "Baloo Da 2", "Nunito", sans-serif;
}
ion-content {
  --background: #fffbf7;
}
/* Hide scrollbar for cleaner look */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>