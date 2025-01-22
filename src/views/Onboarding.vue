<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <ion-img src="/mb-logo.svg" class="w-[100px] mx-auto my-4"></ion-img>
        <section class="flex flex-col w-full items-center justify-center p-3">
          <div class="p-4 w-full">
            <h2 class="text-xl text-center">Let's Get Started with <span class="text-red-600">Manush-E</span></h2>
            <!-- <ion-img src="/onboarding.png" class="w-[65%] mx-auto my-4"></ion-img> -->
  
            <div>
              <form @submit.prevent="handleSubmit" class="flex flex-col mt-8">
                <div v-if="currentStep === 1">
                  <label class="text-sm font-medium mb-2">আপনার সন্তানের নাম বলুন</label>
                  <input v-model="child_name" type="text" placeholder="Your child's name"
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500" />
                </div>
  
                <div v-else-if="currentStep === 2">
                  <label class="text-sm font-medium mb-2">আপনার সন্তানের বয়স কত?</label>
                  <input v-model="child_dob" type="date" placeholder="Your child's date of birth"
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500" />
                </div>
                
                <div v-else-if="currentStep === 3">
                  <label class="text-sm font-medium mb-2">আপনার সন্তান কি...</label>
                    <ul class="grid grid-cols-2 gap-2">
                    <!-- Option 1 -->
                    <li>
                        <input v-model="child_gender" type="radio" id="option1" name="child_gender" value="male" class="hidden peer">
                        <label for="option1"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            ছেলে
                        </label>
                    </li>

                    <!-- Option 2 -->
                    <li>
                        <input v-model="child_gender" type="radio" id="option2" name="child_gender" value="female" class="hidden peer">
                        <label for="option2"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            মেয়ে
                        </label>
                    </li>

                    <!-- Option 3 -->
                    <li>
                        <input v-model="child_gender" type="radio" id="option3" name="child_gender" value="other" class="hidden peer">
                        <label for="option3"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            অন্যান্য
                        </label>
                    </li>
                </ul>
                </div>
  
                <div v-else-if="currentStep === 4">
                  <label class="text-sm font-medium mb-2">আপনার সন্তান কোন ক্লাসে পরে?</label>
                  <select 
                    v-model="child_grade" 
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500">
                    <option value="" disabled>Select grade</option>
                    <option value="1">ক্লাস ১</option>
                    <option value="2">ক্লাস ২</option>
                    <option value="3">ক্লাস ৩</option>
                    <option value="4">ক্লাস ৪</option>
                    <option value="5">ক্লাস ৫</option>
                    <option value="6">ক্লাস ৬</option>
                    <option value="7">ক্লাস ৭</option>
                    <option value="8">ক্লাস ৮</option>
                    <option value="9">ক্লাস ৯</option>
                    <option value="10">ক্লাস ১০ / মেট্রিক / এসএসসি</option>
                    <option value="11">ক্লাস ১১ </option>
                    <option value="12">ক্লাস ১২ / ইন্টার / এইচএসসি</option>
                    <option value="other">অন্যান্য</option>
                </select>
                </div>

                <div v-if="currentStep === 5">
                  <label class="text-sm font-medium mb-2">ধন্যবাদ! এখন আপনার নাম বলুন! (অভিভাবক)</label>
                  <input v-model="parent_name" type="text" placeholder="Your name"
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500" />
                </div>

                <div v-else-if="currentStep === 6">
                  <label class="text-sm font-medium mb-2">আপনার বয়স কত? (অভিভাবক)</label>
                  <input v-model="parent_dob" type="date" placeholder="Your date of birth"
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500" />
                </div>

                <div v-if="currentStep === 7">
                  <label class="text-sm font-medium mb-2">আপনি সন্তানের কি হন?</label>
                  <ul class="grid grid-cols-2 gap-2">
                    <!-- Option 1 -->
                    <li>
                        <input v-model="parent_type" type="radio" id="option1" name="parent_type" value="father" class="hidden peer">
                        <label for="option1"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            বাবা
                        </label>
                    </li>

                    <!-- Option 2 -->
                    <li>
                        <input v-model="parent_type" type="radio" id="option2" name="parent_type" value="mother" class="hidden peer">
                        <label for="option2"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            মা
                        </label>
                    </li>

                    <!-- Option 3 -->
                    <li>
                        <input v-model="parent_type" type="radio" id="option3" name="parent_type" value="guardian" class="hidden peer">
                        <label for="option3"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            অভিভাবক
                        </label>
                    </li>
                </ul>
                </div>

                <div v-if="currentStep === 8">
                  <label class="text-sm font-medium mb-2">আপনার পেশা কি?</label>
                  <select 
                    v-model="parent_grade" 
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500">
                    <option value="" disabled>Select occupation</option>
                    <option value="farmer">কৃষিকাজ</option>
                    <option value="small_business_owner">খুদ্র ব্যাবসা</option>
                    <option value="teacher">শিক্ষক</option>
                    <option value="tailor">দর্জি</option>
                    <option value="garments_worker">গার্মেন্টস কর্মী</option>
                    <!-- <option value="day_laborer">Day Laborer</option> -->
                    <option value="shopkeeper">দোকান</option>
                    <option value="rickshaw_puller">রিকশা চালক</option>
                    <option value="homemaker">গৃহিণী</option>
                    <option value="artisan">কারিগর (হস্তশিল্প, তাঁত, মৃৎশিল্প, ইত্যাদি)</option>
                    <option value="government_employee">সরকারি চাকুরিজীবী</option>
                    <option value="private_sector_employee">বেসরকারি চাকুরিজীবী</option>
                    <option value="fisherman">জেলে</option>
                    <option value="driver">গাড়ি চালক</option>
                    <option value="healthcare_worker">স্বাস্থ্যকর্মী</option>
                    <option value="construction_worker">নির্মাণ শ্রমিক</option>
                    <option value="imams_or_religious_leader">ইমাম বা ধর্মীয় নেতা</option>
                    <option value="unemployed">এই মুহুর্তে কোন পেশায় নিয়োজিত নই</option>
                    <option value="student">শিক্ষার্থী</option>
                    <option value="other">উপরে উল্লেখ করা হয়নি/অন্যান্য</option>
                </select>
                </div>
  
                <ion-button 
                  v-if="currentStep < 8" 
                  @click="nextStep" 
                  expand="block" 
                  fill="outline" 
                  class="mt-4 rounded-lg">
                  Next
                </ion-button>

                <ion-button 
                  v-if="currentStep > 1" 
                  @click="previousStep" 
                  expand="block" 
                  fill="outline" 
                  class="mt-4 rounded-lg">
                  Previous
                </ion-button>
  
                <ion-button 
                  v-if="currentStep === 8"
                  type="submit"
                  expand="block" 
                  fill="outline" 
                  class="mt-4 rounded-lg">
                  Submit
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
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
        const currentStep = ref(1);
        const child_name = ref('');
        const child_dob = ref('');
        const child_gender = ref('');
        const child_grade = ref('');
        const parent_name = ref('');
        const parent_dob = ref('');
        const parent_type = ref('');
        const parent_grade = ref('');

      const nextStep = () => {
        if (currentStep.value < 8) {
          currentStep.value++;
        }
      };

      const previousStep = () => {
        if (currentStep.value > 1) {
          currentStep.value--;
        }
      };


  
      const handleSubmit = async () => {
        const childData = {
        "fullName" : child_name.value,
        "type" : "child",
        "relationType" : "child",
        "dob" : child_dob.value,
        "gender" : child_gender.value,
        "grade" : child_grade.value
      };

      const parentData = {
        "fullName" : parent_name.value,
        "type" : "parent",
        "relationType" : parent_type.value,
        "dob" : parent_dob.value,
        "gender" : parent_type.value === 'mother' ? "female" : "male",
        "grade" : parent_grade.value
      };

      let isChildDataIncomplete = Object.values(childData).some(value => value === "" || value === null || value === undefined);
      let isParentDataIncomplete = Object.values(parentData).some(value => value === "" || value === null || value === undefined);

      if (isChildDataIncomplete || isParentDataIncomplete) {
        currentStep.value = 1;
      }
        try {
          const childResponse = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/profile/create`, childData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
          });

          const parentResponse = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/profile/create`, parentData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
          });
  
          if (childResponse.data.success && parentResponse.data.success) {
            const onboardResponse = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/user/onboard`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
            });
            if(onboardResponse.data.success){
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                user.is_onboarded = true;
                localStorage.setItem('user', JSON.stringify(user));
                router.push('/choice'); // Redirect after onboarding
            }
          }
        } catch (error) {
          console.error('Error during onboarding:', error);
        }
      };
  </script>
  
  <style scoped>
  .onboarding-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  