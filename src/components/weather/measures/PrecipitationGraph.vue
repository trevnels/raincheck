<template>
    <v-expand-transition>
    <div id="precip-graph-container" v-show="visible">
        <canvas ref="cnv" @resize="resize"></canvas>
    </div>
    </v-expand-transition>
</template>
<script>

    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            let context = this, args = arguments,
            later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
            },
            call_now = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (call_now) func.apply(context, args)
        }
    }
    
    function computeLevel(mm) {
        let level = 0

        if(mm > 0.1) {
            level = 1
        }
        if (mm > 10) {
            level = 2
        }
        if (mm > 20) {
            level = 3
        }

        return level
    }
    export default {
        name: "PrecipitationGraph",
        props: ['precip'],
        data() {
            return {
                ctx: null,
                t: 0,
                offsets: [],
                visible: false
            }
        },
        created() {
            this.computeVisible()
        },
        mounted() {
            console.log('mounted')
            this.ctx = this.$refs.cnv.getContext('2d')
            
            this.resize()
            // this.render()

            for(let i = 0; i <= 60; i++) {
                this.offsets.push(i*6)
            }

            window.requestAnimationFrame(this.render)

            window.addEventListener('resize', debounce(() => {
                this.resize()
                console.log('resized')
            }, 100))
        },
        methods: {
            render() {
                // console.log('rendering')
                if(!this.visible) return
                this.t += 1
                this.t %= 360

                let cnv = this.$refs.cnv
                let ctx = this.ctx

                if(!this.$refs.cnv) {
                    return console.log('canvas does not exist')
                }

                ctx.clearRect(0,0,cnv.width,cnv.height)

                ctx.font = "10px Roboto"

                ctx.beginPath()
                ctx.moveTo(0, cnv.height)

                ctx.fillStyle = '#4FC3F7'

                let timeSinceUpdate = Math.round((new Date().getTime()/1000 - this.precip[0].dt)/60)
                for(let measurement = 0; measurement <= 50; measurement++) {
                    let accum = 0.0
                    let n = 0.0
                    for(let i = -2; i <= 2; i++) {
                        if(measurement+i+timeSinceUpdate >= 0 && measurement+i+timeSinceUpdate <= 60) {
                            accum += computeLevel(this.precip[(measurement+i+timeSinceUpdate).toString()].precipitation)
                            n++
                        }
                    }
                    let level = (n == 0.0) ? 0 : accum / n

                    ctx.lineTo(Math.floor(cnv.width * measurement * (1.0/50)), cnv.height - (cnv.height * (level / 3.0) + Math.sin(4 * (this.offsets[measurement] + this.t) * 2 * Math.PI / 360.0) * level * (cnv.height / 40.0)))


                    // console.log(rate)
                }
                ctx.lineTo(cnv.width, cnv.height)
                ctx.closePath()
                ctx.fill()

                ctx.fillStyle = '#ffffff'
                ctx.textAlign = 'left'
                ctx.textBaseline = 'middle'
                let labels = ['high','medium','low', '']
                for(let i = 0; i <= 3; i++) {
                    if(i > 0 && i < 3) ctx.fillRect(0,Math.floor(0.99 * cnv.height * (i/3.0)),4,1)
                    ctx.fillText(labels[i], 2, Math.floor(cnv.height * ((i+0.5)/3.0)))
                }

                ctx.textBaseline = 'bottom'
                ctx.textAlign = 'center'

                for(let i = 1; i < 5; i++) {
                    ctx.fillRect(Math.round(cnv.width * (i/5.0)), cnv.height-4, 1, 4)
                    ctx.fillText((i*10)+' min', Math.round(cnv.width * (i/5.0)), cnv.height - 4)
                }
                
             

                window.requestAnimationFrame(this.render)

            },
            resize() {
                if(this.$refs.cnv) {
                    this.$refs.cnv.width = this.$refs.cnv.offsetWidth
                    this.$refs.cnv.height = this.$refs.cnv.offsetHeight
                }
            },
            computeVisible() {
                let lastVisible = this.visible
                this.visible = this.precip.filter((p) => {return p.precipitation >= 0.1}).length > 0
                if(this.visible && !lastVisible) this.render()
            }
        },
        watch: {
            precip() {
               this.computeVisible()
            }
        }
    }
</script>
<style scoped>
    canvas {
        height: 100px;
        width: calc(100% - 16px);
        max-width: 600px;
        background-color: #212121;
        border-radius: 4px;
    }
    #precip-graph-container {
        margin-bottom: 30px;
        
    }
</style>