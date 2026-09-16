import { ref, watch } from 'vue';

export type GameLanguage = 'en' | 'bn';

export const gameLanguage = ref<GameLanguage>((localStorage.getItem('manush-e-locale') as GameLanguage) || 'en');
watch(gameLanguage, (language) => localStorage.setItem('manush-e-locale', language));

export const gameText = {
  en: {
    exit: 'Exit',
    playlist: "TODAY'S PLAYLIST",
    heroTitle: 'A small quest for a sharper day.',
    heroDescription: 'Choose a short mission, build your rhythm, and discover new ways to play.',
    worlds: 'worlds',
    library: 'GAME LIBRARY',
    choose: 'Pick a mission',
    start: 'Start mission',
    play: 'Play now',
    loading: 'Preparing your missions...',
    rounds: 'Round',
    of: 'of',
    matches: 'wins',
    find: 'Find this',
    finish: 'Finish mission',
    complete: 'Mission complete',
    score: 'wins this round',
    again: 'Play again',
    return: 'Back to library',
    matchesFound: 'matches found',
    averageResponse: 'average response',
    reflection: 'How did that round feel?',
    easy: 'Easy',
    steady: 'Steady',
    challenging: 'Challenging',
    optional: 'Optional reflection only.',
  },
  bn: {
    exit: 'বের হও',
    playlist: 'আজকের প্লেলিস্ট',
    heroTitle: 'আরও সুন্দর দিনের জন্য ছোট অভিযান।',
    heroDescription: 'ছোট মিশন বেছে নাও, নিজের ছন্দ গড়ো এবং খেলার নতুন পথ খুঁজে নাও।',
    worlds: 'জগৎ',
    library: 'গেম লাইব্রেরি',
    choose: 'একটি মিশন বেছে নাও',
    start: 'মিশন শুরু করো',
    play: 'এখন খেলো',
    loading: 'তোমার মিশন তৈরি হচ্ছে...',
    rounds: 'রাউন্ড',
    of: 'এর মধ্যে',
    matches: 'জয়',
    find: 'এটি খুঁজে নাও',
    finish: 'মিশন শেষ করো',
    complete: 'মিশন সম্পন্ন',
    score: 'এই রাউন্ডে জয়',
    again: 'আবার খেলো',
    return: 'লাইব্রেরিতে ফিরে যাও',
    matchesFound: 'মিল খুঁজে পেয়েছ',
    averageResponse: 'গড় সাড়া',
    reflection: 'এই রাউন্ডটি কেমন লাগল?',
    easy: 'সহজ',
    steady: 'স্থির',
    challenging: 'চ্যালেঞ্জিং',
    optional: 'এই প্রতিফলনটি ঐচ্ছিক।',
  },
};

export const gameNames: Record<string, Record<GameLanguage, string>> = {
  'focus-lab': { en: 'Focus Grove', bn: 'মনোযোগ বন' },
  'memory-market': { en: 'Memory Market', bn: 'মেমরি মার্কেট' },
  'signal-garden': { en: 'Signal Garden', bn: 'সিগন্যাল গার্ডেন' },
  'mission-maker': { en: 'Mission Maker', bn: 'মিশন মেকার' },
  'rhythm-river': { en: 'Rhythm River', bn: 'রিদম রিভার' },
  'goal-street': { en: 'Goal Street', bn: 'গোল স্ট্রিট' },
  'sky-scout': { en: 'Sky Scout', bn: 'আকাশ স্কাউট' },
  'pet-village': { en: 'Pet Village', bn: 'পোষ্য পল্লি' },
};

export const gameDescriptions: Record<string, Record<GameLanguage, string>> = {
  'focus-lab': { en: 'Follow fireflies and let drifting thorns pass.', bn: 'জোনাকির আলো নাও, ভেসে যাওয়া কাঁটাকে যেতে দাও।' },
  'memory-market': { en: 'Remember a market order as you travel through the stalls.', bn: 'বাজারের দোকান ঘুরে অর্ডারের জিনিসগুলো মনে রাখো।' },
  'signal-garden': { en: 'Keep the garden bright by catching the right signal.', bn: 'সঠিক সংকেত ধরে বাগানকে উজ্জ্বল রাখো।' },
  'mission-maker': { en: 'Plan a tiny project with the right tools in the right order.', bn: 'সঠিক সরঞ্জাম দিয়ে ছোট একটি প্রকল্পের পরিকল্পনা করো।' },
  'rhythm-river': { en: 'Follow, remember, and extend the river rhythm.', bn: 'নদীর ছন্দ অনুসরণ করো, মনে রাখো এবং বাড়াও।' },
  'goal-street': { en: 'Scan the pitch and pass through the open lane.', bn: 'মাঠ দেখে খোলা লেনে পাস দাও।' },
  'sky-scout': { en: 'Scout the moving sky and find the right signal.', bn: 'চলমান আকাশ দেখে সঠিক সংকেত খুঁজে নাও।' },
  'pet-village': { en: 'Notice what village pets need and choose a helpful next step.', bn: 'পল্লির পোষ্যদের কী দরকার লক্ষ্য করে সহায়ক পরের পদক্ষেপ বেছে নাও।' },
};

export const localizedTag = (tag: string, language: GameLanguage): string => ({
  Focus: ['Focus', 'মনোযোগ'], Practice: ['Practice', 'অনুশীলন'], Memory: ['Memory', 'স্মৃতি'], Strategy: ['Strategy', 'কৌশল'], Attention: ['Attention', 'মনোযোগ'], Speed: ['Speed', 'গতি'], Planning: ['Planning', 'পরিকল্পনা'], Timing: ['Timing', 'ছন্দ'], Empathy: ['Empathy', 'সহমর্মিতা'],
}[tag]?.[language === 'en' ? 0 : 1] || tag);
