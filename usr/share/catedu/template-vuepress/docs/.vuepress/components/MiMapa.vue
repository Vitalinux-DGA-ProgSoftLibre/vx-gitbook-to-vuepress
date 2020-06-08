<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center col-10" style="height: 400px">
        <p
          class="my-2 font-titulo text-info"
        >Centros Vitalinux en la Comunidad de Aragón: {{ nmarcas}}</p>
        <!-- <template v-show="mostrarMapa"> -->
        <!-- Info componentes Vue2Leaflet y su uso: https://vue2-leaflet.netlify.com/components/ -->
        <l-map :zoom="7" :center="startLocation" style="height: 100%; width: 100%" @ready="Aviso">
          <l-tile-layer :url="url"></l-tile-layer>
          <!-- Formato lat-lng: https://leafletjs.com/reference-1.4.0.html#latlng -->
          <l-marker
            v-for="(marca,index) in marcas"
            :key="index"
            :lat-lng="[ marca.lat, marca.lng ] "
          >
            <l-popup>{{ marca.name }}</l-popup>
            <l-tooltip>{{ marca.name }}</l-tooltip>
          </l-marker>
          <l-polygon :lat-lngs="polygon.latlngs" :color="polygon.color"></l-polygon>
          <!-- <LPolygon :lat-lngs="latlongFiltrados" :color="polygon.color"></LPolygon> -->
        </l-map>
        <!-- </template> -->
        <div v-show="!mostrarMapa">Cargando Mapa ...</div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="text-center col-10" style="height: 40px"></div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LPolygon,
  LPopup
} from "vue2-leaflet";
import env from "../myfiles/env";
export default {
  name: "MiMapa",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPolygon,
    LPopup
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      startLocation: {
        // lat: 41.656148,
        lat: 41.4,
        lng: -0.88245
      },
      mostrarMapa: false,
      mensajepreviomostrarmapa: "Se esta cargando el Mapa ...",
      marcas: env.marcas,
      polygon: env.polygon
    };
  },
  methods: {
    Aviso() {
      this.mostrarMapa = true;
      console.log(
        "Se ha cargado ya el mapa ... El valor de mostrar Mapa es: " +
          this.mostrarMapa
      );
    }
  },
  computed: {
    latlongFiltrados() {
      env.polygon.latlngs.filter((elemento, index) => index % 2 == 0);
    },
    nmarcas() {
      return this.marcas.length;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>