<!-- @format -->

<template>
   <div class="container my-5">
      <div class="row justify-content-center">
         <div>
            <div class="card rounded shadow">
               <div class="card-header">Complaint List</div>
               <div class="card-body">
                  <table class="table">
                     <thead>
                        <tr class="text-center">
                           <th>No</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Complaint Type</th>
                           <th>Description</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(complaint, i) in complaintResults" :key="i" class="align-middle text-center">
                           <td>{{ i + 1 }}</td>
                           <td>{{ complaint.citizen.name }}</td>
                           <td>{{ complaint.letter.title }}</td>
                           <td>{{ complaint.complaint.description }}</td>
                           <td>{{ complaint.status }}</td>
                           <td>
                              <div class="btn-group gap-2">
                                 <router-link :to="{ name: 'complaint.respon', params: { id: complaint.complaintResultId } }" class="btn btn-sm btn-outline-success">Respon</router-link>
                                 <router-link :to="{ name: 'complaint.edit', params: { id: complaint.complaintId } }" class="btn btn-sm btn-outline-info">Edit</router-link>
                                 <button class="btn btn-sm btn-outline-danger" @click.prevent="destroy(news.newsId, index)">Delete</button>
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
   import { ref, onBeforeMount, onMounted } from "vue";
   import { httpRequest } from "../../utils/axiosInstance";
   export default {
      setup() {
         let complaintResults = ref([]);

         onBeforeMount(async () => {
            await httpRequest
               .get("/admin/complaintResult")
               .then((res) => {
                  complaintResults.value = res.data.data;
               })
               .catch((err) => console.log(err));
         });
         return { complaintResults };
      },
   };
</script>
