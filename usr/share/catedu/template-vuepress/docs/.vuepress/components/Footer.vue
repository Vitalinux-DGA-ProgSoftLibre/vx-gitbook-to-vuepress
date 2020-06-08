<template>
  <footer>
    <div v-if="footer != null" class="footer">{{ footer }}</div>
    <div v-if="footer == null" class="footer">
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
        <img
          alt="Licencia de Creative Commons"
          style="border-width:0"
          src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png"
        />
      </a>
      <br />
      <span>{{ book.title }}</span> por
      <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">
        <!-- {{ book.authors[0] }} y {{ book.authors[1] }} -->
        {{ autores }}
      </span>
      bajo licencia
      <br />
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
        Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0
        Internacional License
      </a>.
    </div>
  </footer>
</template>

<script>
// Componente llamado desde: docs/.vuepress/theme/layouts/Layout.vue
import book from "../../../docs/book.json";
export default {
  props: {
    texto: String
  },
  data() {
    return {
      book: book.variables
    };
  },
  computed: {
    footer() {
      // El texto del footer tiene la siguiente preferencia:
      // 1) Lo preferente es el texto introducido como "footer" en el frontmatter del md
      let footer = this.$page.frontmatter.footer
        ? this.$page.frontmatter.footer
        : null;
      // 2) El "texto" que recibe como parámetro el componente le sigue en preferencia
      let texto = this.texto;
      // 3) Si son null los anteriores se escribirá un texto por defecto
      return footer != null
        ? footer
        : texto != null && texto != ""
        ? texto
        : null;
    },
    autores() {
      // En book.js los autores se pueden especificar con author o authors, si son uno o varios
      let texto = "Equipo CATEDU";
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp
      let regex = /(.*),(.*)/i;
      // (.*),(.*) =>
      // expresión regular greedy (no reluctant) =>
      // por lo que coge hasta la última coma que encuentre el primer grupo
      // el segundo grupo es por tanto la última cadena o nombre a partir la última coma
      if (this.book.author) {
        texto = this.book.author;
      }
      if (this.book.authors) {
        console.log(this.book.authors.toString());
        this.book.authors.length > 1
          ? (texto = this.book.authors.join(", ").replace(regex, "$1 y$2"))
          : (texto = this.book.authors);
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
