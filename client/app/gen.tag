<gen>
    <div style="margin-top: 30px" class="container">
        <div class="jumbotron">
            <div class="text-center">
                <h1 class="display-3">{ uniqueKey }</h1>
                <div id="placeHolder"></div>
                <a onclick={ generateURL } class="btn btn-primary btn-lg" role="button">Next QR Code</a>
                <hr class="hr-width md-5 mt-5 pb-3">
                <h4 class="display-5">How to use?</h4>
                <p>Simply scan this code with your cellphone and go to the URL.</p>
                <a class="btn btn-info btn-lg" href="#" role="button">Learn more <i class="fa fa-eye mr-1"></i></a>
            </div>
            </p>
        </div>
    </div>

    <script type='es6'>
      this.on('mount', () => {
        this.generateURL();

      });

      this.generateURL = (e) => {
        const URL = `/api/tickets/${ opts.ticketId }`;
        const xhr = new XMLHttpRequest();
        console.log(`XMLHttp ${URL}`)

        xhr.open('GET', URL, true);

        xhr.setRequestHeader("x-access-token", localStorage.getItem('token'));

        xhr.onreadystatechange = () => {
          if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
            // Request finished. Do processing here.
            console.log('Response ' + xhr.responseText)
            // TODO Needs to be changed later
            this.generatedURL = `${ window.location.origin }/#${ opts.ticketId }/post/${ JSON.parse(xhr.response).key }`;
            this.uniqueKey = JSON.parse(xhr.response).key;
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
        var errorCorrectionLevel = 'H';
        var qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(uniqueURL);
        qr.make();
        document.getElementById('placeHolder').innerHTML = qr.createImgTag();
      }

    </script>
</gen>

