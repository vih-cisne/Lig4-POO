import {Player} from "../models/player_model.js"
import {Board} from "../models/board_model.js"  
  
  
  let player1=new Player('Ana','nsei')
  let player2=new Player('Davi','nsei')
  let players=[player1,player2]
  const container=document.getElementById('table')
  const board=new Board(6,6,players) 
  board.renderMap(container)