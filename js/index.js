const ctx = document.getElementById('chart_covid');

let $app = new Vue({
	el : '#app',
	data : {
		data_indonesia : {
			cases  : 0,
			deaths : 0,
			recovered : 0,
			todayCases : 0,
			todayDeaths : 0
		},
		country : null,
		data_country  : null,
		country_flag : null,
		tanggal : null,
		btn_provinsi : true
	},
	methods : {
		getDate : function(){
			__({
				url : API_DATE
			}).request($response=>{
				if ($response){
					this.tanggal = $response;
				}
			});
		},
		loadData : function($country="ID"){
			__({
				url : API_Covid  + $country
			}).request( ($response,$status,$code) =>{
				if ($country==='ID'){
					this.btn_provinsi = true;
				}else{
					this.btn_provinsi = false;
				}
				if ($response){
					let $obj = JSON.parse($response);
					
					if ($obj.message){
						this.data_indonesia = [];
						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text:  $obj.message,
						  footer: ''
						})
					}else{
						this.data_indonesia = $obj;
						this.country_flag = $obj.countryInfo.flag;
					}
					$loading.show=false
				}
			});

		},
		loadCountry : function(){
			__({
				url : 'assets/country.json'
			}).request($response=>{
				if ($response){
					let $obj = JSON.parse($response);
					this.data_country = $obj;

				}
			});
		},
		selectCountry: function(){
			$loading.show =true;
			this.country_flag = null;
			this.data_indonesia = {
				cases  : 0,
				deaths : 0,
				recovered : 0,
				todayCases : 0,
				todayDeaths : 0
			};
			this.loadData(this.country)
		}
	},
	mounted: function(){
		this.loadCountry()
		this.loadData()
		this.getDate()
	}
});

__({
	url : API_Covid_All_Country_Count
}).request($response=>{

	const $data = JSON.parse($response);
		
	var myChart = new Chart(ctx, {
	    type: 'pie',
	    data: {
	        labels: ['Jumlah Kasus ('+_moneyFormat($data.cases,'')+")",
	        		 'Sembuh ('+_moneyFormat($data.recovered,'')+")", 
	        		 	'Meninggal ('+_moneyFormat($data.deaths,'')+")"],
	        datasets : [{
	            label: '#',
	            data : [$data.cases, $data.recovered, $data.deaths],
	            backgroundColor: [
	                'rgba(63, 127, 191, 1)',
	                'rgba(63, 191, 63, 1)',
	                'rgba(191, 63, 63, 1)',
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	            ],
	            borderWidth: 0
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});

	$loading.show=false
});