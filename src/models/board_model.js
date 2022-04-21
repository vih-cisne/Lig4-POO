import {Cell} from "./cell_model.js"
//import { Player } from "./player_model.js"
export class Board {
    constructor(columns, rows, players) {
        this._columns = columns
        this._rows = rows
        this._map = []
        this._players = players
        this._currentPlayer = this._players[0]
    }

    confirmReload(element) {
        if(element.id='sim') {
            document.querySelector('body').removeChild(modal)
            document.querySelector('main').style.opacity='1'

            console.log('reload')
            const container = document.getElementById('table')
            this.renderMap(container)
        }
    }

    get columns() {
        return this._columns
    }
      
    set columns(_) {
        throw 'Cant change this value'
    }

    get rows() {
        return this._rows
    }
      
    set rows(_) {
        throw 'Cant change this value'
    }
      
    get map() {
        return this._map
    }   
      
    set map(array) {
        this._map=array
    }
      
    get players() {
        return this._players
    }
      
    set players(_) {
        throw 'Cant change this value'
    }
      
    get currentPlayer() {
        return this._currentPlayer
    }
      
    set currentPlayer(player) {
    if(player){ // Validação se o jogador existe
            this._currentPlayer = player
        }
    }

    createEmptyMap() {
        // Array matrix onde iremos adicionar nossas linhas e colunas
        const map = [] 
        // Loop em cima do total determinado de linhas
        for (let index = 0; index < this.rows; index++) { 
            // Inserindo novos array as linhas, o new Array cria um array 
            // com o total de espaços vazios que forem passados
            map.push(new Array(this.columns))
        }
        // Retornando essa matrix para uso
        return map
      }
    
    renderMap(container) {
        this.map=this.createEmptyMap()

        const player1=document.querySelector('#player1')
        player1.innerText=this.players[0].name

        const player2=document.querySelector('#player2')
        player2.innerText=this.players[1].name
        const mostrador=document.querySelector('#mostrador')
        mostrador.innerText=`Vez de ${this.currentPlayer.name}`
    
          container.innerText = ''
          
          for(let indexColuna = 0; indexColuna < this.columns; indexColuna++) {
              const column = document.createElement('div') 
              column.classList.add('column')
              column.style.width = `${100/this.columns}%`
              column.dataset.column = indexColuna
              column.addEventListener('click', (e) => this.handleClick(e,indexColuna))
      
              for(let indexLinha = 0; indexLinha < this.rows; indexLinha++) {
                  const celula = document.createElement('div')
                  celula.classList.add('cell')
                  celula.style.height = `${100/this.rows}%`
                  celula.dataset.row = indexLinha
                  column.appendChild(celula)
              }
      
              container.appendChild(column)
          }
    }

    switchPlayer() {
        const playerCurrent = this.players.indexOf(this.currentPlayer)
        const playerNext = (playerCurrent + 1)%this.players.length
        this.currentPlayer = this.players[playerNext]
        const mostrador=document.querySelector('#mostrador')
        mostrador.innerText=`Vez de ${this.currentPlayer.name}`
    }
//verificar onde esta funcao deve ficar
    handleClick(e,column) {
        const element = e.target;
    
        if (element.tagName === "BUTTON") {
            this.confirmReload(element)
        }else {
            let row = this.map.findIndex(row => row[column])
    
            if(row === -1) {
            row = this.rows
            }

        
            this.map[row - 1][column] = this.currentPlayer
            console.log(this.map[row - 1][column])
        //console.log(this.map[row - 1][coluna])
        //console.log(this.map[row - 1])
    
            const cell = new Cell(column, row, this.currentPlayer.className)
        
        //cell.render()
        
        //this.switchPlayer()

            cell.render()
            if(this.isWinnableMove(column,row-1)) {
                const mostrador=document.querySelector('#mostrador')
                console.log(`${this.currentPlayer.name} ganhou`)
                mostrador.innerText=`${this.currentPlayer.name} ganhou`
                this.jogarNovamente()
            } else {
                this.switchPlayer()
            }

        }
        //let coluna=column.dataset.column
        
    }

    isWinnableMove(column, row) {
        return  this.checkVertical(column, row)|| 
                this.checkHorizontal(column, row) || 
                this.checkDiagonalToLeft(column,row) ||
                this.checkDiagonalToRight(column,row)
    }

    checkVertical(column, row) {
        let end = row + 3
    
        if(end >= this.rows){
            end = this.rows -1
        }
    
        let counter = 0
        for (let index = row; index <= end; index++) {
            if(this.map[index][column] === this.currentPlayer) {
                counter++
            } else {
                counter = 0
            }
            if (counter === 4) {
                return true
            }
        }
        return false
    }

    checkHorizontal(column, row) {
        let end = column + 3
    
        if(end >= this.columns){
            end = this.columns -1
        }
    
        let counter = 0
        for (let index = column; index <= end; index++) {
            if(this.map[row][index] === this.currentPlayer) {
                counter++
            } else {
                counter = 0
            }
            if (counter === 4) {
                return true
            }
        }
        return false
    }

    checkDiagonalToRight(column,row) {
        let end = column - 3
    
        if(end <= 0){
            end = 0
        }

        let indexRow=row
     
        let counter = 0
        for (let indexColumn = column; indexColumn >= end; indexColumn--) {
            if(indexRow>=this.rows) {
                break
            }
            if(this.map[indexRow][indexColumn] === this.currentPlayer) {
                counter++
            } else {
                counter = 0
            }
            if (counter === 4) {
                return true
            }
            indexRow++
        }
        return false

    }

    checkDiagonalToLeft(column,row) {
        let end = column + 3
    
        if(end >= this.columns){
            end = this.columns -1
        }

        let indexRow=row
    
        let counter = 0
        for (let indexColumn = column; indexColumn <= end; indexColumn++) {
            if(indexRow>=this.rows) {
                break
            }
            if(this.map[indexRow][indexColumn] === this.currentPlayer) {
                counter++
            } else {
                counter = 0
            }
            if (counter === 4) {
                return true
            }
            indexRow++
        }
        return false

    }

    jogarNovamente() {
        const modal=document.createElement('div')
        modal.id='modal'
        const msg=document.createElement('p')
        msg.innerText='Jogar novamente?'
        const confirm=document.createElement('div')
        const buttonS=document.createElement('button')
        buttonS.innerText='SIM'
        buttonS.id='sim'
        const buttonN=document.createElement('button')
        buttonN.innerText='NÃO'
        confirm.append(buttonN)
        confirm.append(buttonS)
        modal.append(msg)
        modal.append(confirm)

        document.querySelector('body').append(modal)
        document.querySelector('main').style.opacity='0.5'

        buttonS.addEventListener('click',(e) => this.handleClick(e))
    }


}

  
