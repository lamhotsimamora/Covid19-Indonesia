let $app = new Vue({
	el : '#app',
	data : {
		data_provinsi : [],
		provinsi : null,
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
				url : API_Covid_All_Provinsi
			}).request( ($response,$status,$code) =>{
				
				if ($response){
					let $obj = JSON.parse($response);
					
					if ($obj.message){
						this.data_provinsi = [];
						Swal.fire({
						  icon: 'error',
						  title: 'Oops...',
						  text:  $obj.message,
						  footer: ''
						})
					}else{
						this.data_provinsi = $obj;
					}
					$loading.show=false
				}
			});

		}
	},
	mounted: function(){
		this.loadData()
		this.getDate()
	}
});