<post>
    <h1>POST data to ticket  ID: { ticketId } Unique: { uniqueKey }</h1>
    
    <input ref="data" placeholder="data">
    <button onclick={ postData } >Submit</button>

    <script type='es6'>
      this.on('before-mount', () => {
        const arr = window.location.hash.split('/');
        console.log(arr)
        ticketId = arr[0].substring(1);
        console.log(ticketId)
        uniqueKey = arr[2];
        console.log(uniqueKey)
      })

      this.postData = (e) => {
        const URL = `/api/tickets/${ ticketId }/${ uniqueKey }`;
        const xhr = new XMLHttpRequest();
        console.log(`XMLHttp ${URL}`)
        console.log(`postData clicked ${ this.refs.data.value }`)

        xhr.open('POST', URL, true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = () => {
          if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
            // Request finished. Do processing here.
            console.log('Response ' + xhr.responseText)
            // TODO Needs to be changed later
            this.update();
          } else if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
            console.log('Response ' + xhr.responseText)
          } else {
            console.log('Unknown status Response ' + xhr.responseText)
          }
        }
        xhr.send(`data=${ this.refs.data.value }`);
      }
    </script>
</post>

