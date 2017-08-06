riot.tag2('app', '<h1>Ticket ID: {ticketId}</h1> <div id="content-tag"></div>', '', '', function(opts) {
var _this = this;

this.ticketId = 'TestID';

this.on('mount', () => {
  console.log('app mouted');
  route.start(true);
});

route((a, b) => {

  console.log('a ' + a + ' b ' + b);
  if (b === 'gen') {
    console.log('gen');
    riot.mount('div#content-tag', 'gen', { ticketId: _this.ticketId });
  } else if (b === 'list') {
    console.log('list');
    riot.mount('div#content-tag', 'list');
  } else if (b) {
    console.log('post');
    riot.mount('div#content-tag', 'post');
  } else {
    console.log('else');
    riot.mount('div#content-tag', 'landing');
  }
});
});

riot.tag2('gen', '<h1>gen Ticket ID: {opts.ticketId}</h1>', '', '', function(opts) {
});


riot.tag2('landing', '<h1>landing</h1>', '', '', function(opts) {
});


riot.tag2('list', '<h1>list</h1>', '', '', function(opts) {
});


riot.tag2('post', '<h1>post</h1>', '', '', function(opts) {
});

