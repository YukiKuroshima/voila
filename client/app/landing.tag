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
            this.generatedURL = `${ window.location.host }/#
                                 ${ opts.ticketId }/post/
                                 ${ JSON.parse(xhr.response).key }`;
            this.update();
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
      }
    </script>
</landing>
