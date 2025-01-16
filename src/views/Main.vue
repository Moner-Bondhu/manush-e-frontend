<template>
    <ion-page>
        <!-- <ion-header>
            <ion-toolbar>
                <ion-title class="text-center">Moner Bondhu</ion-title>
            </ion-toolbar>
        </ion-header> -->
        <ion-content :fullscreen="true">
            <section class=" flex w-full items-center justify-center h-full  p-3">
                <div class="p-4 w-full">
                    <img src="../resources/icon.png" alt="Moner Bondhu Logo" class="mb-8" />
                    <h2 class="mb-4">Welcom to Manush<span class="text-red-500">E</span> </h2>
                    <form action="" class="flex justify-between">
                        <input type="text"
                            class="shadow-xs flex w-full items-center justify-center rounded-lg border border-stroke bg-white p-2  text-lg font-medium text-gray-5 outline-none  " />

                    </form>
                    <ion-button expand="block" fill="outline" class="mt-4">
                        LOGIN
                    </ion-button>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon } from '@ionic/vue';

import { heart, logoApple, settingsSharp, star } from 'ionicons/icons';
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