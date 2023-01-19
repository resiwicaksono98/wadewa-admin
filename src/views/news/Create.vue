<!-- @format -->

<template>
   <div class="container my-5">
      <div class="row justify-content-center">
         <div>
            <router-link :to="{ name: 'news.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">Back</router-link>
            <div class="card rounded shadow">
               <div class="card-header">News Create</div>
               <div class="card-body">
                  <form @submit.prevent="store()">
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
   import { reactive, ref } from "vue";
   import { useRouter } from "vue-router";
   import { httpRequest } from "../../utils/axiosInstance";

   export default {
      methods: {
         onFileChange(e) {
            this.newst.image_news = e.target.files[0];
         },
      },

      setup() {
         // Data binding
         const newst = reactive({
            title: "",
            description: "",
            image_news: "",
         });

         const validation = ref([]);

         const router = useRouter();

         async function store() {
            await httpRequest
               .post("/admin/newst", newst, {
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
            store,
         };
      },
   };
</script>
