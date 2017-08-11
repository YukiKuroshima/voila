<post>
<div style="margin-top: 40px" class="container">

    <div class="jumbotron">
        <p class="h5 text-center mb-4">Upload data</p>
        <div if={ errorText }>
            <div class="alert alert-danger" role="alert">
                <strong>Oops!</strong> { errorText }
            </div>
        </div>
        <div if={ successText }>
            <div class="alert alert-success" role="alert">
                <strong>Yay!</strong> { successText }
            </div>
        </div>

        <div class="md-form">
            <i class="fa fa-inbox prefix grey-text"></i>
            <input ref="data" type="text" class="form-control">
            <label>Your data</label>
        </div>
        <div class="text-center">
            <button onclick={ postData } class="btn btn-default">Submit</button>
        </div>
    </div>

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
            this.successText = 'Successfully uploaded data'
            this.update();
          } else if(xhr.readyState == XMLHttpRequest.DONE) {
            console.log('Response ' + xhr.responseText)
            this.errorText = 'Something went wrong. Please let your professor know.'
            this.update();
          }
        }
        xhr.send(`data=${ this.refs.data.value }`);
      }
    </script>
</post>

