require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('1 - Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('2 - Com o argumento `computador, verificar se fetch foi chamada`', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  });
  it('3 - com o argumento computador, a função fetch usa o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchProducts('computador')
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWidth(endpoint)
  });
  it('4 - Com o argumento computador, deve-se retornar um objeto igual a computadorSearch', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch)

  });
  it('5 - Se não passar um argumento, deve retornar um erro com a mensagem :You must provide an url', async () => {
    await expect(fetchProducts()).toThrow('You must provide an url')
  });
});

/* 1 
Para testar se uma funcção é função, temos que ver se o typeOf daquela declaração é function. 

2 
Primeiro executa a função para ver se tudo foi realizado - await fetchProducts('computador')

Depois temos que ver se fetch foi rodado atrvés do toHaveBeenCalled()

3  
- Executa a funcção com o await fetchProducts('computador') e depois verfica se o esperado da fetch é o endpoint 
- Para verificar se o endpoint é o esperado, use : toHaveBeenCalledWidth (com o endpoint desejado)

4;
- Executa a função com await fetchProducts('computador') 
- Vê se o retorno é o json computadorSearch

5 
- Executa a função com await fetchProducts('')
- Passa o erro com o toThrow() e a mensagem You must provide an url */
