<template>
  <div id="app">
    <SalaryNegotiator />
  </div>
</template>

<script>
import SalaryNegotiator from './components/SalaryNegotiator.vue'

export default {
  name: 'app',
  components: {
    SalaryNegotiator
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
