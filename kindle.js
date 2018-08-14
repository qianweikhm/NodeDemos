var express=require('express');
var cheerio=require('cheerio');
var superagent=require('superagent');
var superagentcharset=require('superagent-charset');
superagentcharset(superagent);
var fs=require('fs');
var app=new express();

const baseUrl='http://mebook.cc/category/cxxs/page/';

app.get('/',function(req,res){

    for(var i=1;i<=525;i++){
      superagent.get(baseUrl+i).charset('utf-8').end(function(err,sres){
        var items=[];
        if(err){
          console.log(err)
        }
        var $=cheerio.load(sres.text);
        $("ul.list div.content h2 a").each(function(index,element){
          var $element=$(element);
          items.push({
            title:$element.attr("title"),
            href:$element.attr("href")
          })
        })
        saveFile(items);
      }) 
    }

})


function saveFile(items){
  for(var i=0;i<10;i++){
    fs.appendFile('kindle.txt','书名：'+items[i].title+'\r\n'+'链接是：'+items[i].href+'\r\n',function(err){
      if(!err){

      }
    });
  }
}


app.listen(8080,function(err){
  if(!err){
    console.log("服务已启动")
  }
})