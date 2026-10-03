import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
const types={'.html':'text/html','.jpg':'image/jpeg','.png':'image/png','.css':'text/css','.js':'text/javascript'};
createServer(async (req,res)=>{
  try{
    let p=decodeURIComponent(req.url.split('?')[0]);
    if(p==='/')p='/index.html';
    const buf=await readFile('.'+p);
    res.writeHead(200,{'content-type':types[extname(p)]||'application/octet-stream'});
    res.end(buf);
  }catch(e){res.writeHead(404);res.end('404')}
}).listen(4321,()=>console.log('serving on http://localhost:4321'));
