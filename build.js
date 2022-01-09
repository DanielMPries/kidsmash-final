const fs = require('fs-extra');

require('esbuild')
  .build({
    logLevel: 'info',
    entryPoints: ['./src/main.ts'],
    bundle: true,
    treeShaking: true,
    watch: {
        onRebuild(error, result) {
          if (error) console.error('watch build failed:', error)
          else console.info('watch build succeeded:', result)
        },
      },
      outfile: './dist/app.js',
    })
    .then(() => {
      // copy our index.html file 
      fs.copy('./src/index.html', './dist/index.html')
        .then(() => console.info('Copied index.html'))
        .catch(err => console.error(err));
  
      // copy our static assets
      fs.copy('./src/assets/', './dist/assets/')
        .then(() => console.info('Copied assets'))
        .catch(err => console.error(err));
    })
    .catch(() => process.exit(1));