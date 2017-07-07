const {db, Ticket, User} = require ('../../database/');
const util = require('../../helpers/util');

module.exports = server => {
  const io = require('socket.io')(server, { cookie: true });

  const students = {};
  const mentors = {};
  const admins = {};

  io.on('connection', socket => {
    let id = socket.handshake.query.id;
    let role = socket.handshake.query.role;

    if (role === 'student') {
      !students[id] ? students[id] = [socket] : students[id].push(socket);
    } else if (role === 'mentor') {
      !mentors[id] ? mentors[id] = [socket] : mentors[id].push(socket);
    } else if (role === 'admin') {
      !admins[id] ? admins[id] = [socket] : admins[id].push(socket);
    }

    io.emit('user connect', util.connectionCount(students, mentors, admins));

    console.log(`${Object.keys(students).length} students connected`);
    console.log(`${Object.keys(mentors).length} mentors connected`);
    console.log(`${Object.keys(admins).length} admins connected`);

    socket.on('refresh', () => io.emit('update or submit ticket'));

    socket.on('get wait time', () => {
      Ticket.findAll().then(tickets => {
        let response = { waitTime: util.computeAvgWaitTime(tickets, mentors, id) };
        console.log('this is the response est wait time!: ', response);
        socket.emit('new wait time', response);
      });
    });

    socket.on('update adminStats', () => {
      let openedTickets = closedTickets = 0;
      Ticket.count({ where: { status: 'Opened' } })
        .then(numOpenTickets => {
          openedTickets = numOpenTickets;
          return Ticket.count({
            where: {
              status: 'Closed',
              closedAt: { $gt: new Date(new Date() - 24 * 60 * 60 * 1000) }
            }
          });
        })
        .then(numCloseTickets => {
          closedTickets = numCloseTickets;
          io.emit('new adminStats', {
            open: openedTickets,
            closed: closedTickets
          });
        });
    });

    socket.on('get online users', (type) => {
      var userType = type === 'students' ? students : (type === 'mentors' ? mentors : {});
      io.emit('online info', util.mapInfo(userType));
    });

    socket.on('update tickets per day for every user', () => {
      User.findAll().then(users => {
        users.forEach(user => {
          Ticket.count({ where: { userId: user.id } })
            .then(ticketCount => {
              var daysSinceUserCreated = (Date.now() - Date.parse(user.createdAt))/86400000;
              let newTicketsPerDay = (ticketCount/daysSinceUserCreated).toFixed(2);
              User.update({ ticketsPerDay: newTicketsPerDay }, { where: { id: user.id }})
            });
        });
      });
    });

    socket.on('get mentor response time', () => {
      var data = [];
      Ticket.findAll().then(tickets => {
        for (let key in mentors) {
          let mentorObj = {};
          var aveResTime = util.computeAvgMentorResTime(tickets, key);
          mentorObj[key] = aveResTime;
          data.push(mentorObj);
        }
        io.emit('new mentor response time', {data});
      });
    });

    socket.on('get mentor resolution time', () => {
      var data = [];
      Ticket.findAll().then(tickets => {
        for (let key in mentors) {
          let mentorObj = {};
          var aveResTime = util.computeAvgMentorResolutionTime(tickets, key);
          mentorObj[key] = aveResTime;
          data.push(mentorObj);
        }
        io.emit('new mentor resolution time', {data});
      });
    });
<<<<<<< HEAD
    

    socket.on('call user', (info) => {
      console.log('Call info: ', info);
      if (info.user.role === 'student') {
        if (info.user.id === students[info.user.id][0].handshake.query.id) {
          io.emit('call request', info);
        }
      } else if (info.user.role === 'mentor') {
        if (info.user.id === mentors[info.user.id][0].handshake.query.id) {
          io.emit('call request', info);
        }
      }
    });
  
    // logic has flaws
    // socket.on('update adminStats', () => {
    //   Ticket.findAll({ where: { createdAt: { $gt: new Date(new Date() - 24 * 60 * 60 * 1000) } } })
    //     .then(result => {
    //       io.emit('new adminStats', util.getAdminStats(result));
    //     });
    // });
=======

    socket.on('update tickets per day', (userInfo) => {
      Ticket.count({ where: { userId: userInfo.id } })
        .then(ticketCount => {
          var daysSinceUserCreated = (Date.now() - Date.parse(userInfo.createdAt))/86400000;
          let newTicketsPerDay = (ticketCount/daysSinceUserCreated).toFixed(2);
          User.update({ ticketsPerDay: newTicketsPerDay }, { where: { id: userInfo.id }})
        });
    });
>>>>>>> Add users tickets per hour data.  It initiates on initial rendering and updated on ticket submission."

    socket.on('disconnect', socket => {
      if (role === 'student') {
        students[id].length <= 1 ? delete students[id] : students[id].splice(students[id].indexOf(socket), 1);
      } else if (role === 'mentor') {
        mentors[id].length <= 1 ? delete mentors[id] : mentors[id].splice(mentors[id].indexOf(socket), 1);
      } else if (role === 'admin') {
        admins[id].length <= 1 ? delete admins[id] : admins[id].splice(admins[id].indexOf(socket), 1);
      }

      io.emit('user disconnect', util.connectionCount(students, mentors, admins));

      console.log(`Disconnected, now ${Object.keys(students).length} students connected`);
      console.log(`Disconnected, now ${Object.keys(mentors).length} mentors connected`);
      console.log(`Disconnected, now ${Object.keys(admins).length} admins connected`);
    });
  });
};
