const cnvMap = {
    h: window.innerHeight,
    w: document.body.clientWidth,
    spaceX:0,
    innerSpaceX:{},
    innerSpacexCounter:0,
    history:[],
    buildMap(obj, elem, style, inner, outerIndex, positions,outerMargin,innerSpacexCounter){
    let oldX = (positions) ? outerMargin + this.innerSpaceX[innerSpacexCounter] : this.spaceX, // will set inner element x position if that inner elem
        detectY ,
        dt = {},
        margin = 10,
        width = this.w;
     if(typeof style.margin === 'number') margin = style.margin
     
     if(positions){
        this.innerSpaceX[innerSpacexCounter] += margin*2 + style.width;
     }else{
        this.spaceX += margin*2 + style.width
     }

     if(positions) width = positions.x + positions.xs
     
     if(width < oldX + margin*2 + style.width){
        if(positions){
            this.innerSpaceX[innerSpacexCounter] = style.width + margin*2
        }else{
            this.spaceX = style.width + margin*2
        }   
        oldX = (positions) ? positions.x + outerMargin : 0
     }

     if(positions){
        detectY = this.getY(obj,oldX, style.width + margin*2,outerMargin,positions.y)}
     else{
        detectY = this.getY(obj,oldX, style.width + margin*2)
     }
    if(positions)   console.log(positions.y)
    if(positions) detectY += positions.y 
    if(outerMargin) detectY += outerMargin
    dt['x'] = oldX;
    dt['y'] = detectY;
    dt['xs'] = style.width + margin*2;
    dt['ys'] = style.height + margin*2;
    if(inner) dt['in'] = [];

    obj.push(dt)
     
    domEl[elem]([oldX+margin, detectY + margin], style)
    
    this.innerSpacexCounter++

    if(inner) this.buildInner(obj, inner, obj.length -1 , dt, margin, this.innerSpacexCounter)
    },
    
    buildInner(obj,inner,outerIndex,positions,margin, innerSpacexCounter){
        this.innerSpaceX[innerSpacexCounter] = positions.x
        inner.forEach(e=>{
            this.buildMap(obj[outerIndex].in, e.elem, e.style, e.inner, outerIndex,positions,margin,innerSpacexCounter)
        })
       
    },
    getY(obj, x,xs,outerMargin,positions){
        let y = 0;
            obj.forEach(e=>{
                if((e.x < x + xs && e.x + e.xs >= x + xs) || (e.x + e.xs > x && e.x + e.xs < x + xs )){   
                    if(y < e.ys + e.y){
                       if(y > e.ys){
                        y = y + e.ys - (y - e.y)
                       }else{
                        y = e.ys + e.y
                    }
                    }
                
                    if(typeof positions == 'number') y -= positions
                    if(typeof outerMargin == 'number') y -= outerMargin

                }
            })
        
        return y
    }
}


const domEl = {
    div(xy,style){
        
        c.beginPath();
        c.roundRect(xy[0],xy[1],style.width, style.height,[style.borderRadius]);
        c.fillStyle = `${(style.background)?style.background:'#000'}`;
        c.fill();
        
    },
    text(xy,style){
    c.font = "60px arial";
    c.fillStyle = style.color;
    c.textAlign = "center";
    
    c.textBaseline = "hanging";
    c.fillText(style.text, xy[0]+ style.width/2, xy[1]);
    let text = c.measureText(style.text);
    }
}