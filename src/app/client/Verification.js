// Script for BVN verification and authentication
// calls the verification endpoint

$(document).ready(function(e) {
	$("#verification_method").change(function() {
		console.log($('option:selected', this).text());
		if (document.getElementById("verification_method").value == "bvn"){
			document.getElementById("DisplayVerificationNumberInput").style.display = "block";
			$("#VerificationNumberSmallDescription").html('<div>BVN is a 10 digit number tied to all your bank accounts</div>');
		}
	});
});