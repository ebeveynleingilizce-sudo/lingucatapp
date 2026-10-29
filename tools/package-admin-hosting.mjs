// Package the real LinguCat runtime for same-origin admin previews, without a second student PWA.
import {execFileSync} from 'node:child_process';
import {readFile,mkdir,writeFile,copyFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),target=path.resolve(root,'.firebase/linguadmin-public');
if(target!==path.join(root,'.firebase','linguadmin-public'))throw Error('Unexpected hosting target');
await mkdir(target,{recursive:true});
const tracked=execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
const files=tracked.filter(p=>/^apps\/linguadmin\//.test(p)&&!p.includes('/src/')&&!p.endsWith('.md')||/^[^/]+\.(js|css)$/.test(p)&&p!=='sw.js'||p==='index.html'||/^packages\/shared-(content|ui)\/.+\.js$/.test(p)||/^data\/.+\.json$/.test(p)||/^assets\/.+\.(png|jpg|jpeg|webp|svg|mp3|wav|ogg)$/i.test(p));
if(!files.includes('apps/linguadmin/canonical.js'))files.push('apps/linguadmin/canonical.js');
for(const file of files){const output=path.join(target,file);await mkdir(path.dirname(output),{recursive:true});if(file==='index.html'){let html=await readFile(file,'utf8');html=html.replace(/<link rel="manifest"[^>]*>/g,'').replace('<script src="pwa.js"></script>','').replace(/<div id="appSplash"[\s\S]*?<\/div>/,'');await writeFile(output,html);}else await copyFile(file,output);}
console.log('LinguAdmin hosting package:',files.length,'files. No account data or server files.');
