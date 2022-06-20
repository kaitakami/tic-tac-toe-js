const gameBoard = (() => {
    const tilesContainer = document.querySelector('.game-container')
    const endDisplay = document.querySelector('.end-display')

    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile')
        tile.setAttribute('id', i)
        tilesContainer.append(tile)
        tile.addEventListener('click', () => logicGame.selectTile(tile), { once: 1 })
    }

    const swapTurn = () => {
        tilesContainer.classList.toggle('x-turn')
        tilesContainer.classList.toggle('o-turn')
        logicGame.xPlayer.status = !logicGame.xPlayer.status
        logicGame.oPlayer.status = !logicGame.oPlayer.status
    }

    const displayMessage = () => {
        const message = document.querySelector('.end-message')
        const buttonRestart = document.querySelector('.restart-button')
        endDisplay.classList.add('display')

        if (logicGame.xPlayer.status) {
            message.textContent = 'X\'s win the game!'
        } else {
            message.textContent = 'O\'s win the game!'
        }
    }

    return {
        tilesContainer,
        swapTurn,
        displayMessage
    }
})()


const logicGame = (() => {
    // Factory Function
    const factoryPlayer = (status) => {
        status: status
        let positions = []
        return {
            status,
            positions
        }
    }

    let xPlayer = factoryPlayer(true)
    let oPlayer = factoryPlayer(false)

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

    const selectTile = (tile) => {
        const index = parseInt(tile.getAttribute('id'))
        if (xPlayer.status) {
            tile.classList.add('x')
            xPlayer.positions.push(index)
            checkWin(xPlayer.positions)
        } else if (oPlayer.status) {
            tile.classList.add('o')
            oPlayer.positions.push(index)
            checkWin(oPlayer.positions)
        }
        gameBoard.swapTurn()
    }

    const checkWin = (positions) => {
        let gameOver = winCombinations.some(combination => {
            return combination.every(position => positions.includes(position))
        })
        if (gameOver) {
            gameBoard.displayMessage()
        }
    }

    return {
        selectTile,
        xPlayer,
        oPlayer
    }
})()