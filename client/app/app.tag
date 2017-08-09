<app>

    <li><a href="#{ localStorage.getItem('ticketID') }/gen">Check in</a></li>
    <li><a href="#{ localStorage.getItem('ticketID') }/list">Show list</a></li>
    <li><a href="#{ localStorage.getItem('ticketID') }/post">Test Post</a></li>
    <li><a href="#landing">Landing</a></li>

    <h1>Ticket ID: { localStorage.getItem('ticketID') }</h1>

    <div id="content-tag"></div>

    <!--Footer-->
    <footer class="page-footer unique-color center-on-small-only">
         <div id="footer-tag"></div>
    </footer>
    <!--/.Footer-->

    <script type='es6'>

      this.on('mount', () => {
        riot.mount('div#footer-tag', 'footer-tag')
        console.log('app mouted')
        route.start(true)
      })

      route((a, b, c) => {

        console.log('a ' + a + ' b ' + b + ' c ' + c)
        if (b === 'gen') {
          console.log('gen')
          riot.mount('div#content-tag', 'gen', { ticketId: a })
        } else if (b === 'list') {
          console.log('list')
          riot.mount('div#content-tag', 'list', { ticketId: a })
        } else if (b){
          console.log('post')
          riot.mount('div#content-tag', 'post')
        } else {
          console.log('else')
          riot.mount('div#content-tag', 'landing')
        }
      })
    </script>
</app>
