import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";

import "./ChessComponent.css";

const Chess = require("chess.js");

type ChessComponentProps = {
    color: any,
    onMove: any,
}

const ChessComponent = ({color,onMove}:ChessComponentProps) => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
    //   setTimeout(() => {
    //     const moves = chess.moves();

    //     if (moves.length > 0) {
    //       const computerMove = moves[Math.floor(Math.random() * moves.length)];
    //       chess.move(computerMove);
    //       setFen(chess.fen());
    //     }
    //   }, 300);

      const fen = chess.fen();

      setFen(fen);
      onMove({"fen":fen,"lastMove":move})
    }
  };

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
            marginBottom:"10px",
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


