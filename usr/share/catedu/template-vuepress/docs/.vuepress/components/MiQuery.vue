<template>
  <div>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Nombre Centro</label>
        <input
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Introduce el nombre de tu centro"
          v-model="nombre"
        />
        <small class="form-text text-muted">Indica las palabras clave del repo a buscar.</small>
      </div>
    </form>
    <div
      v-for="repositorio in reposFiltrados"
      :key="repositorio.id"
    >{{ repositorio.id }} {{repositorio.name}}</div>
    <div v-if="mostrarInfoCentro">centro: {{contenido.data.centro}}</div>
  </div>
</template>

<script>
import axios from "axios";
import env from "../myfiles/env";
export default {
  name: "MiQuery",
  //   created() {},
  created: async function() {
    let respuesta = await axios.get(`${env.projectsgitlab}`);
    console.log(respuesta);
    let filtro = "vx-dga-l-conf-centro-";
    this.lista_repos = respuesta.data
      .filter(repo => repo.name.includes(filtro))
      .map(repo => {
        return {
          id: `${repo.id}`,
          name: `${repo.name}`
        };
      });
    //   Para obtener información de un fichero de un repositorio público:
    // https://gitlab.vitalinux.educa.aragon.es/api/v4/projects/103/repository/files/README.md?ref=master
    // En formato raw sin encodig base64 (legible):
    // https://gitlab.vitalinux.educa.aragon.es/api/v4/projects/103/repository/files/README.md/raw?ref=master
    // https://gitlab.vitalinux.educa.aragon.es/api/v4/projects/103/repository/files/usr%2Fshare%2Fvitalinux%2Fconf-centro%2Fvx-centro.conf.json/raw?ref=master
    console.log(this.lista_repos);
  },
  data() {
    return {
      nombre: "",
      lista_repos: [],
      contenido: Object,
      preparado: false
    };
  },
  computed: {
    reposFiltrados() {
      return this.lista_repos.filter(repo => repo.name.includes(this.nombre));
    },
    nReposFiltradosIs1() {
      return this.reposFiltrados.length === 1 ? true : false;
    },
    mostrarInfoCentro() {
      return this.nReposFiltradosIs1 && this.preparado ? true : false;
    }
  },
  methods: {
    async consultarInfoCentro() {
      let idrepo = this.reposFiltrados[0].id;
      let consulta = `${env.projectsgitlab}/${idrepo}/${env.rutajson}`;
      this.contenido = await axios.get(consulta);
      this.preparado = true;
      console.log(`La consulta ha sido ${consulta} y su respuesta:`);
      console.log(this.contenido.data);
      console.log(this.contenido.data.centro);
    }
  },
  watch: {
    nReposFiltradosIs1(New, Old) {
      if (New) {
        this.consultarInfoCentro();
      } else {
        this.preparado = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>