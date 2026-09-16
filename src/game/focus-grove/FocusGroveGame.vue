<template>
  <ion-page>
    <ion-content :fullscreen="true" :scroll-y="false">
      <main class="grove" @keydown.left.prevent="choose('pass')" @keydown.right.prevent="choose('collect')" tabindex="0">
        <header class="hud">
          <button type="button" @click="leave">{{ language === 'en' ? 'Exit' : 'বের হও' }}</button>
          <div class="brand">{{ language === 'en' ? 'FOCUS GROVE' : 'মনোযোগ বন' }} <span>01</span></div>
          <button type="button" @click="language = language === 'en' ? 'bn' : 'en'">{{ language === 'en' ? 'বাংলা' : 'EN' }}</button>
        </header>

        <section v-if="stage === 'intro'" class="intro-panel">
          <p class="eyebrow">{{ language === 'en' ? 'THE FIREFLY TRAIL' : 'জোনাকির পথ' }}</p>
          <h1>{{ language === 'en' ? 'Follow the lights.' : 'আলোর সাথে চলো।' }}</h1>
          <p>{{ language === 'en' ? 'Collect the glowing fireflies. Let the sleepy thorns drift by. Use the buttons, arrow keys, or swipe left and right.' : 'জ্বলজ্বলে জোনাকি সংগ্রহ করো। ঘুমন্ত কাঁটাকে যেতে দাও। বোতাম, অ্যারো কী বা সোয়াইপ ব্যবহার করো।' }}</p>
          <div class="intro-scene"><i class="moon"></i><i class="tree tree-a"></i><i class="tree tree-b"></i><i class="firefly"></i><span>✦</span></div>
          <button type="button" class="launch" @click="start">{{ language === 'en' ? 'Start trail' : 'পথ শুরু করো' }} <b>→</b></button>
          <small>{{ language === 'en' ? 'A short focus adventure. You can stop whenever you want.' : 'ছোট একটি মনোযোগের অভিযান। চাইলে যেকোনো সময় থামতে পারো।' }}</small>
        </section>

        <section v-else-if="stage === 'play'" class="game-shell" @touchstart="touchStart = $event.touches[0].clientX" @touchend="swipe">
          <div class="status"><span>{{ language === 'en' ? 'TRAIL' : 'পথ' }} {{ turn }}/{{ activePrompts.length }}</span><span class="lanterns">{{ collected }} <b>✦</b></span></div>
          <div class="world" :class="{ flash: feedback === 'good', shake: feedback === 'miss' }">
            <div class="sky-specks">✦ · ✧ · ✦</div><div class="moon"></div><div class="ridge ridge-back"></div><div class="ridge ridge-front"></div>
            <div class="tree tree-one"></div><div class="tree tree-two"></div><div class="tree tree-three"></div>
            <div class="path"></div><div class="traveller">◉<span></span></div>
            <button v-if="current" type="button" class="visitor" :class="current.kind" :aria-label="current.kind" @click="choose(current.kind === 'light' ? 'collect' : 'pass')">
              <span v-if="current.kind === 'light'">✦</span><span v-else>✹</span>
            </button>
          </div>
          <p class="prompt">{{ current?.kind === 'light' ? (language === 'en' ? 'A firefly is glowing ahead' : 'সামনে একটি জোনাকি জ্বলছে') : (language === 'en' ? 'A sleepy thorn is drifting by' : 'একটি ঘুমন্ত কাঁটা ভেসে যাচ্ছে') }}</p>
          <div class="controls"><button type="button" :disabled="locked" @click="choose('pass')"><i>←</i>{{ language === 'en' ? 'Let it pass' : 'যেতে দাও' }}</button><button type="button" class="collect" :disabled="locked" @click="choose('collect')">{{ language === 'en' ? 'Collect light' : 'আলো নাও' }}<i>→</i></button></div>
          <button type="button" class="stop" @click="finish">{{ language === 'en' ? 'End trail' : 'পথ শেষ করো' }}</button>
        </section>

        <section v-else class="result-panel">
          <p class="eyebrow">{{ language === 'en' ? 'TRAIL COMPLETE' : 'পথ শেষ' }}</p><h1>{{ language === 'en' ? 'The grove is brighter.' : 'বনটা আরও উজ্জ্বল।' }}</h1>
          <div class="result-orb">{{ collected }}<span>✦</span></div>
          <p>{{ language === 'en' ? 'You found lights and made room for what could pass. Come back for another trail whenever you like.' : 'তুমি আলো খুঁজে পেয়েছো এবং যা যেতে পারে তার জন্য জায়গা করে দিয়েছো। চাইলে আবার আসতে পারো।' }}</p>
          <button type="button" class="launch" @click="stage = 'intro'">{{ language === 'en' ? 'Walk again' : 'আবার চলি' }}</button>
          <button type="button" class="return" @click="leave">{{ language === 'en' ? 'Back to games' : 'গেমে ফিরে যাও' }}</button>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { completeGame, startGame } from '../core/gameApi';
import type { GameRun } from '../core/types';
import { gameLanguage } from '@/gameLanguage';

type Stage = 'intro' | 'play' | 'result';
type Choice = 'collect' | 'pass';
type Prompt = { kind: 'light' | 'thorn' };
const prompts: Prompt[] = [{ kind: 'light' }, { kind: 'thorn' }, { kind: 'light' }, { kind: 'light' }, { kind: 'thorn' }, { kind: 'thorn' }, { kind: 'light' }, { kind: 'thorn' }, { kind: 'light' }, { kind: 'light' }];
const route = useRoute(); const router = useRouter(); const stage = ref<Stage>('intro'); const language = gameLanguage; const turn = ref(1); const collected = ref(0); const locked = ref(false); const feedback = ref(''); const responseStartedAt = ref(0); const run = ref<GameRun | null>(null); const touchStart = ref(0); const activePrompts = computed(() => prompts.slice(0, Math.min(prompts.length, Number(run.value?.challenge.rounds || prompts.length)))); const current = computed(() => activePrompts.value[turn.value - 1]);

const start = async () => {
  stage.value = 'play'; turn.value = 1; collected.value = 0; responseStartedAt.value = Date.now();
  const profileId = Number(route.query.profileId);
  if (!Number.isInteger(profileId) || profileId < 1) return;
  try { run.value = await startGame('focus-lab', profileId); } catch { run.value = null; }
};
const choose = (choice: Choice) => {
  if (locked.value || !current.value) return;
  locked.value = true;
  const correct = (current.value.kind === 'light' && choice === 'collect') || (current.value.kind === 'thorn' && choice === 'pass');
  if (correct && current.value.kind === 'light') collected.value += 1;
  feedback.value = correct ? 'good' : 'miss';
  run.value?.events.push({ event_type: 'response', payload: { correct, response_ms: Date.now() - responseStartedAt.value, prompt: current.value.kind, choice, round: turn.value }, occurred_at: new Date().toISOString() });
  window.setTimeout(() => { if (turn.value >= activePrompts.value.length) { finish(); return; } turn.value += 1; responseStartedAt.value = Date.now(); feedback.value = ''; locked.value = false; }, 430);
};
const swipe = (event: TouchEvent) => { const distance = event.changedTouches[0].clientX - touchStart.value; if (Math.abs(distance) > 30) choose(distance > 0 ? 'collect' : 'pass'); };
const finish = async () => { if (stage.value !== 'play') return; stage.value = 'result'; locked.value = false; const activeRun = run.value; run.value = null; if (activeRun) await completeGame(activeRun, { correct_choices: collected.value + activeRun.events.filter((event) => event.payload.prompt === 'thorn' && event.payload.correct).length, attempted_rounds: activeRun.events.length, game_slug: 'focus-lab' }); };
const leave = () => router.push({ name: 'GameLibrary', query: { profile: route.query.profile || 'child' } });
const onKey = (event: KeyboardEvent) => { if (stage.value !== 'play') return; if (event.key === 'ArrowLeft') choose('pass'); if (event.key === 'ArrowRight') choose('collect'); };
onMounted(() => window.addEventListener('keydown', onKey)); onBeforeUnmount(() => window.removeEventListener('keydown', onKey));
</script>

<style scoped>
.grove{background:#071f29;color:#fff8e7;min-height:100%;overflow:hidden;padding:18px}.hud{align-items:center;display:flex;justify-content:space-between;margin:auto;max-width:680px}.hud button,.return,.stop{background:transparent;border:0;color:inherit;cursor:pointer;font:inherit}.hud button{border:1px solid #6e998d;border-radius:99px;padding:8px 12px}.brand{font:700 .72rem Georgia,serif;letter-spacing:.16em}.brand span{color:#e9c96c}.intro-panel,.result-panel{background:#fdf7e9;border-radius:30px;box-shadow:0 28px 80px #020e13b8;color:#123a3a;margin:36px auto;max-width:610px;padding:30px;text-align:center}.eyebrow{color:#a55735;font:700 .73rem Georgia,serif;letter-spacing:.15em}.intro-panel h1,.result-panel h1{font:400 clamp(3rem,11vw,5.3rem)/.86 Georgia,serif;letter-spacing:-.075em;margin:13px 0 20px}.intro-panel>p:not(.eyebrow),.result-panel>p:not(.eyebrow){line-height:1.6;margin:0 auto;max-width:430px}.intro-scene{background:linear-gradient(155deg,#112f43,#21645e);border-radius:22px;height:185px;margin:26px 0;overflow:hidden;position:relative}.intro-scene .moon{background:#f3da89;border-radius:50%;height:85px;position:absolute;right:18%;top:25px;width:85px}.intro-scene .tree{background:#0b302f;border-radius:70% 70% 10% 10%;bottom:-10px;height:140px;position:absolute;width:55px}.tree-a{left:18%;transform:rotate(-8deg)}.tree-b{left:58%;transform:rotate(8deg)}.intro-scene .firefly{background:#f6e58b;border-radius:50%;box-shadow:0 0 23px 7px #f6e58b96;height:14px;left:45%;position:absolute;top:62px;width:14px}.intro-scene>span{color:#f8ec9a;font-size:2rem;left:68%;position:absolute;top:103px}.launch{background:#e77243;border:0;border-radius:99px;color:#fff;cursor:pointer;font:700 1rem Georgia,serif;margin:4px;padding:15px 22px}.launch b{margin-left:9px}.intro-panel small{color:#657d72;display:block;font-size:.78rem;margin:17px auto 0;max-width:300px}.game-shell{margin:30px auto;max-width:680px}.status{display:flex;justify-content:space-between;margin:0 4px 12px}.lanterns{color:#f4dc83}.lanterns b{font-size:1.3rem}.world{background:linear-gradient(#153958 0%,#286563 54%,#99b16e 55%,#416c4c 100%);border:4px solid #d8e1b5;border-radius:30px;box-shadow:0 30px 60px #020e13a6;height:360px;overflow:hidden;position:relative}.sky-specks{color:#d4e1c2;font:1.4rem Georgia,serif;left:12%;letter-spacing:1rem;opacity:.7;position:absolute;top:15%}.world>.moon{background:#f2d981;border-radius:50%;box-shadow:0 0 0 12px #f2d98121;height:78px;position:absolute;right:13%;top:10%;width:78px}.ridge{background:#164557;border-radius:50% 50% 0 0;bottom:35%;height:130px;position:absolute;width:110%}.ridge-back{left:-50%;opacity:.75}.ridge-front{background:#28634f;right:-45%;transform:scaleX(-1)}.world .tree{background:#123f38;border-radius:70% 70% 5% 5%;bottom:30%;height:190px;position:absolute;width:66px}.tree-one{left:9%;transform:rotate(4deg)}.tree-two{right:17%;transform:rotate(-4deg)}.tree-three{background:#1a5140!important;left:48%;height:125px!important}.path{background:#e8c982;border-radius:50% 50% 0 0;bottom:-38%;height:220px;left:34%;position:absolute;transform:rotate(7deg);width:155px}.traveller{background:#f1a05e;border:4px solid #183d3c;border-radius:50% 50% 42% 42%;bottom:70px;color:#183d3c;font-size:1.3rem;height:52px;left:31%;line-height:42px;position:absolute;text-align:center;width:48px;z-index:2}.traveller span{background:#eb6d48;border-radius:50% 50% 8px 8px;height:23px;left:8px;position:absolute;top:-16px;width:25px}.visitor{animation:drift 2.3s ease-in-out infinite;background:transparent;border:0;cursor:pointer;font:5rem Georgia,serif;position:absolute;right:22%;top:43%;z-index:3}.visitor.light{color:#fff092;text-shadow:0 0 24px #fff082}.visitor.thorn{color:#5b2e40;font-size:4.4rem;transform:rotate(24deg)}.flash{filter:brightness(1.15)}.shake{animation:shake .25s linear}.prompt{text-align:center}.controls{display:grid;gap:12px;grid-template-columns:1fr 1fr}.controls button{background:#164349;border:1px solid #82a696;border-radius:18px;color:#fff8e7;cursor:pointer;font:700 1rem Georgia,serif;padding:17px 10px}.controls .collect{background:#e46f42;border-color:#f4b57e}.controls i{font:1.4rem Georgia,serif;margin:0 8px}.controls button:disabled{opacity:.55}.stop{display:block;margin:17px auto;text-decoration:underline}.result-orb{align-items:center;background:#ead26f;border-radius:50%;color:#284c43;display:flex;font:4rem Georgia,serif;height:150px;justify-content:center;margin:22px auto;width:150px}.result-orb span{font-size:2rem}.return{color:#4d7569;display:block;margin:16px auto;text-decoration:underline}@keyframes drift{50%{transform:translate(-18px,-16px) rotate(-4deg)}}@keyframes shake{25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}@media(min-width:680px){.grove{padding:24px}.world{height:410px}.traveller{left:39%}.visitor{right:28%}.intro-panel,.result-panel{padding:44px}}
</style>
