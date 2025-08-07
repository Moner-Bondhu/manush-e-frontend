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
    message: "Hey there 👋 How are you feeling today?",
    created_at: "2025-08-07T10:00:00Z",
    options: ["Great", "Okay", "Not good"]
  },
  {
    id: 2,
    sender_type: "user",
    message: "Not good",
    created_at: "2025-08-07T10:00:12Z"
  },
  {
    id: 3,
    sender_type: "ai",
    message: "I'm really sorry to hear that. Want to do a quick 1-minute mood check-in?",
    created_at: "2025-08-07T10:00:14Z",
    options: ["Sure", "Maybe later"]
  },
  {
    id: 4,
    sender_type: "user",
    message: "Sure",
    created_at: "2025-08-07T10:00:17Z"
  },
  {
    id: 5,
    sender_type: "ai",
    message: "Okay, on a scale of 1 to 10, how would you rate your mood right now? (1 = lowest, 10 = best)",
    created_at: "2025-08-07T10:00:20Z"
  },
  {
    id: 6,
    sender_type: "user",
    message: "3",
    created_at: "2025-08-07T10:00:25Z"
  },
  {
    id: 7,
    sender_type: "ai",
    message: "Thanks for sharing. It seems like you're having a tough day 💔",
    created_at: "2025-08-07T10:00:28Z"
  },
  {
    id: 8,
    sender_type: "ai",
    message: "Do you want to talk about what’s been bothering you? Or would you like to try a quick grounding exercise together?",
    created_at: "2025-08-07T10:00:30Z",
    options: ["Talk", "Try exercise"]
  },
  {
    id: 9,
    sender_type: "user",
    message: "Try exercise",
    created_at: "2025-08-07T10:00:34Z"
  },
  {
    id: 10,
    sender_type: "ai",
    message: "Great choice. Let's do a simple breathing technique 🧘",
    created_at: "2025-08-07T10:00:36Z"
  },
  {
    id: 11,
    sender_type: "ai",
    message: "Breathe in for 4 seconds... hold for 4... and out for 6. Let’s do this for 4 rounds. Ready?",
    created_at: "2025-08-07T10:00:38Z",
    options: ["Ready", "Not now"]
  },
  {
    id: 12,
    sender_type: "user",
    message: "Ready",
    created_at: "2025-08-07T10:00:40Z"
  },
  {
    id: 13,
    sender_type: "ai",
    message: "Awesome. 🌬️ Inhale... Hold... Exhale...\n\n(Repeats quietly for 4 rounds...)",
    created_at: "2025-08-07T10:00:42Z"
  },
  {
    id: 14,
    sender_type: "ai",
    message: "Well done. That was a quick reset. 💆‍♀️ How are you feeling now?",
    created_at: "2025-08-07T10:00:47Z",
    options: ["Better", "Same", "Worse"]
  },
  {
    id: 15,
    sender_type: "user",
    message: "Better",
    created_at: "2025-08-07T10:00:49Z"
  },
  {
    id: 16,
    sender_type: "ai",
    message: "That’s really good to hear 😊 Would you like a small reflection journal prompt or a mood tracker link?",
    created_at: "2025-08-07T10:00:51Z",
    options: ["Journal", "Tracker", "No thanks"]
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
