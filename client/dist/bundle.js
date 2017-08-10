riot.tag2('app', '<nav style="margin-bottom: 0px" class="navbar unique-color" role="navigation"> <div class="container"> <ul class="nav navbar-nav"> <li><a class="navbar-brand" href="#">Voila</a></li> <li><a href="#">New Ticket</a></li> <li><a href="#">Your Ticket</a></li> <li><a href="#{localStorage.getItem(\'ticketID\')}/gen">Check in</a></li> <li><a href="#{localStorage.getItem(\'ticketID\')}/list">Show list</a></li> <li><a href="#{localStorage.getItem(\'ticketID\')}/post">Test Post</a></li> </ul> </div> </nav> <div id="content-tag"></div> <footer class="page-footer unique-color center-on-small-only"> <div id="footer-tag"></div> </footer>', 'app a,[data-is="app"] a{ color: #9dafc0; }', '', function(opts) {

this.on('mount', () => {
  riot.mount('div#footer-tag', 'footer-tag');
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

riot.tag2('footer-tag', '<div class="container-fluid"> <div class="text-center"> Find me on <a href="https://github.com/YukiKuroshima/voila"> <span class="fa fa-github fa-2x"></span> </a> <a href="https://www.linkedin.com/in/yukikuroshima"> <span class="fa fa-linkedin fa-2x"></span> </a> </div> </div> <div class="footer-copyright"> <div class="container-fluid"> © 2017 Copyright: <a href="https://github.com/YukiKuroshima/voila"> Yuki Kuroshima </a> </div> </div>', 'footer-tag .fa,[data-is="footer-tag"] .fa{ margin: 5px; }', '', function(opts) {
});

riot.tag2('gen', '<div style="margin-top: 30px" class="container"> <div class="jumbotron"> <div class="text-center"> <h1 class="display-3">{uniqueKey}</h1> <div id="placeHolder"></div> <a onclick="{generateURL}" class="btn btn-primary btn-lg" role="button">Next QR Code</a> <hr class="hr-width md-5 mt-5 pb-3"> <h4 class="display-5">How to use?</h4> <p>Simply scan this code with your cellphone and go to the URL.</p> <a class="btn btn-info btn-lg" href="#" role="button">Learn more <i class="fa fa-eye mr-1"></i></a> </div> </p> </div> </div>', '', '', function(opts) {
var _this = this;

this.on('mount', () => {
  _this.generateURL();
});

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
      _this.uniqueKey = JSON.parse(xhr.response).key;
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
  var errorCorrectionLevel = 'H';
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(uniqueURL);
  qr.make();
  document.getElementById('placeHolder').innerHTML = qr.createImgTag();
};
});


riot.tag2('landing', '<section class="introduction"> <div class="intro-container container white-text"> <h2 class="h2-responsive wow fadeInRight " data-wow-delay="0.3s">Simple</h2> <h2 class="h2-responsive wow fadeInRight custom-gray" data-wow-delay="0.8s">Stylish</h2> <h2 class="h2-responsive wow fadeInRight custom-gray" data-wow-delay="1.3s">Easy</h2> <h2 class="h2-responsive wow fadeInRight custom-gray" data-wow-delay="2.0s">Ticketing System</h2> <h1 class="h1-responsive wow fadeInRight" data-wow-delay="2.8s"> <strong>Voila</strong> <small class="text-muted wow fadeIn white-text" data-wow-delay="4.4s">Oh! It\'s free, too</small> </h1> </div> </section> <div class="container"> <div class="row container text-center"> <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"> <h1 class="h1-responsive font-bold wow fadeInLeft" data-wow-delay="0.3s">What is Voila?</h1> <hr class="hr-light wow fadeInLeft" data-wow-delay="0.3s"> <h6 class="wow fadeInLeft" data-wow-delay="0.3s">Voila is a simple ticketing system. You can easily keep track of who participated your class or any event. With Voila, you can create unique QR codes instantly, and your students can scan it and post data to it.</h6> <br> <h2 class="h2-responsive wow fadeIn" data-wow-delay="0.3s">Sounds Cool, right?</h2> <h2 class="h2-responsive wow fadeIn" data-wow-delay="0.3s">Easy Three Steps to make your first ticket</h2> </div> </div> <div class="row"> <div class="col-md-4"> <i class="fa fa-ticket fa-5x"></i> <h4 class="h4-responsive text-center wow fadeIn" data-wow-delay="0.3s">Create New Ticket</h4> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, inventore, ipsa dolorum laborum sit alias iusto nam quibusdam ad distinctio rerum expedita autem itaque delectus iste mollitia perferendis sint libero accusamus in. Enim, natus necessitatibus pariatur optio explicabo consequuntur quod!</p> </div> <div class="col-md-4"> <i class="fa fa-qrcode fa-5x"></i> <h4 class="h4-responsive text-center wow fadeIn" data-wow-delay="0.3s">Students Scan QR Code</h4> <p>Ut, aliquid, aperiam, veniam modi voluptates maiores nesciunt libero fugiat illum recusandae cum similique et alias possimus error ex tenetur quasi sint eius dicta officia earum eveniet suscipit corporis autem deleniti nihil sed! Earum blanditiis vel similique nisi fugit reprehenderit?</p> </div> <div class="col-md-4"> <i class="fa fa-calendar-check-o fa-5x"></i> <h4 class="h4-responsive text-center wow fadeIn" data-wow-delay="0.3s">See List of Students</h4> <p>Quisquam eos aperiam autem atque minus modi similique earum! Ab, laboriosam odit non quo officiis asperiores atque dolorum omnis vitae in qui officia sequi molestias quisquam velit exercitationem aperiam. Voluptatum, unde, nesciunt temporibus voluptates sint ab architecto at quod dolore.</p> </div> </div> <div class="row"> <div class="containter"> <div class="row container"> <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"> <p class="h5 text-center mb-4">Create new ticket</p> <div class="md-form"> <i class="fa fa-envelope prefix grey-text"></i> <input ref="idSave" type="text" class="form-control"> <label>Ticket name</label> </div> <div class="md-form"> <i class="fa fa-lock prefix grey-text"></i> <input ref="pwSave" type="password" class="form-control"> <label for="defaultForm-pass">Ticket password</label> </div> <div class="text-center"> <button onclick="{saveTicket}" class="btn btn-default">Create</button> </div> <p class="h5 text-center mb-4">View your ticket</p> <div class="md-form"> <i class="fa fa-envelope prefix grey-text"></i> <input ref="idAuth" type="text" class="form-control"> <label>Ticket name</label> </div> <div class="md-form"> <i class="fa fa-lock prefix grey-text"></i> <input ref="pwAuth" type="password" class="form-control"> <label for="defaultForm-pass">Ticket password</label> </div> <div class="text-center"> <button onclick="{authTicket}" class="btn btn-default">View</button> </div> </div> </div> </div> </div> </div>', '', '', function(opts) {
var _this = this;

this.on('mount', () => {
  new WOW().init();
});

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
      riot.update();
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

riot.tag2('list', '<div style="margin-top: 30px" class="container-fluid"> <h1>Ticket ID: {opts.ticketId}</h1> <table class="table table-respinsive table-hover"> <thead> <tr> <th><h3 class="h3-responsive">#</h3></th> <th><h3 class="h3-responsive">Unique Key</h3></th> <th><h3 class="h3-responsive">Data</h3></th> <th> <div class="text-center"> <h3 class="h3-responsive">Checked in?</h3> </div> </th> </tr> </thead> <tbody> <tr each="{customer, index in customers}"> <th scope="row"><h4 class="h4-responsive">{index+1}</h4></th> <td><h4 class="h4-responsive">{customer.key}</h4></td> <td><h4 class="h4-responsive">{customer.data}</h4></td> <td> <div class="text-center"> <i if="{customer.data !== undefined}" class="green-text fa fa-check fa-3x" aria-hidden="true"></i> </div> </td> </tr> </tbody> </table> </div>', '', '', function(opts) {
var _this = this;

this.counter = 1;

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


riot.tag2('nav-tag', '', '', '', function(opts) {
});

riot.tag2('post', '<div style="margin-top: 40px" class="container"> <div class="jumbotron"> <p class="h5 text-center mb-4">Upload data</p> <div class="md-form"> <i class="fa fa-inbox prefix grey-text"></i> <input ref="data" type="text" class="form-control"> <label>Your data</label> </div> <div class="text-center"> <button onclick="{postData}" class="btn btn-default">Submit</button> </div> </div>', '', '', function(opts) {
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

