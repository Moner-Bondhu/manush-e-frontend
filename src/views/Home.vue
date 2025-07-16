<template>
    <ion-page class="h-full">
        <!-- <ion-header class="shadow-none">
            <ion-toolbar class="">
                <ion-buttons slot="end">
                    <ion-button router-link="/choice" fill="clear" class="text-lg font-semibold tracking-normal text-[#FF3D3D] px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" viewBox="0 0 256 256" stroke-width="4" class="pr-1 size-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M253.7,133.7l-24,24a8.2,8.2,0,0,1-11.4,0l-24-24a8.4,8.4,0,0,1-1.7-8.8A8,8,0,0,1,200,120h15.6A87.9,87.9,0,0,0,54.1,80.3,8,8,0,0,1,43,82.6a7.9,7.9,0,0,1-2.4-11A104,104,0,0,1,231.7,120H248a8,8,0,0,1,7.4,4.9A8.4,8.4,0,0,1,253.7,133.7ZM213,173.4a8,8,0,0,0-11.1,2.3,86.9,86.9,0,0,1-8.1,10.8h0a81.3,81.3,0,0,0-24.5-23,59.7,59.7,0,0,1-82.6,0,81.3,81.3,0,0,0-24.5,23h0A87.6,87.6,0,0,1,40.4,136H56a8,8,0,0,0,7.4-4.9,8.4,8.4,0,0,0-1.7-8.8l-24-24a8.1,8.1,0,0,0-11.4,0l-24,24a8.4,8.4,0,0,0-1.7,8.8A8,8,0,0,0,8,136H24.3a103.7,103.7,0,0,0,34.5,69.6h0l.4.3a103.9,103.9,0,0,0,156.2-21.5A7.9,7.9,0,0,0,213,173.4ZM128,164a44,44,0,1,0-44-44A44,44,0,0,0,128,164Z" />
                        </svg>
                        প্রোফাইল
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header> -->
        <ion-content class="h-full overflow-auto">
                <ion-toolbar class="">
                    <ion-buttons slot="end">
                        <ion-button router-link="/choice" fill="clear" class="text-lg font-semibold tracking-normal text-[#FF3D3D] px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" viewBox="0 0 256 256" stroke-width="4" class="pr-1 size-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M253.7,133.7l-24,24a8.2,8.2,0,0,1-11.4,0l-24-24a8.4,8.4,0,0,1-1.7-8.8A8,8,0,0,1,200,120h15.6A87.9,87.9,0,0,0,54.1,80.3,8,8,0,0,1,43,82.6a7.9,7.9,0,0,1-2.4-11A104,104,0,0,1,231.7,120H248a8,8,0,0,1,7.4,4.9A8.4,8.4,0,0,1,253.7,133.7ZM213,173.4a8,8,0,0,0-11.1,2.3,86.9,86.9,0,0,1-8.1,10.8h0a81.3,81.3,0,0,0-24.5-23,59.7,59.7,0,0,1-82.6,0,81.3,81.3,0,0,0-24.5,23h0A87.6,87.6,0,0,1,40.4,136H56a8,8,0,0,0,7.4-4.9,8.4,8.4,0,0,0-1.7-8.8l-24-24a8.1,8.1,0,0,0-11.4,0l-24,24a8.4,8.4,0,0,0-1.7,8.8A8,8,0,0,0,8,136H24.3a103.7,103.7,0,0,0,34.5,69.6h0l.4.3a103.9,103.9,0,0,0,156.2-21.5A7.9,7.9,0,0,0,213,173.4ZM128,164a44,44,0,1,0-44-44A44,44,0,0,0,128,164Z" />
                            </svg>
                            প্রোফাইল
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>


                <!-- Profile details -->
                <section id="profile details" class="flex h-auto px-5">
                    <div class="flex items-center rounded-lg w-full">
                        <img src="/profile.png" alt="User Avatar" class="w-20 h-20 rounded-full shrink-0 mr-3" />
                        
                        <div class="flex flex-col py-2 px-4 grow rounded-lg bg-[#FFF3F0]">
                            <h3 class="text-xl font-semibold my-0">ব্যবহারকারীর নাম</h3>
                            <p class="text-base font-regular text-gray-700">স্কুলের নাম</p>
                            <p class="text-base font-regular text-gray-700">অন্যান্য</p>
                        </div>
                    </div>
                </section>


                <!-- To-Do Section -->
                <section class="flex flex-col pt-5">
                    <!-- Header and Subheader -->
                    <div class="flex justify-between items-center px-5">
                        <div>
                            <h2 class="text-2xl font-semibold my-0">এই সপ্তাহে</h2>
                            <p class="text-sm font-regular text-gray-600">তোমার জন্য যা আছে-</p>
                        </div>
                        <ion-button router-link="/dashboard" fill="clear" size="small">
                        
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </ion-button>
                    </div>

                    <!-- Horizontally Scrollable Cards with Fading Effect -->
                    <div class="relative flex overflow-x-auto py-2 scrollbar-hidden" ref="scrollContainer">
                        <!-- Cards Container -->
                        <div :style="cardsContainerStyle" class="flex">
                            <!-- Card 1 -->
                            <ion-card @click="navigateToLink('/task1')" class="min-w-[200px] max-w-[250px] cursor-pointer shadow-lg rounded-lg">
                                <ion-img src="/path/to/thumbnail1.jpg" class="w-full h-[120px] object-cover rounded-t-lg"></ion-img>
                                <ion-card-header class="pt-2 pb-0">
                                    <ion-card-title class="text-sm font-semibold">ঘুম</ion-card-title>
                                </ion-card-header>
                                <ion-card-content class="py-2">
                                    <p class="text-sm font-regular text-gray-600">আপনার কি ঘুম ঠিক মত হচ্ছে?</p>
                                </ion-card-content>
                            </ion-card>

                            <!-- Card 2 -->
                            <ion-card @click="navigateToLink('/task1')" class="min-w-[200px] max-w-[250px] cursor-pointer shadow-lg rounded-lg">
                                <ion-img src="/path/to/thumbnail1.jpg" class="w-full h-[120px] object-cover rounded-t-lg"></ion-img>
                                <ion-card-header class="pt-2 pb-0">
                                    <ion-card-title class="text-sm font-semibold">ঘুম</ion-card-title>
                                </ion-card-header>
                                <ion-card-content class="py-2">
                                    <p class="text-sm font-regular text-gray-600">আপনার কি ঘুম ঠিক মত হচ্ছে?</p>
                                </ion-card-content>
                            </ion-card>

                            <!-- Card 3 -->
                            <ion-card @click="navigateToLink('/task1')" class="min-w-[200px] max-w-[250px] cursor-pointer shadow-lg rounded-lg">
                                <ion-img src="/path/to/thumbnail1.jpg" class="w-full h-[120px] object-cover rounded-t-lg"></ion-img>
                                <ion-card-header class="pt-2 pb-0">
                                    <ion-card-title class="text-sm font-semibold">ঘুম</ion-card-title>
                                </ion-card-header>
                                <ion-card-content class="py-2">
                                    <p class="text-sm font-regular text-gray-600">আপনার কি ঘুম ঠিক মত হচ্ছে?</p>
                                </ion-card-content>
                            </ion-card>

                            <!-- Add more cards here -->
                        </div>

                        
                    </div>

                    <!-- <div class="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white via-white opacity-60"></div>
                    <div class="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white via-white opacity-60"></div> -->
                </section>

                <!-- For You-->
                <div class="bg-[#FFF3F0] w-full">
                <section class="flex flex-col pt-4">
                    <!-- Header and Subheader -->
                    <div class="flex justify-between items-center px-5">
                        <div>
                            <h2 class="text-xl font-semibold my-0">তোমার জন্য!</h2>
                            <p class="text-sm font-regular text-gray-600">নতুন কিছু খুজছ? তোমার জন্য আছে-</p>
                        </div>
                        <ion-button router-link="/dashboard" fill="clear" size="small">
                        
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </ion-button>
                    </div>

                    <!-- Horizontally Scrollable Cards with Fading Effect -->
                    <div class="relative flex overflow-x-auto py-2 scrollbar-hidden" ref="scrollContainer">
                        <!-- Cards Container -->
                        <div :style="cardsContainerStyle" class="flex">
                            <!-- Card 1 -->
                            <ion-card @click="navigateToLink('/task1')" class="min-w-[200px] max-w-[250px] cursor-pointer shadow-lg rounded-lg">
                                <ion-img src="/path/to/thumbnail1.jpg" class="w-full h-[120px] object-cover rounded-t-lg"></ion-img>
                                <ion-card-header class="pt-2 pb-0">
                                    <ion-card-title class="text-sm font-semibold">উদ্বিগ্নতা</ion-card-title>
                                </ion-card-header>
                                <ion-card-content class="py-2">
                                    <p class="text-sm font-regular text-gray-600">উদ্বিগ্ন লাগছে? পড় এই ব্লগটি</p>
                                </ion-card-content>
                            </ion-card>

                            <!-- Card 2 -->
                            <ion-card @click="navigateToLink('/task1')" class="min-w-[200px] max-w-[250px] cursor-pointer shadow-lg rounded-lg">
                                <ion-img src="/path/to/thumbnail1.jpg" class="w-full h-[120px] object-cover rounded-t-lg"></ion-img>
                                <ion-card-header class="pt-2 pb-0">
                                    <ion-card-title class="text-sm font-semibold">উদ্বিগ্নতা</ion-card-title>
                                </ion-card-header>
                                <ion-card-content class="py-2">
                                    <p class="text-sm font-regular text-gray-600">উদ্বিগ্ন লাগছে? পড় এই ব্লগটি</p>
                                </ion-card-content>
                            </ion-card>

                            <!-- Card 3 -->
                            <ion-card @click="navigateToLink('/task1')" class="min-w-[200px] max-w-[250px] cursor-pointer shadow-lg rounded-lg">
                                <ion-img src="/path/to/thumbnail1.jpg" class="w-full h-[120px] object-cover rounded-t-lg"></ion-img>
                                <ion-card-header class="pt-2 pb-0">
                                    <ion-card-title class="text-sm font-semibold">উদ্বিগ্নতা</ion-card-title>
                                </ion-card-header>
                                <ion-card-content class="py-2">
                                    <p class="text-sm font-regular text-gray-600">উদ্বিগ্ন লাগছে? পড় এই ব্লগটি</p>
                                </ion-card-content>
                            </ion-card>

                            <!-- Add more cards here -->
                        </div>

                        
                    </div>

                    <!-- <div class="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white via-white opacity-60"></div>

                    <div class="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white via-white opacity-60"></div> -->
                </section>
                </div>


                <!-- Others -->
                <section class="flex flex-col pt-4">
                    <!-- Header and Subheader -->
                    <h2 class="text-xl font-semibold my-0 px-5">অন্যান্য</h2>
                    

                    <div class="grid grid-cols-3 gap-4 px-5 py-4">
                        <!-- Quick Option 1 -->
                        <div class="flex flex-col justify-center bg-white p-2 gap-2 rounded-lg shadow-md">
                            <ion-icon name="sleep-outline" class="text-4xl mb-2 place-self-center"></ion-icon>
                            <p class="text-sm font-semibold text-center">জরুরী হস্তক্ষেপ </p>
                        </div>

                        <!-- Quick Option 2 -->
                        <div class="flex flex-col justify-center bg-white p-2 gap-2 rounded-lg shadow-md">
                            <ion-icon name="sleep-outline" class="text-4xl mb-2 place-self-center"></ion-icon>
                            <p class="text-sm font-semibold text-center">জরুরী হস্তক্ষেপ </p>
                        </div>

                        <!-- Quick Option 3 -->
                        <div class="flex flex-col justify-center bg-white p-2 gap-2 rounded-lg shadow-md">
                            <ion-icon name="sleep-outline" class="text-4xl mb-2 place-self-center"></ion-icon>
                            <p class="text-sm font-semibold text-center">জরুরী হস্তক্ষেপ </p>
                        </div>

                        <!-- Quick Option 4 -->
                        <div class="flex flex-col justify-center bg-white p-2 gap-2 rounded-lg shadow-md">
                            <ion-icon name="sleep-outline" class="text-4xl mb-2 place-self-center"></ion-icon>
                            <p class="text-sm font-semibold text-center">জরুরী হস্তক্ষেপ </p>
                        </div>

                        <!-- Quick Option 5 -->
                        <div class="flex flex-col justify-center bg-white p-2 gap-2 rounded-lg shadow-md">
                            <ion-icon name="sleep-outline" class="text-4xl mb-2 place-self-center"></ion-icon>
                            <p class="text-sm font-semibold text-center">জরুরী হস্তক্ষেপ </p>
                        </div>

                        <!-- Quick Option 6 -->
                        <div class="flex flex-col justify-center bg-white p-2 gap-2 rounded-lg shadow-md">
                            <ion-icon name="sleep-outline" class="text-4xl mb-2 place-self-center"></ion-icon>
                            <p class="text-sm font-semibold text-center">জরুরী হস্তক্ষেপ </p>
                        </div>
                    </div>

                    <!-- <div class="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white via-white opacity-60"></div>

                    <div class="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white via-white opacity-60"></div> -->
                </section>




                <!-- <section class="flex flex-col h-full p-3 gap-8">
                    <h2 class="text-2xl font-semibold my-0 text-center">কে <span class="text-red-600">মানুষ-ই</span> ব্যবহার করছেন?</h2>
                    <div class="">
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
                    </div>

                    <div class="flex flex-col gap-8">
                        <div class=" w-2/3 shadow min-h-[150px] rounded-lg mx-auto border p-3" 
                            @click="selectProfile('child')">
                            <div class="c items-center justify-center">
                                <ion-img src="/Children.png" class="w-[70px] mx-auto "></ion-img>
                            </div>
                            <div class="">
                                <h2 class="text-lg my-0 text-red-600 font-semibold  text-center">সন্তান</h2>
                                <p class="font-poppins-regular text-xs text-center" id="childName">{{ childName }}</p>
                            </div>

                        </div>
                        <div class=" gap-4  w-2/3 shadow min-h-[150px] rounded-lg mx-auto  border  p-3"
                            @click="selectProfile('parent')">
                            <div class="p items-center justify-center">
                                <ion-img src="/Parents.png" class="w-[70px] mx-auto "></ion-img>
                            </div>
                            <div class="col-span-3 ">
                                <h2 class="text-lg my-0 text-red-600 font-semibold text-center">অভিভাবক</h2>
                                <p class="font-poppins-regular text-xs text-center" id="parentName">{{ parentName }}</p>
                            </div>

                        </div>
                    </div>
                </section> -->
                <Calendar />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import { IonButton, IonIcon, IonCard, IonCardHeader, IonCardContent, IonImg } from '@ionic/vue';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { defineComponent } from 'vue';
    import { ref, reactive } from '@vue/reactivity';
    import { heart, logoApple, settingsSharp, star } from 'ionicons/icons';

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import SwiperCore from 'swiper';
    import { Pagination } from 'swiper/modules';
    SwiperCore.use([Pagination]);
    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';
    import Calendar from '@/components/Calendar.vue';

    export default defineComponent({
    components: {
        IonButton,
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonImg,
    },
    setup() {
        const scrollContainer = ref(null);
        const cardsContainerStyle = reactive({
            marginLeft: '12px', // Initial margin based on ion-padding
            marginRight: '12px',  // Rightmost card will have no padding initially
        });
        const router = useRouter();
        const navigateToLink = (link: string) => {
            router.push(link);
        };

        return {
            scrollContainer,
            cardsContainerStyle,
            navigateToLink,
        };
    }
});
</script>

<style scoped>
/* Tailwind CSS classes to hide the scrollbar */
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
}

.scrollbar-hidden {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
}

ion-content {
  --offset-top: 0px !important;
  --offset-bottom: 0px !important;
  --ion-content-padding: 0px !important;
}
</style>