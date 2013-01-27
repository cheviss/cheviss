
// ==UserScript==
// @name 			12306.CN ��Ʊ���� For Firefox&Chrome
// @namespace		http://www.u-tide.com/fish/
// @author			iFish@FishLee.net <ifish@fishlee.net> http://www.fishlee.net/
// @developer		iFish
// @contributor		
// @description		���㶩Ʊ��С���� :-)
// @match			http://dynamic.12306.cn/otsweb/*
// @match			https://dynamic.12306.cn/otsweb/*
// @match			https://www.12306.cn/otsweb/*
// @require			http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js
// @icon			http://www.12306.cn/mormhweb/images/favicon.ico
// @run-at			document-idle
// @version 		4.5.0
// @updateURL		http://static.liebao.cn/_softdownload/12306_ticket_helper.user.js
// @supportURL		http://www.fishlee.net/soft/44/
// @homepage		http://www.fishlee.net/soft/44/
// @contributionURL	https://me.alipay.com/imfish
// @contributionAmount	��5.00
// ==/UserScript==

//=======START=======

var version = "4.5.0";
var updates = [
	"��4.5�汾��ʼ������ʹ�ùȸ�������Լ����Ƶ��������֧��CRX��չ������������ж�Ʊ��Firefox������һЩ����������л��������ƣ����ָ߼����ܽ���ʱ�޷�ʹ��",
	"��֪��������ʲô��������Ҳ��������~"
];

var faqUrl = "http://www.fishlee.net/soft/44/faq.html";
//���
var utility_emabed = false;
var compVersion = "5.67";


//#region -----------------UI����--------------------------

function initUIDisplay() {
	injectStyle();
}

/**
 * ��ʹ�õ���ʽ���뵽��ǰҳ����
 */
function injectStyle() {
	var s = document.createElement("style");
	s.id = "12306_ticket_helper";
	s.type = "text/css";
	s.textContent = "\
.fish_running, .fish_clock, .fish_error, .fish_ok {line-height:20px;text-indent:18px;background-repeat:no-repeat;background-position:2px 50%;font-size:12px;}\
.fish_running{background-image:url(data:image/gif;base64,R0lGODlhEAAQALMPAHp6evf394qKiry8vJOTk83NzYKCgubm5t7e3qysrMXFxe7u7pubm7S0tKOjo////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCAAPACwAAAAAEAAQAAAETPDJSau9NRDAgWxDYGmdZADCkQnlU7CCOA3oNgXsQG2FRhUAAoWDIU6MGeSDR0m4ghRa7JjIUXCogqQzpRxYhi2HILsOGuJxGcNuTyIAIfkECQgADwAsAAAAABAAEAAABGLwSXmMmjhLAQjSWDAYQHmAz8GVQPIESxZwggIYS0AIATYAvAdh8OIQJwRAQbJkdjAlUCA6KfU0VEmyGWgWnpNfcEAoAo6SmWtBUtCuk9gjwQKeQAeWYQAHIZICKBoKBncTEQAh+QQJCAAPACwAAAAAEAAQAAAEWvDJORejGCtQsgwDAQAGGWSHMK7jgAWq0CGj0VEDIJxPnvAU0a13eAQKrsnI81gqAZ6AUzIonA7JRwFAyAQSgCQsjCmUAIhjDEhlrQTFV+lMGLApWwUzw1jsIwAh+QQJCAAPACwAAAAAEAAQAAAETvDJSau9L4QaBgEAMWgEQh0CqALCZ0pBKhRSkYLvM7Ab/OGThoE2+QExyAdiuexhVglKwdCgqKKTGGBgBc00Np7VcVsJDpVo5ydyJt/wCAAh+QQJCAAPACwAAAAAEAAQAAAEWvDJSau9OAwCABnBtQhdCQjHlQhFWJBCOKWPLAXk8KQIkCwWBcAgMDw4Q5CkgOwohCVCYTIwdAgPolVhWSQAiN1jcLLVQrQbrBV4EcySA8l0Alo0yA8cw+9TIgAh+QQFCAAPACwAAAAAEAAQAAAEWvDJSau9WA4AyAhWMChPwXHCQRUGYARgKQBCzJxAQgXzIC2KFkc1MREoHMTAhwQ0Y5oBgkMhAAqUw8mgWGho0EcCx5DwaAUQrGXATg6zE7bwCQ2sAGZmz7dEAAA7); color: green;}\
.fish_clock{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG/SURBVHjapJM/S8NQFMVvpaVfoEKojWL9U3DLIqjoooJDu/sFmnQoiIujQz+Aix3a1FUQXIR2UFA6+WeRUhBprERroGTopg6lSeo7iY1pq4sNHPpy3+8c7n0v9XW7XRrl8SFAlmVvbYFpmynOJHzXKkwlphOmxx4oiiL5sbAsi1KpFOVyuWQwGMzEYjEuGo0Sx3E2qOu6oKqqoChKst1u7zO2wNifDrLZLNbJUCgkLy2vEM/zv7araRrd3lxTq9US2WshnU7TGDZM01zwBwKZxaVlCkd4MtmxQDXlyVbvHXtgwMIDrx3Q6XS2Z2bnufDEJJkWuWIt2/LWwICFxw0wDCM+PTPXB0K4IGiwDhYeeP3fHQjjXIQMq3/mev3J/l0fqIOFxxtAxi+fg/rsBOztSE7QVpwpQT2PN6Dy1mgIYX7KNZcvipQ5yA+Fosum1rA93jMo1R6q7oxX50Va20wMzd4TWHi8t3BSvb/T1bpz4qsbf5vBgIXHDWB3+vj58b5fPj9jc9fcex8U9sCAhcc7Au1mDgtN7VU8Oz7SL0un9PbyTBYzQVijhj0wYOFxP2VJkv71Z8rn807AKM+XAAMArp1CsEFrDIIAAAAASUVORK5CYII=); color: blue;}\
.fish_error{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJFSURBVHjapJO/T1pRFMe/Dx7ypEXri4lUGUhsHF40hODSpQ61cTH+2HSoZaF1dHSxpU7+Ca04NE7dyuBiapcuLFokTdD4A01awNdBSkAf8ut5zhUoxq3e5OS+nPv5nnvuyfdJpmniPksSBd68aM1pFDMU4xS+ei5GsUHxmSLRJD9+hcx7rVqFZWwMtc3NIGy2Zam31yX19ABdXTdgNuszdd1nptNBlMtviQ0TC0ujg1LgGWNByelctQ4M4G8qhfN4HLmDA6HvpJzq9eJRXx+qlDPz+deUDrd9+i6KoFouazVg2erx4M/uLn5FItGLk5NX/qUliYO+I2o2C4vLBWaYZQ1rRYFyqTQDVXXl02mcb29HbXb7S+/CwjqKRSAaDXlHRqYwOoqdxUUww6zQNApUSqVxuaMDF8kk2hTlgxYIHMMwaHSxEB2/a4g7u7sjzDDLmn8dXF35ZJsNVWrzycTEOtxuYH//lpjWezqbZoZZ1rQ+AXyj3eEQO7a27oj9s7OhVkZoWjqIFXUdD1QVub29L3fEk5MhXF7y2RwzzLKmdQYb+UwGiqLwO6duiVdWxM2GrvfTfOaZYZY1TScmvE7NKsvf3B6PyzE8jB9ra6DJR2TTnBYXSNIcbfN021Mjl8Pv09OzaqXyXIvnE6LAT00RRlLa21cfk1kesgNpULBab5xITiUHokADzJDJioYhjDSUKNafUKlgaHAwXCCHJQ8Pz1JHRyhQm2RhEfzNOT5jhlnWNJ+w0y/918/kPzbrf+M91rUAAwCuQDz94e2kLwAAAABJRU5ErkJggg==); color: blue;}\
.fish_ok{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHsSURBVHjapFNBSBtBFH2xgoqmKipEC6XkYqhUWXOxUAQhpyJ4Wgi0l0rNsdBbL/WgF2/eV8hNSBF68uhFkOrFhCAGS8mWgmYjG9lCKVGTuP1vsrvuIac68HZm/n/vz5/9fyKu6+IhI8IA5k4kbHsuSAsWBZpnKwh2BTlBySfGdTmcAX7kOJc5r5hfhyw7/86t21/EVVbgmjb6yPG4SqsyONtWGaz0Dk8aYzMf0R+b65ju3+oR7OImrp3vGdluJd646KKj1ZK0H0XXRqfeo390Emg6HUEfOeQqjQwVoNFAOvpkPjYw8kw2NRgfFtQchm8jh1xqggDNJhYHY3Jy41IhmXodrDvZyKWG2m4vA23gcR9wa6m7Jue1YO2PsI1casIB5GPBWM8ilZLyvFzu+BPNwyz29oDM5+W2JhSg8NsqaRSTMHycxfg4MDHRJlUqgCWHO/IvyRGu0gQB5D671Z+mlpiZFXEejjSInrw/OS4wjiWwNFx8ehZnRVNpwlXI/SrXqvbFOfS3TxWRAtNpwxfTRw651AQZSE1Lrfrd6mmhZky96IGejuJgX5rL9HpbrvBKbHbFxunJDa6F67e0X0YsLWHr6uouc/StXi3m/yCRkNTjbXBNG33kkEtN8Jh2Pv3fY9I3vLfwkPFPgAEApRUigcIVl3AAAAAASUVORK5CYII=); color: purple;}\
.outerbox{font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;color:#4c4c4c}\
.box{margin:20px auto 0 9px;width:933px;border:1px solid #c6c6c6;}\
.box .title{padding:5px;line-height:23px;color:#fff;background:-webkit-linear-gradient(#707070,#2c2c2c 90%);background:-moz-linear-gradient(#707070,#2c2c2c 90%);background-color:#707070;}\
.box .title a{color:#fff;}\
.box .time-comp{color:#fff;position:absolute;margin:2px;right:2px;top:2px;padding:1px 12px;border-radius:12px;text-shadow:0px 1px 2px rgba(0,0,0,0.6);box-shadow:0px 1px 1px rgba(255,255,255,0.2),inset 0px 0px 8px rgba(0,0,0,0.8);}\
.box .content{padding:5px;background-color:#fff}\
.box table{border-collapse:collapse;width:98%}\
.box table td{padding:5px;}\
.box table .tfooter{text-align:center;height:24px;background:-webkit-linear-gradient(#ffffff,#fafafa 90%);background:-moz-linear-gradient(#ffffff,#fafafa 90%);color:#707070;text-shadow:1px 1px 1px #fff,2px 2px 1px rgba(0,0,0,0.2);}\
.box table .tfooter a{color:#707070;}\
.box input[type=button],.fish_button{font-size:12px;font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;padding:3px 6px;letter-spacing:1px;border-radius:3px;cursor:pointer;}\
.box .name,.box .caption,.box .caption td{font-weight:bold;-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;background:-webkit-linear-gradient(#fafafa,#f0f0f0 90%);background:-moz-linear-gradient(#fafafa,#f0f0f0 90%);background-color:#fafafa;}\
.box .lineButton{margin:4px 6px 4px 2px;}\
.lineButton{font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;line-height:16px;margin-right:6px;padding:2px 4px;color:#4c4c4c;backround:#f5f5f5;background:-webkit-linear-gradient(#fff,#f0f0f0);background:-moz-linear-gradient(#fff,#f0f0f0);border:1px solid #c8c8c8;border-radius:3px;box-shadow:inset 0 1px 3px rgba(255,255,255,0.2),0 0 3px rgba(0,0,0,0.2);text-shadow:.0em .1em .1em rgba(255,255,255,0.8);-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;cursor:pointer;}\
.lineButton:hover{background:#f0f0f0;text-shadow:.0em .1em .1em #fff;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s;}\
.lineButton:active{background:#f2f2f2;background:-webkit-gradient(linear,left bottom,left top,color-stop(0%,#f2f2f2),color-stop(90%,#f2f2f2));background:-moz-linear-gradient(center bottom,#f2f2f2 0%,#f2f2f2 100%);box-shadow:inset 0px 1px 3px #cccccc,0px 0px 0px #0968bb;border-color:#d6d6d6;border-top-color:#d0d0d0;border-left-color:#d0d0d0;border-right-color:#e2e2e2;border-bottom-color:#e2e2e2;}\
.fishTab{border:5px solid #E5D9EC;font-size:12px;font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;}\
.fishTab .innerTab{border-width:1px;border-style:solid;border-color:#C7AED5;background-color:#fff}\
.fishTab .tabNav{font-weight:bold;color:#F5F1F8;background-color:#C7AED5;line-height:25px;overflow:hidden;margin:0px;padding:0px}\
.fishTab .tabNav li{float:left;list-style:none;cursor:pointer;padding-left:20px;padding-right:20px}\
.fishTab .tabNav li:hover{background-color:#DACAE3}\
.fishTab .tabNav li.current{background-color:#fff;color:#000}\
.fishTab .tabContent{padding:5px;display:none}\
.fishTab .tabContent p{margin:10px 0px 10px 0px}\
.fishTab div.current{display:block}\
.fishTab div.control{text-align:center;line-height:25px;background-color:#F0EAF4}\
.fishTab input[type=button]{padding:5px}\
.hide{display:none}\
.fish_sep td{border-top:1px solid #d0d0d0;}\
.fish_button{color:#fff;line-height:normal;margin:0 5px;background:#0f7edb;background:-webkit-linear-gradient(#0c96f8,#1960b7);background:-moz-linear-gradient(#0c96f8,#1960b7);border:1px solid #186fb7;box-shadow:inset 0 1px 3px rgba(255,255,255,0.2),0 0 3px rgba(0,0,0,0.3);text-shadow:.0em .1em .1em rgba(50,50,50,0.8);-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;}\
.fish_button:hover{background:#099bff;background:-webkit-gradient(linear,left bottom,left top,color-stop(0%,#077ccc),color-stop(90%,#0abaff));background:-moz-linear-gradient(center bottom,#077ccc 0%,#0abaff 100%);border-color:#088be5;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s;}\
.fish_button:active{background:#0885e7;background:-webkit-gradient(linear,left bottom,left top,color-stop(0%,#066ab8),color-stop(90%,#099fff));background:-moz-linear-gradient(center bottom,#066ab8 0%,#099fff 100%);border-color:#0777cf;box-shadow:inset 0px 1px 2px #0770c3,0px 0px 0px #000;border-top-color:#0775ca;border-left-color:#0775ca;border-right-color:#087edb;border-bottom-color:#087edb;}\
tr.steps td{background-color:#E8B7C2!important;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s}\
tr.stepsok td{background-color:#BDE5BD!important;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s}\
tr.steps span.indicator{display:inline-block!important}\
tr.stepsok span.indicator{display:inline-block!important}\
.highlightrow td{background-color:#D0C0ED!important;color:red}\
#randCodeTxt{font-weight:bold;font-size:18px;text-align:center;padding:3px 10px 3px 10px;font-family:verdana!important;text-transform:uppercase}\
tr.append_row{font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;}\
tr.append_row td{padding-left:37px;}\
tr.append_row td label{padding-right:4px;}\
#acathur{color:#fcfcfc;font-weight:bold;font-family:Segoe UI,Lucida Grande,Arial,Helvetica,Sans-serif;text-decoration:underline;text-shadow:0 0 1px #000,0px 0px 6px rgba(0,0,0,0.8);}\
div.gridbox_light .odd_light,div.gridbox_light .ev_light{background:-webkit-linear-gradient(#fff,#f6f6f6);background:-moz-linear-gradient(#fff,#f6f6f6);text-shadow:.0em .1em .1em rgba(255,255,255,0.8);}\
.validCell{ background:-webkit-linear-gradient(#e0ebff, #c7d9ff)!important; background:-moz-linear-gradient(#e0ebff, #c7d9ff)!important; }\
.validRow{background:-webkit-linear-gradient(#ffe0e5, #ffc7d0)!important;background:-moz-linear-gradient(#ffe0e5, #ffc7d0)!important;color:#700012;}\
.unValidRow{opacity:0.8;}\
.unValidCell{opacity:0.8;}\
.btn130_2 {text-shadow:nonw;}\
";

	document.head.appendChild(s);
}

function injectDom() {
	var html = [];
	html.push('<div id="fishOption" style="width: 600px; display:none; box-shadow: 7px 7px 10px #A67EBC;">');
	html.push('<div class="innerTab">');
	html.push('<ul class="tabNav" default="tabVersion">');
	html.push('<li tab="tabLogin">��������</li>');
	html.push('<li tab="tabReg">ע��</li>');
	html.push('<li tab="tabFaq">��������</li>');
	html.push('<li tab="tabVersion">�汾��Ϣ</li>');
	html.push('<li tab="tabLog">������־</li>');
	html.push('<li tab="tabLoginIE">��¼��IE</li>');//��ȡ��¼��IE�Ĵ��� Add By XPHelper
	html.push('</ul>');
	html.push('<div class="tabContent tabLogin">');
	html.push('<table>');
	html.push('<tr>');
	html.push('<td>����ʱ�� ');
	html.push('<td>');
	html.push('<td><input type="text" name="login.retryLimit" size="6" value="2000" />');
	html.push('(ms)</td>');
	html.push('<td>');
	html.push('</td>');
	html.push('<td></td>');
	html.push('</tr>');
	html.push('</table>');
	html.push('</div>');
	html.push('<div class="tabContent tabReg" style="text-indent: 20px">');
	html.push('<p>Ϊ����ֹ�������������������޳����׵�����ȥ��ǮǮ����ע��ࡡ�<strong>��ȫ�������</strong>��</p>');
	html.push('<p style="color: red;"> <strong style="font-size:16px;">���ϡ����������������ȫ��Ѱ���λ���ˣ�</strong>�κ��ڵ�������վ�ϳ��۵����ȫ����������Ȩ���۰�����������ʱ��������ؼǵ��˿��˻���������������ү�ٱ�������</p>');
	html.push('<p style="color:purple;"> �ؼ���һ���������򵥵���Ը��ϣ�����ǲ�����̫���ӡ���</p>');
	html.push('<p>�κΰ汾֮�䣬������û���κ�����So������Ҫ��������һ�����Ļ����������¹��ܣ�ľ�е�˵���� (=���أ�=) </p>');
	html.push('<p class="registered" style="display:none;">�ܸ�����ʶ�㣬��<strong>fishcn@foxmail.com</strong>��лл��ĳ���~~~~��ע��汾��<strong>��ʽ��</strong>��<a href="javascript:;" id="unReg">����ע��</a>��</p>');
	html.push('<table class="regTable" style="display:none;width:98%;">');
	html.push('<tr>');
	html.push('<td>��ճ��ע���� ��<a href="http://www.fishlee.net/Apps/Cn12306/GetNormalRegKey?v=1" target="_blank" style="color:blue;font-weight:bold;text-decoration:underline;">����ֱ������ע���밡��Ϊʲô�����᲻�ô��Ұ� �r(�s���t)�q</a>��</td>');
	html.push('</tr><tr>');
	html.push('<td style="text-align:center;"><textarea id="regContent" style="width:98%; height:50px;"></textarea></td>');
	html.push('</tr><tr>');
	html.push('<td><input type="button" id="regButton" value="ע��" /></td>');
	html.push('</tr>');
	html.push('</table>');
	html.push('</div>');
	html.push('<div class="tabContent tabVersion" style="text-indent: 20px">');
	html.push('<h4 style="font-size:18px; font-weight:bold; margin: 0px; line-height: 26px; border-bottom: 1px dotted #ccc;">12306 ��Ʊ���� <small>ver ' + window.helperVersion + '</small></h4>');
	html.push('<p> 12306 ��Ʊ������һ�����ڶ�Ʊ������������š������������������Ѿ�֪����֧������������� =��=<strong>��ȫ��ѣ����踶��ʹ�ã������ܾ�����</strong> </p>');
	html.push('<p style="color: red;"> <strong style="font-size:16px;">���ϡ����������������ȫ��Ѱ���λ���ˣ�</strong>�κ��ڵ�������վ�ϳ��۵����ȫ����������Ȩ���۰�����������ʱ��������ؼǵ��˿��˻���������������ү�ٱ�������</p>');
	html.push('<p style="color:purple;"> �ؼ���һ���������򵥵���Ը��ϣ�����ǲ�����̫���ӡ���</p>');
	html.push('<p> �кܶ������������ߣ�����ľ��ů�����Ϸ����ܼ尾�����߸м����� �ݦءܡ�<a href="http://www.fishlee.net/soft/44/donate.html" target="_blank">�������˽��������</a>�� </p>');
	html.push('<p style="color: blue;"> <strong style="">�Ǹ�����λƱ�����ǣ��Ź������ְɣ������Ƕ�ȥ��ʲô�Զ�ʶ����֤��ĺ�����������������үү�ǣ��������ǸĽ��µ��û�����ɣ����ǵĶ�Ʊ�㹻���õĻ��仹���ýű�����������</strong></p>');
	html.push('<p style="font-weight:bold;">��ǰ�汾��������</p>');
	html.push('<ol>');
	$.each(utility.getPref("updates").split('\t'), function (i, n) {
		html.push("<li style='padding:0 0 6px 20px;list-style:disc inside;'>" + n + "</li>");
	});
	html.push('</ol>');
	html.push('</div>');
	html.push('<div class="tabContent tabFaq">');
	html.push('<table>');
	html.push('<tr>');
	html.push('<td colspan="4"> ���ڶ�Ʊ�����п��ܡ����������������⣬���ڽ��12306��վ�����ء���ľ��û���κν��� �r(�s���t)�q ����������������������⣬���͹ٲο���������в����׵����⣬��Ⱥ������  (=���أ�=) �� <br /><br />');
	html.push('1.��Ʊ������Ҳ��So�ڽ�����Ʊ��ʱ����ر���ˢ��״̬�������ҡ���������û�з�Ʊʱ����Ҫ��������ˢ��ร�<br />\
2.��������11���Ʊ�����м��мǣ�<br />\
3.��һ����Ʊ���ߵ�ľ�ж���ʱ�������ĵȴ�����Ϊ���ڷ�Ʊ��N��ڵ㣬��ʱ����Ʊ��������ܾòŷ�ƱҲ���������ϴ󾭳��������֣�<br />\
4.������ĳ�Ʊ�������뾡����������ߴ�ð˴��������һ�����ѹ��������æ��ͬʱ�����ö�������ˢƱ����Ϊ����Ĺ�ϵ��ͬ�����������Ʊ��ʱ����ܲ�ͬ��<br />\
5.���°�3.9.0�е�Ԥ��ѡ����λ�����е㵭���ˡ���Ҫ�õĻ���ʹ����ѡϯ�𣬵�һ����ѡ�Ľ��ᱻ�Զ�ѡ�� ^_^<br />\
<br />\
���ˣ��ϻ�˵����ף�����Ʊ˳����ƶɮֻϣ������ﵹæ�ͺ��� �r(�s���t)�q<br />\
�������������Ļ���<a href="http://www.fishlee.net/soft/44/tour.html" target="_blank">����������鿴�̳�~~~~</a>\
');
	html.push('</td></tr>');
	html.push('<tr style="display:none;">');
	html.push('<td><a href="http://www.fishlee.net/soft/44/12306faq.html" target="_blank">��Ʊ��������</a></td>');
	html.push('<td><a href="http://www.fishlee.net/soft/44/faq.html" target="_blank">�������г�������</a></td>');
	html.push('</tr>');
	html.push('</table>');
	html.push('</div><div class="tabLog tabContent"><div>�����ǵ�ǰҳ��ļ�¼����������������������ϵ����⣬��ȫ�����ƺ󷢳��ʼ������ߣ�ifish@fishlee.net �Ա������Ľ�����⡣<span style="color:red;font-weight:bold;">���ڷ���ǰ����޳���¼�а����ĸ�����˽���������Ϣ��</span></div><textarea id="runningLog" style="width:100%;height:200px;"></textarea></div>');
	//��ȡ��¼��IE�Ĵ��� Add By XPHelper
	html.push('<div class="tabLoginIE tabContent"><div><strong>����IE�д� https://dynamic.12306.cn/otsweb��</strong>�ٽ����´��븴�Ƶ�IE������ĵ�ַ����ȷ�ϵ�ַ����ǰ���С�javascript:��������û�����ֶ����ϣ�IE10���Զ�ɾ�������Ĵ��룩��Ȼ���ûس����ȴ�ҳ��ˢ�º󣬼����Զ���¼��</div><textarea id="LoginIECode" style="width:100%;height:200px;"></textarea></div>');
	html.push('<div class="control">');
	html.push('<input type="button" class="close_button" value="�ر�" />');
	html.push('</div>');
	html.push('</div>');
	html.push('</div>');

	$("body").append(html.join(""));

	var opt = $("#fishOption");
	$("#regButton").click(function () {
		var sn = $.trim($("#regContent").val());

		var rt = utility.verifySn(false, "", sn);
		if (rt.result != 0) {
			alert("�ܱ�Ǹ, ע��ʧ��. ���� " + rt.result + ", " + rt.msg);
		} else {
			utility.setSnInfo("", sn);
			alert("ע��ɹ�, ��ˢ���������\nע��� - " + rt.name + " , ע������ - " + rt.typeDesc.replace(/<[^>]*>/gi, ""));

			try {
				utility.getTopWindow().location.reload();
			} catch (e) {
				alert("Ȩ�޲����޷�ˢ��ҳ�棬 ���ֶ�ˢ�µ�ǰҳ��");
			}
		}
	});
	$("#unReg, a.reSignHelper").live("click", function () {
		if (utility.regInfo.result == 0) {
			if (!confirm("ȷ��Ҫ����ע����?")) return;

			utility.setSnInfo("", "");
			utility.getTopWindow().location.reload();
		} else {
			utility.getTopWindow().utility.showOptionDialog("tabReg");
		}
	});

	//��ʼ������
	utility.configTab = utility.fishTab(opt);
	opt.find("input[name]").each(function () {
		var el = $(this);
		var key = el.attr("name");
		var value = window.localStorage.getItem(key);
		if (!value) return;

		if (el.attr("type") == "checkbox") {
			el.attr("checked", value == "1");
		} else {
			el.val(value);
		}
	}).change(function () {
		var el = $(this);
		var key = el.attr("name");

		if (el.attr("type") == "checkbox") {
			window.localStorage.setItem(key, el[0].checked ? 1 : 0);
		} else {
			window.localStorage.setItem(key, el.val());
		}
	});
	$("#configLink, .configLink").live("click", function () {
		var el = $(this);
		var dp = el.attr("tab");
		console.log("require to show tab " + dp);

		utility.getTopWindow().utility.showLoginIE();
		utility.getTopWindow().utility.showOptionDialog(dp || "");
	});
	//�°汾������ʾ��ʾ
	if (utility.getPref("helperVersion") != window.helperVersion) {
		//��ս�ֹ���λ
		utility.clearFeatrueDisabled();
		//������֪�Ĳ����õĹ��ܱ��
		utility.setPref("disabled", ['ontimequeuecount'].join("|"));
		utility.disabledFeaturesCache = null;
		//ɾ��Cookies������⡣
		(function () { var p = new Date(); p.setTime(p.getTime() - 1000); for (var i = 0; i < arguments.length; i++) document.cookie = (arguments[i] + "=; path=/; domain=.12306.cn; expires=" + p.toGMTString()); })("helper.regUser", "helper.regSn");
		//ɾ����ϵ��
		utility.setPref("pas", "");

		//����ϰ汾����
		if (utility.getAudioUrl().indexOf("github") != -1 || utility.getAudioUrl().indexOf("resbak.") != -1) {
			utility.resetAudioUrl();
		}

		utility.setPref("helperVersion", window.helperVersion);
		//������ҳ����ʾ
		try {
			if (parent == self)
				utility.showOptionDialog("tabVersion");
		} catch (ex) {
			//�����ˣ�Ҳ�Ƕ���
			utility.showOptionDialog("tabVersion");
		}
	}

	//ע��
	var result = utility.verifySn(true);
	if (result.result == 0) {
		var info = opt.find(".registered").show().find("strong");
		info.eq(0).html(result.name);
		info.eq(1).html(result.typeDesc);


	} else {
		opt.find(".regTable").show();

		//if (location.pathname == "/otsweb/" || location.pathname == "/otsweb/main.jsp") {
		//	alert("Ϊ����ֹ�����˳û���Ȼ������������ѷ��׵Ķ���ȥ��Ǯ��ƶɮ�����鷳�͹١���������ʩ��ע�����£�һ���Ӿͺ�������");
		//	window.open("http://www.fishlee.net/Apps/Cn12306/GetNormalRegKey");
		//	utility.showOptionDialog("tabReg");
		//}
	}
	utility.regInfo = result;
}

//#endregion

//#region -----------------ִ�л�������----------------------

var utility = {
	configTab: null,
	icon: "http://www.12306.cn/mormhweb/images/favicon.ico",
	notifyObj: null,
	timerObj: null,
	regInfo: null,
	disabledFeaturesCache: null,
	isWebKit: function () {
		return window.webkitNotifications || true;
	},
	isFirefox: function () {
		return !utility.isWebKit();
	},
	parseJSON: function (text) {
		if (!JSON || !JSON.parse) alert("����������汾���ͣ��������������");
		else return JSON.parse(text);
	},
	toJSON: function (obj) {
		if (!JSON || !JSON.parse) alert("����������汾���ͣ��������������");
		else return JSON.stringify(obj);
	},
	disabledFeatures: function () {
		/// <summary>��õ�ǰ��ֹ�Ĺ���</summary>
		if (!utility.disabledFeaturesCache) {
			utility.disabledFeaturesCache = (utility.getPref("disabled") || "").split('|');
		}
		return utility.disabledFeaturesCache;
	},
	isfeatureDisabled: function (flag) {
		/// <summary>����ָ���Ĺ����Ƿ��Ѿ�����ֹ</summary>
		/// <param name="flag" type="String">���ԵĹ��ܱ��</param>
		return $.inArray(flag, utility.disabledFeatures()) != -1;
	},
	clearFeatrueDisabled: function () {
		/// <summary>��ս�ֹ���λ</summary>
		utility.setPref("disabled", "");
		utility.disabledFeaturesCache = [];
	},
	getScriptVersion: function () {
		/// <summary>���12306����վ�ű��汾</summary>
		return /=([\d\.]+)$/i.exec($("script[src]:eq(0)").attr("src") + "")[1];
	},
	checkCompatible: function () {
		var sv = utility.getScriptVersion();
		if (sv != window.compVersion) {
			if (utility.getPref("compWarning") != sv) {
				utility.setPref("compWarning", sv);
				alert("���棺��⵽12306�Ѹİ棬���ֹ��ܿ��ܻᲿ��ʧЧ��������ʽ��Ʊǰ���ò��ԣ����ⵢ�����Ĺ�Ʊ��\n�����κ��쳣ʱ������ʱ�ֶ������IE��Ʊ������������������");
			}
			$(".versionWarning").show();

			var istop = false;
			try {
				istop = self == parent;
			} catch (e) {
				istop = true;
			}
			if (!istop) {
				$("body").prepend("<div style='opacity:0.9;z-index:999; position:fixed; left:-350px; top:0px; width: 700px;margin-left:50%; color:#8A0023;border:1px solid #8A0023;line-height: 20px;background: -webkit-linear-gradient(#FFE4EA, #FFC3D1);background: -moz-linear-gradient(#FFE4EA, #FFC3D1);padding: 5px;'>�ף�<strong>�������Թⷢ����վ�İ���</strong>�����ڻ�ľ�в��Ե�ǰ���ֵļ����ԣ����������ʽ��Ʊǰ���ò��Թ�����Ҫʱ������IE����ม�</div>");
			}
		} else {
			$(".versionWarning").hide();
		}
	},
	trim: function (data) {
		if (typeof ($) != 'undefined') return $.trim(data);

		return data.replace(/(^\s+|\s+$)/g, "");
	},
	getTopWindow: function () {
		try {
			if (parent == self) return self;
			else return parent.window.utility.getTopWindow();
		} catch (e) {
			//����Ļ���Ҳ�Ƕ���
			return self;
		}
	},
	init: function () {
		$.extend({
			any: function (array, callback) {
				var flag = false;
				$.each(array, function (i, v) {
					flag = callback.call(this, i, v);
					if (flag) return false;
				});
				return flag;
			},
			first: function (array, callback) {
				var result = null;
				$.each(array, function (i, v) {
					result = callback.call(this, i, v);
					if (result) return false;
				});
				return result;
			}
		});
		

		if (utility.isWebKit) {
			$(document).ajaxSend(function (e, xhr, obj) { if (obj.refer) xhr.setRequestHeader("TRefer", obj.refer); });
		}
	},
	runningQueue: null,
	appendLog: function (settings) {
		/// <summary>��¼��־</summary>
		if (!utility.runningQueue) utility.runningQueue = [];
		var log = { url: settings.url, data: settings.data, response: null, success: null };
		if (log.url.indexOf("Passenger") != -1) return;	//����¼�Գ˿͵�����

		utility.runningQueue.push(log);
		settings.log = log;
	},
	showLog: function () {
		if (!utility.runningQueue) {
			alert("��ǰҳ����δ������־��¼��");
			return;
		}

		var log = [];
		$.each(utility.runningQueue, function () {
			log.push("�ɹ���" + (this.success ? "��" : "��") + "\r\n��ַ��" + this.url + "\r\n�ύ���ݣ�" + utility.formatData(this.data) + "\r\n�������ݣ�" + utility.formatData(this.response));
		});
		$("#runningLog").val(log.join("\r\n----------------------------------\r\n"));

		utility.showOptionDialog("tabLog");
	},
	//��ȡ��¼��IE�Ĵ��� Add By XPHelper
	showLoginIE: function () {
		var strCookie = document.cookie;
		var arrCookie = strCookie.split("; ");
		var IECode = "javascript:";
		var cookie = [];
		for (var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split("=");
			if (arr.length < 2 || arr[0].indexOf("helper.") != -1) continue;
			cookie.push("document.cookie=\"" + arr[0] + "=" + arr[1] + "\";");
		}
		IECode += cookie.join("");
		IECode += "self.location.reload();";
		$("#LoginIECode").val(IECode);
	},
	formatData: function (data) {
		if (!data) return "(null)";
		if (typeof (data) == "string") return data;
		var html = [];
		for (var i in data) {
			html.push('"' + i + '":\"' + (this[i] + "").replace(/(\r|\n|")/g, function (a) { "\\" + a; }) + '\"');
		}
		return "{" + html.join(",") + "}";
	},
	notify: function (msg, timeout) {
		console.log("��Ϣ��ʾ: " + msg);
		if (window.webkitNotifications) {
			if (window.webkitNotifications.checkPermission() == 0) {
				utility.closeNotify();

				if (utility.notifyObj == null)
					utility.notifyObj = webkitNotifications.createNotification(utility.icon, '��Ʊ', msg);
				utility.notifyObj.show();
				if (!timeout || timeout != 0) utility.timerObj = setTimeout(utility.closeNotify, timeout || 5000);
			} else {
				alert("����ι��������֪ͨ��ľ�п�������������еġ������������֪ͨ����ť����������\n\n" + msg);
			}
		} else {
			if (typeof (GM_notification) != 'undefined') {
				GM_notification(msg);
			} else {
				console.log("��ҳ���нű���Ϣ, �޷���ʾ, д��֪ͨ����.");
				utility.notifyOnTop(msg);
			}
		}
	},
	notifyOnTop: function (msg) {
		window.localStorage.setItem("notify", msg);
	},
	closeNotify: function () {
		if (!utility.notifyObj) return;

		utility.notifyObj.cancel();
		if (utility.timerObj) {
			clearTimeout(utility.timerObj);
		}
		utility.timerObj = null;
		utility.notifyObj = null;
	},
	setPref: function (name, value) {
		window.localStorage.setItem(name, value);
	},
	getPref: function (name) {
		return window.localStorage.getItem(name);
	},
	unsafeCallback: function (callback) {
		if (typeof (unsafeInvoke) == "undefined") callback();
		else unsafeInvoke(callback);
	},
	getTimeInfo: function () {
		var d = new Date();
		return d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes() + ":" + (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
	},
	savePrefs: function (obj, prefix) {
		var objs = obj.find("input");
		objs.change(function () {
			var type = this.getAttribute("type");
			if (type == "text") utility.setPref(prefix + "_" + this.getAttribute("id"), $(this).val());
			else if (type == "checkbox") utility.setPref(prefix + "_" + this.getAttribute("id"), this.checked ? 1 : 0);
		})
	},
	reloadPrefs: function (obj, prefix) {
		var objs = obj.find("input");
		prefix = prefix || "";
		objs.each(function () {
			var e = $(this);
			var type = e.attr("type");
			var id = e.attr("id");
			var value = utility.getPref(prefix + "_" + id);
			if (typeof (value) == "undefined" || value == null) return;

			if (type == "text") e.val(value);
			else if (type == "checkbox") this.checked = value == "1";
			e.change();
		});
		utility.savePrefs(obj, prefix);
	},
	getErrorMsg: function (msg) {
		/// <summary>��ø�����Ϣ�еĴ�����Ϣ</summary>
		var m = msg.match(/var\s+message\s*=\s*"([^"]*)/);
		return m && m[1] ? m[1] : "&lt;δ֪��Ϣ&gt;";
	},
	delayInvoke: function (target, callback, timeout) {
		target = target || "#countEle";
		var e = typeof (target) == "string" ? $(target) : target;
		if (timeout <= 0) {
			e.html("����ִ��").removeClass("fish_clock").addClass("fish_running");
			callback();
		} else {
			var str = (Math.floor(timeout / 100) / 10) + '';
			if (str.indexOf(".") == -1) str += ".0";
			e.html(str + " �������!...").removeClass("fish_running").addClass("fish_clock");
			setTimeout(function () {
				utility.delayInvoke(target, callback, timeout - 500);
			}, 500);
		}
	},
	saveList: function (name) {
		/// <summary>��ָ���б��ֵ���浽������</summary>
		var dom = document.getElementById(name);
		window.localStorage["list_" + name] = utility.getOptionArray(dom).join("\t");
	},
	loadList: function (name) {
		/// <summary>��ָ�����б��ֵ�������м���</summary>
		var dom = document.getElementById(name);
		var data = window.localStorage["list_" + name];
		if (!data) return;

		if (data.indexOf("\t") != -1)
			data = data.split('\t');
		else data = data.split('|');
		$.each(data, function () {
			dom.options[dom.options.length] = new Option(this, this);
		});
	},
	addOption: function (dom, text, value) {
		/// <summary>��ָ�����б��м����µ�ѡ��</summary>
		dom.options[dom.options.length] = new Option(text, value);
	},
	getOptionArray: function (dom) {
		/// <summary>���ѡ��������ʽ</summary>
		return $.map(dom.options, function (o) { return o.value; });
	},
	inOptionList: function (dom, value) {
		/// <summary>�ж�ָ����ֵ�Ƿ����б���</summary>
		for (var i = 0; i < dom.options.length; i++) {
			if (dom.options[i].value == value) return true;
		}
		return false;
	},
	getAudioUrl: function () {
		/// <summary>������ֵ�ַ</summary>
		return window.localStorage["audioUrl"] || (navigator.userAgent.indexOf("Firefox") != -1 ? "http://static.liebao.cn/resources/audio/song.ogg" : "http://static.liebao.cn/resources/audio/song.ogg");
	},
	getFailAudioUrl: function () {
		return (utility.isWebKit() ? "http://static.liebao.cn/resources/audio/" : "http://static.liebao.cn/resources/audio/") + "music3.ogg";
	},
	playFailAudio: function () {
		if (!window.Audio) return;
		new Audio(utility.getFailAudioUrl()).play()
	},
	resetAudioUrl: function () {
		/// <summary>�ָ����ֵ�ַΪĬ��</summary>
		window.localStorage.removeItem("audioUrl");
	},
	parseDate: function (s) { /(\d{4})[-/](\d{1,2})[-/](\d{1,2})/.exec(s); return new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3); },
	getDate: function (s) {
		/// <summary>���ָ�����ڵ��쵥λ</summary>
		return new Date(s.getFullYear(), s.getMonth(), s.getDate());
	},
	formatDate: function (d) {
		/// <summary>��ʽ������</summary>
		var y = d.getFullYear();

		return y + "-" + utility.formatDateShort(d);
	},
	formatDateShort: function (d) {
		/// <summary>��ʽ������</summary>
		var mm = d.getMonth() + 1;
		var d = d.getDate();

		return (mm > 9 ? mm : "0" + mm) + "-" + (d > 9 ? d : "0" + d);
	},
	formatTime: function (d) {
		function padTo2Digit(digit) {
			return digit < 10 ? '0' + digit : digit;
		}
		return utility.formatDate(d) + " " + padTo2Digit(d.getHours()) + ":" + padTo2Digit(d.getMinutes()) + ":" + padTo2Digit(d.getSeconds());
	},
	addTimeSpan: function (date, y, mm, d, h, m, s) {
		/// <summary>��ָ�������ڽ���ƫ��</summary>
		return new Date(date.getFullYear() + y, date.getMonth() + mm, date.getDate() + d, date.getHours() + h, date.getMinutes() + m, date.getSeconds() + s);
	},
	serializeForm: function (form) {
		/// <summary>���л���Ϊ����</summary>
		var v = {};
		var o = form.serializeArray();
		for (var i in o) {
			if (typeof (v[o[i].name]) == 'undefined') v[o[i].name] = o[i].value;
			else v[o[i].name] += "," + o[i].value;
		}
		return v;
	},
	getSecondInfo: function (second) {
		var show_time = "";
		var hour = parseInt(second / 3600);  //ʱ
		if (hour > 0) {
			show_time = hour + "Сʱ";
			second = second % 3600;
		}
		var minute = parseInt(second / 60);  //��
		if (minute >= 1) {
			show_time = show_time + minute + "��";
			second = second % 60;
		} else if (hour >= 1 && second > 0) {
			show_time = show_time + "0��";
		}
		if (second > 0) {
			show_time = show_time + second + "��";
		}

		return show_time;
	},
	post: function (url, data, dataType, succCallback, errorCallback, featureFlag, refer) {
		function onError(xhr) {
			var text = xhr.responseText;
			if (text.indexOf("<title>��¼</title>") != -1) {
				//��ǿ��
				alert("���棺ϵͳ��ǿ���˳���¼��������ϵͳ��������" +
					(featureFlag ? "\nΪ�˱�֤���İ�ȫ�����ܡ�" + featureFlag + "���ѱ��Զ����ã������µ�¼��\n�����������󣬹��ܽ��ᱻ�Զ����¿�����" : ""));
				var list = utility.disabledFeatures();
				list.push(featureFlag);
				utility.disabledFeatures = list;
				utility.setPref("disabled", list.join("|"));
			}

			if (errorCallback) errorCallback.apply(this, arguments);
		}
		$.ajax({
			url: url,
			data: data,
			timeout: 10000,
			type: "POST",
			success: succCallback,
			error: onError,
			dataType: dataType,
			refer: refer
		});
	},
	get: function (url, data, dataType, succCallback, errorCallback, featureFlag, refer) {
		function onError(xhr) {
			var text = xhr.responseText;
			if (text.indexOf("<title>��¼</title>") != -1) {
				//��ǿ��
				alert("���棺ϵͳ��ǿ���˳���¼��������ϵͳ��������" +
					(featureFlag ? "\nΪ�˱�֤���İ�ȫ�����ܡ�" + featureFlag + "���ѱ��Զ����ã������µ�¼��\n�����������󣬹��ܽ��ᱻ�Զ����¿�����\n\n�����µ�¼��" : ""));
				var list = utility.disabledFeatures();
				list.push(featureFlag);
				utility.disabledFeatures = list;
				utility.setPref("disabled", list.join("|"));

				self.location = "/otsweb/loginAction.do?method=init";
			}

			if (errorCallback) errorCallback.apply(this, arguments);
		}
		$.ajax({
			url: url,
			data: data,
			timeout: 10000,
			type: "GET",
			success: succCallback,
			error: onError,
			dataType: dataType,
			refer: refer
		});
	},
	showDialog: function (object, optx) {
		/// <summary>��ʾ�Ի������д��� close_button ��ʽ�Ŀؼ����Զ���Ϊ�رհ�ť</summary>
		return (function (opt) {
			var dataKey = "fs_dlg_opt";
			if (this.data(dataKey)) {
				//this.data(dataKey).closeDialog();
				return;
			}

			opt = $.extend({ bindControl: null, removeDialog: this.attr("autoCreate") == "1", onClose: null, animationMove: 20, speed: "fast", fx: "linear", show: "fadeInDown", hide: "fadeOutUp", onShow: null, timeOut: 0 }, opt);
			this.data("fs_dlg_opt", opt);
			var top = "0px";
			var left = "50%";

			this.css({
				"position": opt.parent ? "absolute" : "fixed",
				"left": left,
				"top": top,
				"margin-left": "-" + (this.width() / 2) + "px",
				"margin-top": "0px",
				"z-index": "9999"
			});
			var obj = this;
			this.changeLoadingIcon = function (icon) {
				/// <summary>���ļ��ضԻ����ͼ��</summary>
				obj.removeClass().addClass("loadingDialog loadicon_" + (icon || "tip"));
				return obj;
			};
			this.autoCloseDialog = function (timeout) {
				/// <summary>���õ�ǰ�Ի�����ָ��ʱ����Զ��ر�</summary>
				setTimeout(function () { obj.closeDialog(); }, timeout || 2500);
				return obj;
			};
			this.setLoadingMessage = function (msgHtml) {
				obj.find("div").html(msgHtml);
				return obj;
			};
			this.closeDialog = function () {
				/// <summary>�رնԻ���</summary>
				obj.removeData(dataKey);
				obj.animate({ "marginTop": "+=" + opt.animationMove + "px", "opacity": "hide" }, opt.speed, opt.fx, function () {
					if (opt.bindControl) opt.bindControl.enable();
					if (opt.onClose) opt.onClose.call(obj);
					if (opt.removeDialog) obj.remove();
				})

				return obj;
			};
			$('.close_button', this).unbind("click").click(obj.closeDialog);
			//auto close
			if (opt.timeOut > 0) {
				var handler = opt.onShow;
				opt.onShow = function () {
					setTimeout(function () { $(obj).closeDialog(); }, opt.timeOut);
					if (handler != null) handler.call(this);
				};
			}
			//show it
			if (opt.bindControl) opt.bindControl.disable();
			this.animate({ "marginTop": "+=" + opt.animationMove + "px", "opacity": "show" }, opt.speed, opt.fx, function () { opt.onShow && opt.onShow.call(obj); })
			this.data(dataKey, this);

			return this;
		}).call(object, optx);
	},
	fishTab: function (obj, opt) {
		return (function (opt) {
			var self = this;
			opt = $.extend({ switchOnHover: false, switchOnClick: true }, opt);
			this.addClass("fishTab");


			this.showTab = function (tabid) {
				self.find(".current").removeClass("current");
				self.find("ul.tabNav li[tab=" + tabid + "], div." + tabid).addClass("current");
			};
			self.find(".tabNav li").hover(function () {
				if (!opt.switchOnHover) return;
				self.showTab($(this).attr("tab"));
			}).click(function () {
				if (!opt.switchOnClick) return;
				self.showTab($(this).attr("tab"));
			});
			this.showTab(self.find(".tabNav").attr("default") || self.find(".tabNav li:eq(0)").attr("tab"));

			return this;
		}).call(obj, opt);
	},
	getLoginRetryTime: function () {
		return parseInt(window.localStorage.getItem("login.retryLimit")) || 2000;
	},
	showOptionDialog: function (tab) {
		if (tab) utility.configTab.showTab(tab);
		utility.showDialog($("#fishOption"));
	},
	addCookie: function (name, value, expDays) {
		var cook = name + "=" + value + "; path=/; domain=.12306.cn";
		if (expDays > 0) {
			cook += "; expires=" + new Date(new Date().getTime() + expDays * 3600 * 1000 * 24).toGMTString();
		}
		document.cookie = cook;
	},
	getCookie: function (name) {
		var cook = document.cookie;
		var arr = cook.split("; ");
		for (var i = 0; i < arr.length; i++) {
			var arg = arr[i].split('=');
			if (arg[0] == name) return arg[1];
		}
	},
	setSnInfo: function (name, sn) {
		utility.setPref("helper.regUser", name);
		utility.setPref("helper.regSn", sn);
		utility.addCookie("helper.regUser", name, 999);
		utility.addCookie("helper.regSn", sn, 999);
	},
	verifySn: function (skipTimeVerify, name, sn) {
		name = name || utility.getPref("helper.regUser") || utility.getCookie("helper.regUser");
		sn = sn || utility.getPref("helper.regSn") || utility.getCookie("helper.regSn");
		if (!name && sn) return utility.verifySn2(skipTimeVerify, sn);
		if (!name || !sn) return { result: -4, msg: "δע��", name: "��Ʊ�����û�", typeDesc: "��ʽ��" };

		utility.setSnInfo(name, sn);

		var args = sn.split(',');
		if (!skipTimeVerify) {
			if ((new Date() - args[0]) / 60000 > 5) {
				return { result: -1, msg: "���к�ע����ʧЧ" };
			}
		}
		var dec = [];
		var encKey = args[0] + args[1];
		var j = 0;
		for (var i = 0; i < args[2].length; i += 4) {
			dec.push(String.fromCharCode(parseInt(args[2].substr(i, 4), 16) ^ encKey.charCodeAt(j)));
			j++;
			if (j >= encKey.length) j = 0;
		}
		var data = dec.join("");
		data = { result: null, type: data.substring(0, 4), name: data.substring(4) };
		data.result = data.name == name ? 0 : -3;
		data.msg = data.result == 0 ? "�ɹ���֤" : "ע����Ч"
		data.typeDesc = data.type == "NRML" ? "��ʽ��" : (data.type == "GROP" ? "�ڲ���, <span style='color:blue;'>��л����������֮��</span>!" : "<span style='color:red;'>������, �ǳ���л����֧��</span>!");

		return data;
	},
	verifySn2: function (skipTimeVerify, data) {
		data = utility.trim(data);
		try {
			var nameLen = parseInt(data.substr(0, 2), 16);
			var name = data.substr(2, nameLen);
			data = data.substring(2 + nameLen);

			var arr = [];
			for (var i = 0; i < data.length; i++) {
				var c = data.charCodeAt(i);
				if (c >= 97) arr.push(String.fromCharCode(c - 49));
				else arr.push(data.charAt(i));
			}
			data = arr.join("");
			var ticket = parseInt(data.substr(0, 14), 16);
			var key = parseInt(data.substr(14, 1), 16);
			var encKey = ticket.toString(16).toUpperCase() + key.toString().toUpperCase();
			data = data.substring(15);
			var dec = [];
			var j = 0;
			for (var i = 0; i < data.length; i += 4) {
				dec.push(String.fromCharCode(parseInt(data.substr(i, 4), 16) ^ encKey.charCodeAt(j)));
				j++;
				if (j >= encKey.length) j = 0;
			}
			dec = dec.join("").split('|');
			var regVersion = dec[0].substr(0, 4);
			var regName = dec[0].substring(4);
			var bindAcc = dec.slice(1, dec.length);

			if (!bindAcc && !skipTimeVerify && (new Date() - ticket) / 60000 > 5) {
				return { result: -1, msg: "ע������ʧЧ�� ����������" };
			}
			if (regName != name) {
				return { result: -3, msg: "ע��ʧ�ܣ��û�����ƥ��" };
			}
			var data = { name: name, type: regVersion, bindAcc: bindAcc, ticket: ticket, result: 0, msg: "�ɹ�ע��" };
			switch (data.type) {
				case "NRML": data.typeDesc = "��ʽ��"; break;
				case "GROP": data.typeDesc = "�ڲ���, <span style='color:blue;'>��л����������֮��</span>!"; break;
				case "DONT": data.typeDesc = "<span style='color:red;'>������, �ǳ���л����֧��</span>!"; break;
				case "PART": data.typeDesc = "�����棬��ӭ����ʹ��";
			}
			data.regTime = new Date(ticket);
			data.regVersion = 2;

			return data;
		} catch (e) {
			return { result: -4, msg: "���ݴ���" };
		}
	},
	allPassengers: null,
	getAllPassengers: function (callback, ignoreLocalCache) {
		if (utility.allPassengers) {
			callback(utility.allPassengers);
			return;
		}

		//var tw = utility.getTopWindow();
		//if (tw != self) return tw.utility.getAllPassengers(callback, ignoreLocalCache);
		if (utility.isfeatureDisabled("pasload"))
			return [];

		//��ʼ�������г˿�
		utility.allPassengers = [];
		var pageIndex = 0;

		function loadPage() {
			utility.post("/otsweb/passengerAction.do?method=getPagePassengerAll", { pageSize: 10, pageIndex: pageIndex }, "json", function (json) {
				$.each(json.rows, function () { utility.allPassengers.push(this); });

				if (utility.allPassengers.length >= json.recordCount) {
					callback(utility.allPassengers);
				} else {
					pageIndex++;
					setTimeout(loadPage, 1000);
				}
			}, function () {
				setTimeout(loadPage, 3000);
			}, "pasload", utility.getFullUrl("/otsweb/passengerAction.do?method=initUsualPassenger12306"));
		}

		loadPage();
	},
	getFullUrl: function (path) {
		return location.protocol + "//" + location.host + path;
	},
	regCache: {},
	getRegCache: function (value) {
		return utility.regCache[value] || (utility.regCache[value] = new RegExp("^(" + value + ")$", "i"));
	},
	preCompileReg: function (optionList) {
		var data = $.map(optionList, function (e) {
			return e.value;
		});
		return new RegExp("^(" + data.join("|") + ")$", "i");
	},
	enableLog: function () {
		$("body").append('<button class="fish_button" style="width:100px;position:fixed;left:265px;top:8px;height:30px;" onclick="utility.showLog();">��ʾ������־</button>');
		$(document).ajaxSuccess(function (a, b, c) {
			if (!c.log) return;
			c.log.response = b.responseText;
			c.log.success = true;
		}).ajaxSend(function (a, b, c) {
			utility.appendLog(c);
		}).ajaxError(function (a, b, c) {
			if (!c.log) return;
			c.log.response = b.responseText;
		});
	},
	//��ȡ��¼��IE�Ĵ��� Add By XPHelper
	enableLoginIE: function () {
		$("body").append('<button class="fish_button configLink" style="width:150px;position:fixed;right:14px;top:20px;height:35px;"tab="tabLoginIE">��ȡ��¼��IE�Ĵ���</button>');
	},
	analyzeForm: function (html) {
		var data = {};

		//action
		var m = /<form.*?action="([^"]+)"/.exec(html);
		data.action = m ? RegExp.$1 : "";

		//inputs
		data.fields = {};
		var inputs = html.match(/<input\s*(.|\r|\n)*?>/gi);
		$.each(inputs, function () {
			if (!/name=['"]([^'"]+?)['"]/.exec(this)) return;
			var name = RegExp.$1;
			data.fields[RegExp.$1] = !/value=['"]([^'"]+?)['"]/.exec(this) ? "" : RegExp.$1;
		});

		//tourflag
		m = /submit_form_confirm\('confirmPassenger','([a-z]+)'\)/.exec(html);
		if (m) data.tourFlag = RegExp.$1;

		return data;
	},
	selectionArea: function (opt) {
		var self = this;
		this.options = $.extend({ onAdd: function () { }, onRemove: function () { }, onClear: function () { }, onRemoveConfirm: function () { return true; }, syncToStorageKey: "", defaultList: null, preloadList: null }, opt);
		this.append('<div style="padding:5px; border:1px dashed gray; background-color:#fafafa; width:110px;">(��û������κ���)</div>');
		this.datalist = [];

		this.add = function (data) {
			if ($.inArray(data, self.datalist) > -1) return;

			var text = typeof (data) == "string" ? data : data.text;

			var html = $('<input type="button" class="lineButton" value="' + text + '" title="���ɾ��" />');
			self.append(html);
			html.click(self.removeByButton);
			self.datalist.push(data);
			self.syncToStorage();
			self.checkEmpty();
			self.options.onAdd.call(self, data, html);
		};

		this.removeByButton = function () {
			var obj = $(this);
			var idx = obj.index() - 1;
			var value = self.datalist[idx];

			if (!self.options.onRemoveConfirm.call(self, value, obj, idx)) {
				return;
			}

			obj.remove();
			self.datalist.splice(idx, 1);
			self.syncToStorage();
			self.checkEmpty();
			self.options.onRemove.call(self, value, obj);
		};

		this.emptyList = function () {
			self.datalist = [];
			self.find("input").remove();
			self.syncToStorage();
			self.checkEmpty();
			self.options.onClear.call(self);
		};

		this.isInList = function (data) {
			/// <summary>�ж�ָ����ֵ�Ƿ����б���</summary>
			return $.inArray($.inArray(data, self.datalist)) > -1;
		};

		this.isInRegList = function (data) {
			/// <summary>�ж�ָ����ֵ�Ƿ����б��С�����ٶ����ַ�����ʹ����������ж�</summary>
			for (var i = 0; i < self.datalist.length; i++) {
				if (utility.getRegCache(self.datalist[i]).test(data)) return true;
			}
			return false;
		};

		this.syncToStorage = function () {
			if (!self.options.syncToStorageKey) return;

			window.localStorage.setItem(self.options.syncToStorageKey, self.datalist.join("\t"));
		};

		this.checkEmpty = function () {
			if (self.find("input").length) {
				self.find("div").hide();
			} else {
				self.find("div").show();
			}
		};

		if (self.options.syncToStorageKey) {
			var list = self.options.preloadList;
			if (!list) {
				var list = window.localStorage.getItem(this.options.syncToStorageKey);
				if (!list) list = this.options.defaultList;
				else list = list.split('\t');
			}

			if (list) {
				$.each(list, function () { self.add(this + ""); });
			}
		}

		return this;
	},
	getUpdateUrl: function () {
		var ua = navigator.userAgent;
		if (ua.indexOf(" SE ") > 0) return "http://static.liebao.cn/_softdownload/32c8a36d-18f5-4600-9913-c7b83f484ee2.sext";
		else if (ua.indexOf("Maxthon") > 0) return "http://static.liebao.cn/_softdownload/12306_ticket_assistant_for_maxthon3.mxaddon";
		else if (ua.indexOf("LBBROWSER") > 0) return "http://static.liebao.cn/_softdownload/9d0d790e-d78f-43b3-8e4a-34f7ec57e851.crx";
		else if (ua.indexOf("TaoBrowser") > 0) return "http://static.liebao.cn/_softdownload/12306_ticket_helper_for_taobrowser.crx";
		else if (ua.indexOf("Firefox") > 0) return "http://static.liebao.cn/_softdownload/12306_ticket_helper.user.js";
		else return "http://static.liebao.cn/_softdownload/12306_ticket_helper.crx";

	}
}

function unsafeInvoke(callback) {
	/// <summary>��ɳ��ģʽ�µĻص�</summary>
	var cb = document.createElement("script");
	cb.type = "text/javascript";
	cb.textContent = buildCallback(callback);
	document.head.appendChild(cb);
}

function buildCallback(callback) {
	var content = "";
	if (!utility_emabed) {
		content += "window.helperVersion='" + version + "'; window.compVersion='" + compVersion + "'; if(typeof(window.utility)!='undefined' && navigator.userAgent.indexOf('Maxthon')==-1){ alert('���ո�ȥ! ��⵽���ƺ�ͬʱ��������ֻ����! ��ת�����������������Firefox������չ������Chrome����ж���ϰ汾�����֣�');}; \r\nwindow.utility=" + buildObjectJavascriptCode(utility) + "; window.utility.init();\r\n";
		utility_emabed = true;
	}
	content += "window.__cb=" + buildObjectJavascriptCode(callback) + ";\r\n\
	if(typeof(jQuery)!='undefined')window.__cb();\r\n\
	else{\
		var script=document.createElement('script');\r\nscript.src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';\r\n\
		script.type='text/javascript';\r\n\
		script.addEventListener('load', window.__cb);\r\n\
		document.head.appendChild(script);\r\n\
	}";

	return content;
}

function buildObjectJavascriptCode(object) {
	/// <summary>��ָ����Javascript�������Ϊ�ű�</summary>
	if (!object) return null;

	var t = typeof (object);
	if (t == "string") {
		return "\"" + object.replace(/(\r|\n|\\)/gi, function (a, b) {
			switch (b) {
				case "\r":
					return "\\r";
				case "\n":
					return "\\n";
				case "\\":
					return "\\\\";
			}
		}) + "\"";
	}
	if (t != "object") return object + "";

	var code = [];
	for (var i in object) {
		var obj = object[i];
		var objType = typeof (obj);

		if ((objType == "object" || objType == "string") && obj) {
			code.push(i + ":" + buildObjectJavascriptCode(obj));
		} else {
			code.push(i + ":" + obj);
		}
	}

	return "{" + code.join(",") + "}";
}

var isChrome = utility.isWebKit();
var isFirefox = utility.isFirefox();

if (location.host == "dynamic.12306.cn" || (location.host == "www.12306.cn" && location.protocol == "https:")) {
	if (!isChrome && !isFirefox) {
		alert("�ܱ�Ǹ��δ��ʶ�������������������������в�֧�ֽű����У���ʹ��Firefox��Chrome�������\n��������е���Maxthon3����ȷ�ϵ�ǰҳ�������ڸ���ģʽ�����Ǽ���ģʽ�� :-)");
	} else if (isFirefox && typeof (GM_notification) == 'undefined') {
		alert("�ܱ�Ǹ�����ű���Ҫ���µ�Scriptish��չ����֧��GreaseMonkey�����������GreaseMonkey��չ����װScriptish��");
		window.open("https://addons.mozilla.org/zh-CN/firefox/addon/scriptish/");
	} else if (!window.localStorage) {
		alert("����! localStorage Ϊ null, �����޷�����. ��鿴������Ƿ��Ѿ����� localStorage!\nFirefox������ about:config �е� dom.storage.enabled Ϊ true .");
	} else {

		//��¼����
		utility.setPref("updates", updates.join("\t"));
		initUIDisplay();
		unsafeInvoke(injectDom);
		entryPoint();
	}
}

//#endregion

//#region -----------------���----------------------

function entryPoint() {
	var location = window.location;
	var path = location.pathname;

	utility.regInfo = utility.verifySn(true);
	if (utility.regInfo.result != 0) {
		//return;
	}

	//
	unsafeInvoke(autoReloadIfError);
	if ((path == "/otsweb/loginAction.do" && location.search != '?method=initForMy12306') || path == "/otsweb/login.jsp") {
		//��¼ҳ
		unsafeInvoke(initLogin);
	}
	if (false && utility.regInfo.bindAcc && localStorage.getItem("_sessionuser") && utility.regInfo.bindAcc.length > 0 && utility.regInfo.bindAcc[0] && utility.regInfo.bindAcc[0] != "*") {
		var user = localStorage.getItem("_sessionuser");
		var ok = false;
		for (var i = 0; i < utility.regInfo.bindAcc.length; i++) {
			if (utility.regInfo.bindAcc[i] == user) {
				ok = true;
				break;
			}
		}
		if (!ok) return;
	}
	if (path == "/otsweb/order/querySingleAction.do") {
		if (location.search == "?method=init" && document.getElementById("submitQuery")) {
			unsafeInvoke(initTicketQuery);
			unsafeInvoke(initDirectSubmitOrder);
		}
		if (location.search == "?method=submutOrderRequest") {
			unsafeInvoke(initSubmitOrderQuest);
		}
	}
	if (path == "/otsweb/order/orderAction.do") {
		if (location.search.indexOf("method=cancelMyOrderNotComplete") != -1 && document.getElementById("submitQuery")) {
			unsafeInvoke(initTicketQuery);
			unsafeInvoke(initDirectSubmitOrder);
		}
	}
	if (path == "/otsweb/order/payConfirmOnlineSingleAction.do") {
		if (location.search.indexOf("method=cancelOrder") != -1 && document.getElementById("submitQuery")) {
			unsafeInvoke(initTicketQuery);
			unsafeInvoke(initDirectSubmitOrder);
		}
	}
	if (path == "/otsweb/order/myOrderAction.do") {
		if (location.search.indexOf("method=resign") != -1 && document.getElementById("submitQuery")) {
			unsafeInvoke(initTicketQuery);
			unsafeInvoke(initDirectSubmitOrder);
		}
	}
	if (path == "/otsweb/order/confirmPassengerAction.do") {
		if (location.search == "?method=init") {
			unsafeInvoke(initAutoCommitOrder);
			unsafeInvoke(autoCommitOrderInSandbox);
		}
		if (location.search.indexOf("?method=payOrder") != -1) {
			unsafeInvoke(initPagePayOrder);
			//��ȡ��¼��IE�Ĵ��� Add By XPHelper
			unsafeInvoke(utility.enableLoginIE);
		}
	}
	if (path == "/otsweb/order/myOrderAction.do") {
		if (location.search.indexOf("?method=laterEpay") != -1 || location.search.indexOf("?method=queryMyOrderNotComplete") != -1) {
			unsafeInvoke(initNotCompleteOrderPage);
			unsafeInvoke(initPayOrder);
			//��ȡ��¼��IE�Ĵ��� Add By XPHelper
			unsafeInvoke(utility.enableLoginIE);
		}
	}
	if (path == "/otsweb/passengerAction.do") {
		if (location.search.indexOf("?method=initUsualPassenger") != -1) {
			unsafeInvoke(storePasToLocal);
		}
	}
	if (path == "/otsweb/main.jsp" || path == "/otsweb/") {
		//�����
		console.log("����ע������ܽű���");

		//��ҳ�浯����ʾ����ֹ��Ϊҳ����ת���¶Ի��򲻹ر�
		console.log("������ҳ����Ϣ���ü�麯��");
		window.setInterval(function () {
			var msg = window.localStorage["notify"];
			if (typeof (msg != 'undefined') && msg) {
				console.log("������������ʾ����: " + msg);
				window.localStorage.removeItem("notify");
				utility.notify(msg);
			}
		}, 100);

		unsafeInvoke(injectMainPageFunction);
	}
}

//#endregion

//#region ������ϵ��

function storePasToLocal() {
	//var isNew = !window.localStorage["pas"];

	//utility.getAllPassengers(function (list) {
	//	window.localStorage.setItem("pas", $.toJSON(list));

	//	if (isNew) {
	//		alert("��ϲ����ϵ���Ѿ����浽���أ����ڿ���ȥ��Ʊ����");
	//		self.location = "/otsweb/order/querySingleAction.do?method=init";
	//	}
	//}, true);
}

//#endregion

//#region δ��ɶ�����ѯҳ��

function initNotCompleteOrderPage() {
	utility.checkCompatible();

	if (!OrderQueueWaitTime || !OrderQueueWaitTime.prototype.getWaitTime) return;
	var queueCheckUrl = /url\s*:\s*['"]([^'"]+)['"]/i.exec(OrderQueueWaitTime.prototype.getWaitTime + '')[1];	//�Ŷӵ�ַ
	if (!queueCheckUrl) return;

	//������ʾʱ���
	(function () {
		var tagInputs = $("input[name=cache_tour_flag]");
		var flags = $.map(tagInputs, function (e, i) { return e.value; });
		$.each(flags, function () { $("#showTime_" + this).hide().after("<span id='status_" + this + "'>���ڲ�ѯ...</span>"); });

		function doCheck() {
			var flag = flags.shift();
			flags.push(flag);

			utility.get(queueCheckUrl, { tourFlag: flag }, "json", function (data) {
				var obj = $("#status_" + flag);
				if (data.waitTime == 0 || data.waitTime == -1) {
					obj.css({ "color": "green" }).html("��Ʊ�ɹ���");
					utility.notifyOnTop("��Ʊ�ɹ����뾡�츶�");
					parent.playAudio();
					self.location.reload();
					return;
				}

				if (data.waitTime == -2) {
					utility.notifyOnTop("��Ʊʧ�ܣ������¶�Ʊ��" + data.msg);
					parent.playFailAudio();
					obj.css({ "color": "red" }).html("��Ʊʧ�ܣ�" + data.msg);

					return;
				}
				if (data.waitTime == -3) {
					utility.notifyOnTop("�����Ѿ���ȡ����");
					parent.playFailAudio();
					obj.css({ "color": "red" }).html("�����Ѿ���ȡ������");

					return;
				}
				if (data.waitTime == -4) {
					utility.notifyOnTop("���ڴ�����....");
					obj.css({ "color": "blue" }).html("���ڴ�����....");
				}

				if (data.waitTime > 0) {
					obj.css({ "color": "red" }).html("�Ŷ���<br />�Ŷ�����" + (data.waitCount || "δ֪") + "��<br />Ԥ��ʱ�䡾" + utility.getSecondInfo(data.waitTime) + "��<br />������ʱ�䲻<br />��ô���� �r(�s���t)�q");
				} else {
					obj.css({ "color": "red" }).html("��ֵ�״̬�� [" + data.waitTime + "]....");
				}


				setTimeout(doCheck, 2000);
			}, function () {
				utility.notifyOnTop("��ѯ״̬��������ˢ��ҳ�棡");
				self.location.reload();
			});
		}

		if (flags.length > 0) doCheck();
	})();
}

//#endregion

//#region �ύҳ�����

function initSubmitOrderQuest() {
	if ($("div.error_text").length > 0) {
		parent.window.resubmitForm();
	}
}

//#endregion

//#region ��Ʊҳ�棬������ʾ

function initPagePayOrder() {
	new Audio(utility.getAudioUrl()).play();
}

//#endregion

//#region -----------------�����Զ�ˢ��----------------------

function autoReloadIfError() {
	if ($.trim($("h1:first").text()) == "����") {
		$("h1:first").css({ color: 'red', 'font-size': "18px" }).html("&gt;_&lt; ��߹!�������ҳ�����������2�����һ��������� �r(�s���t)�q");
		setTimeout(function () {
			self.location.reload();
		}, 2000);
	}
}

//#endregion

//#region -----------------�����----------------------

function injectMainPageFunction() {
	//��Դ
	var main = $("#main")[0];
	main.onload = function () {
		var location = null;
		try {
			location = main.contentWindow.location + '';
		} catch (e) {
			//�����ˣ���վ
		}
		if (!location || location == "http://www.12306.cn/mormhweb/logFiles/error.html") {
			resubmitForm();
		}
	}

	if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
		if (confirm("ι������������������֪ͨ������Ȼ��ʾ���谭�������������б�����Ȼ���ûƱ�ˣ�\n\n����ǵ�һ�ο�����仰�������ȡ����������ʾ���������������������Ի��򣬾ʹ���ȷ�����Դ�������ҳ�ĳ������Ⲣ���ҽ���취��\n\n�ѹ�����������ݲ�֧�ֱ����Ȩ�ޣ�ÿ�η���ʱ���ܶ�����������Ի��򡭡�")) {
			window.open("http://www.fishlee.net/soft/44/faq.html");
		}
	}

	window.resubmitForm = function () {
		var form = $("#orderForm");
		if (form.length == 0 || form.attr("success") != "0") return;

		utility.notify("ҳ������ˣ���������Ԥ����");
		setTimeout(function () { document.getElementById("orderForm").submit(); }, 3000);
	}
	window.playAudio = function () {
		new Audio(utility.getAudioUrl()).play();
	};
	window.playFailAudio = function () {
		utility.playFailAudio();
	};
}

//#endregion

//#region -----------------�Զ��ύ----------------------
function initAutoCommitOrder() {
	utility.checkCompatible();

	var count = 0;
	var breakFlag = 0;
	var randCode = "";
	var submitFlag = false;
	var tourFlag = /'(dc|fc|wc|gc)'/.exec($("div.tj_btn :button:eq(2)")[0].onclick + '')[1] || "dc";
	var randEl = $("#rand");
	var autoSubmitFlag = "autocommitorder";
	var entryTime = new Date();

	//������־
	utility.enableLog();

	//#region ���ϵͳ������ô�����ύ

	if ($(".error_text").length > 0 && parent.$("#orderForm").length > 0) {
		parent.resubmitForm();

		return;
	}

	//#endregion

	//����ַ
	var checkOrderInfoUrl = /url\s*:\s*['"]([^'"]+)['"]/i.exec(submit_form_confirm + '')[1];					//��鶩����Ϣ
	var getQueueCountUrl = /url\s*:\s*['"]([^'"]+)['"]/i.exec(showOrderDialog + '')[1];
	var confirmUrl = /tourFlag\s*==\s*['"]dc['"](.|\s)+?['"]([^'"]+)['"]/i.exec(queueOrder + '')[2];			//�ύ������ַ
	var queueCheckUrl = /url\s*:\s*['"]([^'"]+)['"]/i.exec(OrderQueueWaitTime.prototype.getWaitTime + '')[1];	//�Ŷӵ�ַ
	var isAutoSubmitEnabled = checkOrderInfoUrl && getQueueCountUrl && confirmUrl && queueCheckUrl;
	if (!isAutoSubmitEnabled) {
		alert("�š���������ľ���ҵ�����ύ��ַ����so�����Զ��ύ�ѱ��Զ��������š���");
	}

	function stop(msg) {
		setCurOperationInfo(false, "���� - " + msg);
		setTipMessage(msg);
		$("div.tj_btn button, div.tj_btn input").each(function () {
			this.disabled = false;
			$(this).removeClass().addClass("long_button_u");
		});
		$("#btnCancelAuto").hide();
		submitFlag = false;
	}

	var reloadCode = function () {
		$("#img_rrand_code").click();
		$("#rand").val("")[0].select();
	};

	var getSleepTime = function () {
		return 1000 * Math.max(parseInt($("#pauseTime").val()), 1);
	};

	//�����ȴ�ʱ����õľ���
	var waitTimeTooLong_alert = false;

	function submitForm() {
		if (window.isSafeMobeBlocked) {
			setCurOperationInfo(true, "���ڵȰ�ȫ�����ϡ����r(�s���t)�q");
			return;	//������
		}

		randEl[0].blur();
		if (stopCheckCount) stopCheckCount();
		if (!window.submit_form_check || !submit_form_check("confirmPassenger")) {
			setCurOperationInfo(false, "���ı�û����д����!");
			stop("����д������");
			return;
		}

		count++;
		setCurOperationInfo(true, "�� " + count + " ���ύ");
		if (breakFlag) {
			stop("��ȡ���Զ��ύ");
			breakFlag = 0;
			return;
		}
		$("#btnCancelAuto").show().removeClass().addClass("long_button_u_down")[0].disabled = false; //��ֹ������
		breakFlag = 0;
		waitTimeTooLong_alert = false;

		$("#confirmPassenger").ajaxSubmit({
			url: checkOrderInfoUrl + $("#rand").val(),
			type: "POST",
			data: { tFlag: tourFlag },
			dataType: "json",
			timeout: 10000,
			success: function (data) {
				if ('Y' != data.errMsg || 'N' == data.checkHuimd || 'N' == data.check608) {
					setCurOperationInfo(false, data.msg || data.errMsg);
					stop(data.msg || data.errMsg);
					reloadCode();
				}
				else {
					queryQueueCount();
				}
			},
			error: function (msg) {
				setCurOperationInfo(false, "��ǰ����������");
				utility.delayInvoke(null, submitForm, 1000);
			}
		});
	}

	function queryQueueCount() {
		var queryLeftData = {
			train_date: $("#start_date").val(),
			train_no: $("#train_no").val(),
			station: $("#station_train_code").val(),
			seat: $("#passenger_1_seat").val(),
			from: $("#from_station_telecode").val(),
			to: $("#to_station_telecode").val(),
			ticket: $("#left_ticket").val()
		};
		utility.get(getQueueCountUrl, queryLeftData, "json", function (data) {
			console.log(data);
			if (data.op_2) {
				var errmsg = "ϵͳ˵�˶࣬�����Ŷӣ�������û�취�ˡ���������ȥ���������������� (��˵����=" + data.count + ")";
				setCurOperationInfo(true, errmsg);
				stop(errmsg);

				utility.delayInvoke(null, queryQueueCount, 1000);
				return;
			}

			setTimeout(submitConfirmOrder, 1000);
		}, function () { utility.delayInvoke(null, queryQueueCount, 2000); });
	}

	function submitConfirmOrder() {
		jQuery.ajax({
			url: confirmUrl,
			data: $('#confirmPassenger').serialize(),
			type: "POST",
			timeout: 10000,
			dataType: 'json',
			success: function (msg) {
				console.log(msg);

				var errmsg = msg.errMsg;
				if (errmsg != 'Y') {
					if (errmsg.indexOf("����δ�����") != -1) {
						alert("����δ֧������! ��ɶ��, �Ͻ���ȷ��֧��ȥ.");
						window.location.replace("/otsweb/order/myOrderAction.do?method=queryMyOrderNotComplete&leftmenu=Y");
						return;
					}
					if (errmsg.indexOf("�ظ��ύ") != -1) {
						stop("�ظ��ύ������ˢ��TOKEN��������������֤���ύ");
						reloadToken();
						reloadCode();
						return;
					}
					if (errmsg.indexOf("��̨�����쳣") != -1 || errmsg.indexOf("�Ƿ�����") != -1) {
						if (lastform) {
							utility.notifyOnTop("��̨�����쳣�����Զ������ύ��������д��֤�벢�ύ��");
							lastform.submit();
						} else {
							stop("��̨�����쳣���뷵�ز�ѯҳ����Ԥ����");
						}
						return;
					}
					if (errmsg.indexOf("�����Ŷ���") != -1) {
						console.log("�����Ŷ��еĶ����� ������ѯ״̬");
						waitingForQueueComplete();
						return;
					}


					setCurOperationInfo(false, errmsg);
					stop(errmsg);
					reloadCode();
				} else {
					utility.notifyOnTop("�����ύ�ɹ�, ���ڵȴ�������ɲ������뼰ʱע�ⶩ��״̬");
					waitingForQueueComplete();
				}
			},
			error: function (msg) {
				setCurOperationInfo(false, "��ǰ����������");
				utility.delayInvoke(null, submitForm, 3000);
			}
		});
	}

	function reloadToken(submit) {
		setCurOperationInfo(true, "����ˢ��TOKEN....");
		utility.get(self.location + '', null, "text", function (text) {
			if (!/TOKEN"\s*value="([a-f\d]+)"/i.test(text)) {
				setCurOperationInfo(false, "�޷����TOKEN����������");
				utility.delayInvoke("#countEle", reloadToken, 1000);
			} else {
				var token = RegExp.$1;
				setCurOperationInfo(false, "�ѻ��TOKEN - " + token);
				console.log("��ˢ��TOKEN=" + token);
				$("input[name=org.apache.struts.taglib.html.TOKEN]").val(token);
			}
			safeMode.restart();	//������ȫģʽ
		}, function () { utility.delayInvoke("#countEle", reloadToken, 1000); });
	}

	function waitingForQueueComplete() {
		setCurOperationInfo(true, "�����ύ�ɹ�, ���ڵȴ�������ɲ���....");

		$.ajax({
			url: queueCheckUrl,
			data: { tourFlag: tourFlag },
			type: 'GET',
			timeout: 10000,
			dataType: 'json',
			success: function (json) {
				console.log(json);

				if (json.waitTime == -1 || json.waitTime == 0) {
					utility.notifyOnTop("��Ʊ�ɹ�!");
					if (json.orderId)
						window.location.replace("/otsweb/order/confirmPassengerAction.do?method=payOrder&orderSequence_no=" + json.orderId);
					else window.location.replace('/otsweb/order/myOrderAction.do?method=queryMyOrderNotComplete&leftmenu=Y');
					stop("��Ʊ�ɹ���");
				} else if (json.waitTime == -3) {
					var msg = "�ܱ�Ǹ, �������޳ݵس��������Ķ���, �Ͻ�������!";
					utility.notify(msg);
					setCurOperationInfo(false, msg);
					stop(msg);
					reloadCode();
				} else if (json.waitTime == -2) {
					var msg = "�ܱ�Ǹ, ������˵��ռ��ʧ�� : " + json.msg + ', �Ͻ���������!';
					reloadToken();
					utility.notify(msg);
					setCurOperationInfo(false, msg);
					stop(msg);
					reloadCode();
				}
				else if (json.waitTime < 0) {
					var msg = '�ܱ�Ǹ, δ֪��״̬��Ϣ : waitTime=' + json.waitTime + ', �����ѳɹ�������֤δ֧������.';
					setTipMessage(msg);
					utility.notifyOnTop(msg);
					location.href = '/otsweb/order/myOrderAction.do?method=queryMyOrderNotComplete&leftmenu=Y';
				} else {
					var msg = "������Ҫ " + utility.getSecondInfo(json.waitTime) + " ������ɣ� ��ȴ���������֪���ģ�������˵��һֱ����ô׼�����Ŷ�����=" + (json.waitCount || "δ֪") + "��";
					if (json.waitTime > 1800) {
						msg += "<span style='color:red; font-weight: bold;'>���棺�Ŷ�ʱ�����30���ӣ��벻Ҫ�����绰��Ʊ����С�������Ŷӵ�������ʽ������Ʊ��</span>";
					}
					setTipMessage(msg);

					if (json.waitTime > 1800 && !waitTimeTooLong_alert) {
						waitTimeTooLong_alert = true;
						utility.notifyOnTop("���棡�Ŷ�ʱ�����30���ӣ��ɹ��ʽϵͣ��뾡��绰��Ʊ����С�������Ŷӣ�");
					}

					utility.delayInvoke("#countEle", waitingForQueueComplete, 3000);
				}
			},
			error: function (json) {
				utility.notifyOnTop("�������쳣�������ǵ�¼״̬���ԣ�����֤�����û�����⣬���ֶ�����δ��ɶ���ҳ���ѯ��");
				self.location.reload();
			}
		});
	}

	if (isAutoSubmitEnabled) {
		$("div.tj_btn").append("<button class='long_button_u_down' type='button' id='btnAutoSubmit'>�Զ��ύ</button> <button class='long_button_u_down' type='button' id='btnCancelAuto' style='display:none;'>ȡ���Զ�</button>");
		$("#btnAutoSubmit").click(function () {
			count = 0;
			breakFlag = 0;
			submitFlag = true;
			submitForm();
		});
		$("#btnCancelAuto").click(function () {
			$(this).hide();
			breakFlag = 1;
			submitFlag = false;
		});
		randEl.keyup(function (e) {
			if (document.getElementById("autoStartCommit").checked && !breakFlag) {
				if (e.charCode == 13 || randEl.val().length == 4) {
					submitFlag = true;
					submitForm();
				}
			}
		});
	}

	//����ϴα����Ԥ����Ϣ
	var lastform = null;
	if (parent) {
		lastform = parent.$("#orderForm");
		lastform.attr("success", "1");
	}

	//������ʾ��
	$("table.table_qr tr:last").before("<tr><td style='border-top:1px dotted #ccc;height:100px;' colspan='9' id='orderCountCell'></td></tr><tr><td style='border-top:1px dotted #ccc;' colspan='9'><ul id='tipScript'>" +
	"<li class='fish_clock' id='countEle' style='font-weight:bold;'>�ȴ�����</li>" +
	"<li style='color:green;'><strong>������Ϣ</strong>��<span>��Ϣ��</span></li>" +
	"<li style='color:green;'><strong>������ʱ��</strong>��<span>--</span></li></ul></td></tr>");

	var tip = $("#tipScript li");
	var errorCount = 0;

	//�����Ǻ���
	function setCurOperationInfo(running, msg) {
		var ele = $("#countEle");
		ele.removeClass().addClass(running ? "fish_running" : "fish_clock").html(msg || (running ? "���ڲ����С���" : "�ȴ��С���"));
	}

	function setTipMessage(msg) {
		tip.eq(2).find("span").html(utility.getTimeInfo());
		tip.eq(1).find("span").html(msg);
	}

	//�ύƵ�ʲ��
	$(".table_qr tr:last").before("<tr><td colspan='9'><div style='display:;'>�Զ��ύʧ��ʱ��Ϣʱ�䣺<input type='text' size='4' class='input_20txt' style='text-align:center;' value='3' id='pauseTime' />�� (���õ���1)  </div><div><label><input type='checkbox' id='autoStartCommit' /> ��֤������Զ��ύ����ѡ�������Լ������ύ��������ť�����������쳣���ύ���˶����ȣ�����ȡ����ѡ��ѡ���</label></div><label><input type='checkbox' id='autoDelayInvoke' /> ���ð�ȫģʽ�������뱾ҳ10�����ڵ��Զ��ύ���Զ��ύ���Զ��Ƴٵ�10��֮�������Ը��һ����һ�ε������֤�����Ļ�����ȡ����ѡ�����������ύ�����ܻ����һ��</label></div><div><label><input type='checkbox' id='showHelp' /> ��ʾ����</label></div></td></tr>");
	document.getElementById("autoStartCommit").checked = typeof (window.localStorage["disableAutoStartCommit"]) == 'undefined';
	document.getElementById("showHelp").checked = typeof (window.localStorage["showHelp"]) != 'undefined';
	document.getElementById("autoDelayInvoke").checked = typeof (window.localStorage["autoDelayInvoke"]) == 'undefined';
	$("#autoStartCommit").change(function () {
		if (this.checked) window.localStorage.removeItem("disableAutoStartCommit");
		else window.localStorage.setItem("disableAutoStartCommit", "1");
	});
	$("#autoDelayInvoke").change(function () {
		if (this.checked) window.localStorage.removeItem("autoDelayInvoke");
		else window.localStorage.setItem("autoDelayInvoke", "1");
	});
	$("#showHelp").change(function () {
		if (this.checked) {
			window.localStorage.setItem("showHelp", "1");
			$("table.table_qr tr:last").show();
		}
		else {
			window.localStorage.removeItem("showHelp");
			$("table.table_qr tr:last").hide();
		}
	}).change();
	if (!isAutoSubmitEnabled) {
		$("#pauseTime, #autoStartCommit").parent().hide();
	}

	//#region �Զ�ˢ��ϯλԤ��������

	var stopCheckCount = null;

	if (!utility.isfeatureDisabled("ontimequeuecount")) {
		(function () {
			var data = { train_date: $("#start_date").val(), station: $("#station_train_code").val(), seat: "", from: $("#from_station_telecode").val(), to: $("#to_station_telecode").val(), ticket: $("#left_ticket").val() };
			var url = "confirmPassengerAction.do?method=getQueueCount";
			var allSeats = $("#passenger_1_seat option");
			var queue = [];
			var checkCountStopped = false;

			function beginCheck() {
				if (checkCountStopped) return;

				var html = [];
				html.push("��ǰʵʱ�Ŷ�״̬��ÿ��2����ѯ����");


				allSeats.each(function () {
					queue.push({ id: this.value, name: this.text });
					html.push("ϯλ��<span style='color:blue; font-weight: bold;'>" + this.text + "</span>��״̬��<span id='queueStatus_" + this.value + "'>�ȴ���ѯ��....</span>");
				});
				$("#orderCountCell").html(html.join("<br />"));
				if (queue.length > 0) executeQueue();
			}
			function checkTicketAvailable() {
				var queryLeftData = {
					'orderRequest.train_date': $('#start_date').val(),
					'orderRequest.from_station_telecode': $('#from_station_telecode').val(),
					'orderRequest.to_station_telecode': $('#to_station_telecode').val(),
					'orderRequest.train_no': $('#train_no').val(),
					'trainPassType': 'QB',
					'trainClass': 'QB#D#Z#T#K#QT#',
					'includeStudent': 00,
					'seatTypeAndNum': '',
					'orderRequest.start_time_str': '00:00--24:00'
				};
				utility.get("/otsweb/order/querySingleAction.do?method=queryLeftTicket", queryLeftData, "text", function (text) {
					window.ticketAvailable = '';
					if (/(([\da-zA-Z]\*{5,5}\d{4,4})+)/gi.test(text)) {
						window.ticketAvailable = RegExp.$1;
					}
				}, function () { }, "ontimequeuecount");
			}
			function executeQueue() {
				if (checkCountStopped) return;

				var type = queue.shift();
				queue.push(type);

				data.seat = type.id;
				var strLeftTicket = '';
				checkTicketAvailable();
				if (window.ticketAvailable) {
					strLeftTicket = window.ticketAvailable;
				}
				utility.get(url, data, "json", function (data) {
					var msg = "��Ʊ��<strong>" + getTicketCountDesc(strLeftTicket, type.id) + "</strong>";
					msg += "����ǰ�Ŷӡ�<span style='color:blue; font-weight: bold;'>" + data.count + "</span>����";
					if (data.op_2) {
						msg += "<span style='color:blue; font-weight: red;'>�Ŷ������Ѿ�������Ʊ���������޷��ύ</span>��";
					} else {
						if (data.countT > 0) {
							msg += "�Ŷ������ѳ���ϵͳ������<span style='color:red; font-weight: bold;'>�Ŷ���Σ��</span>";
							//} else if (data.op_1) {
							//	msg += "�Ŷ������ѳ���ϵͳ������<span style='color:red; font-weight: bold;'>�Ŷ���Σ��</span>";
						} else {
							msg += "�뾡���ύ";
						}

					}
					msg += "&nbsp;&nbsp;&nbsp;&nbsp;(" + utility.getTimeInfo() + ")";

					$("#queueStatus_" + type.id).html(msg);
					setTimeout(executeQueue, 2000);
				}, function () {
					setTimeout(executeQueue, 3000);
				}, "ontimequeuecount");
			}

			stopCheckCount = function () {
				checkCountStopped = true;
			}

			beginCheck();
		})();
	} else {
		$("#orderCountCell").html("(�򲻼��ݣ�ʵʱ�Ŷ�״̬��ѯ�����ѱ�ϵͳ�Զ�����)");
	}

	//#endregion


	//#region �Զ�ѡ����ϵ�ˡ��Զ�ѡ���ϴ�ѡ�����
	function autoSelectPassenger() {
		var pp = localStorage.getItem("preSelectPassenger") || "";
		var pseat = (localStorage.getItem("autoSelect_preSelectSeatType") || "").split('|')[0];
		if (pp) {
			pp = pp.split("|");

			$.each(pp, function () {
				if (!this) return true;
				console.log("[INFO][�Զ�ѡ��˿�] �Զ�ѡ��-" + this);
				$("#" + this + "._checkbox_class").attr("checked", true).click().attr("checked", true);	//Ϊɶ�������Σ���Ҳ��֪��������һ�β��ԡ�
				return true;
			});
			if (pseat) {
				$(".passenger_class").each(function () { $(this).find("select:eq(0)").val(pseat).change(); });
			}
		}
	};

	$(window).ajaxComplete(function (e, xhr, s) {
		if (s.url.indexOf("getpassengerJson") != -1) {
			console.log("[INFO][�Զ�ѡ��˿�] ϵͳ��ϵ�˼�����ɣ����ڼ��Ԥ��ѡ��");
			autoSelectPassenger();
		}
	});
	//����Ѿ�������ɣ���ôֱ��ѡ��
	if ($("#showPassengerFilter div").length) {
		console.log("[INFO][�Զ�ѡ��˿�] OOPS����Ȼ��������ˣ�ֱ��ѡ����ϵ��");
		autoSelectPassenger();
	}
	//#endregion

	//#region �Զ���λ���������

	(function () {
		var obj = document.getElementById("rand");

		var oldOnload = window.onload;
		window.onload = function () {
			if (oldOnload) oldOnload();
			obj.select();
		};
		obj.select();
	})();

	//#endregion

	//#region ��ʾ�ڲ���ѡ��������

	(function () {
		//�����������ʾ
		$("tr.passenger_class").each(function () {
			var tr = $(this);
			var id = tr.attr("id");

			tr.find("td:eq(2)").append("<select id='" + id + "_seat_detail' name='" + id + "_seat_detail'><option value='0'>���</option><option value='2'>����</option><option value='2'>����</option><option value='1'>����</option></select>");
		});

		var seatSelector = $("select[name$=_seat]");
		seatSelector.change(function () {
			var self = $(this);
			var val = self.val();
			var l = self.next();

			if (val == "2" || val == "3" || val == "4" || val == "6") {
				l.show();
			} else
				l.hide();
			var preseat = utility.getPref("preselectseatlevel");
			if (preseat) {
				l.val(preseat).change();
			}
		}).change();

	})();

	//#endregion

	//#region ����ʱ�Ͱ�ȫ�ύ

	var safeMode = (function () {
		$("#tipScript").append("<li style='color:green;' id='safeModeTip'><span></span>���Ѽ���Ԥ��ҳ <span></span> �롭��</li>");
		var safeModeTip = $("#safeModeTip");
		var saveModeInfo = safeModeTip.find("span:eq(0)");
		var saveModeTimeInfo = safeModeTip.find("span:eq(1)");
		var funSw = document.getElementById("autoDelayInvoke");
		window.isSafeMobeBlocked = funSw.checked;

		function checkSubmitForm() {
			if (window.isSafeMobeBlocked) {
				window.isSafeMobeBlocked = false;
				if (submitFlag) submitForm();
			}
		}

		setInterval(function () {
			var diff = (new Date() - entryTime) / 100;
			saveModeTimeInfo.html(Math.round(diff) / 10);

			if (funSw.checked) {
				if (diff >= 100) {
					saveModeInfo.html("�Ѵﰲȫ�ڣ�����������ύ�����񡭡�����˵�������ǻ���ǹ����");
					checkSubmitForm();
				} else {
					saveModeInfo.html("ע��Թ���У��ȴ�10���ӣ������Ե����ύ����");
					window.isSafeMobeBlocked = true;
				}
			}
		}, 200);

		$("#autoDelayInvoke").change(function () {
			if (this.checked) { checkSafeModeTime(); }
			else {
				saveModeInfo.html("��ȫģʽ�ѹر�");
				checkSubmitForm();
			}
		}).change();

		function checkSafeModeTime() {
			var diff = (new Date() - entryTime) / 1000;

			if (diff >= 10) {
				saveModeInfo.html("�������ѹ�������԰�ȫ���ύ������");
				checkSubmitForm();
			} else {
				saveModeInfo.html("ע��Թ���У��ȴ�10���ӣ������Ե����ύ����");
				window.isSafeMobeBlocked = true;
			}
		}
		this.restart = function () {
			entryTime = new Date();
			$("#autoDelayInvoke").change();
		}

		return this;
	})();

	//#endregion

	parent.$("#main").css("height", ($(document).height() + 300) + "px");
	parent.window.setHeight(parent.window);
}

function autoCommitOrderInSandbox() {
	//�Զ���ʾ��
	if (window.localStorage["bookTip"]) {
		window.localStorage.removeItem("bookTip");
		if (window.Audio) {
			new window.Audio(utility.getAudioUrl()).play();
		}
		utility.notify("�Ѿ��Զ����붩Ʊҳ�棡�������ɶ�����");
	}
}

//#endregion

//#region -----------------�Զ�ˢ��----------------------

function initTicketQuery() {
	//��ʼ��
	//if (!window.localStorage["pas"]) {
	//	alert("�ף�������ҵ�12306->������ϵ�˲��Ե�Ƭ���Ը��»���~");
	//	//self.location = "/otsweb/passengerAction.do?method=initUsualPassenger12306";
	//	return;
	//}

	utility.checkCompatible();

	//������־
	utility.enableLog();

	var initialized = false;
	var seatLevelOrder = null;
	var orderButtonClass = ".btn130_2";	//Ԥ����ť��ѡ����

	//#region �������úͳ��湤�߽���

	var queryCount = 0;
	var timer = null;
	var isTicketAvailable = false;
	var audio = null; //֪ͨ����
	var timerCountDown = 0;
	var timeCount = 0;
	var autoBook = false;
	//��ʼ����
	var form = $("form[name=querySingleForm] .cx_from:first");
	form.find("tr:last").after("<tr class='append_row'><td colspan='9' id='queryFunctionRow'><label title='��ѡ��ѡ��Ļ���ÿ�����ѯ�����ֻ�����ʼ��վ������վ�����ڵȽ��м�¼���´ν����ѯҳ��󣬽�������Զ���д��'><input type='checkbox' id='keepinfo' checked='checked' />��ס��Ϣ</label> <label title='��ѡ��ѡ��󣬼ٶ���ѯ�Ľ����û�з�����Ҫ��ĳ��Σ���ô���ֽ����Զ��������²�ѯ'><input checked='checked' type='checkbox' id='autoRequery' style='padding:0;' />�Զ����²�ѯ</label>��ÿ�� <input style='width:40px;text-align:center;' type='number' min='5' value='5' size='4' id='refereshInterval' style='text-align:center;' />��(���5) " +
		"<label title='��ѡ�Ļ�������Ʊ�ɶ�ʱ�����ֻ�Ÿ�ɧ����'><input type='checkbox' checked='checked' id='chkAudioOn'>������ʾ</label> <input type='button' id='chkSeatOnly' value='����Ʊ' class='lineButton' title='��������ϯ����˰�ť�������ɿ��ٹ�ѡ���е���Ʊ������Ӳ������һ�����ȵ�' /><input type='button' id='chkSleepOnly' value='������' title='��������ϯ����˰�ť�������ɿ��ٹ�ѡ���е����̣�����Ӳ������ʲô��' class='lineButton' /><input type='button' id='chkAllSeat' value='ȫ��ϯ��' class='lineButton' title='���ٹ�ѡ���е�ϯ��' />" +
		"<input type='button' id='enableNotify' onclick='window.webkitNotifications.requestPermission();' value='�����������֪ͨ' style='line-height:25px;padding:5px;' /> <span id='refreshinfo' style='text-shadow:1px 1px 1px #fff,0px 0px 2px rgba(0,0,0,0.2);'>��ˢ�� 0 �Σ�����ѯ��--</span> <span id='refreshtimer'></span></td></tr>" +
		"<tr class='append_row'><td colspan='9'><label title='������Ʊʱ�ŵĸ��ǲ��Ƿŵ���ĵ�����������'><input type='checkbox' checked='checked' id='chkAudioLoop'>����ѭ��</label>" +
		"<span style='font-weight:bold;margin-left:10px;color:#0f7edb;' title='���Ԥ����ťʱ����ʱ��ȴ�һ���ϵͳ����ʾ������æ����ѡ��ѡ����������������������ֽ�������Զ�����Ԥ��'><label><input type='checkbox' id='chkAutoResumitOrder' checked='checked' />Ԥ��ʧ��ʱ�Զ�����</label></span>" +
		"<span style='font-weight:bold;margin-left:10px;color:#0f7edb;' title='��ʱ��ϵͳæ����ѯ����ʾ��ѯʧ�ܣ���ѡ��ѡ����������������������ֽ�������Զ�ˢ�²�ѯ'><label><input type='checkbox' id='chkAutoRequery' checked='checked' />��ѯʧ��ʱ�Զ�����</label></span>" +
		"<span style='font-weight:bold;margin-left:10px;color:#ff2020;' title='�Է�����ʱ��Ϊ׼��δ��÷�����ʱ��֮ǰ����ѡ����á��������ܼ���ģʽʱ���ڷ����㸽��ʱ������0С��59�֣����������ٶ�ˢ�£��������㸽��ʱ�����ڵ���59��ʱ������ͣˢ�²��ȵ����㼴��ˢ�¡�'><label><input disabled='disabled' type='checkbox' id='chkSmartSpeed' />��������ˢ��ģʽ</label></span>" +
		"</td></tr>" +
		"<tr class='append_row'><td id='filterFunctionRow' colspan='9'>" +
		"<span style='font-weight:bold;color:#ff2020;'><label title='������Ԥ���ĳ��ι��˵���ѡ�������������ʾ����Ʊ�ĳ��Σ�'><input type='checkbox' id='chkFilterNonBookable' />���˲���Ԥ���ĳ���</label></span>" +
		"<span style='font-weight:bold;margin-left:10px;color:#ff2020;'><label title='��ʱ����Ȼ���˳�����Ԥ����������Ʊ��ϯ�����㲻Ҫ�ģ������ѡ��ѡ�Ҳ������˵�'><input type='checkbox' id='chkFilterNonNeeded' />���˲���Ҫ��ϯ��</label></span>" +
		"<span style='font-weight:bold;margin-left:10px;color:blue;display: none;'><label><input disabled='disabled' type='checkbox' id='chkFilterByTrain' />���������ι���</label></span>" +
		"</td></tr>" +
		"<tr class='append_row'><td colspan='9' id='opFunctionRow' style='padding-left:31px;'><input type='button' class='fish_button' disabled='disabled' value='ֹͣ����' id='btnStopSound' /><input type='button' class='fish_button' disabled='disabled'  value='ֹͣˢ��' id='btnStopRefresh' /><input  type='button' class='fish_button' type='button' value='����' id='configLink' /> <input type='button' class='fish_button' id='resetSettings' value='�����������' /> <input type='button' class='fish_button configLink' value='IE��¼' /> �� <a href='http://www.fishlee.net/soft/44/tour.html' style='color:#0abaff;font-weight:bold;' target='_blank'>���ϡ������������׵����������￴�̳���</a>��<span style='margin-left:20px;color:purple;font-weight:bold;' id='serverMsg'></span></td></tr>"
	);

	if (!window.Audio) {
		$("#chkAudioOn, #chkAudioLoop, #btnStopSound").remove();
	} else {
		$("#btnStopSound").click(function () {
			if (audio) {
				audio.pause();
			}
			this.disabled = true;
		});
	}
	$("#resetSettings").click(function () {
		if (confirm("ȷ��Ҫ������ֵ�����������")) {
			window.localStorage.clear();
			self.location.reload();
			return false;
		}
	});

	//��������
	$("#btnStopRefresh").click(function () { resetTimer(); });
	$("#chkSmartSpeed").change(function () {
	});

	//#endregion

	//#region ��ʾ����ѡ��UI
	var ticketType = new Array();
	var seatOptionTypeMap = {
		"3": "9",
		"4": "P",
		"5": "M",
		"6": "O",
		"7": "6",
		"8": "4",
		"9": "3",
		"10": "2",
		"11": "1",
		"12": "empty",
		"13": "QT"
	};
	$(".hdr tr:eq(2) td").each(function (i, e) {
		ticketType.push(false);
		if (i < 3) return;

		var obj = $(this);
		ticketType[i] = (window.localStorage["typefilter_" + i] || "true") == "true";

		//�޸����֣����⻻��
		obj.attr("otext", obj.text());
		var cap = $.trim(obj.text());
		if (cap.length > 2) {
			cap = cap.replace("��", "").replace("�߼�����", "����");
			obj.html(cap);
		}

		//���븴ѡ��
		var c = $("<input id='seatoption_" + seatOptionTypeMap[i] + "' type='checkbox' typecode='" + seatOptionTypeMap[i] + "' name='seatoption'/>").attr("checked", ticketType[i]);
		c[0].ticketTypeId = i;
		c.change(
			function () {
				ticketType[this.ticketTypeId] = this.checked;
				window.localStorage["typefilter_" + this.ticketTypeId] = this.checked;
			}).appendTo(obj);
	});

	//����ѡ��
	$("#chkSeatOnly").click(function () {
		$(".hdr tr:eq(2) td").each(function (i, e) {
			var obj = $(this);
			var txt = obj.attr("otext");
			obj.find("input").attr("checked", typeof (txt) != 'undefined' && txt && txt.indexOf("��") != -1).change();
		});
	});
	$("#chkSleepOnly").click(function () {
		$(".hdr tr:eq(2) td").each(function (i, e) {
			var obj = $(this);
			var txt = obj.attr("otext");
			obj.find("input").attr("checked", typeof (txt) != 'undefined' && txt && txt.indexOf("��") != -1).change();
		});
	});
	$("#chkAllSeat").click(function () {
		$(":checkbox[name=seatoption]").attr("checked", true).change();
	});
	//#endregion

	//#region ��ʾ����Ĺ�����
	var extrahtml = [];
	extrahtml.push("<div class='outerbox' id='helperbox' style='width:auto;'><div class='box'><div class='title' style='position:relative;'><big>12306��Ʊ���� - ��������</big> [<a href='#querySingleForm'>���ض�Ʊ�б�</a>] <div class='time-comp' title='ʱ�������ڱ���ʱ�䱣������ˢ��ʱ�伴ʱ���㡣�������������٣�����ʮ��׼ȷ����Ҫ�۳����ٵ�Ӱ�죩' id='servertime'>������ʱ�䣺<strong>----</strong>������ʱ�䣺<strong>----</strong>���������ȱ��� <strong>----</strong></div></div>\
<div style='color:#8A0023;line-height: 20px;background: -webkit-linear-gradient(#FFE4EA, #FFC3D1);background: -moz-linear-gradient(#FFE4EA, #FFC3D1);padding: 5px;'>�ף������ύ������Ҫ�ӳٺܶ�ܶ���ร�����ǿ�ҽ�����������Ҹ�Ϻ�׳���ȥ�������᲻�������֤����������Ҫʱ�Լ�����ม��������Ǹ�ҳ���м�ʱ�<br /><strong>�������ѣ�����ض�������һ��ˢƱ������Ϊ����ÿ�����������Ʊ�Ľ�����ǲ�һ���İ���������</strong></div>\
<table id='helpertooltable' style='width:100%;'><colgroup><col style='width:110px;' /><col style='width:370px;' /><col style='width:110px;' /><col style='width:auto;' /></colgroup>\
<tr class='fish_sep musicFunc' id='helperbox_bottom'><td class='name'>�Զ������ֵ�ַ</td><td colspan='3'><input type='text' id='txtMusicUrl' value='" + utility.getAudioUrl() + "' onfocus='this.select();' style='width:420px;' /> <input class='fish_button' type='button' onclick='new Audio(document.getElementById(\"txtMusicUrl\").value).play();' value='����'/><input class='fish_button' type='button' onclick='utility.resetAudioUrl(); document.getElementById(\"txtMusicUrl\").value=utility.getAudioUrl();' value='�ָ�Ĭ��'/> (��ַ��һ��ʹ�ÿ��ܻ���Ҫ�ȴ�һ���)</td></tr>\
<tr class='fish_sep musicFunc'><td class='name'>�������ֵ�ַ</td><td colspan='3'>");

	var host1 = "http://static.liebao.cn/resources/audio/";
	//var host2 = "https://github.com/iccfish/12306_ticket_helper/raw/master/res/";
	var musics = [["music1.ogg", "��������"], ["music2.ogg", "������"]];
	$.each(musics, function () {
		extrahtml.push("<a href='javascript:;' url='" + host1 + this[0] + "' class='murl'>" + this[1] + "</a>&nbsp;&nbsp;&nbsp;&nbsp;");
		//extrahtml.push("<a href='javascript:;' url='" + host2 + this[0] + "' class='murl'>" + this[1] + "</a>(HTTPS)&nbsp;&nbsp;&nbsp;&nbsp;");
	});

	extrahtml.push("</td></tr><tr class='fish_sep'><td colspan='4'><input class='fish_button' type='button' value='����Զ��峵Ʊʱ���' id='btnDefineTimeRange' />\
<input class='fish_button' type='button' value='����Զ��峵Ʊʱ���' id='btnClearDefineTimeRange' /></td></tr>\
<tr class='fish_sep'><td class='tfooter' colspan='4'><a href='http://www.fishlee.net/soft/44/' target='_blank'>12306��Ʊ���� @iFish</a> | <a href='http://weibo.com/Acathur' target='_blank'>������� @Acathur</a> | <a href='http://www.fishlee.net/soft/44/announcement.html' style='color:#0f7edb;' target='_blank'>��������</a> | <a href='" + utility.getUpdateUrl() + "' target='_blank'>�����°�</a> | <a style='font-weight:bold;color:red;' href='http://www.fishlee.net/soft/44/donate.html' target='_blank'>��������</a> | �汾 v" + window.helperVersion + "������� <strong>" + utility.regInfo.name + "������ - " + utility.regInfo.typeDesc + "</strong> ��<a href='javascript:;' class='reSignHelper'>����ע��</a>��</td></tr>\
		</table></div></div>");

	$("body").append(extrahtml.join(""));
	$("a.murl").live("click", function () {
		$("#txtMusicUrl").val(this.getAttribute("url")).change();
	});
	$("#stopBut").before("<div class='jmp_cd' style='text-align:center;'><button class='fish_button' id='btnFilter'>���������</button><button class='fish_button' id='btnAutoBook'>�Զ�Ԥ��������</button></div>");
	$("#txtMusicUrl").change(function () { window.localStorage["audioUrl"] = this.value; });
	$("form[name=querySingleForm]").attr("id", "querySingleForm");

	//#endregion

	//#region ����Զ���ʱ���
	function addCustomTimeRange() {
		var s = parseInt(prompt("�������Զ���ʱ��ε���ʼʱ�䣨������Сʱ��0-23��", "0"));
		if (isNaN(s) || s < 0 || s > 23) {
			alert("��ʼʱ�䲻��ȷ >_<"); return;
		}
		var e = parseInt(prompt("�������Զ���ʱ��εĽ���ʱ�䣨������Сʱ��1-24��", "24"));
		if (isNaN(e) || e < 0 || e > 24) {
			alert("����ʱ�䲻��ȷ >_<"); return;
		}
		var range = (s > 9 ? "" : "0") + s + ":00--" + (e > 9 ? "" : "0") + e + ":00";
		if (confirm("����Ҫ��ס���ʱ�����")) {
			window.localStorage["customTimeRange"] = (window.localStorage["customTimeRange"] ? window.localStorage["customTimeRange"] + "|" : "") + range;
		};
		addCustomeTimeRangeToList(range);
	}
	function addCustomeTimeRangeToList(g) {
		var obj = document.getElementById("startTime");
		obj.options[obj.options.length] = new Option(g, g);
		obj.selectedIndex = obj.options.length - 1;
	}
	if (window.localStorage["customTimeRange"]) {
		var ctrs = window.localStorage["customTimeRange"].split("|");
		$.each(ctrs, function () { addCustomeTimeRangeToList(this); });
	}
	$("#btnClearDefineTimeRange").click(function () {
		if (!confirm("ȷ��Ҫ����Զ����ʱ������������ˢ��ҳ�档")) return;
		window.localStorage.removeItem("customTimeRange");
	});
	$("#btnDefineTimeRange").click(addCustomTimeRange);
	//#endregion

	//#region ���˳���
	var stopHover = window.onStopHover;
	window.onStopHover = function (info) {
		$("#stopDiv").attr("info", $.trim($("#id_" + info.split('#')[0]).text()));
		stopHover.call(this, info);
		$("#onStopHover").css("overflow", "hide");
	};

	$("#btnFilter").click(function () {
		//���������
		var trainNo = $("#stopDiv").attr("info").split('#')[0];
		if (!trainNo || !confirm("ȷ��Ҫ�����Ρ�" + trainNo + "��������������Ժ�Ĳ�ѯ��������ʾ�˳��Ρ�")) return;

		list_blacklist.add(trainNo);
	});
	$("#btnAutoBook").click(function () {
		//�����Զ�Ԥ���б�
		var trainNo = $("#stopDiv").attr("info").split('#')[0];
		if (isTrainInBlackList(trainNo)) {
			alert("ָ���ĳ����ں��������ء���");
			return;
		}

		if (!trainNo || !confirm("ȷ��Ҫ�����Ρ�" + trainNo + "�������Զ�Ԥ���б�����´β�ѯ�з���Ҫ���ϯ�𽫻��Զ�����Ԥ��ҳ�档")) return;

		list_autoorder.add(trainNo);
	});
	//�������ָ��ҳ�����ʾ�ı��λ
	if (window.localStorage["bookTip"]) window.localStorage.removeItem("bookTip");
	//#endregion

	//#region �Զ����²�ѯ

	var clickButton = null;//����Ĳ�ѯ��ť
	var filterNonBookable = $("#chkFilterNonBookable")[0];	//���˲��ɶ�����
	var filterNonNeeded = $("#chkFilterNonNeeded")[0];	//���˲���Ҫ����
	var onRequery = function () { };	//�����²�ѯʱ����
	var onNoTicket = function () { };	//��û�в鵽Ʊʱ����

	$("#autoRequery").change(function () {
		if (!this.checked)
			resetTimer();
	});
	//ˢ��ʱ����
	$("#refereshInterval").change(function () { timeCount = Math.max(5, parseInt($("#refereshInterval").val())); }).change();

	//��ʱ��ѯ
	var isSmartOn = false;
	function resetTimer() {
		queryCount = 0;
		$("#btnStopRefresh")[0].disabled = true;
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		$("#refreshtimer").html("");
	}

	function countDownTimer() {
		timerCountDown -= 0.2;
		var str = (Math.round(timerCountDown * 10) / 10) + "";
		$("#refreshtimer").html("[" + (isSmartOn ? "�ȴ�����," : "") + str + (str.indexOf('.') == -1 ? ".0" : "") + "����ѯ...]");

		if (timerCountDown > 0) return;

		clearInterval(timer);
		timer = null;
		onRequery();
		doQuery();
	}

	function startTimer() {
		if (timer) return;

		var d = new Date().getMinutes();
		isSmartOn = document.getElementById("chkSmartSpeed").checked && time_server && time_server.getMinutes() >= 59;

		timerCountDown = isSmartOn ? 60 - time_server.getSeconds() + 2 : timeCount + 2 * Math.random();
		var str = (Math.round(timerCountDown * 10) / 10) + "";
		$("#refreshtimer").html("[" + (isSmartOn ? "�ȴ�����," : "") + str + (str.indexOf('.') == -1 ? ".0" : "") + "����ѯ...]");
		//û�ж�ʱ����ʱ�򣬿�����ʱ��׼��ˢ��
		$("#btnStopRefresh")[0].disabled = false;
		timer = setInterval(countDownTimer, 200);
	}

	function displayQueryInfo() {
		queryCount++;
		$("#refreshinfo").html("��ˢ�� " + queryCount + " �Σ�����ѯ��" + utility.getTimeInfo());
		$("#refreshtimer").html("���ڲ�ѯ");
	}

	function doQuery() {
		timer = null;
		if (audio) audio.pause();
		displayQueryInfo();
		sendQueryFunc.call(clickBuyStudentTicket == "Y" ? document.getElementById("stu_submitQuery") : document.getElementById("submitQuery"));
	}

	//��֤��Ʊ�п�ʼ
	var onticketAvailable = function () {
		resetTimer();
		$("#refreshinfo").html("�Ѿ���Ʊ��");

		utility.notifyOnTop("���Զ�Ʊ�ˣ�");
		if (window.Audio && $("#chkAudioOn")[0].checked) {
			if (!audio) {
				audio = new Audio($("#txtMusicUrl").val());
			}
			audio.loop = $("#chkAudioLoop")[0].checked;
			$("#btnStopSound")[0].disabled = false;
			audio.play();
		}
	}
	//����Ƿ���Զ�Ʊ
	var checkTicketsQueue = [];
	var checkTicketCellsQueue = [];

	function getTrainNo(row) {
		/// <summary>����еĳ��κ�</summary>
		return $.trim($("td:eq(0)", row).text());
	}
	//Ĭ�ϵĵ�Ԫ���⺯��
	checkTicketCellsQueue.push(function (i, e) {
		if (!ticketType[i - 1]) return 0;

		var el = $(e);
		var info = $.trim(el.text()); //Firefox��֧�� innerText

		if (info == "*" || info == "--" || info == "��") {
			return 0;
		}
		return 2;
	});
	//Ĭ�ϵ��м�⺯��
	checkTicketsQueue.push(function () {
		var trainNo = getTrainNo(this);
		var tr = this;
		this.attr("tcode", trainNo);
		//����������
		if (isTrainInBlackList(trainNo)) {
			this.hide();
			return 0;
		}


		var hasTicket = 1;
		if ($("a.btn130", this).length > 0) return 0;

		$("td", this).each(function (i, e) {
			//�����ǳ��ν����
			if (i < 4 || i > 14) return;

			var cellResult = 0;
			e = $(e);
			var opt = { code: trainNo, tr: tr, index: e.index(), seatType: seatOptionTypeMap[e.index() - 1] };
			e.attr("scode", opt.seatType);
			$.each(checkTicketCellsQueue, function () {
				cellResult = this(i, e, cellResult, opt) || cellResult;
				return cellResult != 0;
			});
			e.attr("result", cellResult);
			if (cellResult == 2) {
				hasTicket = 2;
				e.addClass("validCell");
			} else {
				e.addClass("unValidCell");
			}
		});
		tr.attr("result", hasTicket);

		return hasTicket;
	});

	//����Ƿ�����Ʊ�ĺ���
	var checkTickets = function () {
		var result = 0;
		var row = this;
		$.each(checkTicketsQueue, function () {
			result = this.call(row, result);

			return true;
		});

		return result;
	}

	//Ŀ���񣬵�ajax���ʱ����Ƿ���Ʊ
	$("body").ajaxComplete(function (e, r, s) {
		//HACK-��ֹ�ظ�����
		if (timer != null) return;

		if (s.url.indexOf("queryLeftTicket") == -1)
			return;

		//��֤��Ʊ
		var rows = $("table.obj tr:gt(0)");
		var ticketValid = false;
		var validRows = {};
		rows.each(function () {
			var row = $(this);
			var valid = checkTickets.call(row);
			var code = getTrainNo(row);

			row.attr("tcode", code);
			row.find("td:eq(0)").click(putTrainCodeToList);

			console.log("[INFO][��Ʊ������У��] " + code + " У����=" + valid);

			if (valid == 2) {
				row.addClass("validRow");
				validRows[code] = row;
			}
			else {
				row.addClass("unValidRow");
				if (valid == 1 && filterNonNeeded.checked) row.hide();
				if (valid == 0 && filterNonBookable.checked) row.hide();
			}
			ticketValid = ticketValid || valid == 2;
		});

		//�Զ�Ԥ��
		if ($("#swAutoBook:checked").length > 0) {
			if (!seatLevelOrder || !seatLevelOrder.length) {
				//û��ϯ�����ȼ�����ѡ��һ��
				for (var idx in list_autoorder.datalist) {
					var code = list_autoorder.datalist[idx];
					var reg = utility.getRegCache(code);
					var row = $.first(validRows, function (i, v) {
						if (reg.test(i)) return v;
					});

					if (row) {
						if (document.getElementById("autoBookTip").checked) {
							window.localStorage["bookTip"] = 1;
						}
						row.find("a[name=btn130_2]").click();

						return false;
					}
				};
			} else {
				console.log("��ϯ������ѡ��-���ι���");
				var trains = $.makeArray($("#gridbox tr[result=2]"));

				var trainfiltered = [];
				for (var idx in list_autoorder.datalist) {
					//�Գ��ν��й��˲������ȼ�����
					var rule = list_autoorder.datalist[idx];
					var ruleTester = utility.getRegCache(rule);
					for (var i = trains.length - 1; i >= 0; i--) {
						var self = $(trains[i]);
						var code = self.attr("tcode");

						if (ruleTester.test(code)) {
							trainfiltered.push(self);
							trains.splice(i, 1);
						}
					}
				}
				if (document.getElementById("autoorder_method").selectedIndex == 0) {
					$.each(seatLevelOrder, function () {
						var scode = this;
						for (var i in trainfiltered) {
							var t = trainfiltered[i];
							if (t.find("td[scode=" + this + "][result=2]").length) {
								var tcode = scode == "empty" ? "1" : scode;

								window.localStorage.setItem("autoSelect_preSelectSeatType", tcode);
								$("#preSelectSeat").val(tcode)

								if (document.getElementById("autoBookTip").checked) {
									window.localStorage["bookTip"] = 1;
								}
								t.find(orderButtonClass).click();

								return false;
							}
						}
						return true;
					});
				} else {
					//��������
					$.each(trainfiltered, function () {
						var t = this;
						for (var i in seatLevelOrder) {
							var scode = seatLevelOrder[i];
							if (t.find("td[scode=" + scode + "][result=2]").length) {
								var tcode = scode == "empty" ? "1" : scode;

								window.localStorage.setItem("autoSelect_preSelectSeatType", tcode);
								$("#preSelectSeat").val(tcode)

								if (document.getElementById("autoBookTip").checked) {
									window.localStorage["bookTip"] = 1;
								}
								t.find(orderButtonClass).click();

								return false;
							}
						}
						return true;
					});
				}
			}
		}

		if (ticketValid) {
			onticketAvailable();
		} else if (document.getElementById("autoRequery").checked) {
			onNoTicket();
			startTimer();
		}
	});

	//ϵͳ��æʱ�Զ��ظ���ѯ chkAutoResumitOrder
	$("#orderForm").submit(function () {
		if ($("#chkAutoResumitOrder")[0].checked) {
			parent.$("#orderForm").remove();
			parent.$("body").append($("#orderForm").clone(false).attr("target", "main").attr("success", "0"));
		}
	});
	$("body").ajaxComplete(function (e, r, s) {
		if (!$("#chkAutoRequery")[0].checked) return;
		if (s.url.indexOf("/otsweb/order/querySingleAction.do") != -1 && r.responseText == "-1") {
			//invalidQueryButton();
			//delayButton();
			//startTimer();
		} else {
			$("#serverMsg").html("");
		}
	});
	$("body").ajaxError(function (e, r, s) {
		if (s.url.indexOf("queryLeftTicket") == -1) return;
		if (!$("#chkAutoRequery")[0].checked) return;
		if (s.url.indexOf("/otsweb/order/querySingleAction.do") != -1) {
			delayButton();
			startTimer();
		}
	});

	//Hack��ԭ����ϵͳ������Ѿ��Ȼ�����е�click�¼�ȫ�������ˣ�����
	window.invalidQueryButton = function () {
		var queryButton = $("#submitQuery");
		queryButton.unbind("click", sendQueryFunc);
		if (queryButton.attr("class") == "research_u") {
			renameButton("research_x");
		} else if (queryButton.attr("class") == "search_u") {
			renameButton("search_x");
		}
	}
	//#endregion

	//#region ���ü��ء����桢Ȩ�޼��
	//֪ͨȨ��
	if (!window.webkitNotifications || window.webkitNotifications.checkPermission() == 0) {
		$("#enableNotify").remove();
	}

	//������Ϣ
	function saveStateInfo() {
		if (!$("#keepinfo")[0].checked || $("#fromStationText")[0].disabled) return;
		utility.setPref("_from_station_text", $("#fromStationText").val());
		utility.setPref("_from_station_telecode", $("#fromStation").val());
		utility.setPref("_to_station_text", $("#toStationText").val());
		utility.setPref("_to_station_telecode", $("#toStation").val());
		utility.setPref("_depart_date", $("#startdatepicker").val());
		utility.setPref("_depart_time", $("#startTime").val());
	}

	$("#submitQuery, #stu_submitQuery").click(saveStateInfo);
	//������Ϣ
	if (!$("#fromStationText")[0].disabled) {
		var FROM_STATION_TEXT = utility.getPref('_from_station_text');  // ����վ����
		var FROM_STATION_TELECODE = utility.getPref('_from_station_telecode');  // ����վ�籨��
		var TO_STATION_TEXT = utility.getPref('_to_station_text');  // ����վ����
		var TO_STATION_TELECODE = utility.getPref('_to_station_telecode');  // ����վ�籨��
		var DEPART_DATE = utility.getPref('_depart_date');  // ��������
		var DEPART_TIME = utility.getPref('_depart_time'); // ����ʱ��

		if (FROM_STATION_TEXT) {
			$("#fromStationText").val(FROM_STATION_TEXT);
			$("#fromStation").val(FROM_STATION_TELECODE);
			$("#toStationText").val(TO_STATION_TEXT);
			$("#toStation").val(TO_STATION_TELECODE);
			$("#startdatepicker").val(DEPART_DATE);
			$("#startTime").val(DEPART_TIME);
		}
	}

	//����
	if (!window.Audio) {
		$(".musicFunc").hide();
	}
	//#endregion

	//#region ʱ�����޸�
	(function () {
		var datebox = $("table.cx_from tr:eq(0) td:eq(5), table.cx_from tr:eq(1) td:eq(3)");
		datebox.width("170px");
		datebox.find("input").width("70px").before('<input type="button" class="date_prev lineButton" value="&lt;">').after('<input style="margin-right:0;" type="button" class="date_next lineButton" value="&gt;">');

		datebox.find(".date_prev").click(function () { var dobj = $(this).next(); dobj.val(utility.formatDate(utility.addTimeSpan(utility.parseDate(dobj.val()), 0, 0, -1, 0, 0, 0))).change(); });
		datebox.find(".date_next").click(function () { var dobj = $(this).prev(); dobj.val(utility.formatDate(utility.addTimeSpan(utility.parseDate(dobj.val()), 0, 0, 1, 0, 0, 0))).change(); });
	})();
	//#endregion

	//#region �Զ���ѯ���Զ�����ʱ��
	(function () {	//��ʼ��UI
		var html = "<tr class='fish_sep' id='autoChangeDateRow'><td class='name'>��ѯ����</td><td>\
<label><input type='checkbox' id='autoCorrentDate' checked='checked' /> ��ѯ�������ڻ���ڽ���ʱ���Զ��޸�Ϊ����</label>\
</td><td class='name'>�Զ��ֲ�</td><td><label><input type='checkbox' id='autoChangeDate' /> ��Ʊʱ�Զ����������ֲ�</label>\
</td></tr><tr class='fish_sep' style='display:none;'><td class='name'>�ֲ���������</td><td colspan='3' id='autoChangeDateList'></td></tr>\
	";
		$("#helperbox_bottom").before(html);
		var autoChangeDateList = $("#autoChangeDateList");
		var html = [];
		var now = new Date();
		for (var i = 0; i < 20; i++) {
			now = utility.addTimeSpan(now, 0, 0, 1, 0, 0, 0);
			html.push("<label style='margin-right:16px;'><input type='checkbox' value='" + utility.formatDate(now) + "' cindex='" + i + "' />" + utility.formatDateShort(now) + "</label>");
			if ((i + 1) % 10 == 0)
				html.push("<br />");
		}
		autoChangeDateList.html(html.join(""));
		$("#autoChangeDate").change(function () {
			var tr = $(this).closest("tr").next();
			if (this.checked) tr.show();
			else tr.hide();
		});
		//����
		utility.reloadPrefs($("#autoChangeDateRow"), "autoChangeDateRow");
		//���ڵ�ѡ
		var stKey = "autoChangeDateRow_dates";
		var stValue = window.localStorage.getItem(stKey);
		if (typeof (stValue) != 'undefined' && stValue) {
			var array = stValue.split('|');
			autoChangeDateList.find(":checkbox").each(function () {
				this.checked = $.inArray(this.value, array) != -1;
			});
		}
		autoChangeDateList.find(":checkbox").change(function () {
			var value = $.map(autoChangeDateList.find(":checkbox:checked"), function (e, i) { return e.value; }).join("|")
			window.localStorage.setItem(stKey, value);
		});
	})();
	(function () {
		//�����ǰ��ѯ�����ڵ�ǰ���ڻ�֮ǰ����ô�Զ��޸�����
		$("#startdatepicker, #roundTrainDate").change(function () {
			if (!document.getElementById("autoCorrentDate").checked) return;
			var obj = $(this);
			var val = utility.parseDate(obj.val());
			var tomorrow = utility.addTimeSpan(utility.getDate(new Date()), 0, 0, 1, 0, 0, 0);

			if (!val || isNaN(val.getFullYear()) || tomorrow > val) {
				console.log("�Զ��޸�����Ϊ " + utility.formatDate(tomorrow));
				obj.val(utility.formatDate(tomorrow));
			}
		}).change();
	})();
	onNoTicket = (function (callback) {
		return function () {
			//Hook onNoTicket
			callback();

			if (!document.getElementById("autoChangeDate").checked) return;
			console.log("�Զ���ѯ�����С�");

			var index = parseInt($("#autoChangeDate").attr("cindex"));
			if (isNaN(index)) index = -1;
			var current = index == -1 ? [] : $("#autoChangeDateList :checkbox:eq(" + index + ")").parent().nextAll(":has(:checked):eq(0)").find("input");
			if (current.length == 0) {
				index = 0;
				current = $("#autoChangeDateList :checkbox:checked:first");
				if (current.length == 0) return;	//û��ѡ���κ�
			}
			index = current.attr("cindex");
			if (current.length > 0) {
				$("#autoChangeDate").attr("cindex", index);
				$("#startdatepicker").val(current.val());
				//����
				$("#cx_titleleft span").css({ color: 'red', 'font-weight': 'bold' });
			}
		};
	}
		)(onNoTicket);
	//#endregion

	//#region ���ص�������ʾ�򣬱��������æ
	(function () {
		var _bakAlert = window.alert;
		window.alert = function (msg) {
			if (msg.indexOf("������æ") != -1) {
				$("#serverMsg").text(msg);
			} else _bakAlert(msg);
		}
	})();
	//#endregion

	//#region ��ʾ���еĳ˿�
	var list_autoorder = null;
	var list_blacklist = null;
	var list_whitelist = null;

	function isTrainInBlackList(trainNo) {
		/// <summary>����ָ���ĳ����Ƿ��ں�������</summary>
		return document.getElementById("swBlackList").checked && (list_blacklist.isInRegList(trainNo)) && !(document.getElementById("swWhiteList").checked && list_whitelist.isInRegList(trainNo));
	}

	function putTrainCodeToList() {
		var code = $(this).closest("tr").attr("tcode");

		if (confirm("�Ƿ�Ҫ����" + code + "�������Զ�Ԥ���б�������ǣ�����ȡ��������ѡ���Ƿ������������������")) {
			list_autoorder.add(code);
		} else if (confirm("�Ƿ�Ҫ����" + code + "�������������������ǣ�����ȡ��������ѡ���Ƿ�����������")) {
			list_blacklist.add(code);
		} else if (confirm("�Ƿ�Ҫ����" + code + "�������������")) {
			list_whitelist.add(code);
		};
	}

	(function () {
		var html = "\
<tr class='fish_sep caption'><td><label><input type='checkbox' id='swWhiteList' checked='checked' /> ���ΰ�����</label></td><td style='font-weight:normal;' colspan='2'>����������ĳ��Σ������ᱻ����(��Ϊ���������)</td><td style='text-align:rigth;'><button class='fish_button' id='btnAddWhite'>���</button><button class='fish_button' id='btnClearWhite'>���</button></td></tr>\
<tr class='fish_sep'><td colspan='4' id='whiteListTd'></td></tr>\
<tr class='fish_sep caption'><td><label><input type='checkbox' id='swBlackList' checked='checked' name='swBlackList' />���κ�����</label></td><td style='font-weight:normal;' colspan='2'>����������ĳ��Σ������ڰ������У�����ᱻֱ�ӹ��˶�������ʾ</td><td style='text-align:rigth;'><button class='fish_button' id='btnAddBlack'>���</button><button class='fish_button' id='btnClearBlack'>���</button></td></tr>\
<tr class='fish_sep'><td colspan='4' id='blackListTd'></td></tr>\
<tr class='caption autoorder_steps fish_sep' id='selectPasRow'><td colspan='3'><span class='hide indicator'>�� </span>�Զ���ӳ˿� ��������б�ĳ˿ͽ����Զ����ύ������ҳ��������ϣ�<strong>���ѡ��λ</strong>��</td><td><input type='button' class='fish_button' onclick=\"self.location='/otsweb/passengerAction.do?method=initAddPassenger&';\" value='�����ϵ��' /> <input type='button' class='fish_button' id='btnRefreshPas' value='ˢ���б�' /></td></tr>\
<tr class='fish_sep'><td class='name'>δѡ��</td><td id='passengerList' colspan='3'><span style='color:gray; font-style:italic;'>��ϵ���б����ڼ����У����Ե�...�����ʱ���޷����سɹ����볢��ˢ��ҳ��  x_x</span></td></tr>\
<tr class='fish_sep'><td class='name'>��ѡ��</td><td id='passengerList1' colspan='3'></td></tr>\
<tr class='fish_sep autoordertip' style='display:none;'><td class='name'>�����ύ����</td><td><label><input type='checkbox' id='autoorder_part' /> ��Ʊ������ʱ������Ϊ���ֵ���ϵ�����ύ����</label></td><td class='name'>�ύΪѧ��Ʊ</td><td><label><input type='checkbox' id='autoorder_stu' /> ��ʹ����ͨ��ѯ��ҲΪѧ����ϵ���ύѧ��Ʊ</label></td></tr>\
<tr class='fish_sep autoorder_steps caption' id='seatLevelRow'><td><span class='hide indicator'>�� </span>ϯ������ѡ��</td><td><input type='hidden' id='preSelectSeat' /><select id='preSelectSeatList'></select> ��ѡ����ӣ������ťɾ����<a href='http://www.fishlee.net/soft/44/tour.html' style='color:#4c4c4c' target='_blank'>�������</a>��</td><td style='text-align:right;'>������ѡ</td><td><select id='preselectseatlevel'></select>(��һ�����õ��������ǺǺǺǺǺǡ���)</td></tr>\
<tr class='fish_sep'><td colspan='4' id='preseatlist'><div id='preseatlist_empty' style='padding:5px;border:1px dashed gray;background-color:#fafafa;width:200px;'>(��δָ��������������������ѡ��)</div></td></tr>\
<tr class='fish_sep autoorder_steps caption'><td><label><input type='checkbox' id='swAutoBook' name='swAutoBook' checked='checked' /><span class='hide indicator'>��</span> �Զ�Ԥ��</label></td><td colspan='2' style='font-weight:normal;'><select id='autoorder_method'><option value='0'>ϯ������</option><option value='1'>��������</option></select>������ã����Ϲ���ĳ��ε��ض�ϯ����Чʱ���������Ԥ��ҳ��</td><td style='text-align:rigth;'><button id='btnAddAutoBook' class='fish_button'>���</button><button id='btnClearAutoBook' class='fish_button'>���</button></td></tr>\
<tr class='fish_sep'><td colspan='4' id='autobookListTd'></td></tr>\
<tr class='fish_sep'><td colspan='4'><label><input type='checkbox' id='autoBookTip' checked='checked' /> ����Զ�Ԥ���ɹ�������Ԥ��ҳ��󲥷���ʾ���ֲ�������ʾ</label></td></tr>\
<tr class='fish_sep autoordertip' style='display:none;'><td class='name'>�Զ��ع�</td><td><label><input type='checkbox' id='autoorder_autocancel' /> �Զ��ύʧ��ʱ���Զ�ȡ���Զ��ύ���ٴ�Ԥ��</label></td></tr>\
<tr class='caption autoorder_steps fish_sep highlightrow'><td class='name autoordertd'><label style='display:none;color:red;'><input type='checkbox' id='autoorder'/>�Զ��ύ����</label></td><td class='autoordertd' colspan='3'><p style='display:none;'><img id='randCode' src='/otsweb/passCodeAction.do?rand=randp' /> <input size='4' maxlength='4' type='text' id='randCodeTxt' /> (��֤����ڷ�Ʊǰ��д���ٽ���Ʊʱ������ͼƬˢ�²�������д���Բ߰�ȫ������ؿ��ƺø��µ����񡭡�)</p></td></tr>\
<tr style='display:none;' class='autoordertip fish_sep'><td class='name' style='color:red;'>����</td><td colspan='3' style='color:darkblue;'>\
<p style='font-weight:bold; color:purple;'>�Զ��ύ����ʹ�����̣���ѡҪ��Ʊ����ϵ�� -&gt; ������Ҫ��ϯ�� -&gt; ������Ҫ��Ʊ�ĳ��ΰ����ȼ�������Զ�Ԥ���б� -&gt; ��ѡ�Զ��ύ���� -&gt; ������֤�� -&gt; ��ʼ��Ʊ����Ϣ��д���������ᵼ�����ֺ����Զ��ύ�����������ע�⡣�����Զ���Ʊģʽ��ϯ��ѡ����Զ�Ԥ���������������޷��ֶ��л��������ѯ����ѧ��Ʊ����ô�ύ�Ľ�����ѧ��Ʊ������<u style='color:red;'>һ�ж�������ɺ�������ѯ��ʼ��Ʊ��һ����Ʊ�����Զ��ύ��</u></p>\
<p>1. �Զ��ύ����ʹ�õ����Զ�Ԥ�����б�˳��ȡ��һ����Ч�ĳ����Զ��ύ��������ȷ��������ȷ����</p>\
<p>2. �Զ��ύ��ϯ�����ϵ�������Ϸ�ѡ�񣬺�Ԥ�����һ�µģ��ݲ�֧�ֲ�ͬ����ϵ��ѡ��ͬ��ϯ��</p>\
<p>3. �����޷���֤�Զ��ύ�Ƿ����Ϊ���ϴ���޸�ʧЧ����������ͬʱʹ��<b>���������</b>�ֶ��ύ������������ܻ����������Ҫ����ʧ��</p>\
<p style='font-weight:bold;'>5. �����ֵ�һ����Ϊ�������Զ��ύʧ�ܺ󣨷�����������֤���������Ʊ���㡢ռ��ʧ�ܵȣ����������̽����Զ��ύ���ع�����ͨ�ύ�����ٴ��ύ��Ʊ���������ʱ��ע���ύ�������ʱ��д���ݣ���ǿ�ҽ���������򿪵����������ͬʱ�ֶ��¶�������</p>\
<p style='font-weight:bold;color:darkcylan;'>6. Ϊ�ɿ����������ÿ��һ��ʱ��ˢ������֤��������д�������֤��ͼƬˢ�£������ڲ�ͬ�������ˢ�µĽ����һ����ǿ�ҽ�������������̨����һ��ˢ�£�</p>\
<p style='font-size:16px; font-weight:bold;color:blue;'>һ��Ҫ��ϸ��˵�������мǶ�������׼����Ҫ������һ�����ϵ�������ǧ��Ҫ��Ϊ�Զ��ύ���������㶩����Ʊ�������������Ļ��ھεİ���������</p>\
</td></tr>";
		$("#helpertooltable tr:first").addClass("fish_sep").before(html);

		//ˢ����ϵ���б�
		$("#btnRefreshPas").click(function () {
			window.localStorage.removeItem("pas");

			//self.location = "/otsweb/passengerAction.do?method=initUsualPassenger12306";
			alert("������ҵ�12306->������ϵ�˲��Ե�Ƭ���Ը��»��� -.-");
		}).hide();

		//��ѡ�߼�
		$("#autoorder_method").val(window.localStorage["autoorder_method"] || "0").change(function () { window.localStorage.setItem("autoorder_method", $(this).val()); });
		$("#autoorder_autocancel").attr("checked", (window.localStorage["autoorder_autocancel"] || "1") == "1").change(function () { window.localStorage.setItem("autoorder_autocancel", this.checked ? "1" : "0"); });

		//�Զ�Ԥ���б�
		list_autoorder = utility.selectionArea.call($("#autobookListTd"), { syncToStorageKey: "list_autoBookList", onAdd: onAutoOrderRowStyle, onRemove: onAutoOrderRowStyle, onClear: onAutoOrderRowStyle });
		list_blacklist = utility.selectionArea.call($("#blackListTd"), { syncToStorageKey: "list_blackList" });
		list_whitelist = utility.selectionArea.call($("#whiteListTd"), { syncToStorageKey: "list_whiteList" });

		var autoBookHeader = $("#swAutoBook").closest("tr");
		function onAutoOrderRowStyle() {
			if (!document.getElementById("autoorder").checked) return;

			autoBookHeader.removeClass("steps stepsok");
			autoBookHeader.addClass(list_autoorder.datalist.length ? "stepsok" : "steps");
		}

		function appendTrainCodeToList(target) {
			var code = prompt("��������Ҫ�����б�ĳ��Ρ����ο���ʹ��������ʽ���ף���֪���Ļ���ֱ����д���α��ร������� ��.*��(������������) ���Դ������г��Σ���K.*�����Դ�������K��ͷ�ĳ��Σ���D.*�����Դ�������D��ͷ���εȵ�");
			if (!code) return;

			//�������ַ���
			code = code.replace(/(��|,|\/|\\|��|-)/g, "|");
			try {
				new RegExp(code);
			} catch (e) {
				alert("�š���������ͬѧ������Ĳ�����ȷ��������ʽŶ��");
				return;
			}

			target.add(code);
		}

		function emptyList(target) {
			target.emptyList();
		}


		//���������¼�
		$("#btnAddAutoBook").click(function () { appendTrainCodeToList(list_autoorder); });
		$("#btnAddWhite").click(function () { appendTrainCodeToList(list_whitelist); });
		$("#btnAddBlack").click(function () { appendTrainCodeToList(list_blacklist); });
		$("#btnClearAutoBook").click(function () { emptyList(list_autoorder); });
		$("#btnClearWhite").click(function () { emptyList(list_whitelist); });
		$("#btnClearBlack").click(function () { emptyList(list_blacklist); });

		$("#swBlackList, #swAutoBook").each(function () {
			var obj = $(this);
			var name = obj.attr("name");

			var opt = localStorage.getItem(name);
			if (opt != null) this.checked = opt == "1";
		}).change(function () {
			var obj = $(this);
			var name = obj.attr("name");

			localStorage.setItem(name, this.checked ? "1" : "0");
		});

		var seatlist = [
			["", "=��ѡ��="],
			["9", "������"],
			["P", "�ص���"],
			["6", "�߼�����"],
			["4", "����"],
			["3", "Ӳ��"],
			["2", "����"],
			["1", "Ӳ��"],
			["empty", "Ӳ��(����)"],
			["M", "һ����"],
			["O", "������"]
		];
		var level = [[0, '���'], [3, "����"], [2, '����'], [1, '����']];
		var seatDom = document.getElementById("preSelectSeatList");
		var seatLevelDom = document.getElementById("preselectseatlevel");
		$.each(seatlist, function () {
			seatDom.options[seatDom.options.length] = new Option(this[1], this[0]);
		});
		$.each(level, function () {
			seatLevelDom.options[seatLevelDom.options.length] = new Option(this[1], this[0]);
		});
		//ˢ����ѡ�б�
		var seatLevelRow = $("#seatLevelRow");
		function refreshSeatTypeOrder() {
			var list = $("#preseatlist input");
			if (initialized) $(":checkbox[name=seatoption]").attr("checked", false).change();
			seatLevelOrder = [];
			list.each(function () {
				var code = $(this).attr("code");
				seatLevelOrder.push(code);
				if (initialized) $("#seatoption_" + code).attr("checked", true).change();
			});
			if (!list.length) {
				$("#preseatlist_empty").show();
				$(":checkbox[name=seatoption]").attr("checked", true).change();
				window.localStorage.setItem("autoSelect_preSelectSeatType", "");
			} else {
				$("#preseatlist_empty").hide();
				window.localStorage.setItem("autoSelect_preSelectSeatType", seatLevelOrder[0]);
			}
			if (initialized) utility.notifyOnTop("�Ѿ�������ѡ���ϯ���Զ��л���ϯ�����ѡ���ע�⣬��������Ҫ�ĵ�����");
			window.localStorage.setItem("preSelectSeatType", seatLevelOrder.join('|'));

			if (document.getElementById("autoorder").checked) {
				seatLevelRow.removeClass("stepsok steps");
				seatLevelRow.addClass(seatLevelOrder.length ? "stepsok" : "steps");
			}
		}
		//ѡ�к���ӵ��б���
		$("#preSelectSeatList").change(function () {
			var index = seatDom.selectedIndex;
			if (index == 0) return;

			//���
			var opt = seatDom.options[index];
			var html = "<input type='button' title='���ɾ��' class='seatTypeButton lineButton' value='" + opt.text + "' code='" + opt.value + "' />";
			$("#preseatlist").append(html);
			$("#preseatlist_empty").hide();
			//��ǰѡ���Ƴ�
			seatDom.options[index] = null;
			seatDom.selectedIndex = 0;
			refreshSeatTypeOrder();
		});
		//ϯ��İ�ť������Զ�ɾ��
		$("input.seatTypeButton").live("click", function () {
			var btn = $(this);
			btn.remove();

			//�ӻ��б�
			var code = btn.attr("code");
			var name = btn.val();
			seatDom.options[seatDom.options.length] = new Option(name, code);

			//ˢ���б�
			refreshSeatTypeOrder();
		});
		(function () {
			var preseattype = window.localStorage.getItem("preSelectSeatType") || window.localStorage.getItem("autoSelect_preSelectSeatType");
			if (!preseattype) return;

			preseattype = preseattype.split('|');
			var el = $(seatDom);
			$.each(preseattype, function () { el.val(this + ""); el.change(); });
		})();
		$(seatLevelDom).val(window.localStorage.getItem("preselectseatlevel") || "").change(function () {
			window.localStorage.setItem("preselectseatlevel", $(this).val());
		});
		var pre_autoorder_book_status;
		$("#autoorder").click(function () {
			if (this.checked) {
				pre_autoorder_book_status = document.getElementById("swAutoBook").checked;
				document.getElementById("swAutoBook").checked = true;
				//alert("���棡ѡ�н��������Զ��µ����ܣ���ȡ���Զ�Ԥ�����ܣ���������֤�룬��ָ���ĳ����е�ָ��ϯ�����ʱ�����ֽ���Ϊ��ȫ�Զ��µ���\n\n��ȷ������������ȷ�ĳ��κ�ϯ��\n\n���ǣ������޷���֤�Ƿ����Ϊ���������޸ĵ���ʧЧ����ʹ�ô˹��ܵ�ͬʱ���ʹ�ô�ͳ���ֶ��µ��Ա�֤���ᵼ��������ʧ��");
			}
			document.getElementById("swAutoBook").disabled = this.checked;
			if (this.checked) {
				$(".autoordertip").show();
				$(":checkbox[name=seatoption]").attr("disabled", true);
				refreshSeatTypeOrder();
				onAutoOrderRowStyle();
			}
			else {
				$(".autoordertip").hide();
				document.getElementById("swAutoBook").checked = pre_autoorder_book_status;
				$(":checkbox[name=seatoption]").attr("disabled", false);
				$("tr.autoorder_steps").removeClass("steps").removeClass("stepsok");
			}
		});
		//�����Զ�Ԥ��


		//���س˿�
		utility.getAllPassengers(function (list) {
			var h = [];
			var check = (localStorage.getItem("preSelectPassenger") || "").split('|');
			var index = 0;
			$.each(list, function () {
				var value = this.passenger_name + this.passenger_id_type_code + this.passenger_id_no;
				this.index = index++;
				h.push("<label style='margin-right:10px;'><input type='checkbox' id='preSelectPassenger" + this.index + "' name='preSelectPassenger'" + ($.inArray(value, check) > -1 ? " checked='checked'" : "") + " value='" + value + "' />" + this.passenger_name + "</label>");
			});

			$("#passengerList").html(h.join("")).find("input").change(function () {
				var self = $(this).closest("label");
				if (this.checked) {
					var selected = $("#passengerList1 :checkbox");
					if (selected.length >= 5) {
						alert("ѡ��ĳ˿Ͳ��ܶ�����λ�~~");
						this.checked = false;
						return;
					}

					$("#passengerList1").append(self);
				} else {
					$("#passengerList").append(self);
				}
				selected = $("#passengerList1 :checkbox");
				var user = $.map(selected, function (e) { return e.value; });
				$("#ticketLimition").val(selected.length);
				localStorage.setItem("preSelectPassenger", user.join("|"));
				refreshPasRowStyle(user);
			});
			$.each(check, function () {
				$("#passengerList :checkbox[value=" + this + ']').change();
			});
			$.each(list, function () {
				$("#preSelectPassenger" + this.index).data('pasinfo', this);
			});
			$("#ticketLimition").val($("#passengerList1 :checkbox").length);

			function refreshPasRowStyle(selected) {
				if (!document.getElementById("autoorder").checked) return;

				var row = $("#selectPasRow");
				row.removeClass("steps stepsok");
				row.addClass(selected.length ? "stepsok" : "steps");
			}
			$("#autoorder").click(function () { refreshPasRowStyle($("#passengerList1 :checkbox")); });
		});
	})();


	//#endregion

	//#region Ԥ��������ؿ��ٲ�ѯ����

	(function () {
		var html = [];
		html.push("<tr class='caption fish_sep'><td colspan='4'>���ٲ�ѯ����</strong></td></tr>");
		html.push("<tr class='fish_sep'><td colspan='4'>");

		var urls = [
			["��ʼ��վ��Ʊʱ���ѯ", "http://www.12306.cn/mormhweb/zxdt/tlxw_tdbtz56.html"]
		];
		$.each(urls, function () {
			html.push("<div style='float:left;'><a href='" + this[1] + "' target='_blank'>" + this[0] + "</a></div>");
		});

		html.push("</td></tr>");

		$("#helpertooltable tr:last").before(html.join(""));
	})();

	//#endregion

	//#region ��Ʊ������

	(function () {
		var html = [];
		html.push("<tr class='fish_sep caption'><td colspan='4'><strong>Ʊ������</strong></td></tr>");
		html.push("<tr class='fish_sep'><td><strong>��СƱ��</strong><td colspan='3'><select id='ticketLimition'></select>");
		html.push("�������˵�������ƱƱ��С����������ֵĻ����������ӵ��� =��=</td></tr>");

		$("#helpertooltable tr:first").addClass("fish_sep").before(html.join(""));
		var dom = $("#ticketLimition").val($("#passengerList1 :checkbox").length)[0];
		for (var i = 0; i < 6; i++) {
			dom.options[i] = new Option(i ? i : "(������)", i);
		}

		//ע���⺯��
		checkTicketCellsQueue.push(function (i, e, prevValue) {
			var limit = parseInt(dom.value);
			if (!prevValue || !(limit > 0) || $("#autoorder_part:visible:checked").length) return null;

			var text = $.trim(e.text());
			if (text == "��") return 2;

			return parseInt(text) >= limit ? 2 : 1;
		});
	})();

	//#endregion

	//#region �����ѯ������������

	(function () {
		var ccTypeCheck = $("input:checkbox[name=trainClassArr]");
		var preccType = (utility.getPref("cctype") || "").split("|");

		if (preccType[0]) {
			ccTypeCheck.each(function () {
				this.checked = $.inArray(this.value, preccType) != -1;
			});
		}
		ccTypeCheck.click(function () {
			utility.setPref("cctype", $.map(ccTypeCheck.filter(":checked"), function (v, i) {
				return v.value;
			}).join("|"));
		});
	})();

	//#endregion

	//#region ���ӻ���Ŀ��Ĺ���

	(function () {
		var fromCode = $("#fromStation");
		var from = $("#fromStationText");
		var toCode = $("#toStation");
		var to = $("#toStationText");

		from.css("width", "50px").after("<input style='margin-right:0;' type='button' value='<->' class='lineButton' title='���������غ�Ŀ�ĵ�' id='btnExchangeStation' />");
		$("#btnExchangeStation").click(function () {
			var f1 = fromCode.val();
			var f2 = from.val();
			fromCode.val(toCode.val());
			from.val(to.val());
			toCode.val(f1);
			to.val(f2);
		});
	})();

	//#endregion

	//#region Ҫ�󷢵�վ���յ�վ��ȫƥ��

	(function () {
		var fromText = $("#fromStationText");
		var toText = $("#toStationText");

		$("#filterFunctionRow").append("<label style='font-weight:bold;color:#ff2020;margin-left:10px;'><input type='checkbox' id='closeFuseSearch'>���˷�վ����ȫƥ��ĳ���</label><label style='font-weight:bold;color:#ff2020;margin-left:10px;'><input type='checkbox' id='closeFuseSearch1'>���˵�վ����ȫƥ��ĳ���</label>");
		$("#closeFuseSearch, #closeFuseSearch1").parent().attr("title", 'Ĭ������£�������ҡ����ݡ�ʱ��������������ϡ������վ����ѡ��ѡ����������������ݡ���ʱ�򣬹�����Щ����ȫһ�µĳ�վ���确�����ϡ���');

		function getStationName() {
			var txt = $.trim(this.text()).split(/\s/);
			return txt[0];
		}

		checkTicketsQueue.push(function (result) {
			if (document.getElementById("closeFuseSearch").checked) {
				var fs = getStationName.call(this.find("td:eq(1)"));
				if (fs != fromText.val()) {
					this.hide();
					return 0;
				}
			}
			if (document.getElementById("closeFuseSearch1").checked) {
				var fs = getStationName.call(this.find("td:eq(2)"));
				if (fs != toText.val()) {
					this.hide();
					return 0;
				}
			}

			return result;
		});
	})();

	//#endregion

	//#region ��������

	var time_offset = null;
	var time_server = null;

	(function () {
		$("#helpertooltable tr:last").before("<tr class='fish_sep'><td class='name'>��������</td><td colspan='3'>����ÿ��ʮ���ӻ����ˢ�´��ڸз�ֹ�һ������ߵ����������������ˢ��ʱ�䣺<strong id='lastonlinetime'>��</strong></td></tr>");
		var label = $("#lastonlinetime");

		function online() {
			var serverTime = null;
			utility.post("/otsweb/main.jsp", null, "text", function (data, status, xhr) {
				serverTime = new Date(xhr.getResponseHeader("Date"));
				time_offset = new Date() - serverTime;

				label.html(utility.formatTime(serverTime));
			});
		}

		online();
		setInterval(online, 600 * 1000);
	})();

	//��ʾ����ʱ��ͷ�����ʱ��
	(function () {
		var dom = $("#servertime strong");

		function display() {
			if (time_offset === null) return;

			var now = new Date();
			time_server = new Date();
			time_server.setTime(now.getTime() - time_offset);
			document.getElementById("chkSmartSpeed").disabled = time_server.getFullYear() < 2000;

			dom.eq(0).html(utility.formatTime(time_server));
			dom.eq(1).html(utility.formatTime(now));
			dom.eq(2).html((time_offset < 0 ? "��" : "��") + (Math.abs(time_offset) / 1000) + "��");
		}

		setInterval(display, 1000);
		display();
	})();

	//#endregion


	//#region ��Ʊģʽ����

	(function () {
		$("#helpertooltable tr:first").before("<tr class='fish_sep caption'><td class='name' colspan='4'>����ģʽ</td></tr>\
<tr class='fish_sep'><td colspan='2'><select id='profilelist'><option value=''>==ѡ��һ������ģʽ==</option></select><button id='profile_save' class='fish_button'>����</button><button id='profile_add' class='fish_button'>���</button><button id='profile_delete' class='fish_button'>ɾ��</button><button id='profile_reset' class='fish_button'>��������ѡ��</button></td><td colspan='2' style='white-space:nowrap;'>����ģʽ���԰�����ٵı���һϵ�����ã�����ϵ�ˡ����Ρ�ϯ�𡢺������Ͱ�����</td>\
</tr>\
");
		var list = (window.localStorage["profilelist"] || "").split("\t");
		var listDom = $("#profilelist");
		var listEle = listDom[0];

		if (list[0] == "") list.splice(0, 1);

		$.each(list, function () {
			listEle.options[listEle.options.length] = new Option(this + '', this + '');
		});

		listDom.change(function () {
			var value = listDom.val();
			if (!value) return;

			applyProfile(loadProfile(value));
		});
		$("#profile_save").click(function () {
			if (!listDom.val()) $("#profile_add").click();
			else {
				saveProfile(listDom.val(), generateProfile());
				alert("�浵�Ѿ�����~");
			}
		});
		$("#profile_add").click(function () {
			var data = generateProfile();
			var name = prompt("���������ģʽ�����ƣ��硺��ȥ��졻����ġ���", "�໻ؼ�~");

			if (!name) return;
			name = name.replace(/\s+/g, "");
			if (window.localStorage.getItem("profile_" + name)) {
				alert("���ϣ�������ֵ��Ѿ�����ร�������~");
			} else {
				saveProfile(name, data);
				list.push(name);
				listEle.options[listEle.options.length] = new Option(name, name);
				window.localStorage.setItem("profilelist", list.join("\t"));
				alert("�ѱ���ࡡ�");
			}
		});
		$("#profile_delete").click(function () {
			var idx = listEle.selectedIndex;
			if (!idx || !confirm("�ף�ȷ��Ҫ�´˺����㣿")) return;

			listEle.options[idx] = null;
			window.localStorage.removeItem("profile_" + list[idx - 1]);
			list.splice(idx - 1, 1);
			window.localStorage.setItem("profilelist", list.join("\t"));
			alert("��������~");
		});
		$("#profile_reset").click(function () {
			listDom.val("");
			applyProfile({ "blackListEnabled": true, "whiteListEnabled": true, "autoBookListEnabled": true, "seatOrder": [], "prePassenger": [], "whiteList": [], "blackList": [], "autoBookList": [], "autoBookMethod": "1" });
		});

		function loadProfile(name) {
			return utility.parseJSON(window.localStorage.getItem("profile_" + name));
		}

		function saveProfile(name, profile) {
			if (!profile) window.localStorage.removeItem(name);
			else window.localStorage.setItem("profile_" + name, utility.toJSON(profile));
		}

		function generateProfile() {
			var pro = {};
			pro.blackListEnabled = document.getElementById("swBlackList").checked;
			pro.whiteListEnabled = document.getElementById("swWhiteList").checked;
			pro.autoBookListEnabled = document.getElementById("swAutoBook").checked;
			pro.seatOrder = seatLevelOrder;
			pro.prePassenger = $.map($("#passengerList1 :checkbox"), function (e) {
				var data = $(e).data("pasinfo");
				return { type: data.passenger_type, idtype: data.passenger_id_type_code, id: data.passenger_id_no };
			});;
			pro.whiteList = list_whitelist.datalist;
			pro.blackList = list_blacklist.datalist;
			pro.autoBookList = list_autoorder.datalist;
			pro.autoBookMethod = $("#autoorder_method").val();
			pro.queryInfo = $("#querySingleForm").serializeArray();

			return pro;
		}

		function applyProfile(pro) {
			$("#swBlackList").attr("checked", pro.blackListEnabled).change();
			$("#swWhiteList").attr("checked", pro.whiteListEnabled).change();
			$("#swAutoBook").attr("checked", pro.autoBookListEnabled).change();
			//���ϯ����ѡ
			$("#preseatlist input").click();
			var seatList = $("#preSelectSeatList");
			$.each(pro.seatOrder, function () {
				seatList.val(this + '').change();
			});
			//����������������ġ�
			list_whitelist.emptyList();
			$.each(pro.whiteList, function () { list_whitelist.add(this + ''); });
			list_blacklist.emptyList();
			$.each(pro.blackList, function () { list_blacklist.add(this + ''); });
			list_autoorder.emptyList();
			$.each(pro.autoBookList, function () { list_autoorder.add(this + ''); });

			//��ϵ��
			var plist = $("input:checkbox[name=preSelectPassenger]");
			plist.attr("checked", false);
			plist.change();
			$.each(pro.prePassenger, function () {
				var p = this;
				plist.each(function () {
					var data = $(this).data("pasinfo");
					if (data.passenger_type == p.type && data.passenger_id_type_code == p.idtype && data.passenger_id_no == p.id) {
						this.checked = true;
						$(this).change();
						return false;
					}
					return true;
				});
			});

			//��ѡ��ʽ
			$("#autoorder_method").val(pro.autoBookMethod).change();

			//��ѯ��ʽ
			if (pro.queryInfo) {
				$.each(pro.queryInfo, function () {
					if (this.name.indexOf("orderRequest.") == -1) return;
					$("input[name=" + this.name + "]").val(this.value).change();
				});
			}

			utility.notifyOnTop("�Ѽ��س���ģʽ");
		}

	})();


	//#endregion

	utility.reloadPrefs($("tr.append_row"), "ticket_query");
	//��ɳ�ʼ��
	initialized = true;
	parent.$("#main").css("height", ($(document).height() + 300) + "px");
	parent.window.setHeight(parent.window);
}

//#endregion

//#region �Զ��ύ����

function initDirectSubmitOrder() {
	return;
	//if (Math.random() > 0.10) return;

	console.log("[INFO] initialize direct submit order.");
	var html = "<div id='fishSubmitFormStatus' class='outerBox' style='position:fixed;left:0px;bottom:-100px;'><div class='box'><div class='title'>�Զ��ύ������</div>\
<div class='content' style='width:150px;'><ul id='tipScript'>\
<li class='fish_clock' id='countEle' style='font-weight:bold;'>�ȴ�����</li>\
<li style='color:green;'><strong>������Ϣ</strong>��<span>��Ϣ��</span></li>\
<li style='color:green;'><strong>������ʱ��</strong>��<span>--</span></li></div>\
		</div></div>";

	parent.window.$("#fishSubmitFormStatus").remove();
	parent.window.$("body").append(html);

	var tip = parent.window.$("#tipScript li");
	var counter = parent.window.$("#countEle");
	var status = parent.window.$("#fishSubmitFormStatus");
	var formData = null;
	var tourFlag;
	var data = null;
	$("#autoorder")[0].disabled = false;

	function setCurOperationInfo(running, msg) {
		counter.removeClass().addClass(running ? "fish_running" : "fish_clock").html(msg || (running ? "���ڲ����С���" : "�ȴ��С���"));
	}

	function setTipMessage(msg) {
		tip.eq(2).find("span").html(utility.getTimeInfo());
		tip.eq(1).find("span").html(msg);
	}

	//����״̬
	var statusShown = false;
	function showStatus() {
		if (statusShown) return;
		statusShown = true;
		status.animate({ bottom: "0px" });
	}
	function hideStatus() {
		if (!statusShown) return;
		statusShown = false;
		status.animate({ bottom: "-100px" });
	}

	//��֤���¼�
	var randRow = $("#randCodeTxt").closest("tr");
	function refreshRandRowStyle() {
		randRow.removeClass("steps stepsok");
		randRow.addClass(getVcCode().length == 4 ? "stepsok" : "steps");
	}
	$("#randCodeTxt").keyup(function () {
		refreshRandRowStyle();
		if (statusShown && document.getElementById("randCodeTxt").value.length == 4) checkOrderInfo();
	});
	$("#autoorder").change(refreshRandRowStyle);
	//ˢ����֤��
	function reloadCode() {
		$("#randCode").attr("src", "/otsweb/passCodeAction.do?rand=randp&" + Math.random());
		var vcdom = document.getElementById("randCodeTxt");
		vcdom.focus();
		vcdom.select();
	}
	$("#randCode").click(reloadCode);

	function getVcCode() {
		return document.getElementById("randCodeTxt").value;
	}

	function isCanAutoSubmitOrder() {
		if (!document.getElementById("autoorder").checked) return [];

		var result = [];
		if (!$("#passengerList1 :checkbox").length) result.push("ѡ��˿�");
		if (!$("#preseatlist input").length) result.push("������ѡϯ��");
		if (getVcCode().length != 4) result.push("��д��֤��");
		if (!$("#autobookListTd input").length) result.push("�����Զ�Ԥ������");
		return result;
	}

	function redirectToNotCompleteQuery() {
		window.location.replace("/otsweb/order/myOrderAction.do?method=queryMyOrderNotComplete&leftmenu=Y");
	}

	$("#orderForm").submit(function () {
		if (!document.getElementById("autoorder").checked || isCanAutoSubmitOrder().length || !($("#preSelectSeat").val())) return true;
		showStatus();
		utility.notifyOnTop("��ʼ�Զ��ύԤ��������");
		setCurOperationInfo(true, "�����Զ��ύ����");

		//ȷ���˿�
		var tcode = $("#station_train_code").val();
		var seatCode = $("#preSelectSeat").val();
		var count = parseInt($.trim($("#gridbox tr[tcode=" + tcode + "] td[scode=" + seatCode + "]").text())) || 0;
		if (seatCode == "1" && $("#preseatlist input[code=empty]").length) {
			//�������������Ǿͼ���������Ʊ��
			count = parseInt($.trim($("#gridbox tr[tcode=" + tcode + "] td[scode=empty]").text())) || 0;
		}
		var pases = $("#passengerList1 :checkbox");
		console.log("����Ʊ��=" + pases.length + "��ʵ��Ʊ��=" + count + " (isNaN Ϊ�ܶ� =��=)");
		if (!isNaN(count) && count > 0 && count < pases.length) {
			$("#passengerList1 :checkbox:gt(" + (count - 1) + ")").attr("checked", false).change();
		}

		var form = $(this);
		utility.post(form.attr("action"), form.serialize(), "text", function (html) {
			if (html.indexOf("������δ����") != -1) {
				hideStatus();
				utility.notifyOnTop("������δ��������");
				redirectToNotCompleteQuery();
				return;
			}

			setTipMessage("���ڷ�������");
			getOrderFormInfo(html);
		}, function () {
			utility.notifyOnTop("�ύԤ�������������Ե����ԣ�");
			utility.delayInvoke(counter, function () { $("#orderForm").submit(); }, 2000);
		});


		return false;
	});

	function getOrderFormInfo(html) {
		if (typeof (html) != 'undefined' && html) {
			data = utility.analyzeForm(html);
			data.fields["orderRequest.reserve_flag"] = "A";	//����֧��
			tourFlag = data.tourFlag;

			//��װ����
			formData = [];
			$.each(data.fields, function (i) {
				if (i.indexOf("orderRequest") != -1 || i.indexOf("org.") == 0 || i == "leftTicketStr") formData.push(i + "=" + encodeURIComponent(this));
			});
			formData.push("tFlag=" + data.tourFlag);

			//��ӳ˿�
			var pas = $("#passengerList1 :checkbox");
			var seat = $("#preSelectSeat").val();
			var seatType = $("#preselectseatlevel").val();

			for (var i = 0; i < 5; i++) {
				if (i >= pas.length) {
					formData.push("oldPassengers=");
					formData.push("checkbox9=");
					continue;
				}

				var p = pas.eq(i).data("pasinfo");
				var ptype = p.passenger_type;
				var idtype = p.passenger_id_type_code;
				var idno = p.passenger_id_no;
				var name = p.passenger_name;

				//ѧ��Ʊ��
				if (clickBuyStudentTicket != "Y" && ptype == "3" && !document.getElementById("autoorder_stu").checked) ptype = 1;

				formData.push("passengerTickets=" + seat + "," + seatType + "," + ptype + "," + encodeURIComponent(name) + "," + idtype + "," + encodeURIComponent(idno) + "," + p.mobile_no + ",Y");
				formData.push("oldPassengers=" + encodeURIComponent(name) + "," + idtype + "," + encodeURIComponent(idno));
				formData.push("passenger_" + (i + 1) + "_seat=" + seat);
				formData.push("passenger_" + (i + 1) + "_seat_detail=" + seatType);
				formData.push("passenger_" + (i + 1) + "_ticket=" + ptype);
				formData.push("passenger_" + (i + 1) + "_name=" + encodeURIComponent(name));
				formData.push("passenger_" + (i + 1) + "_cardtype=" + idtype);
				formData.push("passenger_" + (i + 1) + "_cardno=" + idno);
				formData.push("passenger_" + (i + 1) + "_mobileno=" + p.mobile_no);
				formData.push("checkbox9=Y");
			}
		}

		checkOrderInfo();
	}

	function checkOrderInfo() {
		setCurOperationInfo(true, "���ڼ�ⶩ��״̬....");
		utility.notifyOnTop("��ʼ�Զ��ύ������");
		console.log(data);

		utility.post("confirmPassengerAction.do?method=checkOrderInfo&rand=" + getVcCode(), formData.join("&") + "&randCode=" + getVcCode(), "json", function (data) {
			console.log(data);
			if ('Y' != data.errMsg || 'N' == data.checkHuimd || 'N' == data.check608) {
				if (data.errMsg && data.errMsg.indexOf("��֤��") != -1) {
					utility.notifyOnTop("��֤�벻��ȷ����������֤�룡");
					setTipMessage("������������֤�롣");
					reloadCode();
				} else {
					setCurOperationInfo(false, data.msg || data.errMsg);
					document.getElementById("autoorder").checked = false;
					$("#orderForm").submit();
				}
				return;
			}

			queryQueueInfo();
		}, function () {
			setCurOperationInfo(false, "������ִ����Ե�����");
			utility.delayInvoke(counter, checkOrderInfo, 500);
		});
	}

	function queryQueueInfo() {
		if (!document.getElementById("autoorder").checked) {
			hideStatus();
			return;
		}
		setCurOperationInfo(true, "�����ύ����");
		setTipMessage("���ڼ����С�");

		var queryLeftData = {
			train_date: data.fields["orderRequest.train_date"],
			station: data.fields["orderRequest.station_train_code"],
			train_no: data.fields["orderRequest.train_no"],
			seat: $("#preSelectSeat").val(),
			from: data.fields["orderRequest.from_station_telecode"],
			to: data.fields["orderRequest.to_station_telecode"],
			ticket: data.fields["leftTicketStr"]
		};
		utility.get("/otsweb/order/confirmPassengerAction.do?method=getQueueCount", queryLeftData, "json", function (data) {
			if (data.op_2) {
				//utility.notifyOnTop("�Ŷ��������࣬ϵͳ��ֹ�Ŷӣ��Ե����ԡ�Ҫ���²�ѯ����ˢ��ҳ�棡");
				setTipMessage("�Ŷ��������� (����=" + data.count + ")");
				setCurOperationInfo(true, "�Ŷ���������");
				utility.delayInvoke(counter, queryQueueInfo, 500);
			} else {
				submitOrder();
			}
		}, function () { utility.delayInvoke(counter, queryQueueInfo, 500); });

	}

	function submitOrder() {
		if (!document.getElementById("autoorder").checked) {
			hideStatus();
			return;
		}
		setCurOperationInfo(true, "�����ύ����");
		setTipMessage("�Ѽ��״̬��");

		var order_type = 'confirmSingleForQueueOrder'; //'dc' ����
		if (tourFlag == 'wc') {
			// �첽�µ�-����
			order_type = 'confirmPassengerInfoGoForQueue';
		} else if (tourFlag == 'fc') {
			// �첽�µ�-����
			order_type = 'confirmPassengerInfoBackForQueue';
		} else if (tourFlag == 'gc') {
			// �첽�µ�-��ǩ
			order_type = 'confirmPassengerInfoResignForQueue';
		}

		utility.post('/otsweb/order/confirmPassengerAction.do?method=' + order_type,
			formData.join("&") + "&randCode=" + getVcCode(), "json", function (data) {
				var msg = data.errMsg;

				if (msg == "Y") {
					setTipMessage("�����ύ�ɹ�");
					setCurOperationInfo(false, "�����ύ�ɹ�����ȴ��Ŷ���ɡ�");
					utility.notifyOnTop("�����ύ�ɹ�����ȴ��Ŷ���ɡ�");

					redirectToNotCompleteQuery();

				} else {
					if (msg.indexOf("����δ�����") != -1) {
						hideStatus();
						alert("����δ֧������! ��ɶ��, �Ͻ���ȷ��֧��ȥ.");
						redirectToNotCompleteQuery();
						return;
					}
					if (msg.indexOf("�ظ��ύ") != -1) {
						setTipMessage("TOKENʧЧ��ˢ��Token��....");
						$("#orderForm").submit();
						return;
					}
					if (msg.indexOf("�����Ŷ���") != -1) {
						hideStatus();
						alert("�����Ŷ��ж���! ��ȷ��ת���Ŷ�ҳ��");
						redirectToNotCompleteQuery();
						return;
					}
					if (msg.indexOf("�Ŷ��������ѳ�����Ʊ��") != -1) {
						//�Ŷ�����������Ʊ������ô���������ύ
						document.getElementById("autoorder").checked = false;
						setTipMessage(msg);
						reloadCode();

						setCurOperationInfo(false, "���棺" + msg + "���Զ��ع�Ϊ�ֶ��ύ�����л����λ�ϯ���뾡�����ԣ�");
						sendQueryFunc.call(clickBuyStudentTicket == "Y" ? document.getElementById("stu_submitQuery") : document.getElementById("submitQuery"));

						return;

					}

					setTipMessage(msg);
					setCurOperationInfo(false, "δ֪����" + msg + "�����֪���ߡ�");
					utility.notifyOnTop("δ֪����" + msg + "�����֪���ߡ�");

					if (document.getElementById("autoorder_autocancel").checked) {
						document.getElementById("autoorder").checked = false;
						$("#autoorder").change();
						$("#orderForm").submit();
					}
				}
			}, function () {
				setCurOperationInfo(false, "������ִ����Ե�����");
				utility.delayInvoke(counter, submitOrder, 2000);
			});
	}

	//�����Լ��״̬����ȷ�Ͽ����Զ��ύ
	setInterval(function () {
		if (document.getElementById("autoorder").checked) {
			var r = isCanAutoSubmitOrder();
			if (r.length) {
				utility.notifyOnTop("��ѡ�����Զ��ύ������������Ϣû��������������" + r.join("��") + "��");
			}
		}
	}, 30 * 1000);

	//�����ʾ���棬��ֹ��ʼ��ʧ��ȴ��ʾ�˽���
	$("tr.autoordertd, td.autoordertd *").show();
}

//#endregion

//#region -----------------�Զ���¼----------------------

function initLogin() {
	utility.checkCompatible();

	//������־
	utility.enableLog();

	//����Ѿ���¼�����Զ���ת
	utility.unsafeCallback(function () {
		if (parent && parent.$) {
			var str = parent.$("#username_ a").attr("href");
			if (str && str.indexOf("sysuser/user_info") != -1) {
				window.location.href = "https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init";
			}
			return;
		}
	});

	//���������Ƿ��Ƕ�������
	var isTop = false;
	try {
		isTop = (top.location + '').indexOf("dynamic.12306.cn") != -1;
	} catch (e) {

	}
	if (!isTop) {
		$("#loginForm table tr:first td:last").append("<a href='https://dynamic.12306.cn/otsweb/' target='_blank' style='font-weight:bold;color:red;'>���ȫ����Ʊ</a>");
		if (!utility.getPref("login.fullscreenAlert")) {
			utility.setPref("login.fullscreenAlert", 1);
			utility.notifyOnTop("ǿ�ҽ������������еġ����ȫ����Ʊ����ȫ����Ʊ������������Щ��ʾ��Ϣ�����޷�������");
		}
	}



	//Hack��ǰUI��ʾ
	$(".enter_right").empty().append("<div class='enter_enw'>" +
		"<div class='enter_rtitle' style='padding: 40px 0px 10px 0px; font-size: 20px;'>�ű���ʾ��Ϣ</div>" +
		"<div class='enter_rfont'>" +
		"<ul id='tipScript'>" +
		"<li class='fish_clock' id='countEle' style='font-weight:bold;'>�ȴ�����</li>" +
		"<li style='color:green;'><strong>������Ϣ</strong>��<span>��Ϣ��</span></li>" +
		"<li style='color:green;'><strong>������ʱ��</strong>��<span>--</span></li>" +
		"<li> <a href='javascript:;' class='configLink' tab='tabLogin'>��¼����</a> | <a href='http://www.fishlee.net/soft/44/' style='color:blue;' target='_blank'>������ҳ</a></li><li><a href='http://www.fishlee.net/soft/44/announcement.html' style='color:blue;' target='_blank'>��������</a> | <a href='" + utility.getUpdateUrl() + "' target='_blank' style='style='color:purple;''>�����°�</a> | <a style='font-weight:bold;color:red;' href='http://www.fishlee.net/soft/44/donate.html' target='_blank'>��������</a></li>" +
		'<li id="enableNotification"><input type="button" id="enableNotify" onclick="$(this).parent().hide();window.webkitNotifications.requestPermission();" value="�����������֪ͨ" style="line-height:25px;padding:5px;" /></li><li style="padding-top:10px;line-height:normal;color:gray;">��<strong style="color: red;">�������֤��</strong>��������ɺ�ϵͳ���Զ������ύ����¼�����У������뿪��ǰҳ����ϵͳ��æ�����Զ�����ˢ����֤�룬��ֱ��������֤�룬������ɺ����ֽ��Զ������ύ��</li>' +
		"</ul>" +
		"</div>" +
		"</div>");

	var html = [];
	html.push("<div class='outerbox' style='margin:20px 0;'><div class='box' style='margin:0;width:auto;'><div class='title'>12306��Ʊ���� - С��ʾ</div><div style='padding:10px;'>");
	html.push("<table><tr><td style='width:33%;font-weight:bold;background-color:#f5f5f5;'><strong>��������ͨ��������ַ���ʶ�Ʊ��վ��</strong></td><td style='width:33%;font-weight:bold;background-color:#f5f5f5;'>�������г�������</td><td style='font-weight:bold;background-color:#f5f5f5;'>�汾��Ϣ</td></tr>");
	html.push("<tr><td><ul><li style='list-style:disc inside;'><a href='https://www.12306.cn/otsweb/' target='blank'>https://www.12306.cn/otsweb/</a></li>");
	html.push("<li style='list-style:disc inside;'><a href='https://dynamic.12306.cn/otsweb/' target='blank'>https://dynamic.12306.cn/otsweb/</a></li><li style='list-style:disc inside;'><a href='http://dynamic.12306.cn/otsweb/' target='blank'>http://dynamic.12306.cn/otsweb/</a></li>");
	html.push("</ul></td><td><ol>");
	$.each([
		["http://www.fishlee.net/soft/44/tour.html", "��Ʊ����ʹ��ָ��", "font-weight:bold;color:red;"],
		["http://www.fishlee.net/soft/44/12306faq.html", "��Ʊ�ĳ�������&ָ��", ""],
		["http://www.fishlee.net/soft/44/faq.html", "�������еĳ�������", ]
	], function (i, n) {
		html.push("<li style='list-style:disc inside;'><a style='" + n[2] + "' href='" + n[0] + "' target='blank'>" + (n[1] || n[0]) + "</a></li>");
	});
	html.push("</ol></td><td><ul>");
	var info = [];
	info.push("������ڣ�" + utility.regInfo.name);
	if (utility.regInfo.bindAcc) {
		if (!utility.regInfo.bindAcc[0] || utility.regInfo.bindAcc[0] == "*") info.push("���12306�ʻ���<em>����</em>");
		else info.push("���12306�ʻ���" + utility.regInfo.bindAcc);
	}
	info.push(utility.regInfo.typeDesc);
	info.push("�汾��<strong>" + window.helperVersion + "</strong>");
	$.each(info, function (i, n) { html.push("<li style='list-style:disc inside;'>" + n + "</li>"); });
	html.push("<li style='list-style:disc inside;'>��<a href='javascript:;' class='reSignHelper'>����ע��</a>��</li>");
	html.push("</ul></td></tr></table>");
	html.push("</div></div></div>");

	$("div.enter_help").before(html.join(""));


	//�����¼���
	var form = $("#loginForm");
	var trs = form.find("tr");
	trs.eq(1).find("td:last").html('<label><input type="checkbox" id="keepInfo" /> ��¼����</label>');
	$("#loginForm td:last").html('<label><input type="checkbox" checked="checked" id="autoLogin" name="autoLogin" /> �Զ���¼</label>');
	utility.reloadPrefs($("#loginForm td:last"));
	$("#keepInfo").change(function () {
		if (!this.checked) {
			if (localStorage.getItem("__up") != null) {
				localStorage.removeItem("__up");
				alert("��������룡");
			}
		}
		if (this.checked) {
			alert("���棺��ѡ����ܻᵼ����������й©ม���ȷ�������ڲ����ĵ�����ȫ����ģ�������ľ���ж�����ġ���");
		}
	});
	//ע���ж�
	form.submit(function () {
		utility.setPref("_sessionuser", $("#UserName").val());
	});

	if (!window.webkitNotifications || window.webkitNotifications.checkPermission() == 0) {
		$("#enableNotification").remove();
	}

	var tip = $("#tipScript li");
	var count = 1;
	var errorCount = 0;
	var inRunning = false;

	//�����Ǻ���
	function setCurOperationInfo(running, msg) {
		var ele = $("#countEle");
		ele.removeClass().addClass(running ? "fish_running" : "fish_clock").html(msg || (running ? "���ڲ����С���" : "�ȴ��С���"));
	}

	function setTipMessage(msg) {
		tip.eq(2).find("span").html(utility.getTimeInfo());
		tip.eq(1).find("span").html(msg);
	}

	function getLoginRandCode() {
		setCurOperationInfo(true, "���ڳ�ҡҡ�֡���");

		$.ajax({
			url: "/otsweb/loginAction.do?method=loginAysnSuggest",
			method: "POST",
			dataType: "json",
			cache: false,
			success: function (json, code, jqXhr) {
				//{"loginRand":"211","randError":"Y"}
				if (json.randError != 'Y') {
					setTipMessage("����" + json.randError);
					utility.delayInvoke("#countEle", getLoginRandCode, utility.getLoginRetryTime());
				} else {
					setTipMessage("��¼�������� - " + json.loginRand);
					$("#loginRand").val(json.loginRand);
					submitForm();
				}
			},
			error: function (xhr) {
				errorCount++;

				if (xhr.status == 403) {
					setTipMessage("[" + errorCount + "] ����! 403����, IP�ѱ���!")
					utility.delayInvoke("#countEle", getLoginRandCode, 10 * 1000);
				} else {
					setTipMessage("[" + errorCount + "] ���������������")
					utility.delayInvoke("#countEle", getLoginRandCode, utility.getLoginRetryTime());
				}
			}
		});
	}

	function submitForm() {
		var data = {};
		$.each($("#loginForm").serializeArray(), function () {
			if (this.name == "refundFlag" && !document.getElementById("refundFlag").checked) return;
			data[this.name] = this.value;
		});
		if (!data["loginUser.user_name"] || !data["user.password"] || !data.randCode || data.randCode.length != 4/* || (utility.regInfo.bindAcc && utility.regInfo.bindAcc != data["loginUser.user_name"])*/)
			return;

		utility.setPref("__un", data["loginUser.user_name"]);
		if ($("#keepInfo")[0].checked) {
			utility.setPref("__up", data["user.password"]);
		}
		setCurOperationInfo(true, "���ڵ�¼�С���");
		$.ajax({
			type: "POST",
			url: "/otsweb/loginAction.do?method=login",
			data: data,
			timeout: 10000,
			dataType: "text",
			success: function (html) {
				msg = utility.getErrorMsg(html);

				if (html.indexOf('��������ȷ����֤��') > -1) {
					setTipMessage("��֤�벻��ȷ");
					setCurOperationInfo(false, "������������֤�롣");
					stopLogin();
				} else if (msg.indexOf('����') > -1) {
					setTipMessage(msg);
					setCurOperationInfo(false, "���������롣");
					stopLogin();
				} else if (msg.indexOf('����') > -1) {
					setTipMessage(msg);
					setCurOperationInfo(false, "���������롣");
					stopLogin();
				} else if (html.indexOf("��ӭ����¼") != -1) {
					utility.notifyOnTop('��¼�ɹ�����ʼ��ѯ��Ʊ�ɣ�');
					window.location.href = "https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init";
				} else {
					setTipMessage(msg);
					utility.delayInvoke("#countEle", getLoginRandCode, utility.getLoginRetryTime());
				}
			},
			error: function (msg) {
				errorCount++;
				if (xhr.status == 403) {
					setTipMessage("[" + errorCount + "] ����! 403����, IP�ѱ���!")
					utility.delayInvoke("#countEle", getLoginRandCode, 10 * 1000);
				} else {
					setTipMessage("[" + errorCount + "] ���������������")
					utility.delayInvoke("#countEle", getLoginRandCode, utility.getLoginRetryTime());
				}
			}
		});
	}


	function relogin() {
		if (inRunning) return;

		//var user = $("#UserName").val();
		//if (!user) return;
		//if (utility.regInfo.bindAcc && utility.regInfo.bindAcc.length && utility.regInfo.bindAcc[0] && $.inArray(user, utility.regInfo.bindAcc) == -1 && utility.regInfo.bindAcc[0] != "*") {
		//	alert("�ܱ�Ǹ��12306��Ʊ���ֵ���Ȩ����Ѱ�����" + utility.regInfo.bindAcc.join() + "����δ��Ȩ�û�������ֹͣ���У����ֶ�������\n�������ڵ�¼ҳ���·��İ��������������ע�᡿���޸İ󶨡�");
		//	return;
		//}

		count++;
		utility.setPref("_sessionuser", $("#UserName").val());
		inRunning = true;
		getLoginRandCode();
	}

	function stopLogin() {
		//�ȴ�����ʱ��ˢ����֤��
		$("#img_rrand_code").click();
		$("#randCode").val("")[0].select();
		inRunning = false;
	}

	//��ʼ��
	function executeLogin() {
		count = 1;
		utility.notify("�Զ���¼�У�(1) �ε�¼��...");
		setTipMessage("��ʼ��¼��....");
		getLoginRandCode();

		return false;
	}

	var kun = utility.getPref("__un");
	if (kun) {
		$("#UserName").val(kun);
	}
	$("#password").val(utility.getPref("__up") || "");

	$("#randCode").keyup(function (e) {
		if (!$("#autoLogin")[0].checked) return;

		e = e || event;
		if (e.charCode == 13 || $("#randCode").val().length == 4) relogin();
	});

	//#region ����ʱ����ʾ�Ͳ�ѯ

	function addDays(count) {
		return new Date(this.getFullYear(), this.getMonth(), this.getDate() + count);
	}

	var curDate = new Date();

	var html = ["<li style='font-weight:bold; color:blue;'><u>������ʾ</u>�����Ϻ͵绰��Ʊ��ǰ20�죬�������ۡ�<u>"];
	html.push(utility.formatDate(addDays.call(curDate, 19)));
	html.push("</u>���ճ�Ʊ�����۵�ͳ�վ��ǰ18�죬�������ۡ�<u>");
	html.push(utility.formatDate(addDays.call(curDate, 17)));
	html.push("</u>���ճ�Ʊ��<br />��<a href='javascript:;' id='querySaleDate'>���ݳ˳�����������������</a>����<a href='http://www.12306.cn/mormhweb/zxdt/tlxw_tdbtz56.html' target='_blank'>����ع��桢��վ����Ϊ׼</a>��");

	$("div.enter_from ul").append(html.join(""));

	$("#querySaleDate").click(function () {
		var date = prompt("��������Ҫ�˳������ڣ��磺2013-02-01");
		if (!date) return;

		if (!/(\d{4})[-/]0?(\d{1,2})[-/]0?(\d{1,2})/.exec(date)) {
			alert("�ܱ�Ǹδ��ʶ������");
		}
		date = new Date(parseInt(RegExp.$1), parseInt(RegExp.$2) - 1, parseInt(RegExp.$3));
		alert("����ѯ�ĳ˳������ǣ�" + utility.formatDate(date) + "\n\n���������绰���������ǣ�" + utility.formatDate(addDays.call(date, -19)) + "\n��վ�����۵����������ǣ�" + utility.formatDate(addDays.call(date, -17)) + "\n\n���Ͻ�������ο���");
	});

	//#endregion
}

//#endregion

//#region �Զ�����֧��

function initPayOrder() {
	//��������Զ�ˢ��
	if ($("div.error_text").length > 0) {
		utility.notifyOnTop("ҳ������Ժ��Զ�ˢ�£�");
		setTimeout(function () { self.location.reload(); }, 3000);
	}

	return;
	// undone

	window.payOrder = this;

	//epayOrder
	var oldCall = window.epayOrder;
	var formUrl, formData;

	$("#myOrderForm").submit(function () {
		var form = $(this);
		var action = form.attr("action");
		if (acton && action.index("laterEpay") != -1) {
			return false;
		}
	});
	window.epayOrder = function () {
		oldCall.apply(arguments);

		var form = $("#myOrderForm");
		var formData = utility.serializeForm(form);
		var formUrl = form.attr("action");
	};

	function getsubmitForm() {
		utility.post(formUrl, formData, "text", function (html) {
		}, function () {

		});
	}
}

//#endregion

//#region ����ר�ü�����

if (location.pathname == "/otsweb/" || location.pathname == "/otsweb/main.jsp") {
	if (isFirefox) {
		//firefox ר�ü�����
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://static.liebao.cn/_softupdate/44/version.js",
			onload: function (o) {
				eval(o.responseText);

				if (typeof (fishlee12306_msgid) != 'undefined') {
					if (utility.getPref("helperlastmsgid") != fishlee12306_msgid) {
						utility.setPref("helperlastmsgid", fishlee12306_msgid);

						if (!fishlee12306_msgver || compareVersion(version, fishlee12306_msgver) < 0) {
							if (fishlee12306_msg) alert(fishlee12306_msg);
						}
					}
				}

				console.log("[INFO] ���¼�飺��ǰ���ְ汾=" + version + "���°汾=" + version_12306_helper);
				if (compareVersion(version, version_12306_helper) < 0 && confirm("��Ʊ�����ѷ����°� ��" + version_12306_helper + "����Ϊ����������ʹ�ã��뼰ʱ����!�Ƿ����̸��£�\n\n���θ����������£�\n" + version_updater.join("\n"))) {
					GM_openInTab("http://static.liebao.cn/_softdownload/12306_ticket_helper.user.js", true, true);
				}
			}
		});
	} else {
		unsafeInvoke(function () {
			$("body").append('<iframe id="checkVersion" width="0" height="0" style="visibility:hidden;" src="http://static.liebao.cn/content/scriptProxy.html?script=http://static.liebao.cn/content/images/apps/cn12306/checkVersion.js&v=' + window.helperVersion + '"></iframe>');
		});
	}
}
function compareVersion(v1, v2) {
	var vv1 = v1.split('.');
	var vv2 = v2.split('.');

	var length = Math.min(vv1.length, vv2.length);
	for (var i = 0; i < length; i++) {
		var s1 = parseInt(vv1[i]);
		var s2 = parseInt(vv2[i]);

		if (s1 < s2) return -1;
		if (s1 > s2) return 1;
	}

	return vv1.length > vv2.length ? 1 : vv1.length < vv2.length ? -1 : 0;
}

//#endregion
