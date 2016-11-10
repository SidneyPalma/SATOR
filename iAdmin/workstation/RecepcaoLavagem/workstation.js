(function(){
	window.addEventListener('load', function(){
		
        var json = {
			areasid: "5",
			areasname: "Recepção Lavagem",
			printlocate: "server\\printer",
			guid: "A5B2D5DE-83C9-4E53-922C-EAA66EE3EEBA"
		};

		localStorage.setItem('workstation', JSON.stringify(json));

	}, false )	
})();