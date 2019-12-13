<template>
  <v-app style="background: white">
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

    <v-container justify="center" align="center">Henlo</v-container>
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
      drawer: false,
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/" },
        { title: "Ayuda", icon: "mdi-help", link: "/help" }
      ]
    };
  }
};
</script>