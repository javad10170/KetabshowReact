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
}
export default kapi;