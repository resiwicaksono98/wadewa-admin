<!-- @format -->

<template>
   <div>
      <div class="row">
         <div class="col-2 bg-primary p-4" style="min-height: 100vh">
            <SidebarVue />
         </div>
         <div class="col-10">
            <div class="p-2 d-flex justify-content-end border-bottom">
               <!-- Logout -->
               <button class="btn btn-danger" @click="logout()">Logout</button>
            </div>
            <div>
               <router-view />
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import axios from "axios";
   import { useRouter } from "vue-router";
   import SidebarVue from "../Sidebar.vue";

   export default {
      components: { SidebarVue },

      setup() {
         const router = useRouter();
         const logout = () => {
            axios
               .delete(`http://localhost:5000/api/admin/auth/logout`)
               .then(() => {
                  router.push({ name: "login" });
               })
               .catch((err) => alert("error"));
         };
         return { logout };
      },
   };
</script>
