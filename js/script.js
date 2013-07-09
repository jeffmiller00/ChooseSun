$(function(){

	$("#emailIcon").click(function(){
		$("#fact").toggle();
		$("#emailForm").toggle();
	});

	function isValidEmailAddress(emailAddress) {
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		return pattern.test(emailAddress);
	}
	
	$("#sendEmail").click(function(){
		$("#sendEmail").attr("disabled","disabled");
		
		if( $('#emailForm').is(':visible') ) {
			if( $.trim($("#name").val()) == "" ) {
				alert("Please enter your name.");
			} else if( $.trim($("#email").val()) == "" ) {
				alert("Please enter your email address.");
			} else if( !isValidEmailAddress($.trim($("#email").val())) ) {
				alert("Please enter a valid email address.");
			} else if( $.trim($("#message").val()) == "" ) {
				alert("Please enter a message.");
			}
			else {
				$.ajax({
					url: "plugins/emailer.php",
					type: "POST",
					data: ({ send : true
							,message : $.trim($("#message").val()) 
							,name : $.trim($("#name").val()) 
							,email : $.trim($("#email").val())}),
					success: function(msg){
						if( $.trim(msg) != "" ) {
							alert(msg);
						}
						$("span.loading").hide();
						$("#fact").toggle();
						$("#emailForm").toggle();
					}
				});
			}
		}
		$("#sendEmail").removeAttr("disabled");
	});

});