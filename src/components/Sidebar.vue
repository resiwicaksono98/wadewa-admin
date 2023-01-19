<!-- @format -->

<template>
   <div class="text-center text-white">
      <div class="fs-5 mb-4">WADEWA APP</div>
      <div class="d-flex flex-column gap-3 accordion accordion-flush" id="accordionFlushExample">
         <!-- Dashboard -->
         <router-link :to="{ name: 'dashboard' }" class="bg-white rounded-3 py-1 fs-5 text-decoration-none fw-bold">Dashboard</router-link>
         <!-- Services-->
         <div class="accordion-item rounded-3">
            <h2 class="accordion-header rounded-0" id="flush-headingOne">
               <button class="accordion-button collapsed rounded-3 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">Services</button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
               <div class="accordion-body">
                  <div class="d-flex flex-column mb-3" v-for="(service, i) in serviceList" :key="i">
                     <router-link
                        :to="{
                           name: service.to,
                        }"
                        class="text-primary service-list text-decoration-none"
                        >{{ service.name }}</router-link
                     >
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      data() {
         const serviceList = [
            {
               name: "News",
               to: "news.index",
            },
            {
               name: "Complaint",
               to: "complaint.index",
            },
            {
               name: "Latters",
               to: "letter.index",
            },
            {
               name: "Result",
               to: "complaintResult.index",
            },
         ];
         return {
            serviceList,
         };
      },
   };
</script>

<style>
   .service-list:hover {
      background-color: gainsboro;
      border-radius: 5px;
   }
</style>
