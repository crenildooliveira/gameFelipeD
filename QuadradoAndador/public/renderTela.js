export default function renderTela(tela, game, requestAnimationFrame, currentPlayerId) {
    
    const context = tela.getContext("2d")
    context.fillStyle = "cornsilk"
    context.clearRect(0, 0, 40, 40)

    for (const playerId in game.state.players) {

        const player = game.state.players[playerId]
        context.fillStyle = "black"
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const frutaId in game.state.frutas) {

        const fruta = game.state.frutas[frutaId]
        context.fillStyle = "green"
        context.fillRect(fruta.x, fruta.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer){
        context.fillStyle = "#F0DB4F"
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    requestAnimationFrame(() => {
        renderTela(tela, game, requestAnimationFrame, currentPlayerId)
    })
}