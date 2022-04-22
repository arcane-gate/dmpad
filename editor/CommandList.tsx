import React from "react";
import styled from "styled-components";

const StyledCommandList = styled.div`
  position: relative;
  background: white;
  color: rgba(black, 0.8);
  overflow: hidden;
  box-shadow: var(--depth1);
  width: 200px;

  .item {
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    padding: 4px;

    &.is-selected,
    &:hover {
      color: var(--black);
      background: var(--gray);
    }

    > span {
      display: inline-flex;
      align-items: center;
    }

    .anticon,
    .c-Icon {
      margin-right: 8px;
      height: 18px;
      width: 18px;
    }
  }
`;

class CommandList extends React.Component {
  state = {
    selectedIndex: 0,
  };

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown({ event }) {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index) {
    const item = this.props.items[index];

    if (item) {
      this.props.command(item);
    }
  }
  render() {
    const { items } = this.props;
    return (
      <StyledCommandList>
        {items.map((item, index) => {
          return (
            <button
              className={`item ${
                index === this.state.selectedIndex ? "is-selected" : ""
              }`}
              key={index}
              onClick={() => this.selectItem(index)}
            >
              {item.element || item.title}
            </button>
          );
        })}
      </StyledCommandList>
    );
  }
}

export default CommandList;
