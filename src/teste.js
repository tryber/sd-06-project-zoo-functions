function set(objeto, metodo, funcao) {
  objeto[metodo] = funcao;
}
const ovo = {};
function fritar(alimento) {
  return `${alimento} frito`;
}
set(ovo,'fritar',fritar);
console.log(ovo.fritar)
