require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const { fetchProducts } = require('../helpers/fetchProducts');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('1 - teste se fetchItem é uma função ', () => {
    expect(typeof fetchItem()).toBe('function')
  });
  it('2 - executando fetchItem com argumento MLB1615760527, a fetch tem de ser chamada', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  });
  it('3 - se chamar a função fetchItem com o parâmetro MLB1615760527, deve-se retornar um endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    await fetchItem('MLB1615760527')
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toHaveBeenCalledWidth(endpoint)
  });
  it('4 - Com o argumento MLB1615760527, deve-se retornar um objeto igual a item', async () => {
    expect(await fetchProducts('computador')).toEqual(item)
  });
  it('5 - Se não passar um MLB1615760527, deve retornar um erro com a mensagem :You must provide an url', async () => {
    await expect(fetchProducts()).toThrow('You must provide an url')
  });
});
