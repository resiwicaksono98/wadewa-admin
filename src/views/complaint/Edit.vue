<!-- @format -->

<template>
   <div class="container my-5">
      <div class="row justify-content-center">
         <div>
            <router-link :to="{ name: 'complaint.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">Back</router-link>
            <div class="card rounded shadow">
               <div class="card-header">Complaint Edit</div>
               <div class="card-body">
                  <form @submit.prevent="update()">
                     <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="complaints.complaint_type">
                           <option selected value="">Open this select menu</option>
                           <option v-for="(letter, i) in letters" :key="i" :value="letter.letterId">
                              {{ letter.title }}
                           </option>
                        </select>
                        <label for="floatingSelect">Complaint Type</label>
                     </div>
                     <div class="mb-3">
                        <label for="" class="form-label">Description</label>
                        <textarea name="" class="form-control" v-model="complaints.description"></textarea>
                        <div class="text-danger">{{ validation.description }}</div>
                     </div>
                     <div class="mb-3">
                        <label for="" class="form-label">Choose file</label>
                        <input type="file" @change="onFileChange" class="form-control" aria-describedby="fileHelpId" />
                     </div>
                     <button type="submit" class="btn btn-outline-primary">Submit</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import { reactive, ref, onMounted, onBeforeMount } from "vue";
   import { useRouter, useRoute } from "vue-router";
   import { httpRequest } from "../../utils/axiosInstance";

   export default {
      methods: {
         onFileChange(e) {
            this.complaints.image_url = e.target.files[0];
         },
      },
      setup() {
         // Data binding
         let complaints = reactive({
            complaint_type: "",
            description: "",
            image_url: "",
         });

         const letters = ref([]);

         const validation = ref([]);

         const router = useRouter();
         const route = useRoute();

         onBeforeMount(async () => {
            await httpRequest
               .get(`/admin/letters`)
               .then((res) => {
                  letters.value = res.data.data;
               })
               .catch((err) => console.log(err));
         });

         onMounted(async () => {
            await httpRequest
               .get(`/admin/complaints/${route.params.id}`)
               .then((result) => {
                  complaints.complaint_type = result.data.data.complaint_type;
                  complaints.description = result.data.data.description;
                  complaints.image_url = result.data.data.image_url;
               })
               .catch((err) => console.log(err));
         });

         async function update() {
            await httpRequest
               .put(`/admin/complaints/${route.params.id}`, complaints, {
                  headers: {
                     "Content-Type": "multipart/form-data",
                  },
               })
               .then(() => {
                  router
                     .push({
                        name: "complaint.index",
                     })
                     .catch((err) => {
                        validation.value = err.response.data;
                     });
               });
         }
         return {
            complaints,
            validation,
            router,
            update,
            letters,
         };
      },
   };
</script>
