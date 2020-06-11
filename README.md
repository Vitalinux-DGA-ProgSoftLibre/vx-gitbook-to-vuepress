# GitBook to Vuepress: vx-gitbook-to-vuepress

Este paquete DEB (Debian, Ubuntu y derivados) de software libre proporciona los scripts necesarios para convertir un curso o documentación escrita en formato GitBook a formato Vuepress.

---

This free software DEB package (Debian, Ubuntu and derivatives) provides the necessary scripts to convert a course or written documentation in GitBook format to Vuepress format.

## ¿Cómo Instalarlo? How to install it?

Para instalarlo debes descargar previamente el paquete DEB que encontrarás [aquí](http://migasfree.educa.aragon.es/repo/VX-18.04/STORES/base/). A continuación tienes un ejemplo de como hacerlo de forma automatizada, el cual puedes personalizar si lo deseas:

---

To install it you must previously download the DEB package that you will find [here](http://migasfree.educa.aragon.es/repo/VX-18.04/STORES/base/). Here is an example of how to do it in an automated way, which you can customize if you wish:

```bash
PAQUETE="vx-gitbook-to-vuepress_1.0-2_all.deb"
DESTINO="~/Descargas"
URL="http://migasfree.educa.aragon.es/repo/VX-18.04/STORES/base/${PAQUETE}"
wget "${URL}" -P "${DESTINO}"
sudo apt install "${DESTINO}/${PAQUETE}"
```

## ¿Como usarlo? How to use it? Usage Examples

El script **vx-gitbook-to-vuepress** nos va a permitir transformar nuestra documentación en formato GitBook a formato Vuepress. En función de los parámetros que se le pasan al script nos permite hacer lo siguiente:

1. **'--url'**: Puedes pasar como parámetros la URL o URLs de los repositorio de GitLab, GitHub, ... donde se localizan los GitBooks a convertir a formato Vuepress.
2. **'--dir'**: Puedes pasar como parámetro la ruta de un directorio del sistema cuyto contenido se corresponde con el de un GitBook que quieres pasar a formato Vuepress. El script generará en junto a directorio que se indique otro con el mismo nombre precedido de 'vuepress-<nombre_dir_indicado>' donde se localizará toda la documentación Vuepress resultante.
3. **'--all-github-cursos-catedu'**: Útil para el caso particular de los cursos GitBook de CATEDU. El script se encargará de rastrear todos los repositorios públicos de CATEDU para averiguar cuales son correspondientes a GitBook y pasarlos a formato Vuepress.
4. Opcionalmente, se puede indicar como primer parámetro **'--npm-install-build'**. Esto hará que tras la conversión de GitBook a Vuepress se instalarán todos los paquetes npm necesarios y se construirá la aplicación final para producción bajo un subdirectorio llamado 'public'.

---

The script **vx-gitbook-to-vuepress** will allow us to transform our documentation from GitBook format to Vuepress format. Depending on the parameters that are passed to the script, it allows us to do the following:

1. **'--url'**: You can pass as parameters the URL or URLs of the GitLab repository, GitHub, ... where the GitBooks to convert to Vuepress format are located.
2. **'--dir'**: You can pass as a parameter the path of a system directory whose content corresponds to that of a GitBook that you want to convert to Vuepress format. The script will generate next to a directory that indicates another with the same name preceded by 'vuepress- <indicated_dir_name>' where all the resulting Vuepress documentation will be located.
3. **'--all-github-courses-catedu'**: Useful for the particular case of CATEDU GitBook courses. The script will take care of tracing all the public CATEDU repositories to find out which ones correspond to GitBook and transfer them to Vuepress format.
4. Optionally, it can be indicated as the first parameter **'--npm-install-build'**. This will mean that after the conversion from GitBook to Vuepress all the necessary npm packages will be installed and the final application for production will be built under a subdirectory called 'public'.

---

Ejemplos de uso (Usage examples):

```bash
vx-gitbook-to-vuepress --url \
  https://github.com/catedu/curso-moodle \
  https://github.com/catedu/curso_de_edmodo ...
vx-gitbook-to-vuepress --all-github-cursos-catedu
vx-gitbook-to-vuepress --dir '/home/usuario/Descargas/curso-moodle'
vx-gitbook-to-vuepress --dir '~/Documentos/curso-vitalinux'
vx-gitbook-to-vuepress --npm-install-build --url https://github.com/catedu/curso-moodle
vx-gitbook-to-vuepress --npm-install-build --all-github-cursos-catedu
```

## ¿Qué hace en concreto? What does it do specifically?

A continuación trataré de explicar paso a paso cual es la magia del script **vx-gitbook-to-vuepress**, poniendo como ejemplo el caso de indicar la url de un repositorio de Git donde se localiza una documentación en formato Vuepress. En concreto, ¿qué sucede cuando ejecuto el comando **vx-gitbook-to-vuepress --npm-install-build --url https://github.com/catedu/curso-de-tutores.git**?

1. En primer lugar se comprueba si la URL indicada existe y si se corresponde con la de un repostiorio de GitBook. La comprobación se basa en comprobar que en la base de dicho repositorio se localizar los archivos básicos **SUMMARY.md** y **book.json**, necesarios para poder generar el fichero de configuración de vuepress **docs/.vuepress/config.js**.
2. En caso de que el paso anterior sea afirmativo, se crea un directorio con el mismo nombre que el repositorio (p.e. **_curso-de-tutores_**) y una subcarpeta llamada **docs** (p.e. **_curso-de-tutores/docs_**) que es donde se clonará el contenido del repositorio GitBook.
3. A continuación se sincroniza dentro del directorio creado en el paso anterior la plantilla de Vuepress creada a medida, localizada en **/usr/share/catedu/template-vuepress**. Destacar que dentro del subdirectorio **docs/.vuepress** se almacenan todos los ficheros de configuración del tema de Vuepress: components, theme, layaut, css, etc.
4. Genera el archivo principal de configuración de vuepress **docs/.vuepress/config.js** a partir del **book.json** y **SUMMARY.md** de GitBook.
5. Genera un PDF de toda la documentación mediante la ayuda de **grip** y **pandoc** a partir del **SUMMARY.md** del GitBook, basandose en una plantilla de latex.
6. Por último, si se ha añadido la opción **--npm-install-build** se instalan dentro del repositorio Vuepress creado todas las dependencias npm necesarias y se construirá el sitio Web resultante dentro de un subdirectorio llamado **public** (p.e. **_curso-de-tutores/public_**). Este último paso no será necesario si se ha configurado una integración continua a través de Gitlab o Github.

## Características a Destacar

### Conversión a PDF y PDF Descargable

Vuepress no incluye por defecto la posibilidad de transformar la documentación en un PDF con la opción de descarga. Para suplir esta carencia se ha personalizado el tema que viene por defecto en Vuepress (**_npm run eject_**) incorporando un nuevo componente: **docs/.vuepress/components/DescargarBook.vue**.

El PDF de descarga se localizará en la carpeta **docs/.vuepress/public/pdfs** y deberá indicarse en el fichero **docs/.vuepress/config.js** a través del parámtero **pdf** del tema: **this.\$site.themeConfig.pdf**.

```js
module.exports = {
  title: TITULO,
  description: "Documentación creada con Vuepress: markdown, Js & Vue",
  base: BASE,
  dest: "public",
  port: 8000,
  themeConfig: {
    authors: ["Equipo Técnico Vitalinux"],
    pdf: "pdfs/vx-gitbook-to-vuepress.pdf",
    footer: "Mi footer personalizado ...",
    ...
  }
}
```

El contenido del componente Vue, para mejor comprensión de lo anterior es el siguiente:

```js
<template v-if="$site.themeConfig.pdf">
  <nav class="nav-links">
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
.ruta {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
```

En concreto, este componente se ha incorporado el la barra de navegación superior, como un elemento más, por lo que ha tenido que ser necesario personalizar el navbar por defecto de Vuepress **docs/.vuepress/theme/components/Navbar.vue**.

```js{3}
...
      <NavLinks class="can-hide" />
      <DescargarBook />
    </div>
  </header>
</template>
```

### Personalización del Footer del sitio Web y FOOTER.md

Vuepress no incluye por defecto un footer por su layout. Para suplir esta carencia se ha personalizado el tema que viene por defecto en Vuepress (**_npm run eject_**) incorporando un nuevo componente: **docs/.vuepress/components/Footer.vue**. Este componente permite definir un footer de varias maneras:

1. **this.\$page.frontmatter.footer**: Texto introducido en "footer" del frontmatter del fichero markdown.

```md
---
tags:
  - escritura
  - cuando vayas a escribir
  - ten en cuenta
lang: es-ES
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
footer: MIT Licensed | Copyright © 2020 Arturo Martín
---

# Indice de contenidos markdown ...

Este es mi contenido ...
```

2. **this.texto**: "texto" que recibe como parámetro el componente. Es un texto que se puede indicar al insertar el componente en **Layout.vue**.
3. **this.\$site.themeConfig.footer**: "footer" indicado en **docs/.vuepress/config.js**, dentro de los parametros del theme.

```js
module.exports = {
  title: TITULO,
  description: "Documentación creada con Vuepress: markdown, Js & Vue",
  base: BASE,
  dest: "public",
  port: 8000,
  themeConfig: {
    authors: ["Equipo Técnico Vitalinux"],
    pdf: "pdfs/vx-gitbook-to-vuepress.pdf",
    footer: "MIT Licensed | Copyright © 2020 Arturo Martín",
    ...
  }
}
```

4. Si son null los anteriores se escribirá un template por defecto.

El contenido completo del componente que nos ayudará a comprender todo lo anterior es el siguiente:

```js
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
```

Como ya se ha indicado previamente, para que el componente anterior sea funcional se ha modifado el **docs/.vuepress/theme/layouts/Layout.vue**:

```js
<template>
...
    </Page>
    <Footer :texto="null" />
  </div>
</template>
```

Destacar que el fichero **FOOTER.md** utilizado por gitbook mediante su plugin **localized-footer** es renombrado a **.FOOTER.md** para evitar problemas en la renderización HTML que se realiza al hacer el **npm run build**. El contenido de este archivo **FOOTER.md** será tenido en cuenta si se desea descomentando el parámetro **footer** del **themeConfig** en **docs/.vuepress/config.js**.

### Configuraciones mediante docs/enhanceApp.js

Este fichero nos permite aplicar configuraciones que tendrán repercusiones a nivel global:

1. Nos permite declarar **Mixins** con la finalidad de poder reutilizar variables o metodos que puedan ser reconocidos y utilizados en cualquier componente Vue o insertado dentro del texto markdown que cualquier fichero.
2. Nos permite declarar nuevas rutas del **router** asociadas a componentes que queramos crear.
3. Nos permite declarar componentes, plugins o funcionalidades que hayan sido instaladas vía npm que pueden ser reutilizados a posteriori desde cualquier otro componente o desde el propio texto markdown sin necesidad de su declaración.

```js
import VueTypedJs from "vue-typed-js";
// Para poder incluir en un markdown file el contenido de otro markdown:
import { findPageForPath } from "@app/util";
import book from "../book.json";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  // Para poder incluir en un markdown file el contenido de otro markdown:
  // En el markdown file habrá que incluir un componente de este tipo:
  // <Content :page-key="getPageKey($site.pages, '/path/to/my-other-markdown-file/')" />
  Vue.mixin({
    data() {
      return {
        book: book.variables,
      };
    },
    methods: {
      getPageKey(pages, path) {
        const result = findPageForPath(pages, path);
        return result.key;
      },
    },
  });
  if (typeof process === "undefined") {
    // process is undefined in a browser
    // https: //github.com/Orlandster/vue-typed-js
    Vue.use(VueTypedJs);
  }
  // router.addRoutes([{
  //     path: "/nombre_ruta",
  //     component: NombreComponente
  // }])
};
```

## Servir Vuepress a través de la Integración Continua de GitLab (GitLab CI)

Es la opción más recomendada. A continuación muestro la documentación necesaria:

![Build Status](https://gitlab.com/pages/vuepress/badges/master/build.svg)

---

Ejemplo de uso de [VuePress][project] website usando GitLab Pages.

Learn more about GitLab Pages at https://about.gitlab.com/product/pages and the official
documentation https://docs.gitlab.com/ee/user/project/pages/.

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [](#)
  - [GitLab CI](#gitlab-ci)
  - [Building locally](#building-locally)
  - [GitLab User or Group Pages](#gitlab-user-or-group-pages)
  - [Project name](#project-name)
  - [Did you fork this project?](#did-you-fork-this-project)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### GitLab CI

This project's static Pages are built by [GitLab CI][ci], following the steps
defined in [`.gitlab-ci.yml`](.gitlab-ci.yml):

```
image: node:13.12.0

pages:
  cache:
    paths:
    - node_modules/

  script:
  - yarn install
  - yarn build

  artifacts:
    paths:
    - public

  only:
  - master

```

This sets up a `node9.11.1` environment, then uses `yarn install` to install dependencies and `yarn build` to build out the website to the `./public` directory.
It also caches the `node_modules` directory to speed up subsequent builds.

### Building locally

This project uses [yarn](https://yarnpkg.com), you'll need to install this globally before you can get started.

```
npm install -g yarn
```

Then you need to install the project dependencies:

```
yarn install
```

Now you're ready to go.
To run the local dev server just use the following command:

```
yarn start
```

Your website should be available at [http://localhost:8080/vuepress]

_Read more at VuePress' [documentation][]._

### GitLab User or Group Pages

To use this project as your user/group website, you will need one additional
step: just rename your project to `namespace.gitlab.io`, where `namespace` is
your `username` or `groupname`. This can be done by navigating to your
project's **Settings**.

Read more about [user/group Pages][userpages] and [project Pages][projpages].

### Project name

You'll need to set the correct base in docs/.vuepress/config.js.

If you are deploying to https://<USERNAME or GROUP>.gitlab.io/, you can omit base as it defaults to "/".

If you are deploying to https://<USERNAME or GROUP>.gitlab.io/<REPO>/, (i.e. your repository is at https://gitlab.com/<USERNAME>/<REPO>), set base to "/<REPO>/".

### Did you fork this project?

If you forked this project for your own use, please go to your project's
**Settings** and remove the forking relationship, which won't be necessary
unless you want to contribute back to the upstream project.

[ci]: https://about.gitlab.com/gitlab-ci/
[project]: https://vuepress.vuejs.org/
[install]: https://vuepress.vuejs.org/guide/getting-started.html
[documentation]: https://vuepress.vuejs.org/guide/
[userpages]: https://docs.gitlab.com/ce/user/project/pages/introduction.html#user-or-group-pages
[projpages]: https://docs.gitlab.com/ce/user/project/pages/introduction.html#project-pages

---

Forked from @samdbeckham
