<template>
    <ion-page>
        <ion-header class="">
            <ion-toolbar class="">
                <ion-buttons slot="end">
                    <ion-button router-link="/choice" fill="clear" class="text-lg font-semibold tracking-normal text-[#FF3D3D] px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" viewBox="0 0 256 256" stroke-width="4" class="pr-1 size-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M253.7,133.7l-24,24a8.2,8.2,0,0,1-11.4,0l-24-24a8.4,8.4,0,0,1-1.7-8.8A8,8,0,0,1,200,120h15.6A87.9,87.9,0,0,0,54.1,80.3,8,8,0,0,1,43,82.6a7.9,7.9,0,0,1-2.4-11A104,104,0,0,1,231.7,120H248a8,8,0,0,1,7.4,4.9A8.4,8.4,0,0,1,253.7,133.7ZM213,173.4a8,8,0,0,0-11.1,2.3,86.9,86.9,0,0,1-8.1,10.8h0a81.3,81.3,0,0,0-24.5-23,59.7,59.7,0,0,1-82.6,0,81.3,81.3,0,0,0-24.5,23h0A87.6,87.6,0,0,1,40.4,136H56a8,8,0,0,0,7.4-4.9,8.4,8.4,0,0,0-1.7-8.8l-24-24a8.1,8.1,0,0,0-11.4,0l-24,24a8.4,8.4,0,0,0-1.7,8.8A8,8,0,0,0,8,136H24.3a103.7,103.7,0,0,0,34.5,69.6h0l.4.3a103.9,103.9,0,0,0,156.2-21.5A7.9,7.9,0,0,0,213,173.4ZM128,164a44,44,0,1,0-44-44A44,44,0,0,0,128,164Z" />
                        </svg>
                        প্রোফাইল
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">


            <!-- <h3 class="my-0 text-lg">Hello <span class="text-red-600">X</span></h3>
            <p class="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe debitis magni et itaque iusto, eos amet.
                Odit quam nisi adipisci saepe iure asperiores aliquid, ratione, placeat sit error quibusdam quasi.
            </p>
            <br> -->



            <h3 class="text-2xl font-semibold my-0">জানুয়ারি</h3>
            <p class="text-base font-regular text-gray-500 mt-1">এই মাসে তোমার জন্য আছে</p>
            <ol class="relative text-gray-500 border-s border-gray-200 mt-8 m-4">
                <li class="mb-10 ms-6">
                    <span
                        class="absolute flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                        <svg class="w-2.5 h-2.5 text-green-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                        <!-- <span class="w-3 h-3 bg-white rounded-full"></span> -->
                    </span>
                    <h2 class="text-lg font-semibold text-gray-600 mb-4 ">কাজ</h2>
                    <div v-if="scales && scales.length"  class=" flex flex-col gap-2">

                        <div v-for="(scale, id) in scales" :key="id" class="w-full p-3 border border-gray-200 rounded-lg shadow bg-blue-100"
                            v-bind:class="{ 'bg-red-100' : scale.status === 'incomplete'}" @click="scale.status === 'incomplete' ? startScale(scale.id) : ''">
                                <div class="flex items-items-start gap-1">
                                    <div class="flex items-start gap-1">
                                        <ion-img src="/sleep.svg" class="w-5 pt-1"></ion-img>
                                        <h2 class="text-lg font-semibold my-0 text-black">{{ scale.name }}</h2>
                                    </div>
                                    <p v-if="scale.status === 'complete'" class="ml-auto text-sm font-regular text-gray-800 w-fit h-7 bg-green-300 px-2 py-1 rounded-lg text-nowrap">
                                        সম্পন্ন হয়েছে
                                    </p>
                                    <p v-if="scale.status === 'incomplete'" class="ml-auto text-sm font-regular text-gray-800 w-fit h-7 bg-red-300 px-2 py-1 rounded-lg text-nowrap">
                                        করা হয় নি
                                    </p>
                                </div>


                                <p class="text-base font-regular text-gray-800 py-2">
                                    {{ scale.description }}
                                </p>
                                <!-- <p class=" text-xs text-gray-800 w-fit bg-white px-2 py-1 rounded-lg">
                                    3 min
                                </p> -->

                                <!-- <button class="bg-black text-white w-full px-8 mt-4 py-2 rounded-2xl">Unlock</button> -->
                        </div>
                        <!-- <div class="w-full p-3 border border-gray-200 rounded-lg shadow bg-red-100">
                            <div class="flex items-center">
                                <div class="flex items-center gap-1">
                                    <ion-img src="/sleep.svg" class="w-4 "></ion-img>
                                    <h2 class="text-lg my-0 text-black">Sleep</h2>
                                </div>
                                <p class="ml-auto text-xs text-gray-800 w-fit bg-red-300 px-2 py-1 rounded-lg">
                                    Incomplete
                                </p>
                            </div>


                            <p class="text-sm text-gray-800 py-2">
                                Measure your child's mental wellbeing using the RCADS-25 questionnaire
                            </p>

                            <button class="bg-black text-white w-full px-8 mt-4 py-2 rounded-2xl">Unlock</button>
                        </div> -->

                    </div>
                </li>
                <!-- <li class="mb-10 ms-6">
                    <span
                        class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
                        <svg fill="#000000" height="8px" width="8px" version="1.1" id="XMLID_287_"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 24 24" xml:space="preserve">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g id="next">
                                    <g>
                                        <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 "></polygon>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>
                    <h2 class="text-lg mb-4 text-black">Week 2</h2>

                    <div class=" flex flex-col gap-2">
                        <div class="w-full p-3 border border-gray-200 rounded-lg shadow bg-blue-200"
                            style="opacity: 50%;">
                            <div class="flex items-center">
                                <div class="flex items-center gap-1">
                                    <ion-img src="/sleep.svg" class="w-4 "></ion-img>
                                    <h2 class="text-lg my-0 text-black">Mental Wellbeing</h2>
                                </div>
                                <p class="ml-auto text-xs text-gray-800 w-fit bg-white px-2 py-1 rounded-lg">
                                    3 min
                                </p>
                            </div>


                            <p class="text-xs text-gray-800 py-2">
                                Measure your child's mental wellbeing using the RCADS-25 questionnaire
                            </p>

                        </div>

                    </div>
                </li> -->

                <!-- <li class="ms-6">
                    <span
                        class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-4 ring-4 ring-white ">
                        <svg class="w-2.5 h-2.5 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 18 20">
                            <path
                                d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                        </svg>
                    </span>
                    <p class="text-sm">
                        Measure your child's mental wellbeing using the RCADS-25 questionnaire
                    </p>
                </li> -->
            </ol>


        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonContent, IonButton, IonImg } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const scales = ref<any>(null);
const selectedProfile = ref('');

const fetchProfileData = async (profile: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/scales/${profile}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('api_token')}`,
        },
      }
    );
    scales.value = response.data.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};

const startScale = (id: number) => {
  router.push({ name: 'Questions', params: { id } });
};

onMounted(() => {
  const profile = router.currentRoute.value.query.profile;
  if (typeof profile === 'string') {
    selectedProfile.value = profile;
    fetchProfileData(profile);
  } else {
    console.log('Something went wrong');
  }
});

watch(
  () => route.query.profile,
  (newProfile, oldProfile) => {
    if (newProfile !== oldProfile && typeof newProfile === 'string') {
      fetchProfileData(newProfile);
    } else if (newProfile !== oldProfile) {
      console.error('Invalid profile type:', newProfile);
    }
  }
);
</script>


<style scoped>

</style>