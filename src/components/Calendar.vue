<template>
  <div class="grid grid-cols-7 rounded-2xl gap-2">
    <div v-for="(day, index) in week" :key="index" class="shadow rounded-xl p-2 m-0 text-center"
      :class="{ 'bg-[#F2684F] text-white': index === 1, 'bg-white': index !== 1 }">
      <p class="text-xl py-1 font-semibold">{{ day.date }}</p>
      <p class="text-xs py-1 opacity-80 uppercase">{{ day.day }}</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      week: this.generateWeek(),
    };
  },
  methods: {
    generateWeek() {
      const today = new Date();
      let week = [];

      for (let i = -1; i < 6; i++) {
        let date = new Date();
        date.setDate(today.getDate() + i);

        week.push({
          date: date.getDate().toString().padStart(2, '0'),
          day: date.toLocaleString('en-us', { weekday: 'short' }).toLowerCase(),
        });
      }

      return week;
    },
  },
};
</script>

<style scoped>
.bg-white {
  background-color: #fff;
}
</style>