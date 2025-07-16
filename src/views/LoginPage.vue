<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-img src="/mb-logo.svg" class="w-1/3 mx-auto mt-8"></ion-img>
            <section class="flex flex-col w-full items-center justify-center p-2">
                <div class="p-4  w-full">
                    <h2 class="text-2xl font-semibold text-center"><span class="text-red-600">মানুষ-ই</span> তে স্বাগতম</h2>
                    <ion-img src="/intro.png" class="mx-auto my-8"></ion-img>

                    <div class="">

                        <p class="text-sm font-regular text-center"><span class="text-red-600">লগইন</span> করতে আপনার ফোন নাম্বার দিন
                        </p>
                        <form @submit.prevent="handleSubmit" class="flex flex-col mt-4">

                            <div class="flex relative w-full h-8 bg-gray-300 rounded justify-end">
                                <img
                                    src="https://flagcdn.com/bd.svg"
                                    width="25"
                                    alt="Bangladesh"
                                    class="absolute left-2 top-1/2 transform -translate-y-1/2">
                                <span class="absolute left-10 top-1/2 transform -translate-y-1/2 text-sm font-poppins-regular text-gray-700">+88</span>
                                <input 
                                  v-model="phoneNumber" 
                                  type="text" 
                                  placeholder="015********" 
                                  class="shadow-xs w-3/4 pl-2 rounded border border-stroke bg-white p-1 text-sm font-poppins-regular text-gray-700 outline-none transition-all duration-200 focus:ring-1 focus:ring-red-400" 
                                />
                            </div>
                            <ion-button type="submit" size="small" expand="block" fill="outline" class="font-light mt-2 text-sm">
                                পরবর্তি
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
import { IonPage, IonContent, IonButton, IonImg, } from '@ionic/vue';
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
*
ion-button {
    --background: #FF3D3D;
    --color: white;
    --border-width: 0px;
}
</style>
