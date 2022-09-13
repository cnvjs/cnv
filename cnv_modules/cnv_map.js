const cnvMap = {
    h: window.innerHeight,
    w: document.body.clientWidth,
    spaceX:0,
    spaceY:0,
    history:[],
    buildMap(x,y,style){ 
     let oldX = this.spaceX;
     let detectY =0;
     let dt = {}
     let margin = 10;
     if(style.margin) margin = style.margin;

     this.spaceX += margin*2 + x

     if(this.w < oldX + margin*2 + x+1){
        this.spaceY += y+margin*2;
        this.spaceX = x + margin*2;
        oldX = 0;
     }
     
     
    detectY = this.getY(oldX, x+ margin*2)

     dt['x'] = oldX;
     dt['y'] = detectY;
     dt['xs'] = x + margin*2;
     dt['xy'] = y + margin*2;
     
     this.history.push(dt)

     this.history.filter(e=> e.x >= oldX )
     return [oldX+margin, detectY+ margin]
    },
    getY(x,xs){
        var y = 0;
        var y2d = 0;
        this.history.forEach(e=>{
            if((e.x < x + xs && e.x + e.xs >= x + xs) || (e.x + e.xs > x && e.x + e.xs < x + xs )){   
                if(y < e.xy + e.y){
                   if(y > e.xy){
                    y = y + e.xy - (y - e.y)
                   }else{
                    y = e.xy + e.y
                }
                }
            }
        })
      
    //    this.history.filter(e => e.x + e.xs <= x + xs).forEach(e=>{
    //     if(y2d < e.y + e.xy) y2d =  e.y + e.xy
    //    })
    //    console.log(y2d)

        return y
    }
}
