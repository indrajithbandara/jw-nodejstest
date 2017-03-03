import classNames from 'classnames';
import React from 'react';
import Transition from 'react-overlays/lib/Transition';


const defaultProps = {
  in: false,
  timeout: 300,
  unmountOnExit: false,
  transitionAppear: false
};

class Fade extends React.Component {
  render() {
    return (
      <Transition
        {...this.props}
        className={classNames(this.props.className, 'fade')}
        enteredClassName="in"
        enteringClassName="in"
      />
    );
  }
}

Fade.defaultProps = defaultProps;

export default Fade;
