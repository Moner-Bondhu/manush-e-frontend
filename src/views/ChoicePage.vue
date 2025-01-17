<template>
    <ion-page>
        <ion-header class="">
            <ion-toolbar class="">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main"></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <section class="flex flex-col w-full items-center justify-center h-full p-3">
                <h2 class="mb-4 text-2xl font-bold">Who is Using?</h2>
                <div class="p-4 w-full grid grid-cols-2">
                    <ion-button expand="block" @click="navigateToBoxA">
                        Children
                    </ion-button>
                    <ion-button expand="block" @click="navigateToBoxB">
                        Parent
                    </ion-button>
                </div>
            </section>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToBoxA = () => {
    router.push('/boxA');
};

const navigateToBoxB = () => {
    router.push('/boxB');
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

    --padding-top: 20px;
    --padding-bottom: 20px;
}
</style>
