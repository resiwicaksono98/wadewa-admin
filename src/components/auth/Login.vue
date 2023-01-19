<!-- @format -->

<template>
   <div class="container my-5">
      <h3 class="text-center">Login Page</h3>

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
            <button type="button" class="btn btn-success" @click="register">Register</button>
         </div>
      </form>
   </div>
</template>

<script>
   import { reactive, ref } from "vue";
   import { useRouter } from "vue-router";
   import { httpRequest } from "../../utils/axiosInstance";

   export default {
      setup() {
         const router = useRouter();

         const dataUser = reactive({
            email: "",
            password: "",
         });

         const validation = ref("");

         const login = async () => {
            await httpRequest
               .post("/admin/auth/login", dataUser)
               .then((res) => {
                  router.push({ name: "news.index" });
               })
               .catch((err) => {
                  validation.value = err.response.data.msg;
               });
         };
         const register = () => {
            router.push({ name: "register" });
         };
         return {
            login,
            register,
            dataUser,
            validation,
         };
      },
   };
</script>
