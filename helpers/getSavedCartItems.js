const getSavedCartItems = () => localStorage.getItem('cartItems');
// seu código aqui

getSavedCartItems();
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
