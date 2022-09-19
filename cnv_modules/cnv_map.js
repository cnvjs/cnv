const cnvMap = {
    h: window.innerHeight,
    w: document.body.clientWidth,
    maxH:0,
    spaceX:0,
    innerSpaceX:{},
    innerSpacexCounter:0,
    history:[],
    update(){
        sty.x =document.body.clientWidth;
        sty.y = window.innerHeight;     
        this.h = window.innerHeight;
        this.w = document.body.clientWidth;
        this.spaceX = 0;
        this.innerSpaceX = {};
        this.innerSpacexCounter = 0;
        this.history = [];
        c.clearRect(0, window.scrollY, cv.width, cv.height);
        dom.render()
    },
    buildMap(obj, elem, style, inner, positions, outerMargin,innerSpacexCounter,outerClass){
    let oldX = (positions) ? outerMargin + this.innerSpaceX[innerSpacexCounter] : this.spaceX, // will set inner element x position if that inner elem
        detectY ,
        dt = {},
        margin = 0,
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
        detectY = this.getY(obj,oldX, style.width + margin*2,outerMargin,positions.y)
    }else{
        detectY = this.getY(obj,oldX, style.width + margin*2)
     }
    if(positions) detectY += positions.y 
    if(outerMargin) detectY += outerMargin
    dt['x'] = oldX;
    dt['y'] = detectY;
    dt['xs'] = style.width + margin*2;
    dt['ys'] = style.height + margin*2;
    if(inner) dt['in'] = [];
    obj.push(dt)
    
    if(outerClass){
    let m = 0;
    obj.forEach(e=>{
     if( dt.y + dt.ys > m) m = dt.y + dt.ys - positions.y - outerMargin
    })
    dom.s[outerClass].heightAuto = m
    }
    domEl[elem]([oldX+margin, detectY + margin - style.translateY], style)
    
    this.innerSpacexCounter++

    if(inner) this.buildInner(obj, inner, obj.length -1 , dt, margin, this.innerSpacexCounter,style.class)
    },
    
    buildInner(obj,inner,outerIndex,positions,margin, innerSpacexCounter,outerClass){
        this.innerSpaceX[innerSpacexCounter] = positions.x
        inner.forEach(e=>{
            let s = {}
            e.class.split(" ").forEach(cl=>{    
                s = Object.assign(s, dom.s[cl]);
                // if(dom.s[cl]) console.log(dom.s[cl]['heightAuto'])
                if(dom.s[cl]) if(dom.s[cl]['heightAuto']) s['class'] = cl
                if(document.body.clientWidth < 700) s = Object.assign(s, dom.s.laptop[cl]);
              })
              e['style'] = sty.set(s, positions.xs - positions.x - margin*2)
            if(e.text) e['style']['text'] = e.text
            this.buildMap(obj[outerIndex].in, e.elem, e.style, e.inner,positions,margin,innerSpacexCounter,outerClass)
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
        c.beginPath()
        c.roundRect(xy[0],xy[1],style.width, style.height,[style.borderRadius]);
        c.fillStyle = `${(style.background)?style.background:'#000'}`;
        c.fill();
    },
    text(xy,style){
    c.font = "60px arial";
    c.fillStyle = style.color;
    c.textAlign = "center";
    c.textBaseline = "hanging";
    c.fillText(style.text, xy[0] + style.width/2, xy[1]);
    let text = c.measureText(style.text);
    },
    img(xy,style){
        
    }
}