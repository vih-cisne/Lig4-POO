
export class Board {
    constructor(columns, rows, players) {
        this._columns = columns
        this._rows = rows
        this._map = this.createEmptyMap()
        this._players = players
        this._currentPlayer = this._players[0]
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
      
    set map(_) {
        throw 'Cant change this value'
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
    
          container.innerText = ''
          
          for(let indexColuna = 0; indexColuna < this.columns; indexColuna++) {
              const column = document.createElement('div') 
              column.classList.add('column')
              column.style.width = `${100/this.columns}%`
              column.dataset.column = indexColuna
              column.addEventListener('click', () => {"Adicionaremos uma função de click futuramente"})
      
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
}

  
