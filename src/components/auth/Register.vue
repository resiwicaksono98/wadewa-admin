<!-- @format -->

<template>
   <div class="container my-5">
      <h3 class="text-center">Register Page</h3>
      <form>
         <div class="mb-3">
            <label for="" class="form-label">Name</label>
            <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
         </div>
         <div class="mb-3">
            <label for="" class="form-label">NIK</label>
            <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
         </div>
         <div class="mb-3">
            <label for="" class="form-label">Email</label>
            <input type="email" class="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="abc@mail.com" />
         </div>
         <div class="mb-3">
            <label for="" class="form-label">Password</label>
            <input type="password" class="form-control" name="" id="" placeholder="" />
         </div>
         <div class="mb-3">
            <label for="" class="form-label">Address</label>
            <textarea class="form-control" name="" id="" rows="3"></textarea>
         </div>
         <div class="mb-3">
            <label for="" class="form-label">Status</label>
            <select class="form-select form-select-lg" name="" id="">
               <option selected>Select one</option>
               <option value="">Lajang</option>
               <option value="">Sudah Menikah</option>
            </select>
         </div>
         <div class="d-grid gap-2">
            <button type="button" class="btn btn-success" @click="register()">Register</button>
         </div>
      </form>
   </div>
</template>

<script>
   import { useRouter } from "vue-router";
   export default {
      data() {
         const router = useRouter();
         function register() {
            router.push({ name: "news.index" });
         }
         return {
            register,
         };
      },
   };
</script>
