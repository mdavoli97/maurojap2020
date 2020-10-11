var product = {};
var allproducts = [];

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
                <img src="` + imageSrc + `" class="d-block w-100" alt="...">
              </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

        document.getElementsByClassName("carousel-item")[0].setAttribute("class", "carousel-item active");
    }
}

function showRelatedProduct(array){

    let htmlContentToAppend = ""

    for(let i = 0; i < array.length; i++){
        let related = array[i];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + allproducts[related].imgSrc + `" alt="` + allproducts[related].description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ allproducts[related].name + "&nbsp-&nbsp" + allproducts[related].cost + " " + allproducts[related].currency + `</h4>
                        <small class="text-muted">` + allproducts[related].soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1">` + allproducts[related].description + `</p>
                </div>
            </div>
        </a>
        `
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
}

function showComments(comments) {

    htmlContentToAppend = "";

    for (let i = 0; i < comments.length; i++) {
        let product = comments[i];
        let score = product.score
        for (let k = 0; k < score; k++) {
            htmlContentToAppend += `
            <span class="fa fa-star checked"></span>
            `
        }
        for (let j = 0; j < 5 - score; j++) {
            htmlContentToAppend += `
            <span class="fa fa-star"></span>
            `
        }

        htmlContentToAppend += `
        <br>
        <h5 class="mb-1">`+ product.user + " " + product.dateTime + `</h5>
        <p>`+ product.description + `</p>
        <br>
        `
    }

    document.getElementById("productComments").innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            allproducts = resultObj.data
        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let productCurrency = document.getElementById("productCurrency");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCountHTML.innerHTML = product.soldCount;
            productCriteriaHTML.innerHTML = product.category;
            productCurrency.innerHTML = product.currency;
        

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            showRelatedProduct(product.relatedProducts);
        }
    });

    var list = ['one', 'two', 'three', 'four', 'five'];
    list.forEach(function (element) {
        document.getElementById(element).addEventListener("click", function () {
            var cls = document.getElementById(element).className;
            if (cls.includes("unchecked")) {
                document.getElementById(element).classList.remove("unchecked");
                document.getElementById(element).classList.add("checked");
            }
            else {
                document.getElementById(element).classList.remove("checked"); document.getElementById(element).classList.add("unchecked");
            }
        });
    });


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(result => showComments(result.data));

    


});