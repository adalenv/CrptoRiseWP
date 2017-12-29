var crtools=crtools||{};var types=["from","to"];crtools.converter={init:function(a){var c={from:"I give",to:"I get",title:"Converter"};if(!a.titleName){a.titleName=c.title}a.toolID=a.toolID.indexOf("#")==0?a.toolID:"#"+a.toolID;var b=jQuery('<div class="calc"><h3>'+a.titleName+"</h3></div>");jQuery.each(types,function(e,h){if(!a.fromName){a.fromName=c.from}if(!a.toName){a.toName=c.to}var d=jQuery('<select class="input-group-addon-ct"></select>'),f=jQuery('<div><label></label><div class="input-group-ct" ><input type="number" class="form-control-ct"></div></div>');f.find("input").on("keyup",function(j){crtools.converter.initData(j)});f.find("label").text(a[h+"Name"]);d.on("change",function(k){var j=jQuery(k.currentTarget);crtools.converter.initData({currentTarget:j.closest(".calc").find(".from input")})});d.addClass(h);f.find("div.input-group-ct").addClass(h);b.append(f);if(a[h]&&a[h]!==""){var g=a[h].split(",");if(g.length>0){if(g.length===1){var i=jQuery('<span class="input-group-addon-ct">'+g[0].replaceAll(" ","")+" </span>");i.addClass(h);b.find("div."+h).append(i)}else{crtools.converter.addOptions(d,g);b.find("div."+h).append(d)}}else{crtools.converter.addOptions(d,dictionary.currency);b.find("div."+h).append(d)}}else{crtools.converter.addOptions(d,dictionary.currency);b.find("div."+h).append(d)}});if(jQuery(a.toolID+" .calc").length==0){jQuery(a.toolID).html(b)}},render:function(){},addOptions:function(b,a){b.html("");jQuery.each(a,function(c,d){var f=d.id?d.id:d.replace(" ","");var e=d.text?d.text:d.replace(" ","");b.append("<option value='"+f+"'>"+e+"</option>")})},calculate:function(d,c,b,a){jQuery.get(dictionary.coinUrl+"price?fsym="+d+"&tsyms="+c,function(f){var e;if(a.closest("div").hasClass("to")){e=f[c]*parseFloat(b)}else{e=parseFloat(b)/f[c]}a.val(e)})},initData:function(d){var c=jQuery(d.currentTarget);var a={from:c.closest(".calc").find(".from span"),to:c.closest(".calc").find(".to span")};var f=c.val(),h=a.from.length!=0?a.from.html().replaceAll(" ",""):c.closest(".calc").find(".from select").val(),g=a.to.length!=0?a.to.html().replaceAll(" ",""):c.closest(".calc").find(".to select").val(),b=jQuery("."+(c.closest("div").hasClass("from")?"to":"from")+" input");if(f&&f!=""){crtools.converter.calculate(h,g,f,b)}}};var crtools=crtools||{};var currencyIcons={USD:{Name:"US Dollar",ISOSymbol:"$"},EUR:{Name:"Euro",ISOSymbol:"€"},GBP:{Name:"British Pound",ISOSymbol:"£"},BTC:{Name:"Bitcoin",ISOSymbol:"Ƀ"},ETH:{Name:"Ether",ISOSymbol:"Ξ"},GOLD:{Name:"Gold",ISOSymbol:"Gold g"},AUD:{Name:"Australian Dollar",ISOSymbol:"AUD"},BRL:{Name:"Brazilian Real",ISOSymbol:" R$"},CAD:{Name:"Canadian Dollar",ISOSymbol:"CAD"},CHF:{Name:"Swiss Franc",ISOSymbol:"CHF"},CNY:{Name:"Chinese Yuan",ISOSymbol:"¥"},HKD:{Name:"Hong Kong Dollar",ISOSymbol:"HKD"},HUF:{Name:"Hungarian Forint ",ISOSymbol:"HUF"},INR:{Name:"Indian Rupee",ISOSymbol:"₹"},JPY:{Name:"Japanese Yen",ISOSymbol:"¥"},KRW:{Name:"South Korean Won",ISOSymbol:"₩"},MXN:{Name:"Mexican Peso",ISOSymbol:"MXN"},NZD:{Name:"New Zealand Dollar",ISOSymbol:"NZD"},PHP:{Name:"Philippines Peso",ISOSymbol:"₱"},PLN:{Name:"Polish Zloty",ISOSymbol:"zł"},RON:{Name:"Romanian New Leu",ISOSymbol:"lei"},RUB:{Name:"Russian Ruble",ISOSymbol:"₽"},SGD:{Name:"Singapore Dollar",ISOSymbol:"SGD"},VEF:{Name:"Venezuelan Bolivar",ISOSymbol:"Bs"}};var localArgs={};crtools.graph={init:function(a){var c=this;a.toolID=a.toolID.indexOf("#")==0?a.toolID:"#"+a.toolID;localArgs[a.toolID]=a;var b=jQuery('<div class="single-chart-block"><div class="sg-fiats"></div><div class="sg-buttons"></div><div class="chart-div" style="width	: 100%; height	: 500px;"></div></div>');b.find(".chart-div").attr("id",a.toolID+"-chart-div");if(jQuery(a.toolID+" .single-chart-block").length==0){jQuery(a.toolID).html(b)}this.render(a);jQuery(".period-button").on("click",function(g){var d=jQuery(g.currentTarget);jQuery(a.toolID+" .period-button").removeClass("active");d.addClass("active");var f=d.closest(".single-chart-block").find(".chart-div").attr("id").replace("-chart-div","");localArgs[f].currentPeriod=d.text();c.render(a)});jQuery(".fiat-button").on("click",function(g){var d=jQuery(g.currentTarget);jQuery(a.toolID+" .fiat-button").removeClass("active");d.addClass("active");var f=d.closest(".single-chart-block").find(".chart-div").attr("id").replace("-chart-div","");localArgs[f].currentFiat=d.text();c.render(a)})},renderGraph:function(d,g,a,c,e){var f=this;var b=AmCharts.makeChart(g,{type:"stock",theme:"light",categoryAxesSettings:{minPeriod:c,groupToPeriods:[c]},dataSets:[{fieldMappings:[{fromField:"value",toField:"value"},{fromField:"volume",toField:"volume"}],dataProvider:d,title:"",categoryField:"date"}],panels:[{title:"Value "+e,percentHeight:70,stockGraphs:[{type:"line",id:"g1",valueField:"value",lineThickness:2,fillAlphas:0.3,useDataSetColors:false,balloonText:a+" [[value]]",title:"",lineColor:"#5db75c"}],chartCursor:{valueBalloonsEnabled:true,valueLineEnabled:true,valueLineBalloonEnabled:true,cursorColor:"#c90000",fullWidth:true,cursorAlpha:0.1},stockLegend:{valueTextRegular:a+" [[value]]",valueText:a+" [[value]]"}},{title:"Volume "+e,percentHeight:30,columnWidth:0.8,stockGraphs:[{type:"column",id:"g2",valueField:"volume",fillAlphas:0.8,useDataSetColors:false,balloonText:a+" [[volume]]",title:"",lineColor:"#5db75c"}],chartCursor:{valueBalloonsEnabled:true,valueLineEnabled:true,valueLineBalloonEnabled:true,cursorColor:"#c90000",fullWidth:true,cursorAlpha:0.1},stockLegend:{valueTextRegular:a+" [[value]]",valueText:" [[value]]"}}],chartScrollbarSettings:{graph:"g1",backgroundAlpha:0.25,backgroundColor:"#b0b0b0",selectedBackgroundAlpha:0.8,selectedBackgroundColor:"#b0b0b0"},responsive:{enabled:true}});b.addListener("dataUpdated",function(){f.zoomChart(b,d)})},zoomChart:function(a,b){if(a.zoomToIndexes){a.zoomToIndexes(0,b.length)}},render:function(g){var j=g.coin,e=g.fiat,h=g.period,a=g.toolID;var f=this;if(isEmpty(e)){e=["USD","EUR"]}else{e=SToA(e)}if(isEmpty(j)){j="BTC"}if(isEmpty(h)){h=["12H","1D","1W","1M","6M","1Y","ALL"]}else{h=SToA(h)}if(!g.currentPeriod){g.currentPeriod=h.includes("1D")?"1D":h[0]}if(!g.currentFiat){g.currentFiat=e[0]}renderArray(h,jQuery(g.toolID).find(".sg-buttons"),'<button type="button" class="period-button" value={{name}}>{{name}}</button>');renderArray(e,jQuery(g.toolID).find(".sg-fiats"),'<button type="button" class="fiat-button" value={{name}}>{{name}}</button>');jQuery(g.toolID).find(".sg-buttons [type=button][value="+g.currentPeriod+"]").addClass("active");jQuery(g.toolID).find(".sg-fiats [type=button][value="+g.currentFiat+"]").addClass("active");var b,d,c,i;switch(g.currentPeriod){case"12H":b="1";d="720";c="histominute";i=b+"mm";break;case"1D":b="5";d="288";c="histominute";i=b+"mm";break;case"1W":b="1";d="168";c="histohour";i=b+"hh";break;case"1M":b="1";d="720";c="histohour";i=b+"hh";break;case"6M":b="1";d="182";c="histoday";i=b+"DD";break;case"1Y":b="1";d="364";c="histoday";i=b+"DD";break;case"ALL":jQuery.get(ajaxurl+"?action=get_start_date&coin="+j,function(k){k=JSON.parse(k);if(k.Response=="Success"){var n=new Date(k.Date);var m=new Date();var o=Math.abs(m.getTime()-n.getTime());var l=Math.ceil(o/(1000*3600*24));console.log(Math.ceil(l/1000));b=Math.ceil(l/1000).toString();d="1000";c="histoday";i=b+"DD";f.getDataFromService(a,j,g.currentFiat,b,d,c,i)}else{alert(k.Message)}});return}this.getDataFromService(a,j,g.currentFiat,b,d,c,i)},getDataFromService:function(a,i,f,b,d,c,h){var e=[];var g=this;jQuery.get(dictionary.coinUrl+c+"?fsym="+i+"&tsym="+f+"&aggregate="+b+"&limit="+d,function(k){if(k.Data!=null&&k.Data.length>0){jQuery.each(k.Data,function(n,o){e.push({date:new Date(o.time*1000),value:o.close,volume:o.volumeto})})}var l=jQuery(a).find(".chart-div");var j=currencyIcons[f]==null?f:currencyIcons[f].ISOSymbol;var m=currencyIcons[f]==null?f:currencyIcons[f].Name;g.renderGraph(e,l.attr("id"),j,h,m)})}};var crtools=crtools||{};var dt={},dataSet={};crtools.table={init:function(a){jQuery.get("https://min-api.cryptocompare.com/data/all/coinlist",function(b){dictionary.coinsList=b.Data;crtools.table.initData(a)})},initData:function(i){var f=["USD","EUR"];if(i.fiat!=null){f=i.fiat.split(",")}var g=this;var b=i.coin,e=f,d=i.cols,m=i.search,c=i.pagination;if(!d||d==""){d=["price","cap","supply","volume","change","graph"]}else{d=d.split(",")}i.toolID=(i.toolID.indexOf("#")==0?"":"#")+i.toolID;if(b){b=b.split(",");jQuery.each(b,function(n,o){o=o.replaceAll(" ","").toUpperCase()})}if(c){c=jQuery.map(c.split(","),function(n){return parseInt(n)})}else{c=[10,25]}var k=jQuery(".currency select").val();if(!k){k=e?e[0]:"USD"}if(e){dictionary.currency=[];jQuery.each(e,function(n,o){dictionary.currency.push({id:o,text:o})})}dataSet[i.toolID]=[];fsyms="";pricemulti={DISPLAY:{},RAW:{}};var a=[];jQuery.each(b?b:dictionary.coinsList,function(n,o){fsyms+=(b?o:n)+",";if(fsyms.length>100){fsyms=fsyms.substring(0,fsyms.length-1);a.push(jQuery.get(dictionary.coinUrl+"pricemultifull?fsyms="+fsyms+"&tsyms="+k,function(p){pricemulti.DISPLAY=Object.assign(pricemulti.DISPLAY,p.DISPLAY);pricemulti.RAW=Object.assign(pricemulti.RAW,p.RAW)}));fsyms=""}});if(fsyms!=""){a.push(jQuery.get(dictionary.coinUrl+"pricemultifull?fsyms="+fsyms+"&tsyms="+k,function(n){pricemulti.DISPLAY=Object.assign(pricemulti.DISPLAY,n.DISPLAY);pricemulti.RAW=Object.assign(pricemulti.RAW,n.RAW)}))}jQuery.when.apply(jQuery,a).done(function(){jQuery.each(b?b:dictionary.coinsList,function(q,r){if(b){q=r;r=dictionary.coinsList[r]}if(pricemulti.DISPLAY[q]){dataSet[i.toolID].push(l(d,pricemulti,q,k,r))}});if(dt[i.toolID]==null){columnsDT=h(d);var o={lengthMenu:c,processing:true,serverSide:true,responsive:true,aoColumns:columnsDT.aoColumns,dom:'<"currency">'+(m=="yes"?"":"f")+"rtp"+(c.length==1?"":"l"),columns:columnsDT.names,order:[[0,"asc"]],columnDefs:columnsDT.columnDefs,drawCallback:function(r){var q=jQuery(this).closest(".dataTables_wrapper").find(".dataTables_paginate");q.toggle(this.api().page.info().pages>1)},ajax:function(t,z){t.start=parseInt(t.start);t.length=parseInt(t.length);var A=t.search.value;var r=0;var x=t.order[0].column;var u=dataSet[i.toolID][0][x];if(u.fullName){u=u.fullName}var v,w,q=t.order[0].dir;if(u.indexOf(" ")>=0){if(isNaN(parseFloat(u.split(" ")[1]))){v="string"}else{v="float";w=1}}else{if(isNaN(u)){v="string"}else{w=0;v="float"}}dataSet[i.toolID].sort(function(C,B){var D;if(C.fullName){D=true}if(v=="float"){if(q=="asc"){return parseFloat(C[x].split(" ")[w].replaceAll(",",""))-parseFloat(B[x].split(" ")[w].replaceAll(",",""))}else{return parseFloat(B[x].split(" ")[w].replaceAll(",",""))-parseFloat(C[x].split(" ")[w].replaceAll(",",""))}}else{if(q=="asc"){return(B[x].fullName?B[x].fullName:B[x])<(C[x].fullName?C[x].fullName:C[x])?1:-1}else{return(B[x].fullName?B[x].fullName:B[x])>(C[x].fullName?C[x].fullName:C[x])?1:-1}}});var s={aaData:[]};var y=0;jQuery.each(dataSet[i.toolID],function(B,C){if(A!==""){if(C[1].fullName.toLowerCase().indexOf(A.toLowerCase())>=0){if(B-r>=parseInt(t.start)&&B-r<parseInt(t.start)+parseInt(t.length)){s.aaData.push(C)}y++}else{r++}}else{if(B>=parseInt(t.start)&&B<parseInt(t.start)+parseInt(t.length)){s.aaData.push(C)}}});s.recordsTotal=s.out_cunt=s.recordsFiltered=A!==""?y:dataSet[i.toolID].length;z(s)}};if(j()){o.fixedColumns=true;o.scrollY=true;o.scrollX=true;o.scrollCollapse=true;o.fixedColumns={leftColumns:2}}dt[i.toolID]=jQuery(i.toolID).DataTable(o);var n=jQuery(".currency");if(n.find("select").length==0){var p="";jQuery.each(dictionary.currency,function(q,r){p+='<option value="'+r.id+'">'+r.text+"</option>\r\n"});n.append('<span>Currency: </span><select class="form-control input-sm">'+p+"</select>");n.find("select").on("change",function(){g.initData(i)})}}else{dt[i.toolID].rows().invalidate("data").draw(false)}});function j(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function l(q,s,p,o,r){var n=[r.SortOrder,{fullName:r.FullName,name:r.Name,img:"https://www.cryptocompare.com"+r.ImageUrl}];jQuery.each(q,function(t,v){v=v.replaceAll(" ","");switch(v){case"price":n.push(s.DISPLAY[p][o].PRICE);break;case"cap":var u=s.DISPLAY[p][o].MKTCAP;var x="";switch(u.substring(u.length-1,u.length)){case"B":x=",000,000,000";break;case"M":x=",000,000";break;case"K":x=",000";break}var w=u.indexOf(".");if(t!=-1){u=u.substring(0,w)}u+=x;if(u==""){u=s.DISPLAY[p][o].TOSYMBOL+" 0"}n.push(u);break;case"supply":n.push(s.DISPLAY[p][o].SUPPLY);break;case"volume":n.push(s.DISPLAY[p][o].CHANGE24HOUR);break;case"change":n.push(s.DISPLAY[p][o].CHANGEPCT24HOUR);break;case"graph":n.push(s.DISPLAY[p][o].PRICE);break}});return n}function h(o){var n={names:[{title:"#"},{title:"Coin"}],aoColumns:[{bSortable:true,sTitle:"#"},{bSortable:true,sTitle:"Coin"}],columnDefs:[{createdCell:function(q,p){jQuery(q).html('<div class="table-cell coin-ico"><img src="'+p.img+'" alt="'+p.fullName+'" style="width:25px;max-width: inherit;"></div><div class="table-cell coin-name"><span>'+p.fullName+"</span></div>")},targets:1}]};jQuery.each(o,function(p,q){q=q.replaceAll(" ","");switch(q){case"price":n.names.push({title:"Price",width:200});n.aoColumns.push({bSortable:true,sTitle:"Price"});break;case"cap":n.names.push({title:"Market Cap",width:150});n.aoColumns.push({bSortable:true,sTitle:"Market Cap"});break;case"supply":n.names.push({title:"Circulating Supply",width:150});n.aoColumns.push({bSortable:true,sTitle:"Circulating Supply"});break;case"volume":n.names.push({title:"Volume 24H",width:200});n.aoColumns.push({bSortable:true,sTitle:"Volume 24H"});n.columnDefs.push({render:function(s){var r=s.indexOf("-")>=0?"red-text":"green-text";return'<span class="'+r+'">'+s+"</span>"},targets:p+2});break;case"change":n.names.push({title:"Change 24H",width:200});n.aoColumns.push({bSortable:true,sTitle:"Change 24H"});n.columnDefs.push({render:function(s){var r=s.indexOf("-")>=0?"red-text":"green-text";return'<span class="'+r+'">'+s+"</span>"},targets:p+2});break;case"graph":n.names.push({title:"Graph 7D"});n.aoColumns.push({bSortable:false,sTitle:"Graph 7D"});n.columnDefs.push({createdCell:function(u,r,t){var s=t[1].name;jQuery.get(dictionary.coinUrl+"histohour?fsym="+s+"&tsym="+k+"&limit=168&aggregate=1",function(x){var A=[],y=[];var z,w;if(x.Data[0].close<x.Data[x.Data.length-1].close){z="#1e8b3b";w="#a8d1b2"}else{z="#a11b09";w="#daa5a1"}jQuery.each(x.Data,function(D,C){var B=new Date(C.time*1000);A.push(B);y.push(C.close)});jQuery(u).html('<canvas class="myChart" height="50px" width="200px"></canvas>');var v=new Chart(jQuery(u).find(".myChart"),{type:"line",data:{labels:A,datasets:[{data:y}]},options:{elements:{point:{radius:0},line:{borderColor:z,backgroundColor:w}},scales:{xAxes:[{display:false}],yAxes:[{display:false}]},legend:{display:false},responsive:false,display:false,tooltips:{enabled:false}}});jQuery(window).trigger("resize")})},targets:p+2});break}});return n}}};var dictionary={};dictionary.currency=[{text:"USD",id:"USD"},{text:"AUD",id:"AUD"},{text:"BRL",id:"BRL"},{text:"CAD",id:"CAD"},{text:"CHF",id:"CHF"},{text:"CLP",id:"CLP"},{text:"CNY",id:"CNY"},{text:"CZK",id:"CZK"},{text:"DKK",id:"DKK"},{text:"EUR",id:"EUR"},{text:"GBP",id:"GBP"},{text:"HKD",id:"HKD"},{text:"HUF",id:"HUF"},{text:"IDR",id:"IDR"},{text:"ILS",id:"ILS"},{text:"INR",id:"INR"},{text:"JPY",id:"JPY"},{text:"KRW",id:"KRW"},{text:"MXN",id:"MXN"},{text:"MYR",id:"MYR"},{text:"NOK",id:"NOK"},{text:"NZD",id:"NZD"},{text:"PHP",id:"PHP"},{text:"PKR",id:"PKR"},{text:"PLN",id:"PLN"},{text:"RUB",id:"RUB"},{text:"SEK",id:"SEK"},{text:"SGD",id:"SGD"},{text:"THB",id:"THB"},{text:"TRY",id:"TRY"},{text:"TWD",id:"TWD"},{text:"ZAR",id:"ZAR"}];dictionary.coinUrl="https://min-api.cryptocompare.com/data/";String.prototype.replaceAll=function(a,b){var c=this;return c.replace(new RegExp(a,"g"),b)};isEmpty=function(a){return a==null||a==""};SToA=function(b){if(!b){return null}var a=b.split(",");jQuery.each(a,function(c,d){a[c]=d.replace(" ","")});return a};renderArray=function(a,c,b){if(!c.html()){if(a.length>1){jQuery.each(a,function(d,e){c.append(b.replaceAll("{{name}}",e))})}}};