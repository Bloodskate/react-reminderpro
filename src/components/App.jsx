import React from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import '../App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  clearReminders() {
    this.props.clearReminders();
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group">
        {
          reminders.map(reminder => {
            return (
              <li className="list-group-item" key={reminder.id}>
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div
                  className="list-item delete-button"
                  onClick={ () => this.deleteReminder(reminder.id)}
                  >
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to ..."
              type="text"
              onChange={event => this.setState({text: event.target.value})}
            />
            <input
              type="datetime-local"
              className="form-control"
              onChange={event => this.setState({dueDate: event.target.value})}
            />
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
            >Add Reminder</button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.clearReminders()}
            >Clear all reminders</button>

          { this.renderReminders() }
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch);
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
