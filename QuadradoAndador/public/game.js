export default function createGame(){

    const state = {
        players: {},
        frutas:{},
        tela:{
            width:40,
            height:40
        }
    }

    const observers = []

    function start() {
        const frequency = 2000

        setInterval(addFruta,frequency)
    }

    function subscribe(observerFunction){
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for(const observerFunction of observers){
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command){
        const playerId = command.playerId;
        const playerX = "playerX" in command ? command.playerX : Math.floor(Math.random() * state.tela.width)
        const playerY = "playerY" in command ? command.playerY : Math.floor(Math.random() * state.tela.height)
        
        
        state.players[playerId] = {
            x:playerX,
            y:playerY
        }

        notifyAll({
            type: "add-player",
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        }) 
    }

    function removePlayer(command){
        const playerId = command.playerId;
        
        delete state.players[playerId]

        notifyAll({
            type: "remove-player",
            playerId: playerId
        }) 
    }

    function addFruta(command){
        const frutaId = command ? command.frutaId : Math.floor(Math.random() * 10000000)
        const frutaX = command ? command.frutaX : Math.floor(Math.random() * state.tela.width)
        const frutaY = command ? command.frutaY : Math.floor(Math.random() * state.tela.height)
        
        
        state.frutas[frutaId] = {
            x:frutaX,
            y:frutaY
        }

        notifyAll({
            type: "add-fruta",
            frutaId: frutaId,
            frutaX: frutaX,
            frutaY: frutaY
        }) 
    }

    function removeFruta(command){
        const frutaId = command.frutaId;
        
        delete state.frutas[frutaId]

        notifyAll({
            type: "remove-fruta",
            frutaId: frutaId
        }) 
    }

    function movePlayer(command){
        notifyAll(command)

        const acceptedMoves = {

            w(player){
                
                if(player.y > 0){
                    player.y = player.y - 1;
                }
            
            },
            a(player){
                
                if(player.x > 0){
                    player.x = player.x - 1;
                }
            },
            s(player){
                
                if(player.y + 1 < state.tela.height){
                    player.y = player.y + 1;
                }
            },
            d(player){
                
                if(player.x + 1 < state.tela.width){
                    player.x = player.x + 1;
                }
            }
        }
        
        const keyPressed = command.keyPressed;
        const playerId = command.playerId
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if(player && moveFunction){

            moveFunction(player)
            checkForFruitCollision(playerId)
        }
   
    }

    function checkForFruitCollision(playerId) {
            const player = state.players[playerId]
            
            for(const frutaId in state.frutas){
                const fruta = state.frutas[frutaId]
                console.log(`Checking ${playerId} and ${frutaId}`)

                if(player.x === fruta.x && player.y === fruta.y){
                    console.log(`COLLISION between ${playerId}`)
                    removeFruta({frutaId: frutaId})
                }
            }

    }

    return {
        addPlayer,
        removePlayer,
        addFruta,
        removeFruta,
        movePlayer,
        state,
        setState,
        subscribe,
        start
    }

}