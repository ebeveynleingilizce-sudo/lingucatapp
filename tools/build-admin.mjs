import {build} from 'esbuild';
await build({entryPoints:['apps/linguadmin/src/main.js'],bundle:true,minify:true,format:'iife',target:['chrome100','firefox102'],outfile:'apps/linguadmin/admin.bundle.js',legalComments:'eof'});
console.log('LinguAdmin production bundle built. Serve repository root; open /apps/linguadmin/.');
await import('./build-admin-pwa.mjs');
