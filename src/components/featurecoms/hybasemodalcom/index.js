import React,{ PropTypes } from 'react';
import ReactDOM from 'react-dom';
import BaseModal from 'react-overlays/lib/Modal';
import isOverflowing from 'react-overlays/lib/utils/isOverflowing';
import events from 'dom-helpers/events';
import canUseDOM from 'dom-helpers/util/inDOM';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import ownerDocument from 'dom-helpers/ownerDocument';
import Fade from './Fade.js'

import './index.css';

const defaultProps = {
  ...BaseModal.defaultProps,
  animation: true
};

class HyBaseModalCom extends React.Component{
    constructor(props){
       super(props);
       this.handleEntering = this.handleEntering.bind(this);
       this.handleExited = this.handleExited.bind(this);
       this.handleWindowResize = this.handleWindowResize.bind(this);
       this.handleDialogClick = this.handleDialogClick.bind(this);

       this.state = {
         style: {},
         modalContentStyle: {}
       };
    }
    handleEntering() {
      events.on(window, 'resize', this.handleWindowResize);
      this.updateStyle();
    }
    handleExited() {
       events.off(window, 'resize', this.handleWindowResize);
    }
    handleWindowResize() {
      this.updateStyle();
    }
    handleDialogClick(e) {
      if (e.target !== e.currentTarget) {
        return;
      }
      this.props.onHide();
    }
    updateStyle() {
      if (!canUseDOM) {
        return;
      }
      if(this._modal)
      {
        const dialogNode = this._modal.getDialogElement();
        const dialogHeight = dialogNode.scrollHeight;

        const document = ownerDocument(dialogNode);
        const bodyIsOverflowing = isOverflowing(
          ReactDOM.findDOMNode(this.props.container || document.body)
        );
        const modalIsOverflowing =
          dialogHeight > document.documentElement.clientHeight;

        //计算body高度和model-content高度，让modal-content居中
        let bodyHeightHalf = document.body.clientHeight / 2;
        let modalDialogHeightHalf = ReactDOM.findDOMNode(this.refs.modalContent).clientHeight / 2;
        let marginTop = bodyHeightHalf - modalDialogHeightHalf;

        this.setState({
          modalContentStyle: {
            marginTop: marginTop
          },
          style: {
            paddingRight: bodyIsOverflowing && !modalIsOverflowing ?
              getScrollbarSize() : undefined,
            paddingLeft: !bodyIsOverflowing && modalIsOverflowing ?
              getScrollbarSize() : undefined
          }
        });
      }
    }
    render(){
        const modalStyle = { display: 'block', ...this.state.style };
        let {show,animation} = this.props;
        return (
          <BaseModal
            show={this.props.show}
            container = {this.props.container}
            ref={c => { this._modal = c; }}
            onEntering={this.handleEntering}
            onExited={this.handleExited}
            backdrop={this.props.backdrop}
            backdropClassName="modal-backdrop"
            transition={this.props.animation ? Fade : undefined}
            dialogTransitionTimeout={HyBaseModalCom.TRANSITION_DURATION}
            backdropTransitionTimeout={HyBaseModalCom.BACKDROP_TRANSITION_DURATION}
          >
              <div  tabIndex="-1" role="dialog" style={modalStyle} className="modal"
                    onClick={this.props.backdrop === true ? this.handleDialogClick : null}>
                   <div className="modal-dialog">
                       <div className="modal-content" role="document" ref="modalContent" style={this.state.modalContentStyle}>
                           {this.props.children}
                       </div>
                   </div>
              </div>
          </BaseModal>
        );
    }
}

HyBaseModalCom.TRANSITION_DURATION = 150;
HyBaseModalCom.BACKDROP_TRANSITION_DURATION = 300;
HyBaseModalCom.defaultProps = defaultProps;

export default  HyBaseModalCom
