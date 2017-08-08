<landing>

<!-- New Ticket form -->
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
<!-- Auth Ticket form -->

<script type='es6'>
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
