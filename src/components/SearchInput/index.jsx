import P from "prop-types";
import { Component } from "react";
import "./styles.css";

export class SearchInput extends Component {
  render() {
    const { onChange, searchValue } = this.props;

    return (
      <input
        className="search-input"
        onChange={onChange}
        value={searchValue}
        type="search"
        placeholder="Pesquise post pelo título"
      />
    );
  }
}

SearchInput.propTypes = {
  onChange: P.func.isRequired,
  searchValue: P.string.isRequired,
};
