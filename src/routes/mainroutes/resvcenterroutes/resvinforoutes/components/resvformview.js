import React, { Component, PropTypes } from 'react';
import {is} from 'immutable';
import {MultiTaskComponent} from '../../../../../utils/component_helper';

// component
import {HyBaseFormCom} from '../../../../../components/featurecoms';

@MultiTaskComponent
class ResvFormView extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      formcontrol:[
        {
          title:'订房人',
          name:'resvname',
          DefaultValue:'zhaoxiang',
          id:'resvname',
          type:'text',
          classname:'',
          controlclassname:'',
          placeholder:'请输入订房人'

        },
        {
          title:'客人姓名',
          name:'customname',
          id:'customname',
          type:'text',
          classname:'',
          controlclassname:'',
          placeholder:'请输入客人姓名'

        },
        {
          title:'联系电话',
          name:'phone',
          id:'phone',
          type:'phone',
          classname:'',
          controlclassname:'',
          placeholder:'请输入联系电话'

        },
        {
          title:'邮箱',
          name:'email',
          id:'email',
          type:'email',
          classname:'',
          controlclassname:'',
          placeholder:'请输入订房人'
        }
      ],
      ...this.props.DefaultState?this.props.DefaultState.thisState:{}
     };
  }

  componentWillReceiveProps(nextProps) {
    if (!is(this.props.DefaultState, nextProps.DefaultState)) {
      const _defaultstate = nextProps.DefaultState
        ? nextProps.DefaultState.thisState
        : {};
      this.setState({
        ..._defaultstate.thisState
      })
    }
  }

  _submitEvent=(e)=>{
    HistoryHandle.replace(`${this.props.location.pathname}/resvinfo/${resvnum}-${new Date()}`);
  }

  render() {
    const _DefaultState=this.props.DefaultState;
    const _childrenState=(_DefaultState && _DefaultState.childrenState)?_DefaultState.childrenState:{};
    return (
      <HyBaseFormCom ref='resvForm' SubmitEvent={this._submitEvent} DefaultState={_childrenState.resvForm} FormItems={this.state.formcontrol} />
    );
  }
}

ResvFormView.Title = "预定信息管理";
ResvFormView.ComponentName = "ResvFormView";
ResvFormView.ComponentVersion = "1.0";
ResvFormView.GetComponentInfo = function(){
  return {
    ComponentName: ResvFormView.ComponentName,
    ComponentVersion: ResvFormView.ComponentVersion,
    ComponentTitle:ResvFormView.Title
  }
}
module.exports = ResvFormView;
