const cnvMap = {
    h: window.innerHeight,
    w: document.body.clientWidth,
    spaceX:0,
    innerSpaceX:[],
    history:[],
    buildMap(obj, elem, style, inner, outerIndex, positions,outerMargin){
    let oldX = (positions) ? outerMargin + this.innerSpaceX[outerIndex] : this.spaceX, // will set inner element x position if that inner elem
        detectY = 0,
        dt = {},
        margin = 10;
     if(style.margin) margin = style.margin
     
     if((positions)){
        this.innerSpaceX[outerIndex] += margin*2 + style.width;
     }else{
        this.spaceX += margin*2 + style.width
     }

     
     if(this.w < oldX + margin*2 + style.width){
        if(positions){
            this.innerSpaceX[outerIndex] = style.width + margin*2
        }else{
            this.spaceX = style.width + margin*2
        }   
        oldX = (positions) ? outerMargin : 0
     }

    detectY = this.getY(obj,oldX, style.width + margin*2,outerMargin)
    if(outerMargin) detectY += outerMargin
    dt['x'] = oldX;
    dt['y'] = detectY;
    dt['xs'] = style.width + margin*2;
    dt['ys'] = style.height + margin*2;
    if(inner) dt['in'] = [];
     //console.log(oldX)
    obj.push(dt)
     
    domEl[elem]([oldX+margin, detectY + margin], style)

    if(inner) this.buildInner(obj, inner, obj.length -1 , dt, margin)
    },
    
    buildInner(obj,inner,outerIndex,positions,margin){
        this.innerSpaceX[outerIndex] = 0
        inner.forEach(e=>{
           //if(!this.innerSpaceX[outerIndex]) 
            this.buildMap(obj[outerIndex].in, e.elem, e.style, e.inner, outerIndex,positions,margin)
        })
       
    },
    getY(obj, x,xs,outerMargin){
        let y = 0;
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

                if(typeof outerMargin == 'number') y -= outerMargin

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