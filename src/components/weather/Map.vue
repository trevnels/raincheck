<template>
    <div id="map"></div>
</template>
<script>

    export default {
        name: "Map",
        props: ['lon','lat'],
        data() {
            return {
                map: null
            }
        },
        mounted() {
            console.log("creating map")
            let self = this
            fetch('https://api.rainviewer.com/public/maps.json').then(res => res.json()).then(json => {
                let ts = json[json.length-1]
                self.map = L.map('map', {
                    attributionControl: true,
                    zoomControl: false
                }).setView([this.lat, this.lon], 10);
                L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
                    attribution: 'Carto (CC BY 3.0), OpenStreetMap (ODbL)'
                }).addTo(self.map);
                let radar = L.tileLayer(`https://tilecache.rainviewer.com/v2/radar/${ts}/512/{z}/{x}/{y}/8/1_1.png`, {
                    attribution: 'RainViewer'
                }).setOpacity(0.75).addTo(self.map);
                window.setInterval(() => {radar.redraw()}, 300000)
            })
            
        },
        watch: {
            lat: function() {
                this.map.setView([this.lat, this.lon], 10)
            },
            lon: function() {
                this.map.setView([this.lat, this.lon], 10)
            }
        }
    }
</script>
<style>
    #map {
        height: 400px;
    }

    .leaflet-container {
        background: #222;
    }

    .leaflet-container .leaflet-control-attribution {
        background: none;
        color: #ddd;
        font-size: 8px;
        opacity: 0.5;
    }

    .leaflet-container .leaflet-control-attribution * {
        color: #ddd;
    }
</style>