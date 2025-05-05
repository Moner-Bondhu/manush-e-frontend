<template>
    <ion-page>
        <ion-header class="">
            <ion-toolbar class="">
                <ion-buttons slot="start">
                    <ion-button router-link="/choice" fill="solid">
                        <ion-icon slot="start"></ion-icon>
                        Profiles
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
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton } from '@ionic/vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

let router = useRouter();
let route = useRoute();

let scales = ref<any>(null);
let selectedProfile = ref('');

onMounted(() => {
    if (typeof router.currentRoute.value.query.profile === 'string') {
        selectedProfile.value = router.currentRoute.value.query.profile;
        fetchProfileData(selectedProfile.value);
    } else {
        console.log("Something went wrong");
    }
});

// Watch for changes in the route query parameter 'profile'
watch(
      () => route.query.profile, // Watch the profile query parameter
      (newProfile, oldProfile) => {
        if (newProfile !== oldProfile) {
          // Profile has changed, so refetch the data
          if (typeof newProfile === 'string') {
            fetchProfileData(newProfile);
          } else {
            console.error('Invalid profile type:', newProfile);
          }
        }
      }
    );

const fetchProfileData = async (profile: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/scales/${profile}`, 
            {headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
        });
    scales.value = response.data.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};

const startScale = (id: number) => {
    router.push({ name: 'Questions', params: { id: id } });
};
</script>

<style scoped>

</style>