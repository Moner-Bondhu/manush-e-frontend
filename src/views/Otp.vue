<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-img src="/mb-logo.svg" class="w-[100px] mx-auto my-4"></ion-img>
            <section class="flex flex-col w-full items-center justify-center  p-3">
                <div class="p-4  w-full">
                    <h2 class="text-xl text-center">Provide your <span class="text-red-600">OTP</span></h2>
                    <ion-img src="/intro.png" class="w-[65%] mx-auto my-4"></ion-img>

                    <div class="">

                        <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptas
                            odio voluptatum
                        </p>
                        <form @submit.prevent="handleSubmit" class="flex flex-col mt-8">


                            <input v-model="otp" type="numbr" placeholder="ওটিপি দিন।"
                                class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500" />
                            <ion-button type="submit" expand="block" fill="outline" class="mt-4 rounded-lg">
                                Continue
                            </ion-button>
                        </form>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonImg, IonInput } from '@ionic/vue';
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
          'https://backend.manushe.monerbondhu.com/api/otp',
          { phoneNumber: phoneNumber, otp: otp.value }
        );
        if (response.data.success) {
          localStorage.setItem('api_token', response.data.data.token);
          localStorage.setItem('user', response.data.data.user);
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
* {
    font-family: 'Poppins', sans-serif !important;
}

ion-button {
    --background: #ce2327;
    --color: white;
    --border-width: 0px;
}
</style>
