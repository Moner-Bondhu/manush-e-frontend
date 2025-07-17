<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-img src="/mb-logo.svg" class="w-1/3 mx-auto mt-8"></ion-img>
            <section class="flex flex-col w-full items-center justify-center p-2">
                <div class="p-4  w-full">
                    <h2 class="text-2xl font-semibold text-center"><span class="text-red-600">মানুষ-ই</span> তে স্বাগতম</h2>
                    <ion-img src="/intro.png" class="mx-auto my-8"></ion-img>

                    <div class="">

                        <p class="text-sm font-regular text-center">আপনার ফোনে পাঠানো <span class="text-red-600">ও.টি.পি</span> দিয়ে লগিন করুন
                        </p>
                        <form @submit.prevent="handleSubmit" class="flex flex-col mt-4">


                            <input v-model="otp" type="numbr" placeholder="_ _ _ _"
                                class="shadow-xs w-full h-8 pl-4 rounded-lg border border-stroke bg-white p-3 text-sm font-regular text-gray-700 text-center tracking-widest outline-none transition-all duration-200 focus:ring-1 focus:ring-red-400" />
                            <ion-button type="submit" size="small" expand="block" fill="outline" class="font-light mt-2 rounded-lg text-sm">
                                পরবর্তি
                            </ion-button>
                        </form>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonImg, } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const phoneNumber = localStorage.getItem('phoneNumber');
const otp = ref('');
const router = useRouter();

const handleSubmit = async () => {
    if(!otp.value){
        alert('Please enter OTP!') // TODO: Replace with error handling
    } else {
        try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/otp`,
          { phoneNumber: phoneNumber, otp: otp.value }
        );
        if (response.data.success) {
          localStorage.setItem('api_token', response.data.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          localStorage.removeItem('phoneNumber');
          router.push('/choice');
        } else {
          alert('Failed to verify OTP. Try again.'); // TODO: Replace with error handling
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred.'); // TODO: Replace with error handling
      } 
    }
};
</script>

<style scoped>


ion-button {
    --background: #FF3D3D;
    --color: white;
    --border-width: 0px;
}
</style>
