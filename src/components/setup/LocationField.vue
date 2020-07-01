<template>
    <input id="location-field" placeholder="Enter a city..." />
</template>
<script>
export default {
    name: 'LocationField',
    mounted() {
       
        let self = this
        var placesAutocomplete = places({
            container: document.querySelector('#location-field'),
            templates: {
                value: function(suggestion) {
                    return suggestion.name;
                }
            },
        }).configure({
            type: 'city',
            aroundLatLngViaIP: true,
        });

        window.setTimeout(() => {document.querySelector('#location-field').focus()}, 10)
        placesAutocomplete.on('change', function(e) {
            let coords = e.suggestion.latlng
            self.$emit('setLocation', {lat: coords.lat, lon: coords.lng})
        })
    }
}
</script>
<style>
    .ap-dropdown-menu {
        background-color: #333;
    }
    .ap-footer-algolia svg g path:last-of-type {
        fill: #fff;
    }
    .ap-suggestion {
        text-align: left;
        height: 30px;
        line-height: 30px;
        padding-left: 6px;
    }
    .ap-suggestion.ap-cursor {
        background-color: #444;
    }
    .ap-suggestion-icon {
        display: none;
    }
    .ap-input {
        color: #fff;
        height: 36px;
    }
    .ap-icon-pin {
        display: none;
    }
</style>