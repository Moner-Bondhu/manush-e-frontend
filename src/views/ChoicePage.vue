<template>
    <ion-page>
        <ion-header class="">
            <ion-toolbar class="">
                <ion-buttons slot="">
                    <ion-back-button default-href="/main"></ion-back-button>
                    <!-- <ion-img src="/public/mb-logo.svg" class="w-[70px] mx-auto "></ion-img> -->
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <section class="flex flex-col  h-full p-3">
                <h2 class="text-xl text-center mb-8">Who is using <span class="text-red-600">Manush-E</span>?</h2>
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

                <div class="flex gap-4 mt-4">
                    <div class=" w-full shadow min-h-[150px] rounded-lg mx-auto   border p-3" @click="navigateToBoxA">
                        <div class="c items-center justify-center">
                            <ion-img src="/Children.png" class="w-[70px] mx-auto "></ion-img>
                        </div>
                        <div class="">
                            <h2 class="text-lg my-0 text-red-600 tracking-wider	font-semibold  text-center">CHILD</h2>
                            <p class="text-xs text-center">Lorem ipsum dolor sit ame dasd ada das dsa</p>
                        </div>

                    </div>
                    <div class=" gap-4  w-full shadow min-h-[150px] rounded-lg mx-auto  border  p-3"
                        @click="navigateToBoxB">
                        <div class="col-span-2 ">
                            <ion-img src="/Parents.png" class="w-[70px] mx-auto "></ion-img>
                        </div>
                        <div class="col-span-3 ">
                            <h2 class="text-lg my-0 text-red-600 tracking-wider	font-semibold text-center">PARENT</h2>
                            <p class="text-xs text-center">Lorem ipsum dolor sit amet consectetur adipisinia</p>
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
    ---width: 0px;

    --padding-top: 20px;
    --padding-bottom: 20px;
}
</style>
