document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('../components/header.html', '.header')
    await loadComponent('../components/footer.html','.footer')

    let seler_data = await loadData("../data/selers.json")
    
    let all_product = await loadData("../data/product.json")
    
    let name_seler = localStorage.getItem("seler")
    all_product = all_product[name_seler]
    seler_data = seler_data["selers"][name_seler]
    console.log(all_product)
    let seler_img = document.querySelector(".cover-seler-img")
    let seler_name = document.querySelector(".cover-seler-text-name")
    let seler_seler = document.querySelector(".cover-seler-text-seler")
    let seler_about = document.querySelector(".cover-seler-text-about")

    seler_img.src = seler_data['image']
    seler_name.innerHTML = seler_data['name']
    seler_about.innerHTML = seler_data['about']
    seler_seler.innerHTML = name_seler

    // додамо картки

    let allwrps = document.querySelector(".allwrps")
    all_product.forEach(product =>{
        let card = `<div class="flip-card card-a single"  data-menu="${product['data-menu']}">
    <div class="flip-inner">
      <div class="flip-front">
        <div class="card-img">
          <div class="card-img-bg"></div>
          <div class="card-badge badge-new">New</div>
          <span class="card-emoji"><img src= "${product['image']}"></span>
        </div>
        <div class="card-info">
          <div class="card-category">${product['seller']}</div>
          <div class="card-name">${product['name']}</div>
          <div class="card-price-row">
            <div><span class="card-price">${product['price']}</span><span class="card-price-old">$${product['price']+100}</span></div>
            <div class="card-rating"><span class="stars">★★★★★</span> 4.9</div>
          </div>
        </div>
      </div>
      <div class="flip-back">
        <div class="back-tag">${product['seller']}</div>
        <div class="back-name">${product['name']}</div>
        <div class="back-desc">${product['about']}</div>
        <ul class="back-features">
          <li>40dB Active Noise Cancellation</li>
          <li>30-hour battery life</li>
          <li>Hi-Res Audio certified</li>
          <li>Foldable design, premium case</li>
        </ul>
        <div class="back-price"><span class="back-price-main">${product['price']}</span><span class="back-price-period">Free shipping</span></div>
        <button class="back-cta">Add to Cart 🛒</button>
      </div>
    </div>
  </div>`
  allwrps.innerHTML += card
    })
})

Filtering();