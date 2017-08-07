riot.tag2('app', '<li><a href="#{localStorage.getItem(\'ticketID\')}/gen">Check in</a></li> <li><a href="#{localStorage.getItem(\'ticketID\')}/list">Show list</a></li> <li><a href="#{localStorage.getItem(\'ticketID\')}/post">Test Post</a></li> <li><a href="#landing">Landing</a></li> <h1>Ticket ID: {ticketId}</h1> <div id="content-tag"></div>', '', '', function(opts) {

this.on('mount', () => {
  console.log('app mouted');
  route.start(true);
});

route((a, b, c) => {

  console.log('a ' + a + ' b ' + b + ' c ' + c);
  if (b === 'gen') {
    console.log('gen');
    riot.mount('div#content-tag', 'gen', { ticketId: a });
  } else if (b === 'list') {
    console.log('list');
    riot.mount('div#content-tag', 'list', { ticketId: a });
  } else if (b) {
    console.log('post');
    riot.mount('div#content-tag', 'post');
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

  xhr.setRequestHeader("x-access-token", localStorage.getItem('token'));

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


riot.tag2('landing', '<h1>landing</h1> <h2>Create new ticket</h2> <input ref="idSave" placeholder="Enter the ticketID"> <input ref="pwSave" placeholder="Enter password"> <button onclick="{saveTicket}">Create new ticket</button> <h2>View your ticket</h2> <input ref="idAuth" placeholder="Enter the ticketID"> <input ref="pwAuth" placeholder="Enter password"> <button onclick="{authTicket}">View your ticket</button>', '', '', function(opts) {
var _this = this;

this.saveTicket = e => {
  console.log('Save clicked ');
  const URL = `/api/tickets`;
  const xhr = new XMLHttpRequest();
  console.log(`XMLHttp ${URL}`);
  console.log(`postData clicked ${_this.refs.idSave.value}`);
  console.log(`postData clicked ${_this.refs.pwSave.value}`);

  xhr.open('POST', URL, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
      // Request finished. Do processing here.
      console.log('Response ' + xhr.responseText);
      // TODO Needs to be changed later
    } else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
      console.log('Response ' + xhr.responseText);
    } else {
      console.log('Unknown status Response ' + xhr.responseText);
    }
  };
  xhr.send(`id=${_this.refs.idSave.value}&password=${_this.refs.pwSave.value}`);
};

this.authTicket = e => {
  console.log('Auth clicked ');
  const URL = `/api/tickets/auth`;
  const xhr = new XMLHttpRequest();
  console.log(`XMLHttp ${URL}`);
  console.log(`postData clicked ${_this.refs.idAuth.value}`);
  console.log(`postData clicked ${_this.refs.pwAuth.value}`);

  xhr.open('POST', URL, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      // Request finished. Do processing here.
      console.log('Response ' + JSON.parse(xhr.response).token);
      // Save the token to local storage
      localStorage.setItem('token', JSON.parse(xhr.response).token);
      localStorage.setItem('ticketID', _this.refs.idAuth.value);
      route(`${_this.refs.idAuth.value}/list`);
    } else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
      console.log('Response else' + xhr.responseText);
    } else {
      console.log('Unknown status Response ' + xhr.responseText);
    }
  };
  xhr.send(`id=${_this.refs.idAuth.value}&password=${_this.refs.pwAuth.value}`);
};
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
  xhr.setRequestHeader("x-access-token", localStorage.getItem('token'));

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


riot.tag2('post', '<h1>POST data to ticket ID: {ticketId} Unique: {uniqueKey}</h1> <input ref="data" placeholder="data"> <button onclick="{postData}">Submit</button>', '', '', function(opts) {
var _this = this;

this.on('before-mount', () => {
  const arr = window.location.hash.split('/');
  console.log(arr);
  ticketId = arr[0].substring(1);
  console.log(ticketId);
  uniqueKey = arr[2];
  console.log(uniqueKey);
});

this.postData = e => {
  const URL = `/api/tickets/${ticketId}/${uniqueKey}`;
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

