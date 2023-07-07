const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');

  it('1 - Ao chamar a função saveCartItems com o argumento <ol><li>Item</li></ol>, deve-se verficar se o método localStorage.setItem é chamado ', () => {
    const call = saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();

  });
  it('2 - Ao chamar a função saveCartItems com o argumento <ol><li>Item</li></ol>, deve-se verficar se o método localStorage é chamado com dois parâmetros, um sendo cartItems e o outro <ol><li>Item</li></ol> ', () => {
    const call = saveCartItems('<ol><li>Item</li></ol>');

    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');

  });
});
