const cartItem = document.querySelector('.cart__items');
const limpar = document.querySelector('.empty-cart');

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
  /* 
  AJUDA DO GABS, mas não deu para seguir com o raciocício e criei outro.
  button.addEventListener('click', (event) => {
    const buttonInfo = event.target.parentElement.firstElementChild;
    const id = buttonInfo.innerText;
    console.log(id);
  }); */
  section.appendChild(button);

  return section;
};
// ------------------------------[requisito 2]--------------------------------------------
/* Cria toda a estrutura de objeto que estava no arquivo fetchProducts 
1 - Chama a função fetchProducts para trazer todos os dados que estão na API. Eles virão em forma de array. 
2 - Usaremos então o map, pois queremos todos os dados, porém com uma outar estrutura, que é a de objeto.
3 - No map, cada índice do array será retirado o id, title e thumbnail para formar um objeto, que servirá de parâmetro para a função createProductItemElement.
*/

const results = async () => {
  const itens = await fetchProducts();
  const item = itens.map((element) => {
    const obj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    return obj;
  });
  return item;
};
/*
1 - faz a função assíncrona, ou seja, vai ocorrer a parte, usando o async.
2 - chama a função results, pois ela tem os dados da API e já retonando-os como objetos, mas para isso precisa esperar todas os dados chegarem, usaremos então o await
3 - para cada dado, vamos implementar na função createProductItemElement, pois ela cria a estrutura para cada elemento no html
4 - Pegamos o lugar que queremos adicionar essa estrutura. Usamos então o querySelector
5 - Finalmente vamos adicionar a estrutura no lugar que pegamos.
*/
const renderPorducts = async () => {
  const products = await results();
  // console.log(products);
  products.forEach((element) => {
    const product = createProductItemElement(element);
    const divProducts = document.querySelector('.items');
    divProducts.appendChild(product);
  });
};
// ------------------------------[requisito 2]--------------------------------------------
let sum = 0;
/* const price = document.createElement('li');
price.className = 'total-price'; */
const price = document.querySelector('.total-price');

const sumPrice = (info) => {
  // console.log(info);
  sum += info;
  price.innerText = sum;
  // cartItem.appendChild(price);
};
// [requisito 9 - parte 2]
const sub = (number) => {
  sum -= number;
  price.innerText = sum;
  // cartItem.appendChild(price);
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// -----------------------------[requisito 8 - Parte 1.1]----------------------------------
/* 
Ao renderizar a página, trazemos as informações do localStorage através do cartItem (região que estará a lista) e innerHTML (que é para escrever nessa região o que queremos). Queremos então escrever a estrutura HTML que foi salva no LocalStorage.
*/
const renderCarItem = () => {
  cartItem.innerHTML = getSavedCartItems();
};
// ----------------------------[requisito 8 - Parte 1.1]-----------------------------------

// ------------------------------[requisito 5]--------------------------------------------
/* 
1 - Ao clicar em algum item da lista, ele será removido do DOM atrvés do método remove()
*/
const cartItemClickListener = (event) => {
  // coloque seu código aqui
  const itemProduct = event.target;
  itemProduct.remove();
  // ------------------------------[requisito 5]-------------------------------------------
  // console.log(cartItem);

  // ----------------------------[requisito 8 - Parte 2]-----------------------------------
  // 1 - Ao clicar nos itens à direita, eles irão sumir e com isso criará uma nova lista.
  // 2 - Essa nova lista será adicionada ao localStorage. 
  saveCartItems(cartItem.innerHTML);
  // ----------------------------[requisito 8 - Parte 2]-----------------------------------
};
// ----------------------------[requisito 8 - Parte 2.2]-----------------------------------
/* 
1- A região que for clicada, vai perder as propriedades e com isso sairá da lista.
2- Pegamos a nova lista, sem o itens clicados - pois foram excluídos - e colocamos no localStorage para atualizar a lista salva. 
Tive que forçar essa exclusão pois no requisito 5 não foi sufciente para excluir depois que fiz o req 8.
*/
cartItem.addEventListener('click', (event) => {
  event.target.remove();
  saveCartItems(cartItem.innerHTML);
  // ----------------------------[requisito 8 - Parte 2.2]-----------------------------------
  const priceItem = Number(event.target.innerHTML.split('$')[1]);
  // console.log(priceItem);
  sub(priceItem);
});
// ------------------------------[requisito 8]--------------------------------------------
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
/*
tentando adicionar a lista lateral ao localStorage, porém não consigo pegar a lista atualzada, ou seja, depois que clica no item ele some e com isso a lista não se atualiza
const array = [];
const itens = document.querySelector('.cart__items');

itens.addEventListener('click', () => {
  array.push(itens);
  console.log(itens);
}); */
// ------------------------------[requisito 4]--------------------------------------------
/* 1 - Vamos pegar a página e colocar um escutador de clique
2 - Se o click ocorrer no botão, vamos pegar o id do produto correspondente ao botão
3 - Adicionaremos esse id ao parâmetro da fetchItem, tratamos essa promise com o .then e pegamos a informação, até porque depois de uma requisição tratada, ela retorna um 'objeto'.
4 - Pegamos o lugar onde colocaremos esse 'objeto'(data)
5 - Pegamos o 'objeto'(data), colocamos na função createCartItemElement - que deixará na forma HTML - e esse resultado colocamos no lugar escolhido no passo 4.
*/
document.addEventListener('click', (event) => {
  if (event.target.className === 'item__add') {
    const id = event.target.parentElement.firstElementChild.innerText;
    fetchItem(id).then((data) => {
      // console.log(data.salePrice);
      const item = document.querySelector('.cart__items');
      item.appendChild(createCartItemElement(data));
      // ------------------------------[requisito 4]--------------------------------------------
      sumPrice(data.salePrice); // [requisito 9 - parte 1]
      // -------------------------[requisito 8 - Parte 1]---------------------------------------
      /* Problemática - 
      1 - Queremos colocar os itens à direita no localStorage. Porém, esses itens são criados de duas formas :
      1 - clicando no 'adicionar ao carrinho'
      2 - Clicando no próprio item para ele sumir e ter uma lista nova.
  1 - pegando os itens que são oriundos do botão 'adicionar ao carrinho':
*/
      saveCartItems(item.innerHTML);
    });
  }
});
// ------------------------------[requisito 8 - Parte 1]-----------------------------------

/* if (localStorage.getItem('cartItems') === null) {
  console.log('oi oi ')
  localStorage.setItem('cartItems', JSON.stringify([data]));
} else {
  const oldItens = getSavedCartItems();
  const array = [];
  console.log(JSON.parse(oldItens))
  array.push(data);
  console.log(array);
  saveCartItems(array);
} */
// funcção para pegar os itens e adicioná-los, mas está pegando só o último item saveCartItems(createCartItemElement(data));
/*  const info = data;
 const array = [];
 array.push(info);
 console.log(array); */
// console.log(data);

/* const renderItem = async () => {
  const item = await fetchItem();
  console.log(item);
  const divProduct = document.querySelector('.cart__items');
  const productItem = createCartItemElement(item);
  divProduct.appendChild(productItem);
}; */

limpar.addEventListener('click', () => {
  // console.log('limpar ativado');
  cartItem.innerHTML = '';
  localStorage.clear();
  price.innerHTML = 0;
});

window.onload = () => {
  renderPorducts();
  renderCarItem();
};

/* 
requisito 9  - 
Problemática: 
pegar todos os preços que aparecem à direita. Se adicionar ao carrinho, vai pegar todos os preços vistos. Se tirar um produto, vai pegar todos os preços restantes. Se atualizar a página, vai pegar todos os preços à direita. Raciocínio análogo ao requi 8, porém ao invés de adicionar ao localStorage, vai pegar os valores e somar. 
1 - Pega o preço do item clicado no 'adicionar ao carrinho'
2 - Retirar o preço do item clicado na lista
*/