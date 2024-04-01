var t={

    get_now(){
        let dateObject = new Date();

        let date = ("0" + dateObject.getDate()).slice(-2);
        let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
        let year = dateObject.getFullYear();

        let hours = dateObject.getHours();
        let minutes = dateObject.getMinutes();
        let seconds = dateObject.getSeconds();

        return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    },

    D2str_(dateObject){
        let date = ("0" + dateObject.getDate()).slice(-2);
        let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
        let year = dateObject.getFullYear();
        return year + "-" + month + "-" + date
    },
    
    D2str(dateObject){
        //console.log(dateObject)
        let date = ("0" + dateObject.getDate()).slice(-2);
        let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
        let year = dateObject.getFullYear();
        let strnow=year+month+date
        return strnow
    },
    
    CountAge(strtime){
        let dateObject = new Date();
    
        let strnow=D2str(dateObject)
        let birth=new Date(strtime)
        birth=D2str(birth)
        console.log(strnow,birth)
        let age=Math.floor((strnow-birth)/10000)
        console.log(age)
        return age
    }
}

module.exports=t