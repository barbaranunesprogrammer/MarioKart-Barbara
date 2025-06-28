const personagens = [
    {
        NOME: "Mario🧑‍🚒 ",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 3,
        PODER: 3,
        PONTOS: 0,
    },
    {
        NOME: "Luigi🪖 ",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS: 0,
    },
    {
        NOME: "Peach 👑 ",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 4,
        PODER: 2,
        PONTOS: 0,
    },
    {
        NOME: "Bowser 👹 ",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
    },
    {
        NOME: "Yoshi 🐲 ",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 5,
        PODER: 2,
        PONTOS: 0,
    }
];


function escolherPersonagem() {
    const personagem = [...personagens] // essa linha fiz uma copia do array de cima  sem afetar o original por isso os ...
    const escolher1 = Math.floor(Math.random() * personagem.length); // o Math.floor aredonda os numeros e o Math.random sorteia um numero aleatorio de 0 a 1  o length me fornece quantos personagens tem dentro do array
    const player1 = personagem.splice(escolher1, 1)[0]// o  splice pega o personagem que o Math.randon sorteou e retira ele de dentro do array ou lista para no proximo sorteio não seja sorteado o mesmo personagem e o salva como player1

    const escolher2 = Math.floor(Math.random() * personagem.length); //esse aqui faz um novo sorteio para o player2 mais sem opersonagem que ja foi escolhido para o player 1 .
    const player2 = personagem.splice(escolher2, 1)[0];// mesma coisa do de cima tira o personagem de dentro da lista o [0] pega somente o personagem que foi removido

    return [player1, player2] //retorna os personagens escolhidos deixando eles dentro da const

}




async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;  //floor vai aredondar 

}
async function getRandomBlock() {
    let random = Math.random()
    let result
    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;

        case random < 0.66:
            result = "CURVA";
            break;

        default:
            result = "CONFRONTO"
            break;
    }
    return result;

}
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)


}

async function playRaceEginer(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        //rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let TotalTestSkil1 = 0;
        let TotalTestSkil2 = 0;

        if (block === "RETA") {
            TotalTestSkil1 = diceResult1 + character1.VELOCIDADE
            TotalTestSkil2 = diceResult2 + character2.VELOCIDADE

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE)
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE)


        }
        if (block === "CURVA") {
            TotalTestSkil1 = diceResult1 + character1.MANOBRABILIDADE
            TotalTestSkil2 = diceResult2 + character2.MANOBRABILIDADE

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE)
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE)

        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`);
            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER)
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER)


            if (powerResult1 > powerResult2) {
                character1.PONTOS++;
                if (character2.PONTOS > 0) {
                    character2.PONTOS--;
                }
                console.log(`${character1.NOME} venceu o confronto! 🥇 +1 ponto ${character2.NOME} perdeu um ponto 🐢`)
            }
            if (powerResult2 > powerResult1) {
                character2.PONTOS++;
                if (character1.PONTOS > 0) {
                    character1.PONTOS--;
                }
                console.log(`${character2.NOME} venceu o confronto! 🥇 +1 ponto ${character1.NOME} perdeu um ponto 🐢`)
            }

            console.log(powerResult2 === powerResult1 ? "Confronto empatado ! Nenhum ponto foi perdido" : "")

        }
        if (TotalTestSkil1 > TotalTestSkil2) {
            console.log(`${character1.NOME} marcou um ponto`);
            character1.PONTOS++;

        } else if (TotalTestSkil2 > TotalTestSkil1) {
            console.log(`${character2.NOME} marcou um ponto `);
            character2.PONTOS++;
        }
        console.log("__________________________________");
    }
}
async function declareWinner(character1, character2) {
    console.log("Resultado Final : ")
    console.log(`${character1.NOME} : ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME} : ${character2.PONTOS} ponto(s)`)

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n ${character1.NOME} venceu a corrida , Parabéns 🏆`)
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n ${character2.NOME} venceu a corrida , Parabéns 🏆`)
    } else {
        console.log("A corrida terminou em empate")
    }
}


(async function main() {// ela que vai chamar as outras funçoes
    const [player1, player2] = escolherPersonagem();
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`)

    await playRaceEginer(player1, player2)
    await declareWinner(player1, player2)
})();