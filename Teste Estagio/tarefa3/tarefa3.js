class Cliente {
    constructor(nome) {
      this.nome = nome;
      this.produtosConsumidos = [];
    }
  
    adicionarProduto(produto) {
      this.produtosConsumidos.push(produto);
    }
  }
  
  class Produto {
    constructor(nome, valor) {
      this.nome = nome;
      this.valor = valor;
    }
  }
  
  function calcularDivisaoConta(clientes) {
    let totalConta = clientes.reduce((total, cliente) => {
      return (
        total +
        cliente.produtosConsumidos.reduce((subtotal, produto) => {
          return subtotal + produto.valor;
        }, 0)
      );
    }, 0);
  
    let taxaServico = totalConta * 0.1;
  
    clientes.forEach((cliente) => {
      let valorConsumido = cliente.produtosConsumidos.reduce((total, produto) => {
        return total + produto.valor;
      }, 0);
  
      let valorPago = valorConsumido + valorConsumido * 0.1;
      console.log(`${cliente.nome} deve pagar: R$ ${valorPago.toFixed(2)}`);
    });
  
    console.log(`Valor total da conta: R$ ${totalConta.toFixed(2)}`);
    console.log(`Taxa de serviço (10%): R$ ${taxaServico.toFixed(2)}`);
  }
  
  // Exemplo de uso
  let joao = new Cliente("João");
  let maria = new Cliente("Maria");
  let pedro = new Cliente("Pedro");
  
  let pizza = new Produto("Pizza", 42.00);
  let refrigerante = new Produto("Refrigerante", 8.00);
  let suco = new Produto("Suco", 7.00);
  
  joao.adicionarProduto(pizza);
  joao.adicionarProduto(refrigerante);
  maria.adicionarProduto(pizza);
  maria.adicionarProduto(suco);
  pedro.adicionarProduto(pizza);
  pedro.adicionarProduto(refrigerante);
  
  calcularDivisaoConta([joao, maria, pedro]);