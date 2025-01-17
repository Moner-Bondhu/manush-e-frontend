<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <section class="flex w-full items-center justify-center h-full p-3">
                <div class="p-4 w-full">
                    <img src="../resources/icon.png" alt="Moner Bondhu Logo" class="mb-8" />
                    <h2 class="mb-4">Welcome to Manush<span class="text-red-500">E</span></h2>
                    <form @submit.prevent="handleSubmit" class="flex flex-col">
                        <input v-model="number" type="number" placeholder="Enter a number"
                            class="shadow-xs w-full rounded-lg border border-stroke bg-white p-2 text-lg font-medium text-gray-500 outline-none" />
                        <ion-button type="submit" expand="block" fill="outline" class="mt-4">
                            Continue
                        </ion-button>
                    </form>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const number = ref('');
const router = useRouter();

const handleSubmit = () => {
    if (number.value) {
        // Navigate to /choice
        router.push('/choice');
    } else {
        alert('Please enter a number!');
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
