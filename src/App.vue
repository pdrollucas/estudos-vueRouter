<template>
  <div id="app">
    <div class="container-fluid bg-light p-3 mb-3">
      <h1 class="display-4">Vue Router</h1>
      <p class="lead">Adicionando rotas a SPA no VUE</p>
    </div>

    <div class="container">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.25s ease-in-out;
}

/* .slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} */

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>