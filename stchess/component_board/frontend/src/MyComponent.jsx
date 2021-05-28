import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import ChessComponent from "./ChessComponent"



class MyComponent extends StreamlitComponentBase{
  state = { 
    fen: "",
    last_move:"",
    is_checkmate:false,
  }


  onMove = ({fen,last_move,is_checkmate}) => {

    let newState = {
      fen:fen,
      last_move:last_move,
      is_checkmate:is_checkmate,
    }
    this.setState(
      prevState => (newState),
      () => Streamlit.setComponentValue(this.state)
    )

  }

  // componentDidUpdate=(prevProps) => {
  //   if (prevProps.args["start_fen"] !== this.props.args["start_fen"]){
  //     console.log("HELLO",this.props.args)
  //   }

  // }

  render = () => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    const color = this.props.args["color"]
    const white = this.props.args["white"]
    const black = this.props.args["black"]

    console.log(white,black)



    // console.log(fen)

    // Show a button and some text.
    // When the button is clicked, we'll increment our "numClicks" state
    // variable, and send its new value back to Streamlit, where it'll
    // be available to the Python program.
    return (
      <div style={{"textAlign":"center","height":500}}>
        <ChessComponent color={color} white={white} black={black} onMove={this.onMove}/>
      </div>
    )
  }

  // /** Click handler for our "Click Me!" button. */
  // private onClicked = (): void => {
  //   // Increment state.numClicks, and pass the new value back to
  //   // Streamlit via `Streamlit.setComponentValue`.
  //   this.setState(
  //     prevState => ({ numClicks: prevState.numClicks + 1 }),
  //     () => Streamlit.setComponentValue(this.state.numClicks)
  //   )
  // }

  // /** Focus handler for our "Click Me!" button. */
  // private _onFocus = (): void => {
  //   this.setState({ isFocused: true })
  // }

  // /** Blur handler for our "Click Me!" button. */
  // private _onBlur = (): void => {
  //   this.setState({ isFocused: false })
  // }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(MyComponent)
