"use strict";function changeRoleJson(t){return t.map(function(t){switch(t.CD_DM){case 65:t.icon="glyphicon glyphicon-log-in",t.url="/matterInReg";break;case 68:t.icon="glyphicon glyphicon-compressed",t.url="/matterInQuar";break;case 69:t.icon="glyphicon glyphicon-credit-card",t.url="/matterInSale";break;default:t.icon="glyphicon glyphicon-th",t.url="/"}}),t}function inofJson(t,n){for(var a=[],o=n[t[0]].split(","),i=0;i<o.length;i++){var s={};t.map(function(t){s[t]=n[t].split(",")[i]}),a.push(s)}return a}var _typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(t){return"undefined"==typeof t?"undefined":_typeof2(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":"undefined"==typeof t?"undefined":_typeof2(t)},padStart=function(t,n,a){t+="";var o=n-t.length;return o<=0?t:Array(o+1).join(a)+t};Vue.filter("date",function(t,n){var a=t,o=n.split(/(YYYY|MM|DD|hh|mm|ss)+/);return"object"!=("undefined"==typeof t?"undefined":_typeof(t))&&(a=new Date(t)),o.map(function(t){return"YYYY"==t?a.getFullYear():"MM"==t?padStart(a.getMonth()+1,2,0):"DD"==t?padStart(a.getDate(),2,0):"hh"==t?padStart(a.getHours(),2,0):"mm"==t?padStart(a.getMinutes(),2,0):"ss"==t?padStart(a.getSeconds(),2,0):t}).join("")}),Vue.filter("count",function(t){var n=t.split(","),a=0;return n.map(function(t){a+=parseFloat(t)}),a.toFixed(2)}),Vue.filter("toFixed",function(t){return t.toFixed(2)}),Vue.component("my-header",{template:"<div class='navbar navbar-fixed-top scroll-hide'><div class='container-fluid top-bar'><div class='pull-right'><ul class='nav navbar-nav pull-right'>                    <li class='dropdown notifications hidden-xs'>                        <a class='dropdown-toggle' data-toggle='dropdown' href='#'>                            <span aria-hidden='true' class='glyphicon glyphicon-flag'></span>                            <div class='sr-only'>通知</div>                            <p class='counter'>4</p>                        </a>                        <ul class='dropdown-menu'>                        </ul>                    </li>                    <li class='dropdown messages hidden-xs'>                        <a class='dropdown-toggle' data-toggle='dropdown' href='#'>                            <span aria-hidden='true' class=' glyphicon glyphicon-comment'></span>                            <div class='sr-only'>消息</div>                            <p class='counter'>3</p>                        </a>                        <ul class='dropdown-menu messages'>                            <li>                                <a href='#'>消息</a>                            </li>                        </ul>                    </li>                    <li class='dropdown settings hidden-xs'>                        <a class='dropdown-toggle' data-toggle='dropdown' href='#'>                            <span aria-hidden='true' class='glyphicon glyphicon-cog'></span>                            <div class='sr-only'>设置</div>                        </a>                        <ul class='dropdown-menu'>                            <li>                                <a class='settings-link blue' href='javascript:chooseStyle('none', 30)'><span></span>设置</a>                            </li>                        </ul>                    </li>                    <li class='dropdown user hidden-xs'>                        <a data-toggle='dropdown' class='dropdown-toggle' href='#'>                            <img width='34' height='34' src='../images/admin.png'>{{user.YH_MC}}<b class='caret'></b></a>                        <ul class='dropdown-menu'>                            <li>                                <a href='#'>                                    <i class='icon-user'></i>我的账户</a>                            </li>                            <li>                                <a href='#'>                                    <i class='icon-gear'></i>账户设置</a>                            </li>                            <li>                                <a href='/login'>                                    <i class='icon-signout'></i>退出</a>                            </li>                        </ul>                    </li>                </ul>            </div>            <button class='navbar-toggle'>                <span class='icon-bar'></span>                <span class='icon-bar'></span>                <span class='icon-bar'></span>            </button>            <a class='logo' href='/login'>                志恒达                <img src='../images/visionapps.svg' alt=''>            </a>        </div>        <div class='container-fluid main-nav clearfix'>            <div class='nav-collapse'>                <ul class='nav'>                    <li>                        <a class='current' href='index.html'>                            <span aria-hidden='true' class='glyphicon glyphicon-home'></span>主页                        </a>                    </li>                    <li v-for='role in roles' >                        <a href='{{role.url}}'>                            <span aria-hidden='true' class='{{role.icon}}'></span> {{role.CD_MC}}                        </a>                    </li>                </ul>            </div>        </div></div>",props:{user:"",roles:""},ready:function(){this.loadRole()},methods:{loadRole:function(){var t=this;$.get("/api/role",{},function(n){t.$set("roles",changeRoleJson(n.data))}),$.get("/api/user",{},function(n){t.$set("user",n.data)})}}}),$(window).scroll(function(){var t=$(window).scrollTop();t>45?$(".navbar,.jumbotron").addClass("closed"):$(".navbar,.jumbotron").removeClass("closed")});var app=new Vue({el:"body",data:function(){return{tableDatas:[],infoDatas:[],selectDatas:[],GYS_ID:null,total:null,cur:1,count:null,start:"",end:""}},ready:function(){this.initData()},computed:{showLast:function(){return this.cur!=this.total},showFirst:function(){return 1!=this.cur},indexs:function(){var t=1,n=this.total,a=[];for(this.total>=5&&(this.cur>3&&this.cur<this.total-2?(t=this.cur-2,n=this.cur+2):this.cur<=5?(t=1,n=5):(n=this.total,t=this.total-4));t<=n;)a.push(t),t++;return a}},watch:{cur:function(t,n){var a=this;$.get("/api/matterInReg/list",{cur:t},function(t){a.tableDatas=t.data,a.count=t.count,a.total=t.total})},keyNum:function(t,n){console.log(this.total),t>0&&t<=this.total?this.keyNum=t:this.keyNum=""}},methods:{initData:function(){var t=this;$.get("/api/matterInReg/list",{},function(n){t.tableDatas=n.data,t.count=n.count,t.total=n.total}),$.get("/api/supplier/list",{type:"c"},function(n){t.selectDatas=n.data})},showInfo:function(t){this.infoDatas=[],this.infoDatas=inofJson(["BATCH_ID","MATTER_NAME","WEIGHT","PRICE"],t)},btnClick:function(t){this.cur=t!=this.cur?t:this.cur},search:function(){var t,n=this.start,a=this.end,o=$(".selectpicker").find("option:selected").val();t=o?{start:n,end:a,GYS_ID:o}:{start:n,end:a};var i=this;$.get("/api/matterInReg/list",t,function(t){i.tableDatas=t.data,i.count=t.count,i.total=t.total})},selectedOption:function(t){this.GYS_ID=t},resetFnc:function(){this.start="",this.end="",this.GYS_ID="",$(".selectpicker").selectpicker("val",""),this.initData()}}});$(function(){$(".input-daterange").datepicker({language:"zh-CN",orientation:"bottom auto",autoclose:!0,todayHighlight:!0,format:"yyyy-mm-dd"})});