<!-- src/views/ChatPage.vue -->
<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-gray-100">
      <main class="ion-padding flex flex-col gap-3 pt-6">
        <div
          v-for="message in messages"
          :key="message.id"
        >
          <MsgDiv :message="message" />
        </div>

        <div class="fixed bottom-0 left-0 right-0 bg-white z-50">
            <MsgButtonDiv
                v-if="currentOptions.length"
                :options="currentOptions"
                @select="handleOptionSelect"
            />
            <MsgInputDiv @sendMessage="handleSendMessage" />
        </div>

        <p class="pb-24"></p>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'
import { IonPage, IonContent } from '@ionic/vue'
import MsgDiv from '@/components/MsgDiv.vue'
import MsgInputDiv from '@/components/MsgInputDiv.vue'
import MsgButtonDiv from '@/components/MsgButtonDiv.vue'

interface ChatMessage {
  id: number
  sender_type: 'user' | 'ai'
  message: string
  created_at: string
  options?: string[]
}

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    sender_type: "ai",
    message: "তোমার ওয়েল-বিয়িং স্কোর ৮৯%। এটি ইঙ্গিত করে যে তুমি হয়তো দুশ্চিন্তা বা মানসিক চাপ অনুভব করছো। এভাবে অনুভব করাটা একদম স্বাভাবিক—তোমার অনুভূতিগুলো সত্যি, এবং তুমি একা নও।",
    created_at: "2025-08-07T12:00:00Z"
  },
  {
    id: 2,
    sender_type: "ai",
    message: "আমরা তোমার জন্য কিছু ব্যক্তিগত সেল্ফ-কেয়ার এক্টিভিটি ও মানসিক সুস্থতার টুলস তৈরি করেছি যা আমাদের হোমপেজে পাবে।",
    created_at: "2025-08-07T12:00:04Z"
  },
  {
    id: 3,
    sender_type: "user",
    message: "আমি কীভাবে কাউন্সেলিং নিতে পারি?",
    created_at: "2025-08-07T12:02:09Z"
  },
  {
    id: 4,
    sender_type: "ai",
    message: "তুমি অ্যাপ থেকে বা আমাদের পেশাদার হেল্পলাইন নম্বরে কল করে কাউন্সেলিং সেবা নিতে পারো। আমাদের পেশাদার হেল্পলাইন নম্বর +8801776-632344",
    created_at: "2025-08-07T12:02:12Z"
  }
])

const inputType = ref<'text' | 'buttons'>('buttons')


function addMessage(sender: 'user' | 'ai', text: string, options?: string[]) {
  messages.value.push({
    id: Date.now(),
    sender_type: sender,
    message: text,
    created_at: new Date().toISOString(),
    options
  })

  inputType.value = options ? 'buttons' : 'text'
  const currentOptions = ref<string[]>([])
  currentOptions.value = options || []
}

function handleSendMessage(message: string) {
  addMessage('user', message)

  setTimeout(() => {
    addMessage('ai', "Thanks for sharing. What’s been on your mind lately?")
  }, 500)
}

function handleOptionSelect(option: string) {
  addMessage('user', option)

  setTimeout(() => {
    if (option === 'Not great') {
      addMessage('ai', 'I’m here for you. Want to talk about it?', ['Yes', 'Not now'])
    } else {
      addMessage('ai', 'That’s good to hear. Would you like to explore some tips for wellness?', ['Yes please', 'No thanks'])
    }
  }, 500)
}

const currentOptions = computed(() => {
  const last = messages.value[messages.value.length - 1]
  return last?.options || []
})
</script>
