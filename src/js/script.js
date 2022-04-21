import {Player} from "../models/player_model.js"
import {Board} from "../models/board_model.js" 

  let jogar=document.querySelector('#jogadores')
  jogar.addEventListener('click',function() {
    let player1=new Player(document.getElementsByName('name1')[0].value||'Player1','player1')
    let player2=new Player(document.getElementsByName('name2')[0].value||'Player2','player2')
    let celulas=document.getElementsByName('celulas')[0].value
    let players=[player1,player2]

    let board = new Board(celulas,celulas,players)
    const container = document.getElementById('table')
    board.renderMap(container)

    const nomes=document.querySelector('#nomes')
    nomes.style.display='none'
  })
  
  
  
  //const container=document.getElementById('table')
  //const board=new Board(6,6,players) 
  //board.renderMap(container)*/

  

