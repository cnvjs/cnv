const cnvMap = {
    h: window.innerHeight,
    w: document.body.clientWidth,
    spaceX:0,
    history:[],
    buildMap(x,y,style,inner){
    let oldX = this.spaceX,
        detectY =0,
        dt = {},
        margin = 10;
     if(style.margin) margin = style.margin

     this.spaceX += margin*2 + x

     if(this.w < oldX + margin*2 + x){
        this.spaceX = x + margin*2
        oldX = 0
     }

    detectY = this.getY(oldX, x+ margin*2)

     dt['x'] = oldX;
     dt['y'] = detectY;
     dt['xs'] = x + margin*2;
     dt['ys'] = y + margin*2;
    
     this.history.push(dt)

     this.history.filter(e=> e.x >= oldX )
     return [oldX+margin, detectY+ margin]
    },
    buildInner(inner){

    },
    getY(x,xs){
        let y = 0;
        this.history.forEach(e=>{
            if((e.x < x + xs && e.x + e.xs >= x + xs) || (e.x + e.xs > x && e.x + e.xs < x + xs )){   
                if(y < e.ys + e.y){
                   if(y > e.ys){
                    y = y + e.ys - (y - e.y)
                   }else{
                    y = e.ys + e.y
                }
                }
            }
        })
        return y
    }
}
