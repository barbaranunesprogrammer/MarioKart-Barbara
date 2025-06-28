const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

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


            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto 🐢`)
                character2.PONTOS--;
            }
            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto 🐢`)
                character1.PONTOS--;
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
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`)

    await playRaceEginer(player1, player2)
    await declareWinner(player1, player2)
})();