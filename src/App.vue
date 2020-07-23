<template>
  <v-app id="app">
  <transition name="fade" mode="out-in">
    <Setup v-if="setup" @setLocation="setLocation" />
    <div v-else-if="!setup && conditions" key="weather-pane">
      <CurrentConditions :conditions="conditions.current" />
      <PrecipitationGraph :precip="conditions.minutely" />
      <Map :lat="location.lat" :lon="location.lon" />
      <HourlyConditions :conditions="conditions.hourly" />
       <DailyConditions :conditions="conditions.daily" />
    </div>
  </transition>

<transition name="fade" mode="out-in" v-if="ready">
  <v-btn key="btn-cancel-setup" v-if="setup" @click="setup = false" fab fixed top right icon color="error"><v-icon>mdi-close</v-icon></v-btn>
  <v-btn key="btn-setup" v-else @click="setup = true" fab fixed top right icon><v-icon color="#444">mdi-cog</v-icon></v-btn>
</transition>
  </v-app>
</template>

<script>
import Map from './components/weather/Map'
import CurrentConditions from './components/weather/CurrentConditions'
import HourlyConditions from './components/weather/HourlyConditions'
import DailyConditions from './components/weather/DailyConditions'
import Setup from './components/setup/Setup'
import PrecipitationGraph from './components/weather/measures/PrecipitationGraph'

export default {
  name: 'App',
  components: {
    Map,
    CurrentConditions,
    HourlyConditions,
    DailyConditions,
    Setup,
    PrecipitationGraph
  },
  data() {
    return {
      conditions: null,
      location: null,
      setup: false,
      ready: false,
    }
  },
  created() {
    let self = this
    window.setInterval(this.refresh, 10000)
    let readLoc = localStorage.getItem('location')
    let owmKey = localStorage.getItem('owmKey')
    let measurements = localStorage.getItem('measurements')
    if(readLoc && owmKey && measurements) {
      this.location = JSON.parse(readLoc)
      this.ready = true
      this.refresh()
    } else {
      this.setup = true
    }
  },
  methods: {
     setLocation(loc) {
      this.location = loc
      localStorage.setItem('location', JSON.stringify(loc))
      localStorage.removeItem('conditionCache')
      this.setup = false
      this.ready = true
     
      this.refresh()
    },
    getConditions(location, callback) {
      let self = this
      let cached = localStorage.getItem('conditionCache')

      if(!cached) {
        self.fetchConditions(location, (conditions) => {
          callback(conditions)
        })
      } else {
        cached = JSON.parse(cached)
        let cacheTime = cached.current.dt

        let delta = new Date().getTime()/1000 - cacheTime
        console.log(delta)

        if(delta > 600) {
          self.fetchConditions(location, (conditions) => {
            callback(conditions)
          })
        } else {
          console.log("using cached conditions")
          callback(cached)
        }
      }
    },
    fetchConditions(location, callback) {
      console.log(this.$refs)
       fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&appid=${localStorage.getItem('owmKey')}`).then(res => res.json()).then(conditions => {
        callback(conditions)
        localStorage.setItem('conditionCache', JSON.stringify(conditions))
      })
    },
    refresh() {
      let self = this
      if(self.location) {
        self.getConditions(self.location, (conditions) => {
          self.conditions = conditions
        })
      }
    }
  }
}
</script>

<style>

* {
  box-sizing: border-box;
  user-select: none;
}

#app {
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fold-enter-active, .fold-leave-active {
  transition: max-height .2s;
}
.fold-enter, .fold-leave-to /* .fade-leave-active below version 2.1.8 */ {
  max-height: 0;
}
</style>
