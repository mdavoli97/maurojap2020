let cartProducts = [];

function showProducts(array) {

  

  let products = array;
  for (let i = 0; i < array.articles.length; i++) {


    let contentToAppend = `

  <div class="p-4 wish-list" id="prodContainer">
  </div>

    <div class="card mb-3">
      <div class="card-body">

        <h5 class="mb-3">The total amount of</h5>

        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
            Subtotal
            <span id="subtotal">USD</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center px-0">
            Envio
            <span>Gratis</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
            <div>
              <strong>Total</strong>
            </div>
            <span><strong>UYU</strong></span>
          </li>
        </ul>

        <button type="button" class="btn btn-primary btn-block waves-effect waves-light">Comprar</button>

      </div>
    </div>
    </div>


  </div>
  <!--Grid column--> `;

    let productContentToAppend = ""


    for (let i = 0; i < array.articles.length; i++) {
      

      productContentToAppend += `
            <div class="product row mb-4">
              <div class="col-md-5 col-lg-3 col-xl-3">
                <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                  <img class="img-fluid w-100" src=`+ products.articles[i].src + ` alt="Sample">
                  <a href="#!">
                  </a>
                </div>
              </div>
              <div class="col-md-7 col-lg-9 col-xl-9">
                <div>
                  <div class="d-flex justify-content-between">
                    <div>
                      <h5>`+ products.articles[i].name + `</h5>
                    </div>
                    <div>
                      <div class="def-number-input number-input safari_only mb-0 w-100">
                        <button class="minus decrease"></button>
                        <input id="quantity" min="0" name="quantity" value="` + products.articles[i].count + `"  type="number">
                        <button class="plus increase"></button>
                      </div>
                      <small id="passwordHelpBlock" class="form-text text-muted text-center"> (1 item) </small>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <a href="#!" type="button" class="remove-product card-link-secondary small text-uppercase mr-3"><i class="fas fa-trash-alt mr-1"></i> Borrar item </a>
                    </div>
                    <br>
                    <br>
                    <br>
                    <p class="mb-0"><span><strong class="price">`+ products.articles[i].currency + ` ` + products.articles[i].unitCost + `</strong></span></p>
                  </div>
                </div>
              </div>
            </div>
            <hr class="mb-4">
          `;
    }
  
    document.getElementById("container").innerHTML = contentToAppend;
    document.getElementById("prodContainer").innerHTML = productContentToAppend;

  }
}



function showSubTotal(array) {

  let subTotalToAppend = ""
  
  let subtotal = 0;

  let products = array;
    for (let i = 0; i < array.articles.length; i++) {

      if (products.articles[i].currency === "UYU") {
        products.articles[i].unitCost = products.articles[i].unitCost / 40
      }
      subtotal = subtotal + products.articles[i].unitCost * products.articles[i].count
    }
    subTotalToAppend += `
    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
    
    <span><strong>USD `+ subtotal +`</strong></span>
  </li>
  `

    document.getElementById("subtotal").innerHTML = subTotalToAppend;
}




document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_PROD_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cartProducts = resultObj.data;
      showProducts(cartProducts);
      showSubTotal(cartProducts);
    }
  });
});