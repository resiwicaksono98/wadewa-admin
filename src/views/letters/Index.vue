<!-- @format -->

<template>
   <div class="container my-5">
      <div class="row justify-content-center">
         <div>
            <router-link :to="{ name: 'letter.create' }" class="btn btn-primary btn-sm rounded shadow mb-3">Add</router-link>
            <div class="card rounded shadow">
               <div class="card-header">Letters List</div>
               <div class="card-body">
                  <table class="table">
                     <thead>
                        <tr class="text-center">
                           <th>No</th>
                           <th>Title</th>
                           <th>Letter Number</th>
                           <th>Village Head</th>
                           <th>NIP</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(letter, i) in letters" :key="i" class="align-middle text-center">
                           <td>{{ i + 1 }}</td>
                           <td>{{ letter.title }}</td>
                           <td>{{ letter.letter_number }}</td>
                           <td>{{ letter.village_head }}</td>
                           <td>{{ letter.nip }}</td>
                           <td>
                              <div class="btn-group gap-2">
                                 <router-link :to="{ name: 'letter.edit', params: { id: letter.letterId } }" class="btn btn-sm btn-outline-info">Edit</router-link>
                                 <button class="btn btn-sm btn-outline-danger" @click.prevent="destroy(letter.letterId, i)">Delete</button>
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
   import { ref, onBeforeMount } from "vue";
   import { httpRequest } from "../../utils/axiosInstance";
   export default {
      setup() {
         const letters = ref([]);

         onBeforeMount(async () => {
            await httpRequest
               .get("/admin/letters")
               .then((res) => (letters.value = res.data.data))
               .catch((err) => console.log(err));
         });

         function destroy(id, index) {
            httpRequest
               .delete(`/admin/letters/${id}`)
               .then(() => {
                  letters.value.splice(index, 1);
               })
               .catch((err) => {
                  validation.value = err.response.data;
               });
         }
         return { letters, destroy };
      },
   };
</script>
