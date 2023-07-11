const cartItem = document.querySelector('.cart__items');
const limpar = document.querySelector('.empty-cart');
let sum = 0;
const price = document.querySelector('.total-price');

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
  const card = document.createElement('div');
  card.className = 'card';

  const section = document.createElement('div');
  section.className = 'item';

  section.appendChild(createCustomElement('h2', 'item__sku', sku));
  section.appendChild(createCustomElement('h3', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  card.appendChild(section);

  return card;
};

// [requisito 9 - parte 1]
const sumPrice = (priceProduct) => {
  sum += priceProduct;
  localStorage.setItem('cartPrice', sum);
  price.innerText = localStorage.getItem('cartPrice');
};
// [requisito 9 - parte 2]
const sub = (number) => {
  oldPrice = Number(localStorage.getItem('cartPrice'));
  newPrice = (oldPrice - number);
  localStorage.setItem('cartPrice', newPrice);
  price.innerText = localStorage.getItem('cartPrice');
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// [requisito 5]
/* Ao clicar em algum item da lista, ele será removido do DOM através do método remove() */
const cartItemClickListener = (event) => {
  event.target.remove();
  // [requisito 8 - Parte 1.2]
  /* 1 - Ao clicar nos itens à direita, eles irão sumir e com isso criará uma nova lista.
  2 - Essa nova lista irá reescrever no localStorage. */
  saveCartItems(cartItem.innerHTML);
  // [requisito 9 - Parte 2]
  const priceItem = Number(event.target.innerHTML.split('$')[1]);
  sub(priceItem);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// [requisito 2]
/* Cria toda a estrutura de objeto que estava no arquivo fetchProducts 
1 - Chama a função fetchProducts para trazer todos os dados que estão na API. Eles virão em forma de array. 
2 - Usaremos então o map, pois queremos todos os dados, porém com uma outra estrutura, que é a de objeto.
3 - No map, cada índice do array será retirado o id, title e thumbnail para formar um objeto, que servirá de parâmetro para a função createProductItemElement.
*/

/*
1 - faz a função assíncrona, ou seja, vai ocorrer a parte, usando o async.
2 - chama a função results, pois ela tem os dados da API e já retonando-os como objetos, mas para isso precisa esperar todas os dados chegarem, usaremos então o await
3 - para cada dado, vamos implementar na função createProductItemElement, pois ela cria a estrutura para cada elemento no html
4 - Pegamos o lugar que queremos adicionar essa estrutura. Usamos então o querySelector
5 - Finalmente vamos adicionar a estrutura no lugar que pegamos.
*/

const renderPorducts = async () => {
  const divProducts = document.querySelector('.items');
  const products = await fetchProducts();
  products.forEach((product) => {
    const objProduct = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    const productRender = createProductItemElement(objProduct);
    divProducts.appendChild(productRender);
  });
};

// [requisito 4]
/* 1 - Vamos pegar a página e colocar um escutador de clique
2 - Se o click ocorrer no botão, vamos pegar o id do produto correspondente ao botão
3 - Adicionaremos esse id ao parâmetro da fetchItem, tratamos essa promise com o .then e pegamos a informação, até porque depois de uma requisição tratada, ela retorna um 'objeto'.
4 - Vamos colocar esse objeto ja estruturado -para isso usaremos a função createCartItemElement- como filho do elemento <ol class="cart__items">
*/
document.addEventListener('click', (event) => {
  if (event.target.className === 'item__add') {
    const id = event.target.parentElement.firstElementChild.innerText;
    fetchItem(id).then((data) => {
      cartItem.appendChild(createCartItemElement(data));
      // [requisito 4]
      // [requisito 8 - Parte 1]
      /* Problemática - 
      1 - Queremos colocar os itens à direita no localStorage. Porém, esses itens são criados de duas formas :
      1 - clicando no 'adicionar ao carrinho'
      2 - Clicando no próprio item para ele sumir e ter uma lista nova.
  1 - pegando os itens que são oriundos do botão 'adicionar ao carrinho':
*/
      // [Requisito 8 - Parte 1.1]
      saveCartItems(cartItem.innerHTML);
      sumPrice(data.salePrice); // [requisito 9 - parte 1]
    });
  }
});

// [requisito 8 - Parte 1.2]
/* 
1- A região que for clicada, vai perder as propriedades e com isso sairá da lista.
2- Pegamos a nova lista, sem o itens clicados - pois foram excluídos - e colocamos no localStorage para atualizar a lista salva. 
Tive que forçar essa exclusão pois no requisito 5 não foi sufciente para excluir depois que fiz o req 8.
*/
cartItem.addEventListener('click', (event) => {
  event.target.remove();
  saveCartItems(cartItem.innerHTML);
});

limpar.addEventListener('click', () => {
  localStorage.clear();
  cartItem.innerHTML = '';
  localStorage.setItem('cartPrice', 0);
  price.innerHTML = localStorage.getItem('cartPrice');
  sum = 0;
});

const load = () => {
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerHTML = 'loading...';
  const carregando = document.querySelector('.carregando');
  carregando.appendChild(p);
  setTimeout(() => {
    document.querySelector('.loading').remove();
  }, 1500);
};

window.onload = () => {
  renderPorducts();
  cartItem.innerHTML = getSavedCartItems();
  load();
  price.innerText = localStorage.getItem('cartPrice');
};
/*
requisito 9  -
Problemática:
pegar todos os preços que aparecem à direita. Se adicionar ao carrinho, vai pegar todos os preços vistos. Se tirar um produto, vai pegar todos os preços restantes. Se atualizar a página, vai pegar todos os preços à direita. Raciocínio análogo ao requi 8, porém ao invés de adicionar ao localStorage, vai pegar os valores e somar.
1 - Pega o preço do item clicado no 'adicionar ao carrinho'
2 - Retirar o preço do item clicado na lista
*/
