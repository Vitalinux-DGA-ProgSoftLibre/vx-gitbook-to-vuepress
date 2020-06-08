<template v-if="$site.themeConfig.pdf">
  <nav class="nav-links">
    <!-- <RouterLink :to="ruta" class="home-link">
      <span v-if="ruta" class="rutapdf"
        >{{ texto }} <FaCloudDownloadAlt
      /></span>
    </RouterLink>-->

    <a
      :href="ruta"
      class="nav-link external ruta"
      target="_blank"
      rel="alternate"
      @focusout="focusoutAction"
    >
      {{ texto }}
      <FaCloudDownloadAlt />
    </a>
  </nav>
</template>

<script>
// Componente llamado desde: docs/.vuepress/theme/components/Navbar.vue =>
// <DescargarBook texto="PDF" :ruta="$withBase($site.themeConfig.pdf)" />
import FaCloudDownloadAlt from "../components/Fa/CloudDownloadAlt";
export default {
  components: {
    FaCloudDownloadAlt,
  },
  data() {
    return {
      texto: "PDF",
    };
  },
  computed: {
    ruta() {
      return this.$withBase(this.$site.themeConfig.pdf);
    },
  },
  // props: {
  //   ruta: String,
  //   texto: String,
  // },
  methods: {
    focusoutAction() {
      this.$emit("focusout");
    },
  },
};
</script>

<style lang="stylus" scoped>
a:hover {
  color: $accentColor;
  // color: #f16b2f !important;
}

/* .ruta:hover {
  background-color: lightskyblue;
} */
.ruta {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
