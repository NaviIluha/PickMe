document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('../components/header.html', '.header')
    await loadComponent('../components/footer.html', '.footer')

    let seller_data = await loadData("../data/selers.json")
    let all_product = await loadData("../data/product.json")
    let name_seller = localStorage.getItem("seller")
    all_product = all_product[name_seller]
    seller_data = seller_data["sellers"][name_seller]
    let seller_img = document.querySelector(".seller-cover-img")
    let seller_name = document.querySelector(".seller-cover-text-name")
    let seller_about = document.querySelector(".seller-cover-text-about")
    seller_img.attributes.src.value = seller_data["image"]
    seller_name.innerHTML = seller_data["name"]
    seller_about.innerHTML = seller_data["about"]

})