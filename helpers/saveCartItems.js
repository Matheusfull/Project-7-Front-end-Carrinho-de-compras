const saveCartItems = (param) => localStorage.setItem('cartItems', param);
  // seu código aqui
  /* 1 - if (localStorage.getItem('cartItems') == null) {
    localStorage.setItem('cartItems', JSON.stringify([]));
  }else{
não é válido porque ele não quer mostrar e sim, apenas, colocar no localStorage
  }; */
  // 2 - const itemAdd = document.getElementsByClassName('.cart__item')[0];
  // console.log(itemAdd);
  // console.log(param.innerHTML);
  // localStorage.setItem('cartItems', param);
  // console.log(local);

  // localStorage.setItem();

// saveCartItems();
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

/* 
Pegar cada um dos elementos e adicionar no localStorage

const variavel = os items do carrinho
paara adiciobar ao localStorage : localStorage.setItem('cartItems', JSON.stringify(variavel))
*/