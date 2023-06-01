class ConversorRomano {
  constructor() {
    this.valores = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  }

  romanoParaArabico(numeroRomano) {
    let arabico = 0;
    let anterior = 0;

    for (let i = numeroRomano.length - 1; i >= 0; i--) {
      const valorAtual = this.valores[numeroRomano[i]];
      if (valorAtual >= anterior) {
        arabico += valorAtual;
      } else {
        arabico -= valorAtual;
      }
      anterior = valorAtual;
    }

    return arabico;
  }

  arabicoParaRomano(numeroArabico) {
    if (numeroArabico <= 0 || numeroArabico >= 4000) {
      return 'Número inválido';
    }

    let numeroRomano = '';
    for (const numeral in this.valores) {
      const valor = this.valores[numeral];
      while (numeroArabico >= valor) {
        numeroRomano += numeral;
        numeroArabico -= valor;
      }
    }

    return numeroRomano;
  }
}

// Exemplos de uso
const conversor = new ConversorRomano();
console.log(conversor.romanoParaArabico('XXIV')); // Saída: 24
console.log(conversor.arabicoParaRomano(3999)); // Saída: MMMCMXCIX
