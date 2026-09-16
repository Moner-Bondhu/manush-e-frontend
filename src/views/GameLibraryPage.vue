<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main class="game-home">
        <header class="top-bar">
          <button type="button" class="ghost-button" @click="router.push({ name: 'Dashboard', query: { profile: profileType } })">{{ text.exit }}</button>
          <div class="brand-mark"><span>m</span> manush-e</div>
          <button type="button" class="language-button" @click="gameLanguage = gameLanguage === 'en' ? 'bn' : 'en'">{{ gameLanguage === 'en' ? 'বাংলা' : 'EN' }}</button>
        </header>

        <section class="hero-panel">
          <div class="hero-copy">
            <p class="kicker">{{ text.playlist }}</p>
            <h1>{{ text.heroTitle }}</h1>
            <p class="hero-description">{{ text.heroDescription }}</p>
            <button type="button" class="start-button" :disabled="!featuredGame" @click="play(featuredGame)">
              {{ featuredGame ? text.start : text.loading }} <span aria-hidden="true">&#8594;</span>
            </button>
          </div>
          <div class="hero-world" aria-hidden="true">
            <div class="sun"></div><div class="hill hill-one"></div><div class="hill hill-two"></div><div class="path"></div>
            <div class="plant plant-one"></div><div class="plant plant-two"></div><div class="plant plant-three"></div>
            <span class="world-label">{{ gameLanguage === 'en' ? 'FOCUS\nGROVE' : 'মনোযোগ\nবন' }}</span>
          </div>
        </section>

        <section class="library-section">
          <div class="section-heading"><div><p class="kicker">{{ text.library }}</p><h2>{{ text.choose }}</h2></div><span>{{ games.length }} {{ text.worlds }}</span></div>
          <p v-if="loading" class="state-copy">{{ text.loading }}</p>
          <p v-else-if="error" class="state-copy">Your game library is unavailable right now.</p>
          <div v-else class="game-grid">
            <article v-for="game in games" :key="game.slug" :class="['game-card', game.theme]">
                <div class="card-scene" aria-hidden="true"><span class="scene-symbol">{{ symbols[game.slug] || '*' }}</span><span class="scene-ring"></span></div>
                <div class="card-body"><div class="tag-row"><span v-for="tag in game.skill_tags" :key="tag">{{ localizedTag(tag, gameLanguage) }}</span><span>{{ minutes(game.duration_seconds) }} {{ gameLanguage === 'en' ? 'min' : 'মিনিট' }}</span></div><h3>{{ displayName(game) }}</h3><p>{{ displayDescription(game) }}</p></div>
                <span class="level-badge">{{ gameLanguage === 'en' ? `Level ${game.progress?.current_level || 1}` : `স্তর ${game.progress?.current_level || 1}` }}</span>
                <button type="button" @click="play(game)">{{ text.play }} <span aria-hidden="true">&#8594;</span></button>
            </article>
          </div>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { gameDescriptions, gameLanguage, gameNames, gameText, localizedTag } from '@/gameLanguage';

interface Game {
  slug: string;
  title: string;
  description: string;
  theme: string;
  skill_tags: string[];
  duration_seconds: number;
  progress?: { current_level: number; unlocked_level: number };
}

const router = useRouter();
const route = useRoute();
const games = ref<Game[]>([]);
const profileId = ref<number | null>(null);
const profileType = computed(() => typeof route.query.profile === 'string' ? route.query.profile : 'child');
const profileInitial = ref('M');
const loading = ref(true);
const error = ref(false);
const symbols: Record<string, string> = { 'focus-lab': '✦', 'memory-market': '◈', 'signal-garden': '✺', 'goal-street': '⚽', 'sky-scout': '☁', 'pet-village': '🐾' };
const featuredGame = computed(() => games.value.find((game) => game.slug === 'focus-lab'));
const text = computed(() => gameText[gameLanguage.value]);
const api = axios.create({ baseURL: import.meta.env.VITE_API_ENDPOINT, headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` } });

const minutes = (seconds: number) => Math.max(1, Math.round(seconds / 60));
const displayName = (game: Game) => gameNames[game.slug]?.[gameLanguage.value] || game.title;
const displayDescription = (game: Game) => gameDescriptions[game.slug]?.[gameLanguage.value] || game.description;

const loadLibrary = async () => {
  try {
    const userResponse = await api.get('/user');
    const profile = userResponse.data.data.profiles.find((item: { id: number; type: string; full_name: string }) => item.type === profileType.value);
    profileId.value = profile?.id || null;
    profileInitial.value = profile?.full_name?.slice(0, 1).toUpperCase() || 'M';
    const gamesResponse = await api.get('/games', { params: profileId.value ? { profile_id: profileId.value } : {} });
    games.value = gamesResponse.data.data;
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const play = (game?: Game) => {
  if (!game) return;
  const query = profileId.value ? { profileId: profileId.value, profile: profileType.value } : { profile: profileType.value };
  if (game.slug === 'focus-lab') {
    router.push({ name: 'FocusLab', query });
    return;
  }
  router.push({ name: 'GameChallenge', params: { slug: game.slug }, query });
};

onMounted(loadLibrary);
</script>

<style scoped>
.game-home { background: #101b38; color: #f7f3e9; min-height: 100%; overflow: hidden; padding: 18px max(18px, calc((100vw - 1120px) / 2)); }.top-bar { align-items: center; display: flex; justify-content: space-between; margin: 0 auto 24px; max-width: 1084px; }.ghost-button { background: transparent; border: 1px solid #607097; border-radius: 100px; color: #e9e8e2; cursor: pointer; padding: 8px 14px; }.brand-mark { font-family: Georgia, serif; font-size: 1.05rem; letter-spacing: .03em; }.brand-mark span { background: #f7cc57; border-radius: 50%; color: #152142; display: inline-grid; font-size: 1.25rem; height: 28px; margin-right: 4px; place-items: center; width: 28px; }.profile-orb { background: #e96542; border: 0; border-radius: 50%; color: white; font: 700 1rem Georgia, serif; height: 38px; width: 38px; }
.hero-panel { background: linear-gradient(120deg, #293c9e, #6d58c8 62%, #ec9f57); border-radius: 30px; display: grid; margin: 0 auto; max-width: 1084px; min-height: 350px; overflow: hidden; }.hero-copy { align-self: center; padding: 36px; position: relative; z-index: 1; }.kicker { color: #f8d66a; font: 700 .72rem Georgia, serif; letter-spacing: .13em; margin: 0; }.hero-copy h1 { font: 400 clamp(2.75rem, 7vw, 5.1rem)/.88 Georgia, serif; letter-spacing: -.06em; margin: 13px 0 18px; }.hero-description { color: #eeebf7; line-height: 1.5; max-width: 360px; }.start-button, .game-card button { background: #f8d66a; border: 0; border-radius: 100px; color: #17234a; cursor: pointer; font: 700 1rem Georgia, serif; margin-top: 17px; padding: 13px 18px; }.start-button:disabled { cursor: wait; opacity: .7; }.start-button span, .game-card button span { margin-left: 8px; }.hero-world { min-height: 280px; overflow: hidden; position: relative; }.sun { background: #ffd866; border-radius: 50%; height: 137px; left: 25%; position: absolute; top: 12%; width: 137px; }.hill { border-radius: 60% 60% 0 0; bottom: -14%; position: absolute; transform: rotate(-10deg); }.hill-one { background: #3e2e86; height: 210px; left: -15%; width: 130%; }.hill-two { background: #1f886c; bottom: -28%; height: 210px; right: -20%; transform: rotate(16deg); width: 95%; }.path { background: #f3c187; border-radius: 50%; bottom: -14%; height: 190px; left: 40%; position: absolute; transform: rotate(15deg); width: 100px; }.plant { background: #133a45; border-radius: 80% 0 80% 0; height: 80px; position: absolute; transform: rotate(20deg); width: 25px; }.plant-one { bottom: 11%; left: 13%; }.plant-two { bottom: 26%; right: 23%; transform: rotate(-23deg); }.plant-three { bottom: 7%; right: 9%; }.world-label { bottom: 19px; font: 700 .7rem/1 Georgia, serif; letter-spacing: .13em; position: absolute; right: 23px; text-align: right; }
.library-section { margin: 42px auto 0; max-width: 1084px; }.section-heading { align-items: end; display: flex; justify-content: space-between; margin-bottom: 17px; }.section-heading h2 { font: 400 clamp(2rem, 5vw, 3.2rem)/1 Georgia, serif; letter-spacing: -.05em; margin: 7px 0 0; }.section-heading > span { color: #a9b5cf; font-size: .85rem; }.game-grid { display:grid; gap:14px; grid-template-columns:repeat(2,minmax(0,1fr)); }.game-card { border-radius: 24px; color: #192246; min-height: 370px; overflow: hidden; padding-bottom: 17px; position: relative; }.game-card.grove { background: #e2f0c9; }.game-card.coral { background: #f8c99f; }.game-card.violet { background: #d8c9ed; }.game-card.maker { background:#c8d8f3; }.game-card.river { background:#a8d9d4; }.card-scene { height: 125px; overflow: hidden; position: relative; }.scene-symbol { font: 4.7rem Georgia, serif; left: 18px; line-height: 1; position: absolute; top: 24px; z-index: 1; }.scene-ring { border: 14px solid #fff7de8f; border-radius: 50%; height: 130px; position: absolute; right: -30px; top: -42px; width: 130px; }.card-body { padding: 0 15px; }.tag-row { display: flex; flex-wrap: wrap; gap: 5px; }.tag-row span, .level-badge { background: #ffffff8c; border-radius: 100px; font-size: .65rem; padding: 5px 7px; }.card-body h3 { font: 400 1.65rem/1 Georgia, serif; letter-spacing: -.045em; margin: 12px 0 8px; }.card-body p { font-size: .82rem; line-height: 1.4; margin: 0; }.game-card button { bottom: 17px; left: 15px; margin: 0; position: absolute; }.level-badge { bottom:25px; position:absolute; right:13px; }.state-copy { color: #b7c4dc; padding: 40px 0; text-align: center; }
@media (min-width: 760px) { .hero-panel { grid-template-columns: 1.1fr .9fr; }.hero-copy { padding: 56px; }.hero-world { min-height: 350px; }.game-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }.card-scene{height:145px}.scene-symbol{font-size:5.8rem;left:27px}.card-body{padding:0 18px}.game-card button{left:18px} }
</style>
