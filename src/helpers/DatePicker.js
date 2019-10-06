import * as React from 'react';
import Materialize from 'materialize-css';
import moment from 'moment'
import 'moment/locale/es'

export default class DatePicker extends React.Component{

  state = {
    label: "Fecha",
    value: new Date(),
    format: 'ddd d, mmm',
    formatMoment: 'ddd D, MMM'
  }

  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(props) {
    
    this.state = {
      value: props.value
    };
  }

  render() {
    return <div className="input-field col s6">
      <i className="material-icons prefix">date_range</i>
      <input id="date" type="text" className="datepicker queso"
        value={this.state.value}
      />
    </div>;
  }


  componentDidMount() {
    Materialize.AutoInit();
    var context = this;
    // var elems = document.querySelectorAll('.datepicker-day-button');
    // console.log(elems)
    // elems.addEventListener('click', (e) => {
    //     console.log(e)
    // })

    var elems = document.querySelectorAll('.queso');
    
    Materialize.Datepicker.init(elems, {
      container: 'body',
      open: true,
      onOpen: function() {
        console.log('opened')
      },
      onSelect: function (date) {
        // console.log(date)
        context.setState({ value: context.state.value });
        context.props.onChange(date);
      },
      autoClose: true
    });

  }
}