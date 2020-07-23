<template>
    <div id="current-conditions">

        <div id="main-conditions">
            <Measure id="current-temperature" :condition="conditions.temp" inputUnit="tempK" type="temperature" :measurements="measurements" />
            <ConditionIcon id="current-condition-icon" :condition="conditions" />
        </div>

        <table><tr>
        <td><table id="detail-conditions">
            <tr>
                <td><v-icon>mdi-weather-windy</v-icon></td>
                <td><Measure :condition="conditions.wind_speed" inputUnit="m/s" type="speed" :measurements="measurements" /></td>
               
                <td><v-icon>mdi-water-outline</v-icon></td>
                <td><span>{{conditions.humidity}}%</span></td>

                <td><v-icon>mdi-cloud-outline</v-icon></td>
                <td><span>{{conditions.clouds}}%</span></td>
            </tr>
            <tr>
                <td><v-icon :color="uvColor">mdi-shield-sun</v-icon></td>
                <td>{{Math.round(conditions.uvi)}}</td>

                 <td><v-icon>mdi-speedometer</v-icon></td>
                <td><span>{{(conditions.pressure/1000).toFixed(2)}} bar</span></td>
               
                <td><v-icon>mdi-weather-{{nextSolarEvent.type}}</v-icon></td>
                <td><span>{{nextSolarEvent.time}}</span></td>
            </tr>
        </table></td>
        </tr></table>
    </div>
</template>
<script>
    import ConditionIcon from './measures/ConditionIcon.vue'
    import Measure from './measures/Measure.vue'

    function parseDate(date) {
        let tfh = localStorage.getItem('timefmt') === '24'
        let hrs = ((date.getHours() % 12 == 0) ? 12 : date.getHours() % 12).toString()
        let mins = ((date.getMinutes() < 10) ? '0'+date.getMinutes() : date.getMinutes()).toString()
        let part = ((date.getHours() >= 12) ? " pm" : " am")
        return ((tfh) ? date.getHours() : hrs) + ":" + mins + ((!tfh) ? part : '')
    }

    export default {
        name: "CurrentConditions",
        props: ['conditions'],
        components: {
            ConditionIcon,
            Measure
        },
        computed: {
            uvColor() {
                if(!this.conditions.uvi) return 'white'

                let uvi = Math.round(this.conditions.uvi)
                let color = ''

                if(uvi <= 2) color = 'green lighten-2';
                else if(uvi <= 5) color = 'yellow';
                else if(uvi <= 7) color = 'orange lighten-2';
                else if(uvi <= 10) color = 'red lighten-2';
                else color = 'purple lighten-2';

                return color

            },
            measurements() {
                return window.localStorage.getItem('measurements')
            },
            twentyfourhour() {
                return window.localStorage.getItem('twentyfourhour')
            },
            nextSolarEvent() {
                let sunriseTime = new Date(this.conditions.sunset*1000)
                let sunsetTime = new Date(this.conditions.sunset*1000)
                let now = Date()
                if(now < sunriseTime) {
                    return {
                        type: 'sunset-up',
                        time: parseDate(sunriseTime)
                    }
                } else {
                    return {
                        type: 'sunset-down',
                        time: parseDate(sunsetTime)
                    }
                }
                
            }
        }
    }
</script>
<style>
    #current-conditions {
        margin-top: 120px;
        margin-bottom: 30px;
    }
    #current-conditions table {
        margin: auto;
    }
    #current-conditions>table>tr>td {
        padding: 0 16px;
    }
    #detail-conditions {
        margin: auto;
    }
    #detail-conditions td {
        position: relative;
        padding: 3px 8px;
    }
    #detail-conditions td span {
        display: inline-block;
        padding: 0 8px;
        line-height: 24px;
    }
    #current-temperature {
        font-size: 100px;
        line-height: 100px;
        vertical-align: middle;
        display: inline-block;
    }
    #current-condition-icon {
        font-size: 128px;
    }
</style>
