import React from 'react';
import * as actionCreators from '../state/action-creators';
import { connect } from 'react-redux';

export function Wheel(props) {
  const { BNumber } = props.wheel;

  const handleClockwiseClick = () => {
    props.moveClockwise()
  }

  const handleCounterClick = () => {
    props.moveCounterClockwise()
  }

  return (

    <div id="wrapper">
      <div id="wheel">
        <div className={BNumber === 0 ? 'cog active' : 'cog'} style={{ "--i": 0 }}>{BNumber === 0 ? 'B' : null }</div>
        <div className={BNumber === 1 ? 'cog active' : 'cog'} style={{ "--i": 1 }}>{BNumber === 1 ? 'B' : null }</div>
        <div className={BNumber === 2 ? 'cog active' : 'cog'} style={{ "--i": 2 }}>{BNumber === 2 ? 'B' : null }</div>
        <div className={BNumber === 3 ? 'cog active' : 'cog'} style={{ "--i": 3 }}>{BNumber === 3 ? 'B' : null }</div>
        <div className={BNumber === 4 ? 'cog active' : 'cog'} style={{ "--i": 4 }}>{BNumber === 4 ? 'B' : null }</div>
        <div className={BNumber === 5 ? 'cog active' : 'cog'} style={{ "--i": 5 }}>{BNumber === 5 ? 'B' : null }</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClick} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClockwiseClick}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    wheel: state.wheel
  }
};

export default connect(mapStateToProps, actionCreators)(Wheel)

