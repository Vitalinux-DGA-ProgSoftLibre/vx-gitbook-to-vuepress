# vx-gitbook-to-vuepress:

Este paquete proporciona los scripts necesarios para convertir un curso o documentación escrita en formato GitBook a formato Vuepress. En concreto, lleva a cado las siguientes acciones:

1. Crea un subdirectorio **docs** donde se almacenan todos los ficheros markdown, imágenes, pdfs, ... y demás archivos que componen la documentación del GitBook a convertir.
2. Crea un subdirectorio **docs/.vuepress** donde se almacenan todos los ficheros de configuración del tema de Vuepress: components, theme, layaut, css, etc.
3. Genera el archivo principal de configuración de vuepress **docs/.vuepress/config.js** a partir del **book.json** y **SUMMARY.md** de GitBook.

## Características a Destacar

### docs/enhanceApp.js

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

### Footer del sitio Web y FOOTER.md

El fichero **FOOTER.md** utilizado por gitbook mediante su plugin **localized-footer** es renombrado a **.FOOTER.md** para evitar problemas en la renderización HTML que se realiza al hacer el **npm run build**. El contenido de este archivo **FOOTER.md** será tenido en cuenta si se desea descomentando el parámetro **footer** del **themeConfig** en **docs/.vuepress/config.js**.

## Servir Vuepress a través de la Integración Continua de GitLab (GitLab CI)

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

## GitLab CI

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

## Building locally

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

## GitLab User or Group Pages

To use this project as your user/group website, you will need one additional
step: just rename your project to `namespace.gitlab.io`, where `namespace` is
your `username` or `groupname`. This can be done by navigating to your
project's **Settings**.

Read more about [user/group Pages][userpages] and [project Pages][projpages].

## Project name

You'll need to set the correct base in docs/.vuepress/config.js.

If you are deploying to https://<USERNAME or GROUP>.gitlab.io/, you can omit base as it defaults to "/".

If you are deploying to https://<USERNAME or GROUP>.gitlab.io/<REPO>/, (i.e. your repository is at https://gitlab.com/<USERNAME>/<REPO>), set base to "/<REPO>/".

## Did you fork this project?

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
