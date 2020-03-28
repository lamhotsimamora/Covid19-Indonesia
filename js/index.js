let $loading = new Vue({
	el : '#loading',
	data : {
		show : true
	}
});

let $app = new Vue({
	el : '#app',
	data : {
		data_indonesia : [],
		country : null,
		data_country  : []
	},
	methods : {
		loadData : function($country="ID"){
			__({
				url : API_Covid  + $country
			}).request($response=>{
				this.data_indonesia = JSON.parse($response);
				$loading.show=false
			});

		},
		loadCountry : function(){
			__({
				url : 'assets/country.json'
			}).request($response=>{
				this.data_country = JSON.parse($response);
			});
		},
		selectCountry: function(){
			$loading.show =true;
			this.data_indonesia = []
			this.loadData(this.country)
		}
	},
	mounted: function(){
		this.loadCountry()
		this.loadData()
	}
});

let $app2 = new Vue({
	el : '#app2',
	data : {
		data_all_count : []
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