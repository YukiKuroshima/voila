<gen>

    <h1>gen Ticket ID: { opts.ticketId }</h1>
    
    <h2>URL: { generatedURL }</h2>

    <button onclick={ generateQRCode } >Next QR Code</button>

    <script type='es6'>
      let generatedURL = '';

      this.generateQRCode = (e) => {
        const URL = `/api/tickets/${ opts.ticketId }`;
        const xhr = new XMLHttpRequest();
        console.log(`XMLHttp ${URL}`)

        xhr.open('GET', URL, true);

        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = () => {
          if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
            // Request finished. Do processing here.
            console.log('Response ' + xhr.responseText)
            // TODO Needs to be changed later
            this.generatedURL = `${ window.location.host }/#${ opts.ticketId }/post/${ JSON.parse(xhr.response).key }`;
            this.update();
          } else if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
            console.log('Response ' + xhr.responseText)
          } else {
            console.log('Unknown status Response ' + xhr.responseText)
          }
        }
        xhr.send();
      }
    </script>
</gen>

