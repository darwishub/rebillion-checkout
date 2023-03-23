<template>
  <router-view></router-view>
</template>

<script setup>
import { useQuasar } from 'quasar'
import customIcons from "@/custom-icons/custom-icons"
const $q = useQuasar();
$q.iconSet.set(customIcons);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');
</style>

