const sty = {
    copy:{},
    x: document.documentElement.clientWidth,
    y: window.innerHeight,
    set(elem,w){
        this.copy = {
            width:0,
            height:0,
            translateY:0
        }
        Object.keys(elem).forEach(d=>{
            if(typeof this[d] == 'function' && typeof elem[d] == 'string'){
                this[d](elem[d],w)           
        }else{
            this.copy[d] = elem[d]
        }
        })
        //console.log(this.copy)
        return this.copy
    },
    width(v,w){
        w = (w) ? w : this.x-15
        this.copy.width += Math.round( w / 100 * v.slice(0,-1))
    },
    height(v){
        this.copy.height += Math.round(this.y  / 100 * v.slice(0,-1))
    },

    margin(v,w){
        w = (w) ? w: this.x-15
        this.copy.margin =  Math.round(w / 100 * v.slice(0,-1))
    },
    innerMargin(v){
        this.copy.height -= v*2
        this.copy.width -= v*2
        this.copy.margin = v*1
    }
}