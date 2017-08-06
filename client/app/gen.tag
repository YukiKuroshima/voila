<gen>

    <h1>gen Ticket ID: { opts.ticketId }</h1>
    
    <h2>URL: { generatedURL }</h2>

    <div id="placeHolder"></div>

    <button onclick={ generateURL } >Next QR Code</button>

    <script type='es6'>
      let generatedURL = '';

      this.generateURL = (e) => {
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
            this.generatedURL = `${ window.location.origin }/#${ opts.ticketId }/post/${ JSON.parse(xhr.response).key }`;
            this.generateQRCode(this.generatedURL);
            this.update();
          } else if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
            console.log('Response ' + xhr.responseText)
          } else {
            console.log('Unknown status Response ' + xhr.responseText)
          }
        }
        xhr.send();
      }

      this.generateQRCode = (uniqueURL) => {
        console.log(uniqueURL)
        var typeNumber = 0;
        var errorCorrectionLevel = 'L';
        var qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(uniqueURL);
        qr.make();
        document.getElementById('placeHolder').innerHTML = qr.createImgTag();
      }

    </script>
</gen>

