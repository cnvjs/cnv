const cv = document.getElementById("cnv", { alpha: false });
const c = cv.getContext("2d");


let cnv_dom;
const dom = {
    d:{},
    s:{},
    style(d) {
      this.s = d;
    },
    create(d){
        this.d =  d
    },
    render(){
        this.d.forEach((e)=>{
              let s = {}
              e.class.split(" ").forEach(cl=>{
                s = Object.assign(s, dom.s[cl]);
              })

              if(document.body.clientWidth < 700){
                e.class.split(" ").forEach(cl=>{
                  s = Object.assign(s, dom.s.laptop[cl]);
                })
              }
              e['style'] = sty.set(s)
            
            if(e.text) e['style']['text'] = e.text
            cnvMap.buildMap(cnvMap.history, e.elem, e.style, e.inner)
          })
    }
}

