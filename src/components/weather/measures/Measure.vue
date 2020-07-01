<template>
    <span>{{displayed}}</span>
</template>
<script>
    export default {
        name: "Measure",
        props: ['condition', 'inputUnit', 'type', 'measurements'],
        computed: {
            displayed() {
                let temperatureQuantity = new Qty(this.condition, this.inputUnit)
                return temperatureQuantity.to(this.$units[this.measurements][this.type].unit).toPrec(1).toString().split(' ')[0] + this.$units[this.measurements][this.type].postfix
            }
        }
    }
</script>