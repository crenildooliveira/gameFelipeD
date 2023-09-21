export default function createGame(){

    const state = {
        players: {},
        frutas:{},
        tela:{
            width:40,
            height:40
        }
    }

    function addPlayer(command){
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;
        
        state.players[playerId] = {
            x:playerX,
            y:playerY
        }
    }

    function removePlayer(command){
        const playerId = command.playerId;
        
        delete state.players[playerId]
    }

    function addFruta(command){
        const frutaId = command.frutaId;
        const frutaX = command.frutaX;
        const frutaY = command.frutaY;
        
        state.frutas[frutaId] = {
            x:frutaX,
            y:frutaY
        }
    }

    function removeFruta(command){
        const frutaId = command.frutaId;
        
        delete state.frutas[frutaId]
    }

    function movePlayer(command){

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
        state
    }

}