<template>
  <div id="app">
    <!--  
    <navbar />
    class="container" -->
    <div >
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<!-- -->
<script>
//import navbar from './components/Layouts/Navbar'
import Footer from './components/Layouts/Footer'

import './css/main.css'
import './css/theme.css'
import './css/type1.css'

//
export default {
  name: 'app',
  components: {
    //navbar, 
    Footer,
  }
}
</script>

<style>
</style>
