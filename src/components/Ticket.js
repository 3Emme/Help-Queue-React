import React from "react";
import PropTypes from "prop-types";

function Ticket(props){
  const whackStyles = {
    backgroundColor: "#d6c601"
  }
    return (
      <React.Fragment>
      <div style = {whackStyles}>
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Ticket.propTypes = {
    names: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    issue: PropTypes.string
};


export default Ticket;