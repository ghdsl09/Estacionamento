// Passo 1: Definição das variáveis globais
const vagasTotais = 50;
let vagasDisponiveis = vagasTotais;
let caixa = 0;
const veiculosEstacionados = [];
const listaIncidentes = []; // <-- A nova lista para guardar os incidentes

// Função de Entrada de Veículo
function entradaVeiculo(cnh, placa, cor, modelo) {
    if (vagasDisponiveis > 0) {
        const novoCarro = {
            cnh: cnh,
            placa: placa,
            cor: cor,
            modelo: modelo,
            horarioEntrada: new Date()
        };
        
        veiculosEstacionados.push(novoCarro);
        vagasDisponiveis--;
        
        console.log(`\n--- Entrada de Veículo ---`);
        console.log(`Carro de placa ${placa} entrou. Vagas disponíveis: ${vagasDisponiveis}`);
        console.log(`--------------------------\n`);
        return true;
    } else {
        console.log("Estacionamento lotado!");
        return false;
    }
}

// Função de Saída de Veículo
function saidaVeiculo(placa) {
    const carroEncontrado = veiculosEstacionados.find(carro => carro.placa === placa);

    if (!carroEncontrado) {
        console.log(`Carro de placa ${placa} não encontrado.`);
        return false;
    }

    const agora = new Date();
    const tempoEstacionadoEmHoras = (agora - carroEncontrado.horarioEntrada) / (1000 * 60 * 60);
    const duracaoTurnoEmHoras = 6;
    const turnosCompletos = Math.ceil(tempoEstacionadoEmHoras / duracaoTurnoEmHoras);
    const valorAPagar = turnosCompletos * 10;

    caixa += valorAPagar;
    vagasDisponiveis++;
    
    const index = veiculosEstacionados.indexOf(carroEncontrado);
    veiculosEstacionados.splice(index, 1);

    console.log(`\n--- Saída de Veículo ---`);
    console.log(`Placa: ${placa}`);
    console.log(`Tempo estacionado: ${tempoEstacionadoEmHoras.toFixed(2)} horas.`);
    console.log(`Turnos cobrados: ${turnosCompletos}`);
    console.log(`Valor pago: R$ ${valorAPagar.toFixed(2)}`);
    console.log(`Vagas disponíveis: ${vagasDisponiveis}`);
    console.log(`Caixa total: R$ ${caixa.toFixed(2)}`);
    console.log(`-------------------------\n`);

    return true;
}

// A nova função para registrar incidentes
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
}


// Abertura do estacionamento
const horarioFechamento = 20; // 8pm em formato 24h
let horarioAtual = 8; // Começamos às 8am

// Loop principal que simula o dia
while (horarioAtual < horarioFechamento) {
    console.log(`\n--- Horário: ${horarioAtual}:00 ---`);
    
    // Simulação: entrada de 3 carros
    if (horarioAtual === 9) {
        entradaVeiculo('123456789', 'ABC-1234', 'Preto', 'Sedan');
        entradaVeiculo('987654321', 'DEF-5678', 'Branco', 'SUV');
        entradaVeiculo('111222333', 'GHI-9101', 'Cinza', 'Hatch');
    }

    // Simulação: um carro sai
    if (horarioAtual === 13) {
        saidaVeiculo('ABC-1234');
    }
    
    // Simulação: um novo carro entra
    if (horarioAtual === 14) {
        entradaVeiculo('444555666', 'JKL-2345', 'Vermelho', 'Pickup');
    }

    // Simulação: um incidente acontece
    if (horarioAtual === 15) {
        registrarIncidente('DEF-5678', 'JKL-2345', 'Arranhou a lateral do carro ao manobrar.');
    }
    
    // Aumentamos o horário para simular a passagem do tempo.
    horarioAtual++;
}

// Lógica de encerramento do dia, que acontece após o loop.
console.log("\n--- Estacionamento Fechado ---");
console.log(`Total arrecadado no dia: R$ ${caixa.toFixed(2)}`);
console.log(`Veículos restantes: ${veiculosEstacionados.length}`);
console.log(`Incidentes registrados: ${listaIncidentes.length}`);
console.log(`----------------------------`);

// Exibimos a lista de incidentes no final do dia
if (listaIncidentes.length > 0) {
    console.log("\n--- Relatório de Incidentes ---");
    listaIncidentes.forEach(incidente => {
        console.log(`- Data: ${incidente.data.toLocaleDateString()} ${incidente.data.toLocaleTimeString()} | Causador: ${incidente.placaCausador} | Vítima: ${incidente.placaVitima} | Descrição: ${incidente.descricao}`);
    });
    console.log(`---------------------------------`);
} else {
    console.log("\nNenhum incidente foi registrado hoje.");
}