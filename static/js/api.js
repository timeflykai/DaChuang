$(document).ready(function(){
    $.get("/user_info",function(data){
        if(data['IsLogin']==1){
            $("#login-status a").attr("href","/profile")
            $("#login-status-text").text(data['name'])
            window.userinfo=data
        }
    })
})
