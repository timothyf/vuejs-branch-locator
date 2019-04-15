<template>
    <div id="app">
        <v-app id="app">
            <v-toolbar color="black darken-1" dark fixed app>
                <v-icon>location_on</v-icon>
                <v-toolbar-title>Branch Locator</v-toolbar-title>
            </v-toolbar>
            <v-content>
                <router-view></router-view>
            </v-content>
            <v-footer color="black lighten-1" app inset>
                <v-spacer></v-spacer>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
html,
body,
#app {
    height: 100%;
}
</style>
