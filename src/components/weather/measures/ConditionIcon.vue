<template>
    <v-icon :dark="true" class="condition-icon">{{CONDITION_CONVERSIONS[condition.weather[0].icon]}}</v-icon>
</template>
<script>
    export default {
        name: "ConditionIcon",
        props: ['condition'],
        data() {
            return {
                CONDITION_CONVERSIONS: {
                    '01d': 'mdi-weather-sunny',
                    '01n': 'mdi-weather-night',
                    '02d': 'mdi-weather-partly-cloudy',
                    '02n': 'mdi-weather-night-partly-cloudy',
                    '03d': 'mdi-weather-cloudy',
                    '03n': 'mdi-weather-cloudy',
                    '04d': 'mdi-weather-cloudy',
                    '04n': 'mdi-weather-cloudy',
                    '09d': 'mdi-weather-pouring',
                    '09n': 'mdi-weather-pouring',
                    '10d': 'mdi-weather-pouring',
                    '10n': 'mdi-weather-pouring',
                    '11d': 'mdi-weather-lightning',
                    '11n': 'mdi-weather-lightning',
                    '13d': 'mdi-weather-snowy-heavy',
                    '13n': 'mdi-weather-snowy-heavy',
                    '50d': 'mdi-weather-fog',
                    '50n': 'mdi-weather-fog'
                }
            }
        }
    }
</script>
<style>
    .condition-icon {
        
    }
</style>