const path = require("path");
const fs = require('fs');

// En el caso de haber un docs/FOOTER.md lo leemos y lo asignamos a "footer":
// Debe usarse funciones sincronas ya que la compilación no se detiene a esperar resultados asincronos
let footer = "Pie de por defecto ..."
// Para averiguar el path de FOOTER.md debemos usar "path"
// proccess.env.PWD nos devuelve la ruta desde donde se lanzo el proceso de compilación Vuepress
// __dirname => /.../docs/.vuepress
let ruta_footer = path.resolve(__dirname, '../.FOOTER.md')
if (fs.existsSync(ruta_footer)) {
  footer = fs.readFileSync(ruta_footer, 'utf8')
}

module.exports = {
  title: TITULO,
  description: "Documentación creada con Vuepress: markdown, Js & Vue",
  base: BASE,
  dest: "public",
  port: 8000,
  themeConfig: {
    authors: "Equipo Técnico Vitalinux",
    pdf: "pdfs/Curso_de_Tutores_Noveles.pdf",
    // footer: footer,
    logo: "/logos/open-book-catedu.png",
    searchPlaceholder: "Buscar",
    lastUpdated: "Última Actualización",
    docsRepo: DOCSREPO,
    repoLabel: "Contribuye",
    docsBranch: "master",
    docsDir: "docs",
    repo: GITREPO,
    editLinks: false,
    editLinkText: "Editar esta página en Github",
    // Barra de navegación superior:
    nav: [{
        text: "Inicio",
        link: "/",
      },
      {
        text: "Enlaces",
        items: [{
            text: "Soporte",
            link: "https://soporte.vitalinux.educa.aragon.es",
          },
          {
            text: "GitHub",
            link: "https://github.com/catedu",
          },
          {
            text: "Migasfree",
            link: "https://migasfree.educa.aragon.es",
          },
          {
            text: "CATEDU",
            link: "https://web.catedu.es/webcatedu/",
          },
        ],
      },
    ],
    // Barra de navegación de contenidos lateral:
    sidebar: SIDEBAR,
  },
  head: [
    // Icono de la pestaña del navegador:
    [
      "link",
      {
        rel: "icon",
        href: `/logos/open-book-32px.png`,
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet/dist/leaflet.css",
      },
    ],
  ],
  plugins: [
    "@vuepress/back-to-top",
    ["vuepress-plugin-code-copy", true],
    // ["vuepress-plugin-export"],
  ],
  configureWebpack: {
    resolve: {
      // Para usar los alias: ~@alias/<fichero dentro de ../alias>
      alias: ALIASWEBPACK,
    },
  },
  chainWebpack: (config) => {
    // Each loader in the chain applies transformations to the processed resource:
    // config.module
    //   .rule("md")
    //   .exclude
    //   .add(/FOOTER.md/)
    //   .end()
    config.module
      .rule("md")
      .test(/\.md$/)
      // npm install --save-dev string-replace-loader
      .use("string-replace-loader")
      .loader("string-replace-loader")
      .options({
        multiple: [{
            search: "---(.*?)---",
            replace: (match, p1, offset, string, groups) =>
              `<span style="color: green;">${p1.toUpperCase()}</span>`,
            // replace: '<span class="color: green;">$1</span>',
            flags: "ig",
          },
          {
            search: "---color--(.+?)--((\n|.)+?)---color",
            replace: (match, p1, p2, offset, string) =>
              `<div style="background-color: orange;">Imagen: ${p1}<br> <span style="color: green;">${p2.toUpperCase()}</span></div>`,
            // replace: '<span class="color: green;">$1</span>',
            flags: "ig",
          },
        ],
      })
      .end();
  },
};