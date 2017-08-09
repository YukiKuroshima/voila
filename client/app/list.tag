<list>
<h1>Ticket  ID: { opts.ticketId }</h1>
<div class="container-fluid">
<table class="table table-respinsive table-hover">
    <thead>
        <tr>
            <th><h3 class="h3-responsive">#</h3></th>
            <th><h3 class="h3-responsive">Unique Key</h3></th>
            <th><h3 class="h3-responsive">Data</h3></th>
            <th>
                <div class="text-center">
                    <h3 class="h3-responsive">Checked in?</h3>
                </div>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr each={ customer, index in customers }>
            <th scope="row"><h4 class="h4-responsive">{ index+1 }</h4></th>
            <td><h4 class="h4-responsive">{ customer.key }</h4></td>
            <td><h4 class="h4-responsive">{ customer.data }</h4></td>
            <td>
                <div class="text-center">
                    <i if={ customer.data !== undefined } class="fa fa-check fa-3x" aria-hidden="true"></i>
                </div>
            </td>
        </tr>
    </tbody>
</table>
    
</div>
    <script type='es6'>
      this.counter = 1;

      this.on('mount', () => {
        const customers = [];
        const URL = `/api/tickets/${ opts.ticketId }?test=test`;
        const xhr = new XMLHttpRequest();
        console.log(`List mounted`)
        // console.log(`postData clicked ${ this.refs.data.value }`)

        xhr.open('GET', URL, true);
        xhr.setRequestHeader("x-access-token", localStorage.getItem('token'));

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

