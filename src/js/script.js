import {Player} from "../models/player_model.js"
import {Board} from "../models/board_model.js"  
  
  
  let player1=new Player('Ana','player1')
  let player2=new Player('Davi','player2')
  let players=[player1,player2]
  //const container=document.getElementById('table')
  //const board=new Board(6,6,players) 
  //board.renderMap(container)*/

  let board = new Board(6,6,players)
  const container = document.getElementById('table')
  board.renderMap(container)

