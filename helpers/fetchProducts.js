const fetchProducts = async () => {
  // seu código aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const result = await fetch(url);
  const response = await result.json();
  // console.log(response);
  const data = response.results.map((element) => {
    const obj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    return obj;
  });
  // console.log(data);
  return data;
};
fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
