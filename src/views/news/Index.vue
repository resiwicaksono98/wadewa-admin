<!-- @format -->

@format

<template>
   <div class="container my-5">
      <div class="row justify-content-center">
         <div>
            <router-link :to="{ name: 'news.create' }" class="btn btn-primary btn-sm rounded shadow mb-3">Add</router-link>
            <div class="card rounded shadow">
               <div class="card-header">News List</div>
               <div class="card-body">
                  <table class="table">
                     <thead>
                        <tr class="text-center">
                           <th>News Id</th>
                           <th>Admin Id</th>
                           <th>Title</th>
                           <th>Description</th>
                           <th>Image</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(news, i) in newst.data" :key="i" class="align-middle text-center">
                           <td>{{ i + 1 }}</td>
                           <td>{{ news.admin.name }}</td>
                           <td>{{ news.title }}</td>
                           <td>{{ news.description }}</td>
                           <td>
                              <img :src="`http://localhost:5000/${news.image_news}`" class="img-fluid rounded-top w-25" alt="" />
                           </td>
                           <td>
                              <div class="btn-group gap-2">
                                 <router-link :to="{ name: 'news.edit', params: { id: news.newsId } }" class="btn btn-sm btn-outline-info">Edit</router-link>
                                 <button class="btn btn-sm btn-outline-danger" @click.prevent="destroy(news.newsId, i)">Delete</button>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import axios from "axios";
   import { ref, onBeforeMount } from "vue";

   export default {
      setup() {
         // reactive state
         let newst = ref([]);

         onBeforeMount(() => {
            // get data from api endpoint
            axios
               .get(`http://localhost:5000/api/admin/newst`)
               .then((result) => {
                  newst.value = result.data;
               })
               .catch((err) => console.log(err));
         });

         function destroy(id, index) {
            axios
               .delete(`http://localhost:5000/api/admin/newst/${id}`, newst)
               .then(() => {
                  newst.value.data.splice(index, 1);
               })
               .catch((err) => {
                  validation.value = err.response.data;
               });
         }
         return {
            newst,

            destroy,
         };
      },
   };
</script>
