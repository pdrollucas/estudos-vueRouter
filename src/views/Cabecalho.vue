<template>
    <div class="mb-4">
      <router-link to="/home" class="btn btn-primary me-2" exact>Home</router-link>
      <router-link to="/contatos" class="btn btn-primary">Contatos</router-link>
      <button class="btn btn-secondary float-end" @click="$router.back()">Voltar</button>
    </div>
</template>