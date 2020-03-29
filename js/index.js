
let $loading = new Vue({
	el : '#loading',
	data : {
		show : true
	}
});

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
		tanggal : null
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

let $app2 = new Vue({
	el : '#app2',
	data : {
		data_all_count : {
			cases : 0,
			recovered : 0,
			deaths : 0
		}
	},
	methods : {
		loadAllCount : function(){
			__({
				url : API_Covid_All_Country_Count
			}).request($response=>{
				this.data_all_count = JSON.parse($response);
				$loading.show=false
			});
		}
	},
	mounted: function(){
		this.loadAllCount()
	}
});
