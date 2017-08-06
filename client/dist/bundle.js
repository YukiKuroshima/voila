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
    riot.mount('div#content-tag', 'list', { ticketId: _this.ticketId });
  } else if (b) {
    console.log('post');
    riot.mount('div#content-tag', 'post', { ticketId: _this.ticketId, uniqueKey: c });
  } else {
    console.log('else');
    riot.mount('div#content-tag', 'landing');
  }
});
});

riot.tag2('gen', '<h1>gen Ticket ID: {opts.ticketId}</h1> <h2>URL: {generatedURL}</h2> <div id="placeHolder"></div> <button onclick="{generateURL}">Next QR Code</button>', '', '', function(opts) {
var _this = this;

let generatedURL = '';

this.generateURL = e => {
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
      _this.generatedURL = `${window.location.origin}/#${opts.ticketId}/post/${JSON.parse(xhr.response).key}`;
      _this.generateQRCode(_this.generatedURL);
      _this.update();
    } else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
      console.log('Response ' + xhr.responseText);
    } else {
      console.log('Unknown status Response ' + xhr.responseText);
    }
  };
  xhr.send();
};

this.generateQRCode = uniqueURL => {
  console.log(uniqueURL);
  var typeNumber = 0;
  var errorCorrectionLevel = 'L';
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(uniqueURL);
  qr.make();
  document.getElementById('placeHolder').innerHTML = qr.createImgTag();
};
});


riot.tag2('landing', '<h1>landing</h1>', '', '', function(opts) {
});


riot.tag2('list', '<h1>List data of ticket ID: {opts.ticketId}</h1> <div each="{customers}"> <h3>{key}</h3> <h3>{data}</h3> </div>', '', '', function(opts) {
var _this = this;

this.on('mount', () => {
  const customers = [];
  const URL = `/api/tickets/${opts.ticketId}?test=test`;
  const xhr = new XMLHttpRequest();
  console.log(`List mounted`);
  // console.log(`postData clicked ${ this.refs.data.value }`)

  xhr.open('GET', URL, true);

  // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      // Request finished. Do processing here.
      console.log('Response ');
      // TODO Needs to be changed later
      _this.customers = JSON.parse(xhr.response).result.customers;
      console.log(JSON.parse(xhr.response).result.customers);
      console.log('Response ' + _this.customers);
      _this.update();
    } else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
      console.log('Response ' + xhr.responseText);
    } else {
      console.log('Unknown status Response ' + xhr.responseText);
    }
  };
  xhr.send();
});
});


riot.tag2('post', '<h1>POST data to ticket ID: {opts.ticketId} Unique: {opts.uniqueKey}</h1> <input ref="data" placeholder="data"> <button onclick="{postData}">Submit</button>', '', '', function(opts) {
var _this = this;

this.postData = e => {
  const URL = `/api/tickets/${opts.ticketId}/${opts.uniqueKey}`;
  const xhr = new XMLHttpRequest();
  console.log(`XMLHttp ${URL}`);
  console.log(`postData clicked ${_this.refs.data.value}`);

  xhr.open('POST', URL, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

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
  xhr.send(`data=${_this.refs.data.value}`);
};
});

