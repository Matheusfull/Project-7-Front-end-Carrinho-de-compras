const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  /* button.addEventListener('click', (event) => {
    const buttonInfo = event.target.parentElement.firstElementChild;
    const id = buttonInfo.innerText;
    console.log(id);
  }); */
  section.appendChild(button);

  return section;
};

/* ------------------------------[requisito 2]-------------------------------------------- 
1 - faz a função assíncrona, ou seja, vai ocorrer a parte, usando o async.
2 - chama a função fetchPorducts, pois ela tem os dados da API e já retonando-os como objetos, mas para isso precisa esperar todas os dados chegarem, usaremos então o await
3 - para cada dado, vamos implementar na função createProductItemElement, pois ela cria a estrutura para cada elemento no html
4 - Pegamos o lugar que queremos adicionar essa estrutura. Usamos então o querySelector
5 - Finalmente vamos adicionar a estrutura no lugar que pegamos.
*/
const renderPorducts = async () => {
  const products = await fetchProducts();
  // console.log(products);
  products.forEach((element) => {
    const product = createProductItemElement(element);
    const divProducts = document.querySelector('.items');
    divProducts.appendChild(product);
  });
};
// ------------------------------[requisito 2]--------------------------------------------

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

document.addEventListener('click', (event) => {
  // console.log(event.target);
  if (event.target.className === 'item__add') {
    const id = event.target.parentElement.firstElementChild.innerText;
    fetchItem(id).then((data) => {
      const item = document.querySelector('.cart__items');
      item.appendChild(createCartItemElement(data));
    });
  }
});

/* const renderItem = async () => {
  const item = await fetchItem();
  console.log(item);
  const divProduct = document.querySelector('.cart__items');
  const productItem = createCartItemElement(item);
  divProduct.appendChild(productItem);
}; */

window.onload = () => {
  renderPorducts();
  // renderItem();
}; 
