<!-- @format -->

<template>
   <h2>Header</h2>
   <pre>User : {{ getUser }}</pre>
   <pre>State : {{ counter }}</pre>
   <pre>Getters :{{ getCount }}</pre>
   <pre>Getters Double :{{ doubleCount }}</pre>
   <pre>Getters DividedBy :{{ dividedBy }}</pre>
   <pre>Pokemon : {{ pokemon }}</pre>
</template>
<script setup>
   import { computed } from "vue";
   import { useAuthStore } from "../store/auth";
   import { useCounterStore } from "../store/counter";
   import { usePokemonStore } from "../store/pokemon";

   const counterStore = useCounterStore();
   const pokemonStore = usePokemonStore();
   const authStore = useAuthStore();
   const counter = computed(() => counterStore.count);

   const getCount = computed(() => counterStore.getCount);
   const doubleCount = computed(() => counterStore.doubleCount);
   const dividedBy = computed(() => counterStore.divideBy(2));
   const pokemon = computed(() => pokemonStore.pokemonDetails);
   const getUser = computed(() => authStore.getUser);

   counterStore.$subscribe((mutation, state) => {
      console.log(mutation, state);
   });
</script>
