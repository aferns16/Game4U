<template>
  <v-app style="background: grey">
    <v-card color="indigo lighten-2" height="60px">
      <v-toolbar dark height="60px" color="black">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title id="game">
          <span style="font-size: 20pt; font-family: 'Helvetica'; ">GAME4U</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-content>
      <v-carousel
        cycle
        height="500"
        hide-delimiter-background
        show-arrows-on-hover
        align="center"
        justify="center"
      >
        <v-carousel-item
          v-for="(slide, i) in this.slides"
          :key="i"
          :src="slide.src"
          :position="slide.position"
        >
          <v-row class="fill-height" align="center" justify="center">
            <div :class="slide.class">{{ slide.text }}</div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <v-card color="grey lighten-4" height="100px">
        <v-toolbar height="100px" color="grey darken-4" dark>
          <v-toolbar-title>
            Plataforma:
            <v-combobox :items="platforms" v-model="platform" outlined dense rounded></v-combobox>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Ordenar por:
            <v-combobox :items="critics" v-model="critic" outlined dense rounded></v-combobox>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Género:
            <v-combobox :items="genres" v-model="genre" outlined dense rounded></v-combobox>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Top:
            <v-combobox :items="limits" v-model="limit" outlined dense rounded></v-combobox>
          </v-toolbar-title>
        </v-toolbar>
      </v-card>
      <v-card color="grey lighten-4" height="100px">
        <v-toolbar height="100px" color="grey darken-4" dark>
          <v-toolbar-title>
            Búsqueda por nombre:
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-text-field
                  clearable
                  rounded
                  outlined
                  dense
                  label="Search"
                  v-model="busqueda"
                  v-on="on"
                ></v-text-field>
              </template>
              <span>¡Ten en cuenta las mayúsculas!</span>
            </v-tooltip>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-checkbox label="Más modernos primero" v-model="modern"></v-checkbox>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn @click="send" color="grey darken-1">Buscar</v-btn>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn @click="recommend" color="grey darken-1">¡Recomiéndame algo!</v-btn>
        </v-toolbar>
      </v-card>
    </v-content>

    <v-content>
      <v-container grid-list-md text-xs-center fluid pa-12>
        <v-layout row wrap fill-height fill-width>
          <v-flex v-for="(videogame, index) in videogames" v-bind:key="videogame.id">
            <v-card
              elevation="18"
              style="background: #3A1C71;
    background: -webkit-linear-gradient(to right, #A195C9, #DADADA, white);
    background: linear-gradient(to right,  #A195C9, #DADADA, white);"
            >
              <v-card-title>{{index + 1}}: {{videogame.name}}</v-card-title>
              <v-card-subtitle>
                Plataforma: {{videogame.platform}}
                <br />
                Año: {{videogame.year.low}}
                <br />
                Ventas globales: {{videogame.global_sales}}M
              </v-card-subtitle>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-navigation-drawer temporary absolute v-model="drawer" class="grey darken-4" dark>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon large>mdi-menu</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Menú</v-list-item-title>

        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense class="pa-0" flat>
        <v-list-item-group>
          <v-list-item v-for="item in items" :key="item.title" :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
      genre: "Cualquiera",
      platform: "Cualquiera",
      critic: "Opinión de usuarios",
      limit: "Top 10",
      modern: false,
      slides: [
        {
          position: "center",
          text: "Descubre nuevos videojuegos",
          src: "https://wallpapercave.com/wp/pzkWBdb.jpg",
          class: "display-3"
        },
        {
          position: "center",
          text: "Personaliza tus búsquedas",
          src:
            "https://streamingear.com/wp-content/uploads/2015/11/Call-of-Duty-Black-Ops-3-desktop-background.jpg",
          class: "display-3 white--text"
        },
        {
          position: "center",
          text: "Eres tú quien decide",
          src: "https://wallpaperplay.com/walls/full/d/c/0/20618.jpg",
          class: "display-3"
        },
        {
          position: "center",
          text: "Recomendaciones sólo para tí",
          src:
            "https://bnetcmsus-a.akamaihd.net/cms/gallery/LO0AO02BH7931533575177140.jpg",
          class: "display-3 white--text"
        }
      ],
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/" },
        { title: "Ayuda", icon: "mdi-help", link: "/help" }
      ],
      critics: [
        "Opinión de usuarios",
        "Opinión de Metacritic",
        "Ventas Globales"
      ],
      platforms: [
        "Cualquiera",
        "PC",
        "PlayStation",
        "PlayStation 2",
        "PlayStation 3",
        "PlayStation 4",
        "PSP",
        "SNES",
        "GameBoy",
        "GameBoy Advance",
        "Nintendo 64",
        "Nintendo Wii",
        "Nintendo DS",
        "Nintendo 3DS",
        "Wii U",
        "Xbox 360",
        "Xbox One"
      ],
      genres: [
        "Cualquiera",
        "Deportes",
        "Plataformas",
        "Aventura",
        "Conducción",
        "Rol",
        "Puzzle",
        "Misceláneo",
        "Shooter",
        "Simulación",
        "Acción",
        "Lucha",
        "Estrategia"
      ],
      limits: ["Top 3", "Top 5", "Top 10", "Top 15", "Top 20", "Top 30"],
      historial: []
    };
  },

  methods: {
    send: function() {
      var params = {
        platform: this.transform(this.platform),
        critic: this.transform(this.critic),
        busqueda: this.busqueda,
        modern: this.modern,
        limit: this.transform(this.limit),
        genre: this.transform(this.genre)
      };
      this.historial.push(params);

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
    recommend: function() {
      var freqPlatform = "";
      var freqCritic = "";
      var freqGenre = "";
      var freqModern = "";

      var mostFrecPlatform = 0;
      var mostFrecCritic = 0;
      var mostFrecGenre = 0;
      var mostFrecModern = 0;

      for (var i = 0; i < this.historial.length; i++) {
        var countPlatform = 1;
        var countCritic = 1;
        var countGenre = 1;
        var countModern = 1;
        for (var j = i; j < this.historial.length; j++) {
          if (this.historial[i].platform == this.historial[j].platform) {
            countPlatform++;
          }
          if (mostFrecPlatform < countPlatform) {
            mostFrecPlatform = countPlatform;
            freqPlatform = this.historial[i].platform;
          }

          if (this.historial[i].critic == this.historial[j].critic) {
            countCritic++;
          }
          if (mostFrecCritic < countCritic) {
            mostFrecCritic = countCritic;
            freqCritic = this.historial[i].critic;
          }

          if (this.historial[i].genre == this.historial[j].genre) {
            countGenre++;
          }
          if (mostFrecGenre < countGenre) {
            mostFrecGenre = countGenre;
            freqGenre = this.historial[i].genre;
          }

          if (this.historial[i].modern == this.historial[j].modern) {
            countModern++;
          }
          if (mostFrecModern < countModern) {
            mostFrecModern = countModern;
            freqModern = this.historial[i].modern;
          }
        }
      }

      if (freqPlatform == "") {
        var random = Math.floor(Math.random() * this.platforms.length);
        freqPlatform = this.transform(this.platforms[random]);
      }
      if (freqCritic == "") {
        var random2 = Math.floor(Math.random() * this.critics.length);
        freqCritic = this.transform(this.critics[random2]);
      }
      if (freqGenre == "") {
        freqGenre = "Cualquiera";
      }
      if (freqModern == "") {
        freqModern = true;
      }

      var params = {
        platform: freqPlatform,
        critic: freqCritic,
        busqueda: "",
        modern: freqModern,
        limit: this.transform(this.limit),
        genre: freqGenre
      };

      this.$http.post("http://localhost:3000/getGames", params).then(
        response => {
          if (
            response.body &&
            response.body.length &&
            response.body[0].message != "Error"
          ) {
            var random3 = Math.floor(Math.random() * response.body.length);
            this.videogames = [response.body[random3]];
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
      } else if (p == "Wii U") {
        return "WiiU";
      } else if (p == "Xbox 360") {
        return "X360";
      } else if (p == "Xbox One") {
        return "XOne";
      } else if (p == "Opinión de usuarios") {
        return "user_score";
      } else if (p == "Opinión de Metacritic") {
        return "criticScore";
      } else if (p == "Deportes") {
        return "Sports";
      } else if (p == "Plataformas") {
        return "Platform";
      } else if (p == "Conducción") {
        return "Racing";
      } else if (p == "Rol") {
        return "Role-Playing";
      } else if (p == "Misceláneo") {
        return "Misc";
      } else if (p == "Simulación") {
        return "Simulation";
      } else if (p == "Acción") {
        return "Action";
      } else if (p == "Lucha") {
        return "Fighting";
      } else if (p == "Aventura") {
        return "Adventure";
      } else if (p == "Estrategia") {
        return "Strategy";
      } else if (p == "Top 3") {
        return 3;
      } else if (p == "Top 5") {
        return 5;
      } else if (p == "Top 10") {
        return 10;
      } else if (p == "Top 15") {
        return 15;
      } else if (p == "Top 20") {
        return 20;
      } else if (p == "Top 30") {
        return 30;
      } else if (p == "Ventas Globales") {
        return "global_sales";
      } else {
        return p;
      }
    }
  }
};
</script>
<style>
</style>
