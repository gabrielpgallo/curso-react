import { Component } from "react";
import P from "prop-types";
import "./styles.css";

export class Button extends Component {
  render() {
    const { text, functionOnClick, disabled } = this.props;

    return (
      <button disabled={disabled} className="button" onClick={functionOnClick}>
        {text}
      </button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  functionOnClick: P.func.isRequired,
  disabled: P.bool,
};
