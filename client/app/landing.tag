<landing>

<section class="introduction">
    <div class="intro-container container white-text">
        <h2 class="h2-responsive wow fadeInRight " data-wow-delay="0.3s">Simple</h2>
        <h2 class="h2-responsive wow fadeInRight custom-gray" data-wow-delay="0.8s">Stylish</h2>
        <h2 class="h2-responsive wow fadeInRight custom-gray" data-wow-delay="1.3s">Easy</h2>
        <h2 class="h2-responsive wow fadeInRight custom-gray" data-wow-delay="2.0s">Ticketing System</h2>
        <h1 class="h1-responsive wow fadeInRight" data-wow-delay="2.8s">
            <strong>Voila</strong>
            <small class="text-muted wow fadeIn white-text" data-wow-delay="4.4s">Oh! It's free, too</small>
        </h1>
    </div>
</section>

<!-- New Ticket form -->
<div class="containter">
    <div class="row">
        <div class="col-md-6">
            <h1>Placeh older</h1>
            <hr>
        </div>
        <div class="col-md-6">
            <p class="h5 text-center mb-4">Create new ticket</p>
            <div class="md-form">
                <i class="fa fa-envelope prefix grey-text"></i>
                <input ref="idSave" type="text" class="form-control">
                <label>Ticket name</label>
            </div>

            <div class="md-form">
                <i class="fa fa-lock prefix grey-text"></i>
                <input ref="pwSave" type="password" class="form-control">
                <label for="defaultForm-pass">Your password</label>
            </div>

            <div class="text-center">
                <button onclick={ saveTicket } class="btn btn-default">Create</button>
            </div>
            <!-- New Ticket form -->

            <!-- Auth Ticket form -->
            <p class="h5 text-center mb-4">View your ticket</p>

            <div class="md-form">
                <i class="fa fa-envelope prefix grey-text"></i>
                <input ref="idAuth" type="text" class="form-control">
                <label>Ticket name</label>
            </div>

            <div class="md-form">
                <i class="fa fa-lock prefix grey-text"></i>
                <input ref="pwAuth" type="password" class="form-control">
                <label for="defaultForm-pass">Your password</label>
            </div>

            <div class="text-center">
                <button onclick={ authTicket } class="btn btn-default">View</button>
            </div>
        </div>
    </div>
</div>
<!-- Auth Ticket form -->

        <script type='es6'>
            this.on('mount', () => {
              new WOW().init();
            })

    this.saveTicket = (e) => {
        console.log('Save clicked ')
        const URL = `/api/tickets`;
        const xhr = new XMLHttpRequest();
        console.log(`XMLHttp ${URL}`)
        console.log(`postData clicked ${ this.refs.idSave.value }`)
        console.log(`postData clicked ${ this.refs.pwSave.value }`)

        xhr.open('POST', URL, true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = () => {
          if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
            // Request finished. Do processing here.
            console.log('Response ' + xhr.responseText)
            // TODO Needs to be changed later
          } else if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
            console.log('Response ' + xhr.responseText)
          } else {
            console.log('Unknown status Response ' + xhr.responseText)
          }
        }
        xhr.send(`id=${ this.refs.idSave.value }&password=${ this.refs.pwSave.value }`);
      }

      this.authTicket = (e) => {
        console.log('Auth clicked ')
        const URL = `/api/tickets/auth`;
        const xhr = new XMLHttpRequest();
        console.log(`XMLHttp ${URL}`)
        console.log(`postData clicked ${ this.refs.idAuth.value }`)
        console.log(`postData clicked ${ this.refs.pwAuth.value }`)

        xhr.open('POST', URL, true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = () => {
          if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            // Request finished. Do processing here.
            console.log('Response ' + JSON.parse(xhr.response).token);
            // Save the token to local storage
            localStorage.setItem('token', JSON.parse(xhr.response).token);
            localStorage.setItem('ticketID', this.refs.idAuth.value);
            riot.update();
            route(`${ this.refs.idAuth.value }/list`)
          } else if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
            console.log('Response else' + xhr.responseText)
          } else {
            console.log('Unknown status Response ' + xhr.responseText)
          }
        }
        xhr.send(`id=${ this.refs.idAuth.value }&password=${ this.refs.pwAuth.value }`);
      }
        </script>
</landing>
