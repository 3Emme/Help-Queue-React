import React from "react";
import PropTypes from "prop-types";

function Ticket(props){
  const whackStyles = {
    backgroundColor: "#d6c601"
  }
    return (
      <React.Fragment>
      
      <div style = {whackStyles}>
        <div onClick = {() => props.whenTicketClicked(props.id)}>
          <h3>{props.location} - {props.names}</h3>
          <p><em>{props.issue}</em></p>
          <hr/>
        </div>
      </div>
    </React.Fragment>
  );
}

Ticket.propTypes = {
    names: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    issue: PropTypes.string,
    id: PropTypes.string,
    whenTicketClicked: PropTypes.func
};


export default Ticket;