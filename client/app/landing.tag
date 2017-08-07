<landing>


<h1>landing</h1>

<h2>Create new ticket</h2>
<input ref="idSave" placeholder="Enter the ticketID">
<input ref="pwSave" placeholder="Enter password">
<button onclick={ saveTicket } >Create new ticket</button>

<h2>View your ticket</h2>
<input ref="idAuth" placeholder="Enter the ticketID">
<input ref="pwAuth" placeholder="Enter password">
<button onclick={ authTicket } >View your ticket</button>

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
