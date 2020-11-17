import React from 'react';
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import Steps from "./Steps";
import Help from "./Help";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false
    };
    this.handleClick = this.handleClick.bind(this); //new code here
  }

  handleClick() {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));
  }

  render() {
    let currentVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage) {
      currentVisibleState = <NewTicketForm />;
      buttonText = "Return to Ticket List"; // new code
    } else {
      currentVisibleState = <TicketList />;
      buttonText = "Add Ticket"; // new code
    }
    return (
      <React.Fragment>
        {currentVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
} 


export default TicketControl;
