<template>
    <div id="hourly-conditions">
        <table>
            <tr class="condition-header">
                <td class="hourly-cell-time"><v-icon>mdi-clock-outline</v-icon></td>
                <td><v-icon>mdi-weather-sunny</v-icon></td>
                <td><v-icon>mdi-thermometer</v-icon></td>
                <td><v-icon>mdi-water-percent</v-icon></td>
                <td><v-icon>mdi-weather-windy</v-icon></td>
            </tr>
            <tr v-for="condition in conditions" :key="condition.dt">
                <td class="cell-time">{{parseDate(condition.dt)}}</td>
                <td class="cell-condition"><ConditionIcon :condition="condition" /></td>
                <td class="cell-temp"><Measure :condition="condition.temp" inputUnit="tempK" type="temperature" :measurements="measurements" /></td>
                <td class="cell-precip">{{Math.round(condition.pop*100)}}%</td>
                <td class="cell-wind"><Measure :condition="condition.wind_speed" inputUnit="m/s" type="speed" :measurements="measurements" /></td>
            </tr>
        </table>
    </div>
</template>
<script>
    import ConditionIcon from './measures/ConditionIcon.vue'
    import Measure from './measures/Measure.vue'

    

    export default {
        name: "HourlyConditions",
        props: ['conditions'],
        components: {
            ConditionIcon,
            Measure
        },
        methods: {
             parseDate(timestamp) {
                let date = new Date(timestamp*1000)
                let tfh = localStorage.getItem('timefmt') === '24'
                let hrs = ((date.getHours() % 12 == 0) ? 12 : date.getHours() % 12).toString()
                let mins = ((date.getMinutes() < 10) ? '0'+date.getMinutes() : date.getMinutes()).toString()
                let part = ((date.getHours() >= 12) ? " pm" : " am")
                return ((tfh) ? date.getHours() : hrs) + ":" + mins + ((!tfh) ? part : '')
            }
        },
        computed: {
            measurements() {
                return window.localStorage.getItem('measurements')
            },
           
        }
    }
</script>
<style>
    #hourly-conditions {
        max-height: 615px;
        width: calc(100% - 16px);
        max-width: 600px;
        margin: auto;
        overflow: hidden;
        position: relative;
    }
    #hourly-conditions::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100px;
        background-image: linear-gradient( rgba(18,18,18,0),rgba(18,18,18,0.7), #121212);
        bottom: 0;
        left: 0;
    }
    #hourly-conditions table {
        border-collapse: collapse;
        width: 100%;
        margin-top: 2rem;
    }
    #hourly-conditions table tr:nth-child(even) {
        background-color: rgba(0,0,0,0.16);
    }
    #hourly-conditions table td {
        padding: 8px;
    }
    .hourly-cell-time {
        text-align: left;
        color: #aaa;
    }
</style>
