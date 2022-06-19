// This IIFE will treat with everything that is related with the DOM
const gameBoard = (() => {
    const tilesContainer = document.querySelector('.game-container')
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile')
        tile.setAttribute('id', i)
        tilesContainer.append(tile)
        tile.addEventListener('click', () => logicGame.selectTile(tile, i), { once: 1 })
    }

    const swapTurn = () => {
        tilesContainer.classList.toggle('x-turn')
        tilesContainer.classList.toggle('o-turn')
        logicGame.xPlayer.status = !logicGame.xPlayer.status
        logicGame.oPlayer.status = !logicGame.oPlayer.status
    }

    return {
        tilesContainer,
        swapTurn,
    }
})()


// This IIFE will treat with that is related with the logic of the game
const logicGame = (() => {
    const factoryPlayer = (status) => {
        status: status
        let positions = []
        return {
            status,
            positions
        }
    }

    const xPlayer = factoryPlayer(true)
    const oPlayer = factoryPlayer(false)

    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const selectTile = (tile, index) => {
        if (xPlayer.status) {
            tile.classList.add('x')
            xPlayer.positions.push(index)
            if (xPlayer.positions.length > 2) {
                checkWin(xPlayer.positions)
            }
            console.log(xPlayer.positions)
        } else if (oPlayer.status) {
            tile.classList.add('o')
            oPlayer.positions.push(index)
            if (oPlayer.positions.length > 2) {
                checkWin(oPlayer.positions)
            }
            console.log(oPlayer.positions)
        }
        
        gameBoard.swapTurn()
    }

    const checkWin = (positions) => {
        const won = winCombinations.some(combination => {
            return combination.every(position => positions.includes(position))
        })
        console.log(won)

        if (won) {
            console.log('hello')
        }

        // displayMessage(xPlayer.status)
    }

    return {
        selectTile,
        xPlayer,
        oPlayer
    }
})()