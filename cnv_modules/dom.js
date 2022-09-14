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
          //  console.log(e.elem)
            cnvMap.buildMap(e.elem, e.style.width, e.style.height, e.style, e.inner)
          })
    }
}

