const 
input = (e) => {
  let a = e;
  a['elem'] = 'input'
  return a 
},
text = (e) => {
  let a = e;
  a['elem'] = 'text'
  return a 
},
div = (e) =>{
  let a = e;
  if(dom.s[e.class]) a['style'] = dom.s[e.class]
  a['elem'] = 'div'
  return a
},
img = (e) => {
  let a = e;
  a['elem'] = 'img'
  return a 
},
button = (e) => {
  let a = e;
  a['elem'] = 'button'
  return a 
}