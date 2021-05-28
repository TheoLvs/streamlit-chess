import React, { useState,useEffect } from "react";
import Chessboard from "chessboardjsx";

import "./ChessComponent.css";

const Chess = require("chess.js");

const ChessComponent = ({color,onMove,white,black}) => {

  let startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  const [chess] = useState(
    new Chess(startFen)
  );

  const [fen, setFen] = useState(chess.fen());
  const [turn, setTurn] = useState("white");

  // // Similaire à componentDidMount et componentDidUpdate :
  // useEffect(() => {
  //   if (fen!==boardFen){
  //     console.log("STEP 2",fen,boardFen)
  //     onMove({"fen":_fen,"lastMove":""})
  //     setFen(_fen)
  //     setChess(new Chess(_fen))
  //   }
  // },[boardFen]);

  // Similaire à componentDidMount et componentDidUpdate :

  useEffect(() => {

    setTimeout(() => {
      if (turn==='white'){
        makeWhiteMove();
      } else {
        makeBlackMove();
      }
      // finishTurn();
    }, 300);

  },[turn]);


  const finishTurn = () => {
    if (turn === "white"){
      setTurn("black")
    } else {
      setTurn("white")
    }
  }


  const makeBlackMove = () => {
    if (black !== null){
      console.log("Black move")
      if (black === "random"){
        makeRandomMove()
        finishTurn(); 
    } else if (black.startsWith("http")){
        makeAPIMove(black)
      }
    }
  }

  const makeWhiteMove = () => {
    if (white !== null){
      console.log("White move")
      if (white === "random"){
        makeRandomMove()
        finishTurn();
      } else if (white.startsWith("http")){
        makeAPIMove(white)
      }
    }
  }


  const makeAPIMove = (endpoint) => {

    let url = new URL(endpoint)
    url.searchParams.append("fen",fen)
    url = url.toString()

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');


    fetch(url,{"method":"GET","headers":headers})
      // Handle success
      .then(response => response.json())  // convert to json
      .then(json => {
        console.log(json)
        handleMove(json["move"])
      })    //print data to console
      .catch(err => console.log('Request Failed', err)); // Catch errors

    
  }


  const makeRandomMove = () => {
    const moves = chess.moves();
    console.log(moves)
    if (moves.length > 0) {
      const computerMove = moves[Math.floor(Math.random() * moves.length)];
      chess.move(computerMove);
      setFen(chess.fen());
    }
  }


  const handleMove = (move) => {
    if (chess.move(move)) {

      const fen = chess.fen()
      setFen(fen)
      finishTurn();
      // console.log(fen);
      // onMove({"fen":fen,"last_move":move,"is_checkmate":chess.in_checkmate()})

    } else {
      console.log("ERROR",move,chess.fen())
    }
  };

  // useEffect(() => {
  //   if (move !== null){
  //     console.log(fen,chess.fen())
  //     chess.load(fen);
  //     console.log("move",move,chess)
  //     if (chess.move(move)) {
  //       const fen = chess.fen()
        
  //       setFen(fen)
  //     } else {
  //       console.log("ERROR",move,chess.fen())
  //     }
  //     // setFen(newFen)
  //     // chess.load(newFen)
  //     // onMove({"fen":newFen,"is_checkmate":chess.in_checkmate()})
  //   }
  // },[move]);  

  return (
    <div className="flex-center">
      <h4>Chess board</h4>
      <Chessboard
        width={400}
        id="chessboard"
        position={fen}
        transitionDuration={300}
        showNotation={true}
        orientation={color}
        boardStyle={{
            borderRadius: "5px",
            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
            marginBottom:"20px",
          }}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />
      <p>{fen}</p>
    </div>
  );
};

export default ChessComponent;


