<app>
    <h1>App</h1>
    <div id="content-tag"></div>

    <script type='es6'>

      this.on('mount', () => {
        console.log('app mouted')
        route.start(true)
      })

      route((a, b) => {

        console.log('a ' + a + ' b ' + b)
        if (b === 'gen') {
          console.log('gen')
          riot.mount('div#content-tag', 'gen')
        } else if (b === 'list') {
          console.log('list')
          riot.mount('div#content-tag', 'list')
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
