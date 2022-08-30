const Koa = require('koa');
var Router = require('koa-router');

const path = require('path');

const exec = require('./exec.js');
const R = require('ramda');
const math = require('mathjs');

const app = new Koa();
var router = new Router();

//const matrix = math.matrix([[0, 1], [2, 3], [4, 5]]);

const permutations = R.compose(R.sequence(R.of), R.flip(R.repeat));

let example =  [{"Sun":{"longitude":129.7486188}},{"Moon":{"longitude":321.2147636}},{"Mercury":{"longitude":119.051831}}];

let exampleRes = permutations(2,example);


let apects = [];
exampleRes = exampleRes.forEach( planets =>
  {
    let _keys = R.concat(Object.keys(planets[0]),Object.keys(planets[1])).sort();

    if((Object.keys(planets[0])[0]!==Object.keys(planets[1])[0])&&(!apects.some(item => _keys.every(r => item.keys.includes(r)))))
      apects.push({keys:_keys,data:Math.abs(planets[0][Object.keys(planets[0])]['longitude']-planets[1][Object.keys(planets[1])]['longitude'])})
  }

);
console.log(apects);
console.log("_________________________________________________");



const swePath = process.env.SWEPATH||'D:\\sweph\\bin\\swetest.exe';
const port = process.env.PORT||80;

router.get('/data', async ctx => {


//https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331766000&language=es&key=AIzaSyCsj7KZjcMy6ZTxyjERzeOmtjLBTpGwG_M
    let res={};

  if(Object.keys(ctx.request.query ).length !== 0)
    res = await  exec(swePath+` -b${ctx.request.query.date}  -fPljS -head -g; -house${ctx.request.query.geolocation},P -utc${ctx.request.query.time}`);

    ctx.body = res; // is a Koa Response
//  ctx.body = permutations(2,res); // is a Koa Response
})
.get('/interpritation', (ctx, next) => {
    ctx.body = 'interpritation';
})

app.use(router.routes())

app.listen(port);
