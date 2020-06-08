import VueTypedJs from 'vue-typed-js'
// Para poder incluir en un markdown file el contenido de otro markdown:
import {
    findPageForPath
} from '@app/util'
import book from "../book.json"

export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
}) => {
    Vue.mixin({
        data() {
            return {
                book: book.variables
            }
        },
        // getPageKey nos permitirá incluir en un markdown file el contenido de otro markdown:
        // En el markdown file habrá que incluir un componente de este tipo:
        // <Content :page-key="getPageKey($site.pages, '/path/to/my-other-markdown-file/')" />
        methods: {
            getPageKey(pages, path) {
                const result = findPageForPath(pages, path)
                return result.key
            }
        }
    })
    if (typeof process === 'undefined') { // process is undefined in a browser
        // https: //github.com/Orlandster/vue-typed-js     
        Vue.use(VueTypedJs)
    }
    // router.addRoutes([{
    //     path: "/nombre_ruta",
    //     component: NombreComponente
    // }])
}