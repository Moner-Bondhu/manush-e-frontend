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
        <ion-content :fullscreen="true" class="ion-padding">


            <!-- <h3 class="my-0 text-lg">Hello <span class="text-red-600">X</span></h3>
            <p class="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe debitis magni et itaque iusto, eos amet.
                Odit quam nisi adipisci saepe iure asperiores aliquid, ratione, placeat sit error quibusdam quasi.
            </p>
            <br> -->



            <h3 class="my-0 text-lg">January</h3>
            <p class="text-xs">Lorem ipsum dolor sit amet consectetur, </p>
            <ol class="relative text-gray-500 border-s border-gray-200  m-4">
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
                    <div class=" flex flex-col gap-2">

                        <div class="w-full p-3 border border-gray-200 rounded-lg shadow bg-blue-100"
                            @click="navigateToBoxC">
                            <div class="flex items-center">
                                <div class="flex items-center gap-1">
                                    <ion-img src="/public/sleep.svg" class="w-4 "></ion-img>
                                    <h2 class="text-lg my-0 text-black">Sleep</h2>
                                </div>
                                <p class="ml-auto text-xs text-gray-800 w-fit bg-green-300 px-2 py-1 rounded-lg">
                                    Completed
                                </p>
                            </div>


                            <p class="text-sm text-gray-800 py-2">
                                Measure your child's mental wellbeing using the RCADS-25 questionnaire
                            </p>
                            <p class=" text-xs text-gray-800 w-fit bg-white px-2 py-1 rounded-lg">
                                3 min
                            </p>

                            <!-- <button class="bg-black text-white w-full px-8 mt-4 py-2 rounded-2xl">Unlock</button> -->
                        </div>
                        <div class="w-full p-3 border border-gray-200 rounded-lg shadow bg-red-100">
                            <div class="flex items-center">
                                <div class="flex items-center gap-1">
                                    <ion-img src="/public/sleep.svg" class="w-4 "></ion-img>
                                    <h2 class="text-lg my-0 text-black">Sleep</h2>
                                </div>
                                <p class="ml-auto text-xs text-gray-800 w-fit bg-red-300 px-2 py-1 rounded-lg">
                                    Incomplete
                                </p>
                            </div>


                            <p class="text-sm text-gray-800 py-2">
                                Measure your child's mental wellbeing using the RCADS-25 questionnaire
                            </p>
                            <!-- <p class=" text-xs text-gray-800 w-fit bg-white px-2 mt-4 py-1 rounded-lg">
                                3 min
                            </p> -->

                            <button class="bg-black text-white w-full px-8 mt-4 py-2 rounded-2xl">Unlock</button>
                        </div>

                    </div>

                </li>
                <li class="mb-10 ms-6">
                    <span
                        class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
                        <svg class="w-2.5 h-2.5 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 16">
                            <path
                                d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                        </svg>
                    </span>
                    <div class=" flex flex-col gap-2">
                        <div class="w-full p-3 border border-gray-200 rounded-lg shadow bg-blue-200">
                            <div class="flex items-center">
                                <div class="flex items-center gap-1">
                                    <ion-img src="/public/sleep.svg" class="w-4 "></ion-img>
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
                </li>

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
import { useRouter } from 'vue-router';

const router = useRouter();
const navigateToBoxC = () => {
    router.push('/quizA');
};
</script>

<style scoped>
* {
    font-family: 'Poppins', sans-serif !important;
}
</style>