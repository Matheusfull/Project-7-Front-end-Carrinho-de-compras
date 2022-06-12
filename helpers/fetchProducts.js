const fetchProducts = async () => {
  // seu código aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const result = await fetch(url);
  const response = await result.json();
  // console.log(response.results);
  return response.results;
  /* 
  Tinha feito primeiro assim, mas resolvi passar a construção deste objeto para outro arquivo para além de ficar que nem o READ.me aconselha, os testes serem aprovados e não ficar passando falso positivo. 
  const data = response.results.map((element) => {
    const obj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    return obj;
  }); */
  // console.log(data);
  // return data;
};
fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
/* [requisito 2]
1 - a função fetchProducts será assíncrona, logo, precisa do async
2 - pega a url e implementa na função fetch. Mas para isso, é preciso esperara trazer todos os dados com o await.
3- trata os dados trazidos com o json e na promise resultante, iremos trabalhar com o array results da promisse.
*/
