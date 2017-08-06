<list>
    <h1>List data of ticket  ID: { opts.ticketId }</h1>
    <div each={ customers }>
        <h3>{ key }</h3>
        <h3>{ data }</h3>
    </div>
    
    <script type='es6'>

      this.on('mount', () => {
        const customers = [];
        const URL = `/api/tickets/${ opts.ticketId }?test=test`;
        const xhr = new XMLHttpRequest();
        console.log(`List mounted`)
        // console.log(`postData clicked ${ this.refs.data.value }`)

        xhr.open('GET', URL, true);

        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = () => {
          if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            // Request finished. Do processing here.
            console.log('Response ')
            // TODO Needs to be changed later
            this.customers = JSON.parse(xhr.response).result.customers;
            console.log(JSON.parse(xhr.response).result.customers);
            console.log('Response ' + this.customers)
            this.update();
          } else if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
            console.log('Response ' + xhr.responseText)
          } else {
            console.log('Unknown status Response ' + xhr.responseText)
          }
        }
        xhr.send();
      })
    </script>
</list>

