$(function() {
	$("#signupBtn").on("click",function(){
		var data = {
			user : {
				name : $("#signupName").val(),
				password: $("#signupPassword").val()
			}
		}
		$.ajax({
			type: 'POST',
			url: '/user/signup',
			data: data
		})
		.done(function(results) {
			if (results.status === 1) {
				alert("注册成功")
				window.location.href = "/"
			}
			else if (results.status === 0) {
				alert(errMsg[results.errorCode])
			}
			else {
				alert("通讯错误")
			}
		})
	})	

	$("#signinBtn").on("click",function(){
		var data = {
			user : {
				name : $("#signinName").val(),
				password: $("#signinPassword").val()
			}
		}
		$.ajax({
			type: 'POST',
			url: '/user/signin',
			data: data
		})
		.done(function(results) {
			if (results.status === 1) {
				window.location.href = "/"
			}
			else if (results.status === 0) {
				alert(errMsg[results.errorCode])
			}
			else {
				alert("通讯错误")
			}
		})
	})
})