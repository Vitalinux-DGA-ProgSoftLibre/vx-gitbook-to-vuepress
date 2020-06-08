<template>
  <div>
    <!-- https://github.com/Orlandster/vue-typed-js -->
    <vue-typed-js :strings="items" :loop="loop" :showCursor="showcursor">
      <span class="typing"></span>
    </vue-typed-js>
  </div>
</template>

<script>
// No se necesita importar "vue-typed-js" al incluirlo en docs/.vuepress/enhanceApp.js
// Para usarlo en Markdown: Los más guapos son <TextoAnimado :items="['arturo','aitor']"/>
export default {
  props: {
    items: Array,
    repetir: Boolean,
    mostrarcursor: Boolean,
    caractercursor: String,
  },
  computed: {
    loop() {
      return this.repetir ? this.repetir : true;
    },
    showcursor() {
      return this.mostrarcursor ? this.mostrarcursor : true;
    },
  },
  data() {
    return {
      //   items: [
      //     "Ealing",
      //     "Kilmarnock"
      //   ]
    };
  },
};
</script>

<style lang="stylus" scoped>
div {
  display: inline;
}
</style>
