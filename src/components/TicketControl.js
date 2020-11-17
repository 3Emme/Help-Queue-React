import React from 'react';
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import Steps from "./Steps";
import Help from "./Help";
import Minutes from "./Minutes";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ticketListVisibleOnPage: true,
      stepsVisibleOnPage: false,
      helpVisibleOnPage: false,
      minutesVisibleOnPage: false,
      formVisibleOnPage: false
    };
    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this); //new code here
    
  }

  handleBackClick() {
    console.log("before click ticket list "+this.state.ticketListVisibleOnPage);
    console.log("before click steps "+this.state.stepsVisibleOnPage);
    console.log("before click help "+this.state.helpVisibleOnPage);
    console.log("before click minutes "+this.state.minutesVisibleOnPage);
    console.log("before click form "+this.state.formVisibleOnPage);
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage,
      stepsVisibleOnPage: !prevState.stepsVisibleOnPage
      
    }));
  }

  handleForwardClick = () => {
    console.log("before click ticket list "+this.state.ticketListVisibleOnPage);
    console.log("before click steps "+this.state.stepsVisibleOnPage);
    console.log("before click help "+this.state.helpVisibleOnPage);
    console.log("before click minutes "+this.state.minutesVisibleOnPage);
    console.log("before click form "+this.state.formVisibleOnPage);
    if(this.state.ticketListVisibleOnPage){
      this.setState({ticketListVisibleOnPage: false, stepsVisibleOnPage: true})
      return;
    }
    else if(this.state.stepsVisibleOnPage){
      // console.log("two");
      this.setState({stepsVisibleOnPage: false, helpVisibleOnPage: true})
      return;
    }
    else if(this.state.helpVisibleOnPage){
      // console.log("three");
      this.setState({helpVisibleOnPage: false, minutesVisibleOnPage: true})
      return;
    }
    else if(this.state.minutesVisibleOnPage){
      // console.log("four");
      this.setState({minutesVisibleOnPage: false, formVisibleOnPage: true})
      return;
    }
    else {
      // console.log("five");
      // console.log(this.state.ticketListVisibleOnPage);
      this.setState({formVisibleOnPage: false, ticketListVisibleOnPage: true})
      return;
    }
    };
  

  render() {
    let currentVisibleState = null;
    let buttonBackText = null;
    let buttonForwardText = null;
    let addTicketButton = null;
    
    if (this.state.stepsVisibleOnPage){
      currentVisibleState = <Steps />;
      buttonBackText = "Return to Ticket List"; // new code
      buttonForwardText = "Go to Help"; // new code
    }
    else if (this.state.helpVisibleOnPage){
      currentVisibleState = <Help />;
      buttonBackText = "Return to Steps"; // new code
      buttonForwardText = "Go to Minutes"; // new code
    }
    else if (this.state.minutesVisibleOnPage){
      currentVisibleState = <Minutes />;
      buttonBackText = "Return to Help"; // new code
      buttonForwardText = "Go to Form"; // new code
    }
    else if (this.state.formVisibleOnPage) {
      currentVisibleState = <NewTicketForm />;
      buttonBackText = "Return to Minutes"; // new code
      buttonForwardText = "Return to Ticket List"; // new code
    } 
    else {
      currentVisibleState = <TicketList />;
      buttonBackText = "Add Ticket"; // new code
      buttonForwardText = "Go to Steps"; // new code
      addTicketButton = <button onClick={this.handleForwardClick}>Add ticket</button> // new code
    }
    return (
      <React.Fragment>
        {currentVisibleState}
        <button onClick={this.handleBackClick}>{buttonBackText}</button>
        <button onClick={this.handleForwardClick}>{buttonForwardText}</button>
      </React.Fragment>
    );
  }
} 


export default TicketControl;
