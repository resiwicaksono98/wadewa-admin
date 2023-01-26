<!-- @format -->

<template>
   <div class="container my-5">
      <div class="row justify-content-center">
         <div>
            <router-link :to="{ name: 'complaint.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">Back</router-link>
            <div class="card rounded shadow">
               <div class="card-header">Complaint Respon</div>
               <div class="card-body">
                  <form @submit.prevent="update()">
                     <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="complaintResult.status">
                           <option selected value="">Open this select menu</option>
                           <option v-for="(stat, i) in status" :key="i" :value="stat.value">
                              {{ stat.value }}
                           </option>
                        </select>
                        <label for="floatingSelect">Complaint Status</label>
                     </div>
                     <div class="mb-3">
                        <label for="" class="form-label">Message</label>
                        <textarea name="" class="form-control" v-model="complaintResult.message"></textarea>
                        <div class="text-danger">{{ validation.message }}</div>
                     </div>
                     <button type="button" :disabled="complaintResult.status === 'success' ? false : true" class="btn btn-outline-primary mb-3" @click="createPdf">Generate Files</button>
                     <div class="mb-3" :hidden="!complaintResult.files ? true : false">
                        <a :href="'http://localhost:5000/' + complaintResult.files" target="_blank">LINK SURAT</a>
                     </div>
                     <div>
                        <button type="submit" class="btn btn-outline-primary">Submit</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import { reactive, ref, onMounted, onBeforeMount } from "vue";
   import { useRouter, useRoute } from "vue-router";
   import { httpRequest } from "../../utils/axiosInstance";
   import pdfMake from "pdfmake/build/pdfmake";
   import pdfFonts from "pdfmake/build/vfs_fonts";
   pdfMake.vfs = pdfFonts.pdfMake.vfs;

   export default {
      methods: {
         onFileChange(e) {
            this.complaintResult.files = e.target.files[0];
         },
         createPdf() {
            const docDefinition = {
               content: [
                  {
                     stack: ["PEMERINTAH PROVINSI JAWA TENGAH", "KETUA RT.04 RW.07 DESA KWASEN", ["KECAMATAN KESESI-KABUPATEN PEKALONGAN"], { text: "________________________________________________________________________________", style: "subheader" }],

                     style: "header",
                  },
                  {
                     stack: [`${this.letters.name}`, "________________________________", `No. ${this.letters.number}/sekrt-RT/II/2023`],
                     style: "header",
                  },
                  {
                     text: ["Yang bertanda tangan di bawah ini Ketuan RT02 RW07 Desa Kwasen Kecamatan Kesesi ", "kabupaten Pekalongan Jawa tengah dengan ini menyatakan bahwa:\n"],
                  },
                  {
                     text: `Nama Lengkap: ${this.citizen.name}\n NIK:${this.citizen.nik}\nStatus Perkawinan:${this.citizen.status}\nWarga Negara:Indonesia`,

                     margin: [20, 20],
                  },

                  {
                     stack: [`Orang tersebut diatas, adalah benar-benar warga kami dan berdomisili di RT.04\n RW.07 DESA Kwasen Kecamatan Kesesi Kabupaten Pekalongan Jawa Tengah.\nSurat keterangan ini dibuat sebagai kelengkapan pengurus ${this.letters.name}", "Demikian Surat keterangan ini kami buat\, untuk dapat dipergunakan sebagaimana mestinya.\n`],
                     margin: [10, 20, 10, 10],
                     alignment: "justify",
                  },
                  {
                     text: "Jakarta, 20 Januari 2023\n Kepala Desa Kwasen",
                     margin: [300, 20, 0, 50],
                     aligment: "right",
                  },
                  {
                     text: `${this.letters.village_head}`,
                     margin: [340, 20, 0, 50],
                     aligment: "right",
                  },
               ],
               styles: {
                  header: {
                     fontSize: 18,
                     bold: true,
                     alignment: "center",
                     margin: [0, 0, 0, 80],
                  },
                  subheader: {
                     fontSize: 14,
                  },
               },
            };
            pdfMake.createPdf(docDefinition).getBlob((dataURL) => {
               this.complaintResult.files = new File([dataURL], `test.pdf`, {});
               alert("Letter Generate Successfully");
            });
         },
      },
      setup() {
         // Data binding
         let complaintResult = reactive({
            status: "",
            message: "",
            files: "",
         });

         const letters = reactive({
            name: "",
            number: "",
            village_head: "",
         });

         const citizen = reactive({
            name: "",
            nik: "",
            status: "",
         });

         const status = reactive([{ value: "pending" }, { value: "success" }, { value: "rejected" }]);

         const validation = ref([]);

         const router = useRouter();
         const route = useRoute();

         onBeforeMount(async () => {
            await httpRequest
               .get(`/admin/complaintResult/${route.params.id}`)
               .then((res) => {
                  citizen.name = res.data.data.citizen.name;
                  citizen.nik = res.data.data.citizen.nik;
                  citizen.status = res.data.data.citizen.status;
                  letters.name = res.data.data.letter.title;
                  letters.number = res.data.data.letter.letter_number;
                  letters.village_head = res.data.data.letter.village_head;
                  complaintResult.status = res.data.data.status;
                  complaintResult.message = res.data.data.message;
                  complaintResult.files = res.data.data.files;
               })
               .catch((err) => console.log(err));
         });

         async function update() {
            await httpRequest
               .put(`/admin/complaintResult/${route.params.id}`, complaintResult, {
                  headers: {
                     "Content-Type": "multipart/form-data",
                  },
               })
               .then((res) => {
                  router.push({
                     name: "complaint.index",
                  });
               })
               .catch((err) => {
                  validation.value = err.response.data;
               });
         }
         return {
            status,
            complaintResult,
            letters,
            validation,
            router,
            update,
            citizen,
         };
      },
   };
</script>
