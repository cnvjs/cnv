const cv = document.getElementById("cnv", { alpha: false });
const c = cv.getContext("2d");

const dom = {
    d:{},
    s:{},
    style(d) {
      this.s = d; 
    },
    create(d){
        this.d = d
    },
    get(d){
        return this.d
    },
    compute(d){
      let i = 0;
      while(d[i])console.log(d[i]), i++
    },
    render(){
        this.d.forEach((e)=>{
           domEl[e.elem](cnvMap.buildMap(e.style.width, e.style.height, e.style, e.inner), e.style)
          })
    }
}

const domEl = {
    div(xy,style){
        c.fillStyle = `${(style.background)?style.background:'#000'}`;
        c.fillRect(xy[0], xy[1], style.width, style.height);
    }
}