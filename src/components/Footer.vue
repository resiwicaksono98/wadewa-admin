<!-- @format -->

<template>
   Footer
   <button @click="increment">Increment +</button>
   <button @click="decrement">Decrement -</button>
   <button @click="reset">Reset</button>
   <br />
   <button @click="incrementWithAction">Increment With Action</button>
   <button @click="decrementWithAction">Decrement With Action</button>
   <button @click="incrementByWithAction(5)">Increment BY With Action</button>
   <hr />
   <button @click="fetchPokemon('ditto')">Fetch Ditto</button>
   <button @click="resetPokemon">Reset Pokemon</button>
</template>

<script setup>
   import { useCounterStore } from "../store/counter";
   import { usePokemonStore } from "../store/pokemon";

   const pokemon = usePokemonStore();
   const counter = useCounterStore();
   const increment = () => {
      counter.$patch((state) => {
         state.count++;
      });
   };
   const decrement = () => {
      counter.$patch((state) => state.count--);
   };
   const reset = () => {
      counter.$reset();
   };
   const incrementWithAction = () => {
      counter.increment();
   };
   const decrementWithAction = () => {
      counter.decrement();
   };
   const incrementByWithAction = (amount) => {
      counter.incrementBy(amount);
   };
   const fetchPokemon = (name) => {
      pokemon.getPokemonDetails(name);
   };
   const resetPokemon = () => {
      pokemon.$reset();
   };
</script>
