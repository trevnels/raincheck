<template>
    <div id="setup-pane">
        <v-icon>mdi-api</v-icon>
        <input id="owm-key" v-model="key" class="ap-input" placeholder="OpenWeatherMap API Key" />
        <v-expand-transition>
            <div v-if="key">
            <br><br><br>
            <v-icon>mdi-weight</v-icon>
            <v-select block label="Units" v-model="units" :items="[{value:'imperial', text:'Imperial'},{value:'metric',text:'Metric'}]"></v-select>
            <v-select block label="Time Format" v-model="timefmt" :items="[{value:'12', text:'12 Hour ('+parseDate(new Date(), false)+')'},{value:'24',text:'24 Hour ('+parseDate(new Date(), true)+')'}]"></v-select>
            <br><br><br>
            <v-icon>mdi-map-marker</v-icon>
            <LocationField v-on="$listeners" />
            <p id="setup-separator">OR</p>
            <Geolocator v-on="$listeners" />
            </div>
        </v-expand-transition>
    </div>
</template>
<script>
    import LocationField from './LocationField'
    import Geolocator from './Geolocator'

    export default {
        name: "Setup",
        components: {
            LocationField,
            Geolocator
        },
        mounted() {
            document.querySelector('#owm-key').focus()
            localStorage.setItem('measurements', this.units)
            localStorage.setItem('timefmt', this.timefmt)
        },
        data() {
            return {
                key: localStorage.getItem('owmKey') || '',
                units: localStorage.getItem('measurements') || 'imperial',
                timefmt: localStorage.getItem('timefmt') || '12'
            }
        },
        methods: {
            parseDate(date, tfh) {
                let hrs = ((date.getHours() % 12 == 0) ? 12 : date.getHours() % 12).toString()
                let mins = ((date.getMinutes() < 10) ? '0'+date.getMinutes() : date.getMinutes()).toString()
                let part = ((date.getHours() >= 12) ? " pm" : " am")
                return ((tfh) ? date.getHours() : hrs) + ":" + mins + ((!tfh) ? part : '')
            }
        },
        watch: {
            key() {
                localStorage.setItem('owmKey', this.key)
            },
            units() {
                localStorage.setItem('measurements', this.units)
            },
            timefmt() {
                localStorage.setItem('timefmt', this.timefmt)
            }
        }
    }
</script>
<style>
    #setup-pane i {
        margin-bottom: 8px;
    }
    #setup-pane {
        width: 30%;
        max-width: 300px;
        margin: auto;
    }
    #setup-separator {
        margin: 16px 0;
    }
    .v-label {
        display: inline !important;
        flex: unset !important;
        text-align: right;
    }
</style>