let counterDom = 0;

const input = (e) => {
  let a = e;
  a['elem'] = 'input';
  return a
},
text = (e) => {
  e['elem'] = 'text'
  return e
},
div = (e) =>{
  e['elem'] = 'div'
  return e
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