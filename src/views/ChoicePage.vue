<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <section class="flex flex-col h-full p-3 gap-8 justify-center">
                <h2 class="text-2xl font-semibold my-0 text-center">কে <span class="text-red-600">মানুষ-ই</span> ব্যবহার করছেন?</h2>
                <!-- <div class="">
                    <div class="flex  gap-4  w-full shadow p-4 rounded-lg mx-auto  border border-2 border-red-600 mb-2"
                        @click="navigateToBoxA">
                        <div class="col-span-2 flex items-center justify-center">
                            <ion-img src="/public/Children.png" class="w-[70px] mx-auto "></ion-img>
                        </div>
                        <div class="col-span-3 ">
                            <h2 class="text-lg my-0 text-red-600 tracking-wider	font-semibold ">CHILD</h2>
                            <p class="text-xs">Lorem ipsum dolor sit ame</p>
                        </div>

                    </div>
                    <div class="flex  gap-4  w-full shadow p-4 rounded-lg mx-auto border border-2 border-red-600 transition-all duration-200"
                        @click="navigateToBoxB">
                        <div class="col-span-2 ">
                            <ion-img src="/public/Parents.png" class="w-[70px] mx-auto "></ion-img>
                        </div>
                        <div class="col-span-3 ">
                            <h2 class="text-lg my-0 text-red-600 tracking-wider	font-semibold">PARENT</h2>
                            <p class="text-xs">Lorem ipsum dolor sit amet consectetur adipisinia</p>
                        </div>

                    </div>
                </div> -->

                <div class="flex flex-col gap-8">
                    <div class=" w-2/3 shadow min-h-[150px] rounded-lg mx-auto border p-3" 
                        @click="selectProfile('child')">
                        <div class="c items-center justify-center">
                            <ion-img src="/Children.png" class="w-[70px] mx-auto "></ion-img>
                        </div>
                        <div class="">
                            <h2 class="text-lg my-0 text-red-600 font-semibold  text-center">সন্তান</h2>
                            <p class="font-poppins-regular text-xs text-center" id="childName">{{ childName }}</p>
                        </div>

                    </div>
                    <div class=" gap-4  w-2/3 shadow min-h-[150px] rounded-lg mx-auto  border  p-3"
                        @click="selectProfile('parent')">
                        <div class="p items-center justify-center">
                            <ion-img src="/Parents.png" class="w-[70px] mx-auto "></ion-img>
                        </div>
                        <div class="col-span-3 ">
                            <h2 class="text-lg my-0 text-red-600 font-semibold text-center">অভিভাবক</h2>
                            <p class="font-poppins-regular text-xs text-center" id="parentName">{{ parentName }}</p>
                        </div>

                    </div>
                </div>
            </section>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

const router = useRouter();
const childName = ref('');
const parentName = ref('');
const user = ref({});

interface Demography {
  id: number;
  profile_id: number;
  dob: string;
  gender: string;
  grade: string;
  created_at: string;
  updated_at: string;
}

interface Profile {
  id: number;
  full_name: string;
  type: string;
  relation_type: string;
  demography: Demography;
}

async function fetchData() {  
  try {
    // replace `getPost` with your data fetching util / API wrapper
    const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
    });

    // Find the child and parent profiles from the response
    const childProfile = response.data.data.profiles.find((profile: Profile) => profile.type === 'child');
    const parentProfile = response.data.data.profiles.find((profile: Profile) => profile.type === 'parent');



    // Set the names to the corresponding variables if profiles are found
    if (childProfile) {
        childName.value = childProfile.full_name;
    }

    if (parentProfile) {
        parentName.value = parentProfile.full_name;
    }
  } catch (err) {
    console.log(err);
  } 
}

const selectProfile = (profile: string) => {
  // Redirect to the scale page with the selected profile as a query parameter
  router.push({ name: 'Dashboard', query: { profile } });
};

const navigateToBoxB = () => {
    router.push('/boxB');
};

fetchData();

</script>

<style scoped>


ion-button {
    --background: #ce2327;
    --color: white;
    ---width: 0px;

    --padding-top: 20px;
    --padding-bottom: 20px;
}
</style>
