<!-- @format -->

<template>
   <div class="container my-5">
      <h3 class="text-center">Login Admin</h3>

      <form @submit.prevent="login()">
         <div class="text-danger text-center my-3">{{ validation && validation }}</div>
         <div class="mb-3">
            <label for="" class="form-label">Email</label>
            <input type="email" class="form-control" aria-describedby="emailHelpId" placeholder="abc@mail.com" v-model="dataUser.email" />
         </div>
         <div class="mb-3">
            <label for="" class="form-label">Password</label>
            <input type="password" class="form-control" placeholder="your password" v-model="dataUser.password" />
         </div>
         <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">Login</button>
         </div>
      </form>
   </div>
</template>

<script>
   import { reactive, ref, computed, watchEffect } from "vue";
   import { useRouter } from "vue-router";
   import { useAuthStore } from "../../store/auth";

   export default {
      setup() {
         const router = useRouter();
         const authStore = useAuthStore();

         const dataUser = reactive({
            email: "",
            password: "",
         });

         const validation = ref("");

         watchEffect(() => {
            if (authStore.user) {
               alert("success login");
               router.go();
            }
         });

         const login = () => {
            authStore.loginAdmin(dataUser);
         };

         return {
            login,
            dataUser,
            validation,
         };
      },
   };
</script>
