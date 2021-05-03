<template>
  <div id="app">
    <Header />
    <router-view />
    <Login />
    <Register />
  </div>
</template>
<script>
import Header from "./components/Header/Header";
import Login from "./components/Sidebar/Login";
import Register from "./components/Sidebar/Register";

export default {
  name: "App",
  components: { Header, Login, Register },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
