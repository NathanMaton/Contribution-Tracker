var request = require('request');

var urls = [
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c9300ce76",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c9300a34d",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c930089a8",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93008f25",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93008b63",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c930082b6",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c9300734a",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93007490",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c9300641e",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93005d86",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93004fd4",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c930053b2",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c930047d9",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93003bc8",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93003742",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93002dea",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93002a27",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c930013b7",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93001e0d",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93010207",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c9300ed03",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c9300f2d1",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c9300e77c",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c9300dd14",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c9300bc5d",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c9300c73b",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93009e70",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c930076c1",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c93006d58",
"http://jlank.iriscouch.com/wapohack/a649db13651b4a601338cc7c930045b7"
];

urls.forEach(function (u) {
  console.log(u);
  request.get(u, function (e, r, body) {
    var t = JSON.parse(body);
    //console.log(t._rev);
    //console.log(u + '?' + t._rev);
    request.del(u + '?rev=' + t._rev, function (e, r, b) {
      console.log(b);
    });
  });
});