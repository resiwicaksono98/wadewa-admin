/** @format */

import { defineStore } from "pinia";
import { httpRequest } from "../utils/axiosInstance";

export const useAuthStore = defineStore({
   id: "auth",
   state: () => ({
      user: null,
      isloading: false,
      isSuccess: false,
      isError: null,
   }),
   getters: {
      getUser: (state) => state.user,
   },
   actions: {
      async loginAdmin(user) {
         await httpRequest
            .post(`/admin/auth/login`, {
               email: user.email,
               password: user.password,
            })
            .then((res) => {
               this.user = res.data.data;
            })
            .catch((err) => {
               this.isError = err.response.data.msg;
            });
      },
      async me() {
         await httpRequest
            .get(`/admin/auth/me`)
            .then((res) => {
               this.user = res.data;
            })
            .catch((err) => {
               (this.user = null), (this.isError = true);
            });
      },
   },
});
