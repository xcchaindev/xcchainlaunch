const glob = require('glob')
const { readFileSync, writeFileSync } = require('fs')
const fsExtra = require('fs-extra')

const root_folder = './wp_temp_build'
const _extenstions = ['*.js']


fsExtra.remove('./wordpress_vendor/', (err) => {
  fsExtra.copy(root_folder + '/static/', './wordpress_vendor/static/', err => {
    _extenstions.forEach((ext) => {
      glob('./wordpress_vendor/' + '/**/' + ext, (err, files) => {
        if (err) {
          console.log('Error', err)
        } else {
          files.forEach((file) => {
            const content = readFileSync(file, 'utf8');

            const newContent = content.replaceAll('"LAUNCHPAD_ROOT_URL/"', 'window.SO_LAUNCHPAD_ROOT + "/wordpress_vendor/"');

            console.log(file);
            writeFileSync(file, newContent);
          })
        }
      })
    })
  })
})