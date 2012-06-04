/* Worldwide Change Country Drop Down */

function changeCountry(s) { 
	s.className = 'wwdropdown'; 
	s.selected = false; 
	window.parent.location.href = s.value; 
	}


