const API_Covid                   = 'https://corona.lmao.ninja/v2/countries/';
const API_Covid_All_Country_Count = 'https://corona.lmao.ninja/v2/all';
const API_Covid_All_Provinsi      = 'https://api.kawalcorona.com/indonesia/provinsi/';
const API_DATE                    = 'https://pdrtechnology.net/date.php';


let $loading = new Vue({
	el : '#loading',
	data : {
		show : true
	}
});