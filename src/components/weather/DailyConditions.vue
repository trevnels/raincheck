<template>
    <div id="daily-conditions">
        <table>
            <tr class="condition-header">
                <td class="cell-time"><v-icon>mdi-calendar</v-icon></td>
                <td class="cell-condition"><v-icon>mdi-weather-sunny</v-icon></td>
                <td class="cell-temp-small"><v-icon>mdi-thermometer-chevron-down</v-icon></td>
                <td class="cell-temp-small"><v-icon>mdi-thermometer-chevron-up</v-icon></td>
                <td class="cell-precip"><v-icon>mdi-water-percent</v-icon></td>
                <td class="cell-wind"><v-icon>mdi-weather-windy</v-icon></td>
            </tr>
            <tr v-for="condition in conditions" :key="condition.dt">
                <td class="cell-time">{{parseDate(condition.dt)}}</td>
                <td class="cell-condition"><ConditionIcon :condition="condition" /></td>
                <td class="cell-temp-small"><Measure :condition="condition.temp.min" inputUnit="tempK" type="temperature" :measurements="measurements" /></td>
                <td class="cell-temp-small"><Measure :condition="condition.temp.max" inputUnit="tempK" type="temperature" :measurements="measurements" /></td>
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
                let months = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
                return months[date.getMonth()] + " " + date.getDate()
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
    #daily-conditions {
        max-height: 369px;
        width: calc(100% - 16px);
        max-width: 600px;
        margin: auto;
        overflow: hidden;
        position: relative;
    }
    #daily-conditions::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100px;
        background-image: linear-gradient( rgba(18,18,18,0),rgba(18,18,18,0.7), #121212);
        bottom: 0;
        left: 0;
    }
    #daily-conditions table {
        border-collapse: collapse;
        width: 100%;
        margin-top: 2rem;
    }
    #daily-conditions table tr:nth-child(even) {
        background-color: rgba(0,0,0,0.16);
    }
    #daily-conditions table td {
        padding: 8px;
    }
    .cell-time {
        text-align: left;
        color: #aaa;
    }
    .cell-temp, .cell-precip, .cell-wind, .cell-condition {
        width: 82px;
    }
    .cell-temp-small {
        width: 41px;
    }
</style>
