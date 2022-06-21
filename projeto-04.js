const prompt = require('prompt-sync')();
console.clear();

let enter;
let escolha;
let perguntarUmaVez = 0;

let horaExtra = 0;

const personagem = {
    verificarIdade: function () {
        if (this.idade < 18) {
            return 'menor';
        } else if (this.idade < 30) {
            return 'adolescente';
        } else if (this.idade < 50) {
            return 'adulto';
        } else {
            return 'velho';
        }
    },
};

const status = {
    energia: 10,
    saude: 7,
    fome: 6,
    higiene: 5,
    dinheiro: 5,

    horas: 00,
    minutos: 00,
    dia: 0,

    exibirStatus: function () {
        console.clear();
        return console.log(`
        STATUS DO PERSONAGEM (de 0 a 10):
    
        Energia: ${this.energia}     Saúde: ${this.saude}       Fome: ${this.fome}
    
        Higiêne: ${this.higiene}      Dinheiro: ${this.dinheiro}
        
        ############################################################
    
        Horario: ${this.horas}:${this.minutos}     Dia: ${this.dia}
    
        ############################################################
        `);
    },

    testarHorario: function () {
        if (this.minutos >= 60) {
            this.horas++;
            this.minutos -= 60;
        }
    },

    aumentarHorarioHora: function () {
        this.minutos += 60;

        this.testarHorario();
    },

    aumentarHorario30: function () {
        this.minutos += 30;

        this.testarHorario();
    },

    aumentarHorario15: function () {
        this.minutos += 15;

        this.testarHorario();
    },

    testarDinheiro: function () {
        if (this.dinheiro == 0) {
            return false;
        } else if (this.dinheiro > 0) {
            return true;
        }
    },

    testarSaude: function () {
        if (this.saude <= 5) {
            console.log('Sua saúde esta comprometida!');
            console.log(`
            [1] - Tomar remédio (+3 Saúde /-1 Dinheiro)
            [2] - Deixar pra lá`);
            let escolhaSaude = prompt();

            while (isNaN(escolhaSaude)) {
                console.log('Digite uma opção válida!');
                escolhaSaude = prompt();
            }

            if (escolhaSaude == 1) {
                if (this.testarDinheiro() == true) {
                    this.saude += 3;
                    this.dinheiro--;
                } else if (this.testarDinheiro() == false) {
                    console.log('Você nao tem dinheiro!');
                }
            }

            if (this.saude == 0) {
                console.log('Você morreu de problemas de saúde!');
                return 'morreu';
            }
        }
    },
    testarFome: function () {
        if (this.fome < 0) {
            this.fome = 0;
        }
        if (this.fome > 10) {
            this.fome = 10;
        }
        if (this.fome >= 5) {
            if (this.horas < 12) {
                console.log('Você percebe que esta com fome!');
                console.log(`Então decide:
            [1] - Tomar café da manhã (-3 Fome /-1 Dinheiro)
            [2] - Fritar um hamburguer (-2 Fome /-1 Dinheiro /-1 Saúde)
            [3] - Deixar pra lá`);

                let escolhaFomeCafe = prompt();

                while (
                    escolhaFomeCafe != 1 &&
                    escolhaFomeCafe != 2 &&
                    escolhaFomeCafe != 3
                ) {
                    console.log('Digite uma opção válida!');
                    escolhaFomeCafe = prompt();
                }

                if (this.testarDinheiro() == true) {
                    if (escolhaFomeCafe == 1) {
                        console.log('Toma um saudável café da manhã!');
                        this.fome -= 3;
                        this.dinheiro -= 1;
                        this.aumentarHorario30();
                    } else if (escolhaFomeCafe == 2) {
                        console.log(
                            'Come um gorduroso e nada saudável, hambúrger!',
                        );
                        this.fome -= 2;
                        this.saude--;
                        this.dinheiro--;
                        this.aumentarHorario15();
                    }
                }
            } else if (this.horas < 18) {
                console.log('Você percebe que esta com fome!');
                console.log(`Então decide:
            [1] - Comer um almoço saudável (-3 Fome /-1 Dinheiro)
            [2] - Fast Food (-2 Fome /-1 Dinheiro /-1 Saúde)
            [3] - Deixar pra lá`);

                let escolhaFomeAlmoco = prompt();

                while (
                    escolhaFomeAlmoco != 1 &&
                    escolhaFomeAlmoco != 2 &&
                    escolhaFomeAlmoco != 3
                ) {
                    console.log('Digite uma opção válida!');
                    escolhaFomeAlmoco = prompt();
                }

                if (this.testarDinheiro() == true) {
                    if (escolhaFomeAlmoco == 1) {
                        console.log(
                            'Come uma pratada de arroz, feijão e carne!',
                        );
                        this.fome -= 3;
                        this.dinheiro -= 1;
                        this.aumentarHorario30();
                    } else if (escolhaFomeAlmoco == 2) {
                        console.log('Come um pastel pingando óleo!');
                        this.fome -= 2;
                        this.saude--;
                        this.dinheiro--;
                        this.aumentarHorario15();
                    }
                }
            } else if (this.horas > 18) {
                console.log('Você percebe que esta com fome!');
                console.log(`Então decide:
            [1] - Jantar (-3 Fome /-1 Dinheiro)
            [2] - Comer uma pizza de forno (-2 Fome /-1 Dinheiro /-1 Saúde)
            [3] - Deixar pra lá`);

                let escolhaFomeTarde = prompt();

                while (
                    escolhaFomeTarde != 1 &&
                    escolhaFomeTarde != 2 &&
                    escolhaFomeTarde != 3
                ) {
                    console.log('Digite uma opção válida!');
                    escolhaFomeTarde = prompt();
                }

                if (this.testarDinheiro() == true) {
                    if (escolhaFomeTarde == 1) {
                        console.log('Come uma macarronada daquelas!');
                        this.fome -= 3;
                        this.dinheiro -= 1;
                        this.aumentarHorario30();
                    } else if (escolhaFomeTarde == 2) {
                        console.log('Aquela pizza pra disfarçar a fome!');
                        this.fome -= 2;
                        this.saude--;
                        this.dinheiro--;
                        this.aumentarHorario15();
                    }
                }
            } else if (this.testarDinheiro() == false) {
                console.log('Você nao tem dinheiro!');
            }

            if (this.fome == 0) {
                this.saude--;
            }
        }
    },
    testarHigiene: function () {
        if (this.higiene < 0) {
            this.higiene = 0;
        }
        if (this.higiene > 10) {
            this.higiene = 10;
        }
        if (this.higiene <= 5) {
            console.log('Você nota que esta com mal cheiro!');
            console.log(`
            [1] - Escovar os dentes(+2 Higiêne)
            [2] - Ir tomar banho(+4 Higiêne)
            [3] - Deixar pra lá`);

            let escolhaHigiene = prompt();

            while (
                escolhaHigiene != 1 &&
                escolhaHigiene != 2 &&
                escolhaHigiene != 3
            ) {
                console.log('Digite uma opção válida!');
                escolhaHigiene = prompt();
            }

            if (escolhaHigiene == 1) {
                console.log('Dá aquele grau nos dentes!');
                this.higiene++;
                this.aumentarHorario15();
            } else if (escolhaHigiene == 2) {
                console.log('Faz uma limpeza completa com um banho!');
                this.higiene += 4;
                this.aumentarHorario30();
            }

            if (this.higiene == 0) {
                this.saude--;
            }
        }
    },

    transporte: function () {
        console.log(`Você tem duas opções:
    [1] - Ir de bicicleta (-2 Energia /-1 Higiêne /+1 Saúde)
    [2] - Ir de ônibus (-1 Energia /-1 Higiêne /-1 Dinheiro)`);
        escolha = prompt();

        while (escolha != 1 && escolha != 2) {
            console.log(`Você tem duas opções:
    [1] - Ir de bicicleta (-2 Energia /-1 Higiêne /+1 Saúde)
    [2] - Ir de ônibus (-1 Energia /-1 Higiêne /-1 Dinheiro)`);
            escolha = prompt();
        }
        if (escolha == 1) {
            console.log('Você escolhe ir de bike!');
            this.energia -= 2;
            this.higiene -= 1;
            this.saude += 1;
            this.aumentarHorarioHora();
            enter = prompt('Pressione ENTER.');
            this.exibirStatus();
            console.log('Uma hora se passou!');
        } else if (escolha == 2) {
            console.log('Você escolhe ir de busão!');
            this.energia -= 1;
            this.higiene -= 1;
            this.dinheiro -= 1;
            this.aumentarHorario30();
            enter = prompt('Pressione ENTER.');
            this.exibirStatus();
            console.log('Meia hora se passou!');
        }
    },

    almoco: function () {
        this.horas = 12;
        this.minutos = 0;
        this.energia -= 2;
        this.fome += 2;
        this.higiene -= 1;
    },

    saidaTrab: function () {
        this.horas = 19;
        this.minutos = 0;
        this.energia -= 2;
        this.fome += 2;
        this.higiene -= 1;
        this.dinheiro += 4 + horaExtra;
    },

    comecoDia: function () {
        this.horas = 7;
        this.minutos = 0;
        this.energia = 10;
        this.higiene -= 1;
        this.fome += 2;
        this.dia++;
    },
};

console.log(`O dia começou, a rotina diária é um desafio para todos.
E nao poderia ser diferente para você, heroi.
Sim, HEROI.
Heroi é um ser de acumulador de feitos e conquistas.
E qual a diferenca entre derrotar um horda de monstros e arrumar a cama ao se levantar?
Bom, talvez alguma armaduras ou algumas espadas, mas a forca de vontade é parecida... Foco na historia

Você tera mais um dia de oportunidades e conquistas, e suas escolhas influenciarao diretamente essas conquistas
Entao é bom pensar duas vezes antes de tomar qualquer atitude, isso ira impactar diretamente em seu dia.
`);

personagem.nome = prompt('Mas começando do começo: Qual é o seu nome? ');
console.log();

console.log(`${personagem.nome}... É um bom nome!`);
console.log();

personagem.idade = prompt('Quantos anos você tem? ');
console.log();

while (isNaN(personagem.idade)) {
    console.log('Digite um numero válido!');
    personagem.idade = prompt('Quantos anos você tem? ');
}
console.log();

if (personagem.verificarIdade() == 'menor') {
    console.log(`${personagem.idade} anos! Você ainda é um jovemzinho`);
    personagem.idadeStatus = personagem.verificarIdade();
} else if (personagem.verificarIdade() == 'adolescente') {
    console.log(`${personagem.idade} anos! Então você já é um adolescente!`);
    personagem.idadeStatus = personagem.verificarIdade();
} else if (personagem.verificarIdade() == 'adulto') {
    console.log(
        `${personagem.idade} anos! Você já é um adulto. Aproveite bem o seu tempo.`,
    );
    personagem.idadeStatus = personagem.verificarIdade();
} else {
    console.log(
        `${personagem.idade} anos! Você já chegou ja esta na melhor idade. Mas não é hora de parar, você ainda tem tempo pela frente!`,
    );
    personagem.idadeStatus = personagem.verificarIdade();
}
console.log();

personagem.cidade = prompt(`Qual cidade você mora, ${personagem.nome}? `);
console.log();

console.log(`${personagem.cidade} é uma cidade linda!`);
console.log();

console.log(`Muito bem!
Então você é ${personagem.nome}, um ${personagem.idadeStatus} de ${personagem.idade} anos que reside na cidade de ${personagem.cidade}
`);
console.log();

let dias = prompt('Quantos dias você irá viver nesse personagem? ');
while (isNaN(dias)) {
    console.log('Digite um número válido!');
    dias = prompt('Quantos dias você irá viver nesse personagem? ');
}
console.log();

while (status.dia < dias) {
    status.comecoDia();
    console.log('Vamos para o começo do seu dia!');
    enter = prompt('Pressione ENTER.');

    status.exibirStatus();

    console.log(
        'Você tem que estar no trabalho as 9h. Por isso costumar sair no maximo as 8h de casa para dar tempo.',
    );
    console.log(`Você acorda e olha para o relógio... `);

    enter = prompt('Pressione ENTER.');

    status.exibirStatus();

    console.log(`São ${status.horas}:${status.minutos}.`);

    while (status.horas < 8) {
        console.log('Ufa, ainda não está na hora!');
        console.log(`
    [1] - Levantar da cama para comer e se arrumar
    [2] - Mais "5 minutinhos"`);

        escolha = prompt();
        while (escolha != 1 && escolha != 2) {
            console.log('Digite uma opção válida!');
            escolha = prompt();
        }

        if (escolha == 1) {
            status.exibirStatus();
            console.log('Então você levanta da cama.');
            break;
        } else if (escolha == 2) {
            status.aumentarHorario30();
            status.exibirStatus();

            console.log('Você dormiu mais meia hora');
            console.log('Nunca são só mais 5 minutinhos!');
        }
    }
    while (true) {
        if (status.horas >= 8) {
            console.log('Caramba, ja esta na hora de sair!');
            console.log('Você sai as pressas de casa...');
            enter = prompt('Pressione ENTER.');
            status.exibirStatus();
            break;
        }
        while (perguntarUmaVez == 0) {
            status.testarFome();
            enter = prompt('Pressione ENTER.');
            status.exibirStatus();

            status.testarHigiene();
            enter = prompt('Pressione ENTER.');
            status.exibirStatus();

            perguntarUmaVez++;
        }
        if (status.horas < 8) {
            console.log('Você fica mexendo no celular e 15 minutos se passam!');
            enter = prompt('Pressione ENTER.');
            status.aumentarHorario15();
            status.exibirStatus();
        }
    }

    status.transporte();

    if (status.horas == 9 && status.minutos == 0) {
        console.log('Você chega no trabalho e já dá de cara com seu chefe!');
        console.log(
            `Muito bem, ${personagem.nome}. Você chegou no horário certinho!`,
        );
    } else if (status.horas >= 9 && status.minutos >= 0) {
        console.log('Você chega no trabalho e já dá de cara com seu chefe!');
        console.log(
            `${personagem.nome}, você esta atrasado e sabe que vai ser descontado do seu salário no final do dia né?`,
        );
        horaExtra--;
    } else {
        console.log('Você chega no trabalho e já dá de cara com seu chefe!');
        console.log(
            `Muito bem, ${personagem.nome}. Você esta adiantado. Irei te pagar um extra no final do dia!`,
        );
        horaExtra++;
    }
    enter = prompt('Pressione ENTER.');
    status.exibirStatus();

    console.log(
        'Entao você fica fazendo o seu serviço como um bom funcionario!',
    );

    enter = prompt('Pressione ENTER.');

    status.almoco();
    status.exibirStatus();

    console.log('A hora do almoço chegou!');
    status.testarFome();
    enter = prompt('Pressione ENTER.');

    status.exibirStatus();

    console.log('Você termina seu almoço e volta a trabalhar!');
    status.aumentarHorarioHora();
    enter = prompt('Pressione ENTER.');

    status.exibirStatus();

    console.log('E continuar trabalhando...');
    enter = prompt('Pressione ENTER.');
    status.saidaTrab();

    status.exibirStatus();
    console.log('E chegou a hora de ir embora!');
    console.log('Você ja passou no fincanceiro e recebeu seu dia!');

    console.log('Então você parte para casa!');

    status.transporte();

    enter = prompt('Pressione ENTER.');

    status.exibirStatus();

    console.log('Você chega em casa!');

    status.testarFome();
    console.log();

    status.testarHigiene();
    console.log();

    status.testarSaude();
    if (status.testarSaude() == 'morreu') {
        break;
    }
    console.log();

    enter = prompt('Pressione ENTER.');

    status.exibirStatus();

    console.log('Você começa a assistir sua série favorita!');
    status.aumentarHorario30();

    enter = prompt('Pressione ENTER.');

    status.exibirStatus();
    console.log('Meia hora se passa...');
    status.aumentarHorarioHora();

    enter = prompt('Pressione ENTER.');

    status.exibirStatus();
    console.log('Uma hora se passa...');

    enter = prompt('Pressione ENTER.');

    status.exibirStatus();
    console.log('Então você pega no sono...');

    enter = prompt('Pressione ENTER.');
    status.exibirStatus();
}

console.log('Fim do programa!');
