class kapi{
    static base_url = "http://ketabshow.com";
    

    static getBooksByISBN(isbn) {
        let lectureDetailsUrl = this.base_url+"/api/search?query=" +isbn+"&column=identifier";
        return fetch(lectureDetailsUrl, {
            method: 'GET',
        })
    };

    static getBooksByTitle(title,page) {
        let lectureDetailsUrl = this.base_url+"/api/search?query=" +title+"&column=def&res=50&page="+page;
        return fetch(lectureDetailsUrl, {
            method: 'GET',
        })
    };

    static register(mobile, username, password, passwordrepeat) {
        let lectureDetailsUrl = this.base_url+"/api/search?query=" +title+"&column=def&res=50&page="+page;
        return fetch(lectureDetailsUrl, {
            method: 'GET',
        })
    };

    static resetpassword(){
        let lectureDetailsUrl = this.base_url+"/api/search?query=" +title+"&column=def&res=50&page="+page;
        return fetch(lectureDetailsUrl, {
            method: 'GET',
        })
    };

    static login(username,password){
        let loginUrl = this.base_url + "/Account/login";
        var loginData ={"username":username,"password":password,"rh":this.receive_header}
        return fetch(loginUrl,{
            method:'POST',
            headers:this.header_options,
            'body':JSON.stringify(loginData)
        })
    };


    static logout(){
        let logoutUrl = this.base_url + "/Account/logout";
        this.receive_header.Token= global.token;
        return fetch(logoutUrl,{
            method:'POST',
            headers:this.header_options,
            'body':JSON.stringify({"rh":this.receive_header})
        })
    };



}
export default kapi;