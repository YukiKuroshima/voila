<post>
    <h1>POST data to ticket  ID: { opts.ticketId } Unique: { opts.uniqueKey }</h1>
    
    <h2>URL: { generatedURL }</h2>

    <input ref="data" placeholder="data">
    <button onclick={ postData } >Submit</button>

    <script type='es6'>
      // let generatedURL = '';

      this.postData = (e) => {
        const URL = `/api/tickets/${ opts.ticketId }/${ opts.uniqueKey }`;
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
        xhr.send(`data=${ this.refs.data.value }`);
      }
    </script>
</post>

