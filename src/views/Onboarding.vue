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
                  <label class="text-sm font-medium mb-2">Tell us your child's name</label>
                  <input v-model="child_name" type="text" placeholder="Your child's name"
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500" />
                </div>
  
                <div v-else-if="currentStep === 2">
                  <label class="text-sm font-medium mb-2">Tell us your child's date of birth</label>
                  <input v-model="child_dob" type="date" placeholder="Your child's date of birth"
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500" />
                </div>
                
                <div v-else-if="currentStep === 3">
                  <label class="text-sm font-medium mb-2">Tell us your child's gender</label>
                    <ul class="grid grid-cols-2 gap-2">
                    <!-- Option 1 -->
                    <li>
                        <input v-model="child_gender" type="radio" id="option1" name="child_gender" value="male" class="hidden peer">
                        <label for="option1"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            Male
                        </label>
                    </li>

                    <!-- Option 2 -->
                    <li>
                        <input v-model="child_gender" type="radio" id="option2" name="child_gender" value="female" class="hidden peer">
                        <label for="option2"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            Female
                        </label>
                    </li>

                    <!-- Option 3 -->
                    <li>
                        <input v-model="child_gender" type="radio" id="option3" name="child_gender" value="other" class="hidden peer">
                        <label for="option3"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            Other
                        </label>
                    </li>
                </ul>
                </div>
  
                <div v-else-if="currentStep === 4">
                  <label class="text-sm font-medium mb-2">Which grade does your child go to?</label>
                  <select 
                    v-model="child_grade" 
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500">
                    <option value="" disabled>Select grade</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                    <option value="4">Grade 4</option>
                    <option value="5">Grade 5</option>
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                    <option value="other">Other</option>
                </select>
                </div>

                <div v-if="currentStep === 5">
                  <label class="text-sm font-medium mb-2">Great! Now tell me your name.</label>
                  <input v-model="parent_name" type="text" placeholder="Your name"
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500" />
                </div>

                <div v-else-if="currentStep === 6">
                  <label class="text-sm font-medium mb-2">When were you born?</label>
                  <input v-model="parent_dob" type="date" placeholder="Your date of birth"
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500" />
                </div>

                <div v-if="currentStep === 7">
                  <label class="text-sm font-medium mb-2">Are you the father, mother or other legal guardian of the child?</label>
                  <ul class="grid grid-cols-2 gap-2">
                    <!-- Option 1 -->
                    <li>
                        <input v-model="parent_type" type="radio" id="option1" name="parent_type" value="father" class="hidden peer">
                        <label for="option1"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            Father
                        </label>
                    </li>

                    <!-- Option 2 -->
                    <li>
                        <input v-model="parent_type" type="radio" id="option2" name="parent_type" value="mother" class="hidden peer">
                        <label for="option2"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            Mother
                        </label>
                    </li>

                    <!-- Option 3 -->
                    <li>
                        <input v-model="parent_type" type="radio" id="option3" name="parent_type" value="guardian" class="hidden peer">
                        <label for="option3"
                            class="inline-flex bg-gray-100 text-black w-full px-2 py-2 rounded-lg text-sm transition-colors duration-300 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
                            Other guardian
                        </label>
                    </li>
                </ul>
                </div>

                <div v-if="currentStep === 8">
                  <label class="text-sm font-medium mb-2">Lastly, what's your current occupation?</label>
                  <select 
                    v-model="parent_grade" 
                    class="shadow-xs w-full rounded-lg border border-stroke bg-white p-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500">
                    <option value="" disabled>Select occupation</option>
                    <option value="farmer">Farmer</option>
                    <option value="small_business_owner">Small Business Owner</option>
                    <option value="teacher">Teacher</option>
                    <option value="tailor">Tailor</option>
                    <option value="garments_worker">Garments Worker</option>
                    <option value="day_laborer">Day Laborer</option>
                    <option value="shopkeeper">Shopkeeper</option>
                    <option value="rickshaw_puller">Rickshaw Puller</option>
                    <option value="homemaker">Homemaker</option>
                    <option value="artisan">Artisan (Handicrafts, Weaving, Pottery, etc.)</option>
                    <option value="government_employee">Government Employee</option>
                    <option value="private_sector_employee">Private Sector Employee</option>
                    <option value="fisherman">Fisherman</option>
                    <option value="driver">Driver</option>
                    <option value="healthcare_worker">Healthcare Worker</option>
                    <option value="construction_worker">Construction Worker</option>
                    <option value="imams_or_religious_leader">Imam or Religious Leader</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="student">Student</option>
                    <option value="other">Other</option>
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
        try {
          const childResponse = await axios.post('https://backend-manushe.monerbondhu.com/api/profile/create', childData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
          });

          const parentResponse = await axios.post('https://backend-manushe.monerbondhu.com/api/profile/create', parentData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
          });
  
          if (childResponse.data.success && parentResponse.data.success) {
            const onboardResponse = await axios.post('https://backend-manushe.monerbondhu.com/api/user/onboard', {}, {
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
  