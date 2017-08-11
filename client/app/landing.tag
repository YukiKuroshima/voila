<landing>

<section class="introduction">
    <div class="intro-container container white-text">
        <h2 class="h2-responsive wow fadeInRight " data-wow-delay="0.3s">Simple</h2>
        <h2 class="h2-responsive wow fadeInRight custom-gray" data-wow-delay="0.8s">Stylish</h2>
        <h2 class="h2-responsive wow fadeInRight custom-gray" data-wow-delay="1.3s">Easy</h2>
        <h2 class="h2-responsive wow fadeInRight custom-gray" data-wow-delay="2.0s">Ticketing System</h2>
        <h1 class="h1-responsive wow fadeInRight" data-wow-delay="2.8s">
            <strong>Voila</strong>
            <small class="text-muted wow fadeIn white-text" data-wow-delay="4.4s">Oh! It's free, too</small>
        </h1>
    </div>
</section>

<div class="container">
    <div class="row container text-center">
        <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <h1 class="h1-responsive font-bold wow fadeInLeft" data-wow-delay="0.3s">What is Voila?</h1>
            <hr class="hr-light wow fadeInLeft" data-wow-delay="0.3s">
            <h6 class="wow fadeInLeft" data-wow-delay="0.3s">Voila is a simple ticketing system. You can easily keep track of who participated your class or any event. With Voila, you can create unique QR codes instantly, and your students can scan it and post data to it.</h6>
            <br>
            <h2 class="h2-responsive wow fadeIn" data-wow-delay="0.3s">Sounds Cool, right?</h2>
            <h2 class="h2-responsive wow fadeIn" data-wow-delay="0.3s">Easy Three Steps to make your first ticket</h2>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <i class="fa fa-ticket fa-5x"></i>
            <h4 class="h4-responsive text-center wow fadeIn" data-wow-delay="0.3s">Create New Ticket</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, inventore, ipsa dolorum laborum sit alias iusto nam quibusdam ad distinctio rerum expedita autem itaque delectus iste mollitia perferendis sint libero accusamus
            in. Enim, natus necessitatibus pariatur optio explicabo consequuntur quod!</p>
        </div>
        <div class="col-md-4">
            <i class="fa fa-qrcode fa-5x"></i>
            <h4 class="h4-responsive text-center wow fadeIn" data-wow-delay="0.3s">Students Scan QR Code</h4>
            <p>Ut, aliquid, aperiam, veniam modi voluptates maiores nesciunt libero fugiat illum recusandae cum similique et alias possimus error ex tenetur quasi sint eius dicta officia earum eveniet suscipit corporis autem deleniti nihil sed!
            Earum blanditiis vel similique nisi fugit reprehenderit?</p>
        </div>
        <div class="col-md-4">
            <i class="fa fa-calendar-check-o fa-5x"></i>
            <h4 class="h4-responsive text-center wow fadeIn" data-wow-delay="0.3s">See List of Students</h4>
            <p>Quisquam eos aperiam autem atque minus modi similique earum! Ab, laboriosam odit non quo officiis asperiores atque dolorum omnis vitae in qui officia sequi molestias quisquam velit exercitationem aperiam. Voluptatum, unde, nesciunt
            temporibus voluptates sint ab architecto at quod dolore.</p>
        </div>
    </div>
    <div class="row">
        <!-- New Ticket form -->
        <div class="containter">
            <div class="row container">
                <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <p class="h5 text-center mb-4">Create new ticket</p>
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
                        <i class="fa fa-envelope prefix grey-text"></i>
                        <input ref="idSave" type="text" class="form-control">
                        <label>Ticket name</label>
                    </div>

                    <div class="md-form">
                        <i class="fa fa-lock prefix grey-text"></i>
                        <input ref="pwSave" type="password" class="form-control">
                        <label for="defaultForm-pass">Ticket password</label>
                    </div>

                    <div class="text-center">
                        <button onclick={ saveTicket } class="btn btn-default">Create</button>
                    </div>
                    <!-- New Ticket form -->

                    <!-- Auth Ticket form -->
                    <p class="h5 text-center mb-4">View your ticket</p>

                    <div if={ errorTextAuth }>
                        <div class="alert alert-danger" role="alert">
                              <strong>Oops!</strong> { errorTextAuth }
                        </div>
                    </div>

                    <div class="md-form">
                        <i class="fa fa-envelope prefix grey-text"></i>
                        <input ref="idAuth" type="text" class="form-control">
                        <label>Ticket name</label>
                    </div>

                    <div class="md-form">
                        <i class="fa fa-lock prefix grey-text"></i>
                        <input ref="pwAuth" type="password" class="form-control">
                        <label for="defaultForm-pass">Ticket password</label>
                    </div>

                    <div class="text-center">
                        <button onclick={ authTicket } class="btn btn-default">View</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Auth Ticket form -->
    </div>
</div>


        <script type='es6'>
            this.on('mount', () => {
              new WOW().init();
            })

    this.saveTicket = (e) => {
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
            console.log('201 ' + xhr.responseText)
            this.successText = 'Success! Please view your ticket by logging in below'
            this.errorText = ''
            this.update();
          } else if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
            // console.log('Response ' + xhr.response)
            console.log('400 ' + xhr.responseText)
            console.log(JSON.parse(xhr.response).message);
            this.errorText = this.stringifyError(JSON.parse(xhr.response).message);
            this.successText = ''
            this.update();
          } else {
            console.log('else ' + xhr.responseText)
            this.successText = ''
            this.alertText = JSON.parse(xhr.response).message;
            this.update();
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
            this.errorTextAuth = this.stringifyError(JSON.parse(xhr.response).message);
            this.successTextAuth = ''
            this.update();
          } else {
            console.log('Unknown status Response ' + xhr.responseText)
            this.errorTextAuth = JSON.parse(xhr.response).message;
            this.successTextAuth = ''
            this.update();
          }
        }
        xhr.send(`id=${ this.refs.idAuth.value }&password=${ this.refs.pwAuth.value }`);
      }
      
      this.stringifyError = (error) => {
          console.log(error)
          console.log(error.includes('duplicate'))
        if (error.includes('duplicate')) {
          console.log('dup')
          return 'This ticket name is taken. Please choose another name'
        } else if (error.includes('No ticket found by the id') || error.includes('Wrong password')) {
          return 'Ticket name and password do not match'
        } else {
          return error
        }
      }
    </script>
</landing>
