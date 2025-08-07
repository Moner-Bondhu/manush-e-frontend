<template>
  <div class="fixed bottom-0 left-0 right-0 p-3 flex gap-3 justify-between bg-white">
    <button
      v-for="option in options"
      :key="option"
      @click="handleClick(option)"
      class="flex-1 bg-gray-200 font-semibold py-2 rounded-full text-xs"
    >
      {{ option }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  options: string[]
}>()

const emit = defineEmits(['select'])

function handleClick(option: string) {
  emit('select', option)
}
</script>
