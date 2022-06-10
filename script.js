const cartItem = document.querySelector('.cart__items');

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
/* Cria toda a estrutura de objeto que estava no arquivo fetchProducts */
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
2 - chama a função fetchPorducts, pois ela tem os dados da API e já retonando-os como objetos, mas para isso precisa esperar todas os dados chegarem, usaremos então o await
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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// ------------------------------[requisito 8]--------------------------------------------
/* 
Ao renderizar a página, trazemos as informações do localStorage através do cartItem (região que estará a lista) e innerHTML (que é para escrever nessa região o que queremos). Queremos então escrever a estrutura HTML que foi salva no LocalStorage.
*/
const renderCarItem = () => {
  cartItem.innerHTML = getSavedCartItems();
};
/* 
2 - Nova lista formada pela itens excluídos ao serem clicados.
A região que for clicada, vai perder as propriedades e com isso sairá da lista.
A nova lista será adicionada ao LocalStorage e com isso atualizará qualquer coisa que estiver salva lá, sobreescrevendo.
*/
const cartItemClickListener = (event) => {
  // coloque seu código aqui
  const itemProduct = event.target;
  itemProduct.remove();
  console.log(cartItem);
  saveCartItems(cartItem.innerHTML);
};
/* 
3 - A região que for clicada, vai perder as propriedades e com isso sairá da lista.
Pegamos a nova lista, sem o itens clicados - pois foram excluídos - e colocamos no localStorage para atualizar a lista salva. 
*/
cartItem.addEventListener('click', (event) => {
  // const item = document.querySelector('.cart__item');
  event.target.remove();
  saveCartItems(cartItem.innerHTML);
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

document.addEventListener('click', (event) => {
  if (event.target.className === 'item__add') {
    const id = event.target.parentElement.firstElementChild.innerText;
    fetchItem(id).then((data) => {
      // console.log(data);
      const item = document.querySelector('.cart__items');
      item.appendChild(createCartItemElement(data));
      console.log(item);
// ------------------------------[requisito 8]--------------------------------------------
/* 
Problemática - 
1 - Queremos colocar os ítens da direita no localStorage. Porém, esses itens são criados de duas formas e para cada forma de crição do itens, vamos criar uma possibilidade de adicionar ao localStorage.
1 - clicando no adicionar ao carrinho 
2 - Clicando no próprio item para ele sumir e ter uma lista nova.
*/
// primeira forma - pegando os itens que são oriundos do botão adicionar ao carrinho:
      saveCartItems(item.innerHTML);
    });
  }
});
// ------------------------------[requisito 8]--------------------------------------------

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

window.onload = () => {
  renderPorducts();
  renderCarItem();
}; 
