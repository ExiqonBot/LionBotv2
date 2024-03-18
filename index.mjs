const {
   spawn
} = require('child_process')
const path = require('path')

function start() {
   let args = [path.join(__dirname, 'plugins.js'), ...process.argv.slice(2)]
   console.log([process.argv[0], ...args].join('\n'))
   let p = spawn(process.argv[0], args, {
         stdio: ['inherit', 'inherit', 'inherit', 'ipc']
      })
      .on('message', data => {
         console.log('[RECEIVED]', data)
         switch (data) {
           case 'reset':
             p.process.kill()
             isRunning = false
             start.apply(this, arguments)
             break
           case 'uptime':
             p.send(process.uptime())
             break
                 case 'multi':
             ha

             break

         }
       })
      .on('exit', code => {
         console.error('Exited with code:', code)
         if (code == '.' || code == 1 || code == 0) start()
      })
}
start()