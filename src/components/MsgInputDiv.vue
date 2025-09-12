<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 flex items-start gap-2">
    <textarea
      v-model="message"
      @input="autoResize"
      @keyup.enter.ctrl.prevent="send"
      rows="1"
      placeholder="Type your message..."
      class="flex-1 text-xs resize-none overflow-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 max-h-32"
    ></textarea>
    <button
      @click="send"
      class="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-semibold text-xs"
    >
      Send
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['sendMessage'])
const message = ref('')

function send() {
  if (!message.value.trim()) return
  emit('sendMessage', message.value.trim())
  message.value = ''
}

function autoResize(event: Event) {
  const textarea = event.target as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px'
}
</script>
