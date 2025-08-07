<template>
  <div
    class="flex items-start gap-2.5 w-full"
    :class="{ 'flex-row-reverse': message.sender_type === 'user' }"
  >
    <div
      class="flex flex-col w-full max-w-[320px] p-2 border border-gray-200 bg-white justify-end mb-2"
      :class="message.sender_type === 'user'
        ? 'rounded-l-xl rounded-br-2xl'
        : 'rounded-r-xl rounded-bl-2xl'"
    >
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <span
          class="text-xs font-semibold flex w-full"
          :class="message.sender_type === 'user' ? 'text-red-500' : 'text-gray-900'"
        >
          {{ message.sender_type === 'user' ? 'You' : 'Moner Bondhu' }}
        </span>
      </div>
      <pre
        class="font-sans text-sm font-normal py-1.5 text-gray-900 whitespace-pre-wrap"
      >{{ message.message }}</pre>
      <div
        class="flex items-center text-xs font-normal text-gray-500 gap-1 justify-end"
      >
        <span class="block w-full text-right">{{ formatDate(message.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ChatMessage {
  id: number
  sender_type: 'user' | 'ai'
  message: string
  created_at: string
}

const { message } = defineProps<{ message: ChatMessage }>()

function formatDate(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)

  if (now.toDateString() === date.toDateString()) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return date.toLocaleDateString()
}
</script>
