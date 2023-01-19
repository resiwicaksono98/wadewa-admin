<!-- @format -->

<template>
   <div class="container my-5">
      <div class="row justify-content-center">
         <div>
            <router-link :to="{ name: 'complaint.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">Back</router-link>
            <div class="card rounded shadow">
               <div class="card-header">Complaint Respon</div>
               <div class="card-body">
                  <form @submit.prevent="update()">
                     <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="complaintResult.status">
                           <option selected value="">Open this select status</option>
                           <option v-for="(stat, i) in status" :key="i" :value="stat.name">
                              {{ stat.name }}
                           </option>
                        </select>
                        <label for="floatingSelect">Complaint Type</label>
                     </div>
                     <div class="mb-3">
                        <label for="" class="form-label">Message</label>
                        <textarea name="" class="form-control" v-model="complaintResult.message"></textarea>
                        <div class="text-danger">{{ validation.message }}</div>
                     </div>
                     <button type="submit" class="btn btn-outline-primary" @click="createPdf">Generate Pdf</button>
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
   import pdfMake from "pdfmake/build/pdfmake";
   import pdfFonts from "pdfmake/build/vfs_fonts";
   pdfMake.vfs = pdfFonts.pdfMake.vfs;

   export default {
      methods: {
         onFileChange(e) {
            this.complaintResult.files = e.target.files[0];
         },
         createPdf() {
            const docDefinition = {
               content: [{ text: "Name: " + "resi" }, { text: "Age: " + "wicaksono" }],
            };
            pdfMake.createPdf(docDefinition).open();
         },
      },
      setup() {
         // Data binding
         let complaintResult = reactive({
            status: "",
            message: "",
            files: "",
         });

         const status = reactive([{ name: "pending" }, { name: "success" }, { name: "rejected" }]);

         const validation = ref([]);

         const router = useRouter();
         const route = useRoute();

         onBeforeMount(async () => {
            await httpRequest
               .get(`/admin/complaintResult/${route.params.id}`)
               .then((res) => {
                  complaintResult.status = res.data.data.status;
                  complaintResult.message = res.data.data.message;
               })
               .catch((err) => console.log(err));
         });

         async function update() {
            await httpRequest
               .put(`/admin/complaintResult/${route.params.id}`, complaintResult, {
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
            status,
            complaintResult,
            validation,
            router,
            update,
         };
      },
   };
</script>
