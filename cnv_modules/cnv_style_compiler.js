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
            if(typeof this[d] == 'function'){
                this.copy[d] = this[d](elem[d],w)           
        }else{
            this.copy[d] = elem[d]
        }
        })
        //console.log(this.copy)
        return this.copy
    },
    width(v,w){
        w = (w) ? w : this.x-15
        return typeof v == 'number' ? v : this.copy.width + Math.round( w / 100 * v.slice(0,-1))
    },
    height(v){
        return typeof v == 'number'? v : this.copy.height + Math.round(this.y  / 100 * v.slice(0,-1))
    },
    margin(v,w){
        w = (w) ? w: this.x-15
        return typeof v == 'number' ? [v,v,v,v] : typeof v == 'object' ? typeof v[0] == 'number' ? v : [Math.round(w / 100 * v[0].slice(0,-1)),Math.round(w / 100 * v[1].slice(0,-1)),Math.round(w / 100 * v[2].slice(0,-1)),Math.round(w / 100 * v[3].slice(0,-1))] : [Math.round(w / 100 * v.slice(0,-1)),Math.round(w / 100 * v.slice(0,-1)),Math.round(w / 100 * v.slice(0,-1)),Math.round(w / 100 * v.slice(0,-1))]

        // return typeof v == 'number' ? v : Math.round(w / 100 * v.slice(0,-1))
    },
    innerMargin(v){
        this.copy.height -= v*2
        this.copy.width -= v*2
        this.copy.margin = [v*1,v*1,v*1,v*1]
        return false
    },
    heightAuto(v){
        this.copy.height += v
        return false
    }
}