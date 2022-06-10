const fetchItem = async (param) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${param}`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  const obj = {
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  };
  //  console.log(obj);
  return obj;
};
fetchItem();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
/* 
[requisito 2]

1 - pega a url e com o parâmetro para deixá-la dinâmica, ou seja, busca o que eu quiser 
2 - espera a fetch pegar todas as informações e retornar uma promise
3 - espera essa promise ser tratarda e virar um json, que é um objeto com as informações que eu passei no parâmetro que vai ser implementado na url.
4 - cria um objeto que vai ter as propriedades de id, title e imagem.
5 - por fim cria retorna o objeto. 
*/