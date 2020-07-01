<template>
    <v-btn @click="geolocate" block color="primary" outlined><v-icon>mdi-navigation</v-icon>Find Me</v-btn>
</template>
<script>
    export default {
        name: "Geolocator",
        methods: {
            geolocate() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                        console.log(pos)
                        this.$emit('setLocation', {lat: pos.coords.latitude, lon: pos.coords.longitude})
                    });
                } else {
                    console.log("not supported")
                }
            }
        }
    }
</script>
<style scoped>
    .v-btn__content i {
        position: absolute;
        left: 0;
    }
</style>