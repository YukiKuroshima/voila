<landing>

<!--Intro Section-->
<section class="view intro-2 hm-gradient">
    <div class="container flex-center">
        <div class="d-flex align-items-center content-height">
            <div class="row flex-center pt-5 mt-3">
                <div class="col-md-6 text-center text-md-left mb-5">
                    <div class="">
                        <h1 class="h1-responsive font-bold wow fadeInLeft" data-wow-delay="0.3s">Make your own ticket now!</h1>
                        <hr class="hr-light wow fadeInLeft" data-wow-delay="0.3s">
                        <h6 class="wow fadeInLeft" data-wow-delay="0.3s">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente, fugiat! Commodi sequi non animi ea dolor molestiae, quisquam iste, maiores. Nulla.</h6>
                        <br>
                        <a class="btn wow fadeInLeft waves-light" data-wow-delay="0.3s" ripple-radius>Learn more</a>
                    </div>
                </div>

                <div class="col-md-6 col-xl-5 offset-xl-1">
                    <!--Form-->
                    <div class="card wow fadeInRight" data-wow-delay="0.3s">
                        <div class="card-body">
                            <!--Header-->
                            <div class="text-center">
                                <h3 class=""><i class="fa fa-user"></i> Create New Ticket</h3>
                                <hr class="hr-light">
                            </div>

                            <!--Body-->
                            <div class="md-form">
                                <i class="fa fa-user prefix "></i>
                                <input type="text" id="form3" class="form-control" mdbActive>
                                <label for="form3">Your ticket name</label>
                            </div>

                            <div class="md-form">
                                <i class="fa fa-lock prefix "></i>
                                <input type="password" id="form4" class="form-control" mdbActive>
                                <label for="form4">Your password</label>
                            </div>

                            <div class="text-center">
                                <button class="btn btn-indigo waves-light" ripple-radius>Sign up</button>
                                <hr class="hr-light mb-3 mt-4">
                            </div>
                        </div>
                    </div>
                    <!--/.Form-->
                </div>
            </div>
        </div>
    </div>
</section>

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
