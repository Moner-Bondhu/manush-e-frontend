<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-img src="/mb-logo.svg" class="w-[100px] mx-auto my-4"></ion-img>
            <section class="flex flex-col w-full items-center justify-center  p-3">
                <div class="p-4  w-full">
                    <h2 class="text-xl text-center">মানুষ-ই তে <span class="text-red-600">স্বাগতম</span></h2>
                    <ion-img src="/intro.png" class="w-[65%] mx-auto my-4"></ion-img>

                    <div class="">

                        <p class="text-sm">আপনার ফোন নম্বরে আমরা একটি কোড পাঠাবো।
                        </p>
                        <form @submit.prevent="handleSubmit" class="flex flex-col mt-8">

                            <div class="relative w-full">
                                <span class="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500">+88</span>
                                <input 
                                  v-model="phoneNumber" 
                                  type="text" 
                                  placeholder="আপনার ফোন নাম্বার দিন (যেমন: 01534618836)" 
                                  class="shadow-xs w-full pl-12 rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500" 
                                />
                            </div>
                            <ion-button type="submit" expand="block" fill="outline" class="mt-4 rounded-lg">
                                Continue
                            </ion-button>
                        </form>
                        <ion-button 
                            v-if="deferredPrompt" 
                            @click="installPWA" 
                            expand="block" 
                            fill="solid" 
                            class="mt-4 rounded-lg">
                            Install App
                        </ion-button>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonImg, IonInput } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const phoneNumber = ref('');
const router = useRouter();
const deferredPrompt = ref<any>(null);


const handleSubmit = async () => {
    console.log(import.meta.env);
    if(!phoneNumber.value){
        alert('Please enter a number!') // TODO: Replace with error handling
    } else {
        try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/login`,
          { phoneNumber: `+88${phoneNumber.value}` }
        );
        if (response.data.success) {
          localStorage.setItem('phoneNumber', `+88${phoneNumber.value}`);
          router.push('/send-otp');
        } else {
          alert('Failed to send phone number. Try again.'); // TODO: Replace with error handling
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred.'); // TODO: Replace with error handling
      } 
    }
};

const installPWA = () => {
    if (deferredPrompt.value) {
        deferredPrompt.value.prompt(); // Show the install prompt
        deferredPrompt.value.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the PWA installation.');
            } else {
                console.log('User dismissed the PWA installation.');
            }
            deferredPrompt.value = null; // Reset the prompt after user interaction
        });
    }
};

// Listen for the 'beforeinstallprompt' event
onMounted(() => {
    window.addEventListener('beforeinstallprompt', (e: any) => {
        e.preventDefault(); // Prevent the default install prompt
        deferredPrompt.value = e; // Save the event for later use
    });
});

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
