<!-- @format -->

<template>
   <div class="container my-5">
      <div class="row justify-content-center">
         <div>
            <router-link :to="{ name: 'news.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">Back</router-link>
            <div class="card rounded shadow">
               <div class="card-header">News Edit</div>
               <div class="card-body">
                  <form @submit.prevent="update()">
                     <div class="mb-3">
                        <label for="" class="form-label">Title</label>
                        <input type="text" class="form-control" v-model="newst.title" />
                        <div class="text-danger">{{ validation.title }}</div>
                     </div>
                     <div class="mb-3">
                        <label for="" class="form-label">Description</label>
                        <textarea name="" class="form-control" v-model="newst.description"></textarea>
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
   import { reactive, ref, onMounted } from "vue";
   import { useRouter, useRoute } from "vue-router";
   import { httpRequest } from "../../utils/axiosInstance";

   export default {
      methods: {
         onFileChange(e) {
            this.newst.image_news = e.target.files[0];
         },
      },
      setup() {
         // Data binding
         let newst = reactive({
            title: "",
            description: "",
         });

         const validation = ref([]);

         const router = useRouter();
         const route = useRoute();

         onMounted(async () => {
            await httpRequest
               .get(`/admin/newst/${route.params.id}`)
               .then((result) => {
                  newst.title = result.data.data.title;
                  newst.description = result.data.data.description;
               })
               .catch((err) => console.log(err));
         });
         async function update() {
            await httpRequest
               .put(`/admin/newst/${route.params.id}`, newst, {
                  headers: {
                     "Content-Type": "multipart/form-data",
                  },
               })
               .then(() => {
                  router
                     .push({
                        name: "news.index",
                     })
                     .catch((err) => {
                        validation.value = err.response.data;
                     });
               });
         }
         return {
            newst,
            validation,
            router,
            update,
         };
      },
   };
</script>
