riot.tag2('app', '<li><a href="#{ticketId}/gen">Check in</a></li> <li><a href="#{ticketId}/list">Show list</a></li> <li><a href="#{ticketId}/post">Test Post</a></li> <li><a href="#landing">Landing</a></li> <h1>Ticket ID: {ticketId}</h1> <div id="content-tag"></div>', '', '', function(opts) {
var _this = this;

this.ticketId = 'TestID';

this.on('mount', () => {
  console.log('app mouted');
  route.start(true);
});

route((a, b, c) => {

  console.log('a ' + a + ' b ' + b + ' c ' + c);
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

riot.tag2('gen', '<h1>gen Ticket ID: {opts.ticketId}</h1> <h2>URL: {generatedURL}</h2> <button onclick="{generateQRCode}">Next QR Code</button>', '', '', function(opts) {
var _this = this;

let generatedURL = '';

this.generateQRCode = e => {
  const URL = `/api/tickets/${opts.ticketId}`;
  const xhr = new XMLHttpRequest();
  console.log(`XMLHttp ${URL}`);

  xhr.open('GET', URL, true);

  // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
      // Request finished. Do processing here.
      console.log('Response ' + xhr.responseText);
      // TODO Needs to be changed later
      _this.generatedURL = `${window.location.host}/#
                                 ${opts.ticketId}/post/
                                 ${JSON.parse(xhr.response).key}`;
      _this.update();
    } else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
      console.log('Response ' + xhr.responseText);
    } else {
      console.log('Unknown status Response ' + xhr.responseText);
    }
  };
  xhr.send();
};
});


riot.tag2('landing', '<h1>landing</h1>', '', '', function(opts) {
});


riot.tag2('list', '<h1>list</h1>', '', '', function(opts) {
});


riot.tag2('post', '<h1>post</h1>', '', '', function(opts) {
});

