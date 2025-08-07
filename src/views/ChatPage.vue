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

        <MsgInputDiv
          v-if="inputType === 'text'"
          @sendMessage="handleSendMessage"
        />
        <MsgButtonDiv
          v-else-if="inputType === 'buttons'"
          :options="currentOptions"
          @select="handleOptionSelect"
        />

        <p class="pb-24"></p>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonContent } from '@ionic/vue'
import MsgDiv from '@/components/Chat/MsgDiv.vue'
import MsgInputDiv from '@/components/Chat/MsgInputDiv.vue'
import MsgButtonDiv from '@/components/Chat/MsgButtonDiv.vue'

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
    sender_type: 'ai',
    message: 'Hello! How are you feeling today?',
    created_at: new Date().toISOString(),
    options: ['Good', 'Okay', 'Not great']
  }
])

const inputType = ref<'text' | 'buttons'>('buttons')
const currentOptions = ref<string[]>(messages.value[0].options || [])

function addMessage(sender: 'user' | 'ai', text: string, options?: string[]) {
  messages.value.push({
    id: Date.now(),
    sender_type: sender,
    message: text,
    created_at: new Date().toISOString(),
    options
  })

  inputType.value = options ? 'buttons' : 'text'
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
</script>
