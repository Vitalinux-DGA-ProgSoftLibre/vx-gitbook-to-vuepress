<template>
  <div>
    <!-- <h1>Este es mi componente 1</h1> -->
    <!-- Dentro de un componente de Vue podemos reutilizar un Web Component genérico -->
    Busqueda de países:
    <input type="text" class="js-trigger form-control" v-model="keyword" />
    <web-countries-finder :keyword="keyword" class="js-target-coutries"></web-countries-finder>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "spa"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>