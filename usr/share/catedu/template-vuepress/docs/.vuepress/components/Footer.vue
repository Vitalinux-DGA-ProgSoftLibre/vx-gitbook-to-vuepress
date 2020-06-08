<template>
  <footer>
    <div v-if="footer != null" class="footer">
      <span v-html="footer"></span>
    </div>
    <div v-if="footer == null" class="footer">
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
        <img
          alt="Licencia de Creative Commons"
          style="border-width:0"
          src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png"
        />
      </a>
      <br />
      <span>{{ titulo }}</span> por
      <span
        xmlns:cc="http://creativecommons.org/ns#"
        property="cc:attributionName"
      >{{ autores }}</span>
      bajo licencia
      <br />
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
        Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0
        Internacional License.
      </a>
    </div>
  </footer>
</template>

<script>
// Componente llamado desde: docs/.vuepress/theme/layouts/Layout.vue
// book.json ya esta definido como mixin en enhanceApp.js
// import book from "../../../docs/book.json";

export default {
  props: {
    texto: String
  },
  data() {
    return {
      // book: book.variables
    };
  },
  computed: {
    // book() {
    //   return book.variables ? book.variables : null;
    // },
    footer() {
      // El texto que aparecerá en el footer de la documentación tiene la siguiente preferencia:
      // 1) this.$page.frontmatter.footer: Texto introducido en "footer" del frontmatter del md
      // 2) this.texto: "texto" que recibe como parámetro el componente
      // 3) this.$site.themeConfig.footer: "footer" indicado en docs/.vuepress/config.js
      // 4) Si son null los anteriores se escribirá un template por defecto
      return this.$page.frontmatter.footer
        ? this.$page.frontmatter.footer
        : this.texto != null && this.texto != ""
        ? this.texto
        : this.$site.themeConfig.footer
        ? this.$site.themeConfig.footer
        : null;
    },
    titulo() {
      // this.title => esta formado por dos partes: titulo página actual | título general
      let titulo = this.$title.split("|")[1];
      return this.book.title ? this.book.title : titulo;
    },
    autores() {
      // Los autores se pueden rescatar con la siguiente prioridad:
      // 1) Lo más prioritario es lo especicifado en book.js
      // En book.js los autores se pueden especificar con author o authors, si son uno o varios
      // 2) Se puede especificar en themeConfig.authors dentro de docs/.vuepress/config.js
      // 3) Si no se encuentran autores en ninguno de los casos anteriores valdrá "Equipo CATEDU"
      let texto = "Equipo CATEDU";
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp
      let regex = /(.*),(.*)/i;
      // (.*),(.*) =>
      // expresión regular greedy (no reluctant) =>
      // por lo que coge hasta la última coma que encuentre el primer grupo
      // el segundo grupo es por tanto la última cadena o nombre a partir la última coma
      // Comprobamos el valor de themeConfig.authors:
      if (this.$site.themeConfig.authors) {
        this.$site.themeConfig.authors.length > 1
          ? (texto = this.$site.themeConfig.authors
              .join(", ")
              .replace(regex, "$1 y$2"))
          : (texto = this.$site.themeConfig.authors[0]);
      }
      // Comprobamos el contenido de book.json:
      if (this.book.author) {
        texto = this.book.author;
      }
      if (this.book.authors) {
        console.log(this.book.authors.toString());
        this.book.authors.length > 1
          ? (texto = this.book.authors.join(", ").replace(regex, "$1 y$2"))
          : (texto = this.book.authors[0]);
      }
      return texto;
    }
  }
};
</script>

<style lang="stylus" scoped>
.footer {
  padding: 2.5rem;
  border-top: 1px solid $borderColor;
  text-align: right;
  color: lighten($textColor, 25%);
}
</style>
