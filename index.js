const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const vagasTotais = 50;
let vagasDisponiveis = vagasTotais;
let caixa = 0;
const valorPorTurno = 10;
const duracaoTurnoEmHoras = 6;
let veiculosEstacionados = []; // Array para armazenar os veículos atualmente estacionados
let historicoEntradas = []; // Array para armazenar o histórico de entradas e saídas
let historicoSaidas = []; // Array para armazenar o histórico de entradas e saídas
let listaIncidentes = []; // Array para armazenar os incidentes

//objeto a ser preenchido pelo atendimento do estacionamento
let veiculo = {
  placa: {},
  modelo: {},
  cor: {},
  horaEntrada: {},
  horaSaida: {},
  cnh: {},
  nomeMotorista: {},
  telefone: {},
};

function entradaDeVeiculo(cnh, nomeMotorista, telefone, placa, modelo, cor) {
  if (vagasDisponiveis > 0) {
    const novoVeiculo = {
      placa,
      modelo,
      cor,
      horaEntrada: new Date(),
      cnh,
      nomeMotorista,
      telefone
    };
    veiculosEstacionados.push(novoVeiculo);
        historicoEntradas.push(novoVeiculo);
        vagasDisponiveis--;
    console.log(`veiculo de placa $(placa), $(modelo) e cor $(cor) entrou no estacionamento as ${novoVeiculo.horaEntrada.toLocaleTimeString()}`);
    console.log(`Vagas disponíveis agora: ${vagasDisponiveis}\n`);
    return true;
  } else {
    console.log('Desculpe, não há vagas disponíveis no momento.');
    return false;
  }
};

function saidaDoVeículo(placa) {
    const veiculoIndex = veiculosEstacionados.findIndex(veiculo => veiculo.placa === placa);
    
    if (veiculoIndex !== -1) {
      const veiculoEncontrado = veiculosEstacionados[veiculoIndex];
      veiculoEncontrado.horaSaida = new Date();
      console.log(`veiculo de placa $placa(placa) saiu do estacionamento as $horaSaida(veiculoEncontrado.horaSaida)`);
      
      const tempoEstacionadoEmHoras = (veiculoEncontrado.horaSaida - veiculoEncontrado.horaEntrada) / (1000 * 60 * 60);
      const turnosEstacionado = Math.ceil(tempoEstacionadoEmHoras / duracaoTurnoEmHoras);
      const custoTotal = turnosEstacionado * valorPorTurno;
      
      caixa += custoTotal;
      historicoSaidas.push(veiculoEncontrado);
      veiculosEstacionados.splice(veiculoIndex, 1);
      vagasDisponiveis++;

      console.log(`\nVeículo de placa ${placa} saiu do estacionamento às ${veiculoEncontrado.horaSaida.toLocaleTimeString()}.`);
      console.log(`O veículo ficou estacionado por ${tempoEstacionadoEmHoras.toFixed(2)} horas.`);
      console.log(`Custo total: R$${custoTotal.toFixed(2)}.`);
      console.log(`Total pago no caixa: R$${caixa.toFixed(2)}`);
      console.log(`Vagas disponíveis: ${vagasDisponiveis}\n`);
      
      return true;
    } else {
      console.log('Veículo não encontrado no estacionamento.');
      return false;
    };
  };

function registrarIncidente(placaCausador, placaVitima, descricao) {
    const novoIncidente = {
        data: new Date(),
        placaCausador,
        placaVitima,
        descricao
    };
    listaIncidentes.push(novoIncidente);
    
    console.log(`\n--- Incidente Registrado ---`);
    console.log(`Data: ${novoIncidente.data.toLocaleDateString()} ${novoIncidente.data.toLocaleTimeString()}`);
    console.log(`Veículo causador: ${placaCausador}`);
    console.log(`Veículo vítima: ${placaVitima}`);
    console.log(`Descrição: ${descricao}`);
    console.log(`---------------------------\n`);
};

function menu() {
  console.log('--------------------------------------------------');
  console.log('O que você gostaria de fazer?');
  console.log('1. Registrar entrada de veículo');
  console.log('2. Registrar saída de veículo');
  console.log('3. Ver vagas disponíveis');
  console.log('4. Ver total no caixa');
  console.log('5. Registrar um incidente');
  console.log('6. Encerrar dia de trabalho');
  console.log('--------------------------------------------------');

  rl.question('Escolha uma opção (1-6): ', (opcao) => {
    switch (opcao) {
        case '1':
            rl.question('Digite a CNH do motorista: ', (cnh) => {
                rl.question('Digite o nome do motorista: ', (nomeMotorista) => {
                    rl.question('Digite o telefone do motorista: ', (telefone) => {
                        rl.question('Digite a placa do veículo: ', (placa) => {
                            rl.question('Digite o modelo do veículo: ', (modelo) => {
                                rl.question('Digite a cor do veículo: ', (cor) => {
                                    if (entradaDeVeiculo(cnh, nomeMotorista, telefone, placa, modelo, cor)) {
                                        vagasDisponiveis--;
                                        veiculosEstacionados.push({
                                            placa,
                                            modelo,
                                            cor,
                                            horaEntrada: new Date(),
                                            cnh,
                                            nomeMotorista,
                                            telefone
                                        });
                                        historicoEntradas.push({
                                            placa,
                                            modelo,
                                            cor,
                                            horaEntrada: new Date(),
                                            cnh,
                                            nomeMotorista,
                                            telefone
                                        });
                                        console.log(`Veículo de placa ${placa} registrado com sucesso.`);
                                        console.log(`Vagas disponíveis agora: ${vagasDisponiveis}`);
                                    }
                                    menu();
                                });
                            });
                        });
                    });
                });
            });
            break; 
        case '2':
            rl.question('Digite a placa do veículo que está saindo: ', (placa) => {
                if (saidaDoVeiculo(placa)) {
                    vagasDisponiveis++;
                    const veiculoSaida = veiculosEstacionados.find(veiculo => veiculo.placa === placa);
                    if (veiculoSaida) {
                        historicoSaidas.push({
                            ...veiculoSaida,
                            horaSaida: new Date()
                        });
                        const index = veiculosEstacionados.indexOf(veiculoSaida);
                        veiculosEstacionados.splice(index, 1);
                    }
                    menu();
                }
            });
            break;
        case '3':
            console.log(`Vagas disponíveis: ${vagasDisponiveis}`);
            menu();
            break;
        case '4':
            console.log(`Total no caixa: R$${caixa.toFixed(2)}`); 
            menu();
            break;
        case '5':
            rl.question('Digite a placa do veículo causador: ', (placaCausador) => {
                rl.question('Digite a placa do veículo vítima: ', (placaVitima) => {
                    rl.question('Descreva o incidente: ', (descricao) => {
                        registrarIncidente(placaCausador, placaVitima, descricao);
                        menu();
                    });
                });
            });
            menu();
            break;
        case '6':
            console.log('Encerrando o dia de trabalho...');
            rl.close();
            break;
        default:
            console.log('Opção inválida. Por favor, escolha uma opção entre 1 e 5.');
            menu();
            break;
    }

  })
};

// --- INÍCIO DO PROGRAMA ---
console.log('Bem-vindo ao sistema de gerenciamento de estacionamento! São 08h, o dia de trabalho começou.');
console.log(`Hoje temos ${vagasTotais} vagas disponíveis.`);
menu();
