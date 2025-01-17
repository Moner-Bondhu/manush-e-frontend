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



            <div class="w-full p-3 border border-gray-200 rounded-lg shadow">
                <h2 class="text-lg my-0">Child</h2>
                <p class="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum iusto ratione odit
                    est, repellendus
                    error modi possimus rem incidunt animi ea blanditiis itaque asperiores facere commodi, obcaecati ab
                    aliquid in!</p>
            </div>


        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton } from '@ionic/vue';

</script>