<template>
  <v-app>
    <v-card color="grey lighten-4" height="75px">
      <v-toolbar height="75px" color="purple lighten-4">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <span>Videojuegos</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-combobox :items="platforms" v-model="platform"></v-combobox>
        <v-spacer></v-spacer>
        <v-combobox :items="critics" v-model="critic"></v-combobox>
        <v-spacer></v-spacer>

        <v-btn @click="send">Buscar</v-btn>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-text-field
              outline
              class="mx-4"
              prepend-icon="mdi-database-search"
              label="Search"
              v-model="busqueda"
              v-on="on"
            ></v-text-field>
          </template>
          <span>¡Ten en cuenta las mayúsculas!</span>
        </v-tooltip>
      </v-toolbar>
    </v-card>
    <v-content>
      <v-parallax
        height="400"
        src="https://stmed.net/sites/default/files/the-legend-of-zelda-hd-wallpapers-33780-5279992.jpg"
      >
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-thin mb-3">
            <span style="color: black">Descubre tu videojuego ideal</span>
          </h1>
        </v-layout>
      </v-parallax>
    </v-content>
    <v-navigation-drawer temporary absolute v-model="drawer" class="blue lighten-3">
      <v-btn color="indigo" dark @click="drawer = !drawer">Cerrar</v-btn>

      <v-divider></v-divider>

      <v-list dense class="pa-0">
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap fill-height>
          <v-flex v-for="(videogame, index) in videogames" v-bind:key="videogame.id">
            <v-card>
              <v-card-title>{{index + 1}}: {{videogame.name}}</v-card-title>
              <v-card-subtitle>
                Plataforma: {{videogame.platform}}
                <br />
                Año: {{videogame.year.low}}
              </v-card-subtitle>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      name: "home",
      busqueda: "",
      videogames: [],
      drawer: false,
      platform: "Cualquiera",
      critic: "Opinión de usuarios",
      items: [
        { title: "Inicio", icon: "mdi-home" },
        { title: "Sobre nosotros", icon: "mdi-information" }
      ],
      critics: ["Opinión de usuarios", "Opinión de Metacritic"],
      platforms: [
        "Cualquiera",
        "PC",
        "PlayStation",
        "PlayStation 2",
        "PlayStation 3",
        "PlayStation 4",
        "SNES",
        "GameBoy",
        "GameBoy Advance",
        "Nintendo 64",
        "Nintendo Wii",
        "Nintendo DS",
        "Nintendo 3DS",
        "Xbox 360"
      ]
    };
  },

  methods: {
    send: function() {
      var params = {
        platform: this.transform(this.platform),
        critic: this.transform(this.critic),
        busqueda: this.busqueda
      };
      this.$http.post("http://localhost:3000/getGames", params).then(
        response => {
          if (
            response.body &&
            response.body.length &&
            response.body[0].message != "Error"
          ) {
            this.videogames = response.body;
          } else {
            response.body = [
              {
                name:
                  "¡Ups! No se ha encontrado ningún videojuego que cumpla los parámetros",
                year: "--"
              }
            ];
            this.videogames = response.body;
          }
        },
        response => {
          alert("Ha habido un error en el envío: " + response.body);
        }
      );
    },
    transform: function(p) {
      if (p == "PlayStation") {
        return "PS";
      } else if (p == "PlayStation 2") {
        return "PS2";
      } else if (p == "PlayStation 3") {
        return "PS3";
      } else if (p == "PlayStation 4") {
        return "PS4";
      } else if (p == "GameBoy") {
        return "GB";
      } else if (p == "GameBoy Advance") {
        return "GBA";
      } else if (p == "Nintendo 64") {
        return "N64";
      } else if (p == "Nintendo Wii") {
        return "Wii";
      } else if (p == "Nintendo DS") {
        return "DS";
      } else if (p == "Nintendo 3DS") {
        return "3DS";
      } else if (p == "Xbox 360") {
        return "X360";
      } else if (p == "Opinión de usuarios") {
        return "user_score";
      } else if (p == "Opinión de Metacritic") {
        return "criticScore";
      } else {
        return p;
      }
    }
  }
};
</script>
