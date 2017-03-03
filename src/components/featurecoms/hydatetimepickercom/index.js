import React from 'react';
import ReactDOM from 'react-dom'
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {is} from 'immutable';
import HyInputCom from '../hyinputcom'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import {BaseComponet, MultiTaskComponent} from '../../../utils/component_helper';

const format = 'YYYY-MM-DD HH:mm:ss';
function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}

@BaseComponet
@MultiTaskComponent
export default class HyDateTimePickerCom extends React.Component{
   constructor(props)
   {
      super(props);
      this.state={
          showTime : false,
          showDateInput : false,
          ...this.props.DefaultState
            ? this.props.DefaultState.thisState
            : {}
      }
      // disabledTime={state.showTime ? disabledTime : null}
      // timePicker={state.showTime ? timePickerElement : null}
      // defaultValue={this.props.defaultCalendarValue}
      // showDateInput={state.showDateInput}
      // disabledDate={disabledDate}
   }

   // 当Props或者state发生变更时触发
   componentWillReceiveProps(nextProps) {
     if (!is(this.props, nextProps)) {
       this.setState({
         ...nextProps.DefaultState
           ? nextProps.DefaultState.thisState
           : {}
       })
     }
   }

   onChange(value,sender) {
      this.props.OnChangeEvent && this.props.OnChangeEvent(sender,{value : moment(value).format(getFormat())})
   }

   _click=()=>{
      this.refs.DatePicker.open(()=>{
        this.refs.dateInput.SetFocus();
      });
   }
   render(){
         const _DefaultState = this.props.DefaultState;
         const _childrenState = (_DefaultState && _DefaultState.childrenState) || {};
         const calendar = (<Calendar
           locale={zhCN}
           formatter={getFormat(this.state.showTime)}
           showDateInput={false}
         />);
         return (
           <div>
               <HyInputCom ref="dateInput"
                    DefaultState={_childrenState.dateInput}
                    Placeholder = "请输入时间"
                    Title = "时间"
                    IsHiddenTitle = {false}
                    InputType = "text"
                    OnClickEvent={this._click}
                    Value={this.props.Value}
                />
                <DatePicker
                         ref="DatePicker"
                         animation="slide-up"
                         value={this.props.Value ? moment(this.props.Value) : moment()}
                         calendar={calendar}
                         onChange={this.onChange.bind(this)}
                         align={{offset:[0,-15]}}
                       >
                 {
                     ({ value }) => {
                       return (<div></div>);
                     }
                 }
                </DatePicker>
            </div>
               );
  }
}
