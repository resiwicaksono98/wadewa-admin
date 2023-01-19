<!-- @format -->

<template>
   <div class="container my-5">
      <div class="row justify-content-center">
         <div>
            <router-link :to="{ name: 'letter.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">Back</router-link>
            <div class="card rounded shadow">
               <div class="card-header">Letter Edit</div>
               <div class="card-body">
                  <form @submit.prevent="update()">
                     <div class="mb-3">
                        <label for="" class="form-label">Title</label>
                        <input type="text" class="form-control" v-model="letters.title" />
                        <div class="text-danger">{{ validation.title }}</div>
                     </div>
                     <div class="mb-3">
                        <label for="" class="form-label">Letter Number</label>
                        <input type="text" class="form-control" v-model="letters.letter_number" />
                        <div class="text-danger">{{ validation.letter_number }}</div>
                     </div>
                     <div class="mb-3">
                        <label for="" class="form-label">Content</label>
                        <textarea name="" class="form-control" v-model="letters.content_letter"></textarea>
                        <div class="text-danger">{{ validation.content_letter }}</div>
                     </div>
                     <div class="mb-3">
                        <label for="" class="form-label">Village address</label>
                        <textarea name="" class="form-control" v-model="letters.village_address"></textarea>
                        <div class="text-danger">{{ validation.village_address }}</div>
                     </div>
                     <div class="mb-3">
                        <label for="" class="form-label">Village Head</label>
                        <input type="text" class="form-control" v-model="letters.village_head" />
                        <div class="text-danger">{{ validation.village_head }}</div>
                     </div>
                     <div class="mb-3">
                        <label for="" class="form-label">NIP</label>
                        <input type="text" class="form-control" v-model="letters.nip" />
                        <div class="text-danger">{{ validation.nip }}</div>
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
   import { reactive, ref, onMounted } from "vue";
   import { useRouter, useRoute } from "vue-router";
   import { httpRequest } from "../../utils/axiosInstance";

   export default {
      setup() {
         // Data binding
         let letters = reactive({
            title: "",
            letter_number: "",
            content_letter: "",
            village_address: "",
            village_head: "",
            nip: "",
         });

         const validation = ref([]);

         const router = useRouter();
         const route = useRoute();

         onMounted(async () => {
            await httpRequest
               .get(`/admin/letters/${route.params.id}`)
               .then((result) => {
                  letters.title = result.data.data.title;
                  letters.letter_number = result.data.data.letter_number;
                  letters.content_letter = result.data.data.content_letter;
                  letters.village_address = result.data.data.village_address;
                  letters.village_head = result.data.data.village_head;
                  letters.nip = result.data.data.nip;
               })
               .catch((err) => console.log(err));
         });
         async function update() {
            await httpRequest.put(`/admin/letters/${route.params.id}`, letters).then(() => {
               router
                  .push({
                     name: "letter.index",
                  })
                  .catch((err) => {
                     validation.value = err.response.data;
                  });
            });
         }
         return {
            letters,
            validation,
            router,
            update,
         };
      },
   };
</script>
