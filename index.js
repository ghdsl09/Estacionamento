const readline = require('readline');
const { compileFunction } = require('vm');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const vagasTotais = 50;
let vagasDisponiveis = vagasTotais;
let caixa = 0;
const valorEstacionamento = 10;
let veiculosEstacionados = []; // Array para armazenar os veículos atualmente estacionados
let historicoEntradas = []; // Array para armazenar o histórico de entradas e saídas
let historicoSaidas = []; // Array para armazenar o histórico de entradas e saídas

//objeto a ser preenchido pelo atendimento do estacionamento
const veiculo = {
  placa: {},
  modelo: {},
  cor: {},
  horaEntrada: {},
  horaSaida: {},
  cnh: {},
  nomeMotorista: {},
  telefone: {},
};

function entradaDeVeiculo(cnh, nomeMotorista, telefone, placa, modelo, cor, telefone) {
  if (vagasDisponiveis > 0) {
    constNovoVeiculo = {
      placa,
      modelo,
      cor,
      horaEntrada: new Date(),
      cnh,
      nomeMotorista,
      telefone
    };
    console.log('veiculo de placa $placa(placa), $modelo(modelo) e cor $(cor) entrou no estacionamento as $horaEntrada(novoVeiculo.horaEntrada)');
    return true;
  } else {
    console.log('Desculpe, não há vagas disponíveis no momento.');
    return false;
  };

  function saidaDoVeículo(placa) {
    const veiculoEncontrado = veiculosEstacionados.find(veiculo => veiculo.placa === placa);
    if (veiculoEncontrado) {
      veiculoEncontrado.horaSaida = new Date();
      console.log('veiculo de placa $placa(placa) saiu do estacionamento as $horaSaida(veiculoEncontrado.horaSaida)');
      caixa += valorEstacionamento;
      vagasDisponiveis++;
      return true;
    } else {
      console.log('Veículo não encontrado no estacionamento.');
      return false;
    };
    const horaAtual = new Date ();
    const tempoEstacionadoEmHoras = (horaAtual - veiculoEncontrado.horaEntrada) / (1000 * 60 * 60);
    const custoPorTurnoEstacionado = 10.00; // em reais
    const duracaoDeTurno = 6; // em horas
    const turnosEstacionado = Math.ceil(tempoEstacionadoEmHoras / duracaoDeTurno);
    const custoTotal = turnosEstacionado * custoPorTurnoEstacionado;
    console.log('O veículo ficou estacionado por $tempoEstacionadoEmHoras(tempoEstacionadoEmHoras.toFixed(2)) horas. Custo total: R$$custoTotal(custoTotal.toFixed(2))');
    return true;

    const veiculoIndex = veiculosEstacionados.indexOf(veiculoEncontrado);
    veiculosEstacionados.splice(veiculoIndex, 1);
    console.log('Veículo de placa $placa(placa) saiu do estacionamento.');
    console.log('Total pago no caixa: R$$caixa(caixa.toFixed(2))');
    console.log('Vagas disponíveis: $vagasDisponiveis(vagasDisponiveis)');
    return true;
  };
};

//Inicio do dia de trabalho
console.log('Bem-vindo ao sistema de gerenciamento de estacionamento! são 08am, o dia de trabalho começou. Hoje temos $vagasTotais(vagasTotais) vagas disponíveis.');
const horarioDeFuncionamento = {
  horarioAtual: 8, // 8 AM
  Encerramento: 20, // 8 PM
};

while (horarioDeFuncionamento.horarioAtual < horarioDeFuncionamento.Encerramento) {
  console.log('São $horarioAtual(horarioDeFuncionamento.horarioAtual) horas. O que você gostaria de fazer?');
  console.log('1. Registrar entrada de veículo');
  console.log('2. Registrar saída de veículo');
  console.log('3. Ver vagas disponíveis');
  console.log('4. Ver total no caixa');
  console.log('5. Encerrar dia de trabalho');

  function registrarIncidente(placaCausador, placaVitima, descricao) {
    const novoIncidente = {
        data: new Date(),
        placaCausador: placaCausador,
        placaVitima: placaVitima,
        descricao: descricao
    };

    listaIncidentes.push(novoIncidente);

    console.log(`\n--- Incidente Registrado ---`);
    console.log(`Data: ${novoIncidente.data.toLocaleDateString()} ${novoIncidente.data.toLocaleTimeString()}`);
    console.log(`Veículo causador: ${placaCausador}`);
    console.log(`Veículo vítima: ${placaVitima}`);
    console.log(`Descrição: ${descricao}`);
    console.log(`---------------------------\n`);
};
};

console.log('O dia de trabalho terminou. O estacionamento está fechado agora.');
console.log('Total arrecadado no caixa: R$$caixa(caixa.toFixed(2))');
console.log('Veículos ainda estacionados:');


rl.close();


