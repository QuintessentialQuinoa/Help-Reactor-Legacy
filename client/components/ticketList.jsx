import React from 'react';
import ReactDOM from 'react-dom';
import TicketEntry from './ticketEntry.jsx';

const TicketList = ({user, ticketList, updateTickets, hasClaimed, ticketsPerDay}) => (
  <div className="ticket_list">
    {ticketList.map((ticket, index) => <TicketEntry user={user} ticket={ticket} updateTickets={updateTickets} hasClaimed={hasClaimed} key={index} ticketsPerDay={ticketsPerDay} />)}
  </div>
);

export default TicketList;
