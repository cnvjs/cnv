const cnvMap = {
    h: window.innerHeight,
    w: document.body.clientWidth,
    spaceX:0,
    innerSpaceX:[],
    history:[],
    innerHistory:{},
    buildMap(elem, x, y, style, inner, outerIndex, positions,outerMargin){
    let oldX = (positions) ? outerMargin + this.innerSpaceX[outerIndex] : this.spaceX, // will set inner element x position if that inner elem
        detectY = 0,
        dt = {},
        margin = 10;
     if(style.margin) margin = style.margin
     
     if((positions)){
        this.innerSpaceX[outerIndex] += margin*2 + x
     }else{
     this.spaceX += margin*2 + x
     }

     
     if(this.w < oldX + margin*2 + x){
        if((positions)){
            this.innerSpaceX[positions] = x + margin*2
        }else{
            this.spaceX = x + margin*2
        }   
        oldX = (positions) ? positions.x : 0
     }

    detectY = this.getY(oldX, x + margin*2,outerIndex)
    if(outerMargin) detectY += outerMargin
    dt['x'] = oldX;
    dt['y'] = detectY;
    dt['xs'] = x + margin*2;
    dt['ys'] = y + margin*2;
    dt['style'] = style;
   
     
    if(!positions) {
        this.history.push(dt)
    }else{
        this.innerHistory[outerIndex] = []
        this.innerHistory[outerIndex].push(dt)
    }
    domEl[elem]([oldX+margin, detectY+ margin], style)

    if(inner) this.buildInner(inner, this.history.length -1 , dt, margin)
    },
    
    buildInner(inner,outerIndex,positions,margin){
        inner.forEach(e=>{
           if(!this.innerSpaceX[outerIndex]) this.innerSpaceX[outerIndex] = 0
            this.buildMap(e.elem, e.style.width, e.style.height, e.style, e.inner, outerIndex,positions,margin)
            //domEl[e.elem](this.buildMap(e.elem, e.style.width, e.style.height, e.style, e.inner, outerIndex,positions), e.style)
        })
       
    },
    getY(x,xs,outerIndex){
        let y = 0;
        let obj =  this.history;
        if(typeof outerIndex == 'number'){
            obj = this.innerHistory[outerIndex]
        }
            try{
            obj.forEach(e=>{
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
        
        }
        catch(e){

        }
        
        return y
    }
}


const domEl = {
    div(xy,style){
        c.fillStyle = `${(style.background)?style.background:'#000'}`;
        c.fillRect(xy[0], xy[1], style.width, style.height);
    }
}