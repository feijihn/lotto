import React from 'react';
import {ListItem, Avatar, Colors} from 'material-ui';

export default class Alert extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.status === 'unread') {
      this.state = {
        status: 'unread',
        bgColor: Colors.blue100
      };
    } else {
      this.state = {
        status: 'read',
        bgColor: Colors.white
      };
    }
    setTimeout(() => {
      this.setState({
        status: 'read'
      });
      this.props.handleAlertRead(this.props.id);
    }, 1500);
  }
  render() {
    return (
      <ListItem
        leftAvatar={<Avatar>{this.props.message.sender[0]}</Avatar>}
        primaryText={this.props.message.sender}
        secondaryText={this.props.message.body}
        style={{
          backgroundColor: this.state.bgColor
        }}
      >
        <p style={{position: 'absolute', color: Colors.darkBlack, top: '5%', right: '5%', fontWeight: 600}}>
          {
            this.props.time.getFullYear() + '/' +
            this.props.time.getMonth() + '/' +
            this.props.time.getDay() + ' ' +
            this.props.time.getHours() + ':' +
            this.props.time.getMinutes()
          }
        </p>
      </ListItem>
    );
  }
}
