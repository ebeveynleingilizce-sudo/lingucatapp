import {build} from 'esbuild';
import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import vm from 'node:vm';
await build({entryPoints:['src/account.js'],bundle:true,minify:true,format:'iife',target:['chrome100','firefox102'],outfile:'account.bundle.js',legalComments:'eof'});
await mkdir('functions/catalog',{recursive:true});
for(const name of ['the-mysterious-student.json','every-day-every-way.json'])await copyFile('data/'+name,'functions/catalog/'+name);
const context={window:{}};vm.runInNewContext(await readFile('match-rush-data.js','utf8'),context);
await writeFile('functions/catalog/match.json',JSON.stringify(context.window.LINGUCAT_MATCH_WORDS));
// Keep server validation on the same pure engine as the existing game.
await copyFile('engine.js','functions/engine.cjs');
console.log('Account client and canonical server catalog built.');

const tabs=await readFile('tabs.js','utf8');
const unitsSource=tabs.match(/var units=(\[[\s\S]*?\]);/)[1];
const units=vm.runInNewContext(unitsSource);
const wordKeys=units.flatMap(u=>u.words.map(w=>u.id+':'+w[0]));
for(const content of ['the-mysterious-student','every-day-every-way']){const c=JSON.parse(await readFile('data/'+content+'.json','utf8'));wordKeys.push(...c.expressions.map(x=>'expressions:'+x));}
await writeFile('functions/catalog/words.json',JSON.stringify([...new Set(wordKeys)]));

await copyFile('packages/shared-content/schema.js','functions/cms-schema.cjs');
{const path='functions/cms-schema.cjs';await writeFile(path,(await readFile(path,'utf8')).replaceAll("require('../../engine.js')","require('./engine.cjs')").replaceAll("require('./audience.js')","require('./audience.cjs')").replaceAll("require('../game-kit/schema.js')","require('./game-schema.cjs')"));}
await copyFile('packages/shared-content/audience.js','functions/audience.cjs');

await copyFile("packages/game-kit/schema.js","functions/game-schema.cjs");
await writeFile("functions/game-results.cjs",(await readFile("packages/game-kit/results.js","utf8")).replaceAll("require('./schema.js')","require('./game-schema.cjs')"));
await copyFile("data/game-packs/starter.json","functions/game-catalog.json");
