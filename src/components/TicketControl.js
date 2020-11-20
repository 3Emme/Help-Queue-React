import React from 'react';
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import Steps from "./Steps";
import Help from "./Help";
import Minutes from "./Minutes";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ticketListVisibleOnPage: true,
      stepsVisibleOnPage: false,
      helpVisibleOnPage: false,
      minutesVisibleOnPage: false,
      formVisibleOnPage: false,
      masterTicketList: [],
      selectedTicket: null,
      editing: false,
    };
    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this); //new code here
    
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMasterTicketList = this.state.masterTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
        masterTicketList: editedMasterTicketList,
        editing: false,
        selectedTicket: null
      });
  }

handleEditClick = () => {
  console.log("handleEditClick Reached!");
  this.setState({editing: true});
}

handleChangingSelectedTicket = (id) => {
  const selectedTicket = this.state.masterTicketList.filter(ticket=>ticket.id === id)[0];
  this.setState({selectedTicket:selectedTicket});
}
  
handleAddingNewTicketToList = (newTicket) => {
  const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
  this.setState({masterTicketList: newMasterTicketList,
                formVisibleOnPage:false});
}

  handleBackClick = () => {
    
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }
      // formVisibleOnPage: !prevState.formVisibleOnPage,
      // stepsVisibleOnPage: !prevState.stepsVisibleOnPage

  handleDeletingTicket = (id) => {
    const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      masterTicketList: newMasterTicketList,
      selectedTicket: null
    });
  }

  handleForwardClick = () => {
    
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
    let buttonText = null;
    
    if(this.state.editing ){
      currentVisibleState = <EditTicketForm
      ticket = {this.state.selectedTicket}
      onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    }
    else if (this.state.selectedTicket != null){
      currentVisibleState = <TicketDetail
      ticket = {this.state.selectedTicket}
      onClickingDelete = {this.handleDeletingTicket}
      onClickingEdit = {this.handleEditClick}/>
      buttonBackText = "Return to Ticket List"
    }
    else if (this.state.stepsVisibleOnPage){
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
      currentVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonBackText = "Return to Minutes"; // new code
      buttonForwardText = "Return to Ticket List"; // new code
    } 
    else {
      currentVisibleState = <TicketList ticketList={this.state.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>;
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
