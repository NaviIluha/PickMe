document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('../components/header.html', '.header')
    await loadComponent('../components/footer.html', '.footer')


    let all_product = await loadData("../data/product.json")
    console.log(all_product)


    const achievements = []


    for(let name in all_product){
        let pr = choice(all_product[name])
        pr["name_pr"] = name
        achievements.push(pr)
    }

    let activeIndex = 0;
    const total = achievements.length;
    const stage = document.getElementById("carousel-stage");
    const dotsContainer = document.getElementById("pagination-dots");

    // 1. Initial Render (Run Once)
    function init() {
    achievements.forEach((item, index) => {
        // Create the card
        const card = document.createElement("div");
        card.className = "carousel-card";
        card.id = `card-${index}`;
        card.onclick = () => {
        activeIndex = index;
        update();
        };

        card.innerHTML = `
        <div class="card-image" style="background-image: url('${item.image}')">
        </div>
        <div class="card-content">
            <div class="card-header">
            <h3>${item.name}</h3>
            <span class="tag-pill">${item.price}</span>
            </div>
            <p>${item.aboutshort}</p>
            <div class="card-footer"><small>${item.name_pr}</small></div>
        </div>
        `;
        stage.appendChild(card);

        // Create the dot
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.id = `dot-${index}`;
        dot.onclick = () => {
        activeIndex = index;
        update();
        };
        dotsContainer.appendChild(dot);
    });

    update(); // First placement
    }

    // 2. The "Update" function (Triggers the smooth transition)
    function update() {
    achievements.forEach((_, index) => {
        const card = document.getElementById(`card-${index}`);
        const dot = document.getElementById(`dot-${index}`);

        // Circular Offset Math
        let offset = index - activeIndex;
        if (offset > Math.floor(total / 2)) offset -= total;
        if (offset < -Math.floor(total / 2)) offset += total;

        // Apply classes based on offset
        let positionClass = "hidden";
        if (offset === 0) positionClass = "active";
        else if (offset === -1) positionClass = "left";
        else if (offset === 1) positionClass = "right";
        else if (offset < -1) positionClass = "far-left";
        else if (offset > 1) positionClass = "far-right";

        card.className = `carousel-card ${positionClass}`;
        dot.className = `dot ${index === activeIndex ? "active" : ""}`;
    });
    }

    // Navigation
    const next = () => {
    activeIndex = (activeIndex + 1) % total;
    update();
    };
    const prev = () => {
    activeIndex = (activeIndex - 1 + total) % total;
    update();
    };

    document.getElementById("next-btn").onclick = next;
    document.getElementById("prev-btn").onclick = prev;

    // Keyboard Support
    window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    });

    
    init();
    // Add card sellers
    let sellers = await loadData("illaM/selers.json")
    sellers = sellers["sellers"]
    sellers.forEach(function(seller){
      let name = seller.key()
      let data = seller[name]
      let card = 
`<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="${seler.i}" alt="Product Image" />
      <h3>Modern Minimal Chair</h3>
    </div>
    <div class="flip-card-back">
      <p>This ergonomic chair offers both comfort and modern design. Ideal for workspaces or homes.</p>
      <button>Buy Now</button>
    </div>
  </div>
</div>`
 
    })

    //add card selers//
    let divSelers = document.querySelector(".selers")
    let selers = await loadData("../data/selers.json")
    selers = selers["selers"]
    selers.forEach(function(selers) {
        let name = Object.keys(selers)[0]
        let data = selers[name]
        let card = `<div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${data['img']}" alt = "product image" />
        <h3>${data["name"]}</h3>
        <h3>${name}</h3>
      </div>
      <div class="flip-card-back">
        <p>${data["about"]}</p>
        <button id="${name}" class="buy-now">Buy Now</button>
      </div>
    </div>
  </div>`
        divSelers.innerHTML += card
    })
})

let btn_buy = document.querySelectorAll(".buy-now")
btn_buy.array.forEach(element => {
    element.addEventListener("click", function(){
        let name_seller = this.id
        localStorage.setItem("name_seller", name_seller)
        window.location.href = "seller.html"
    })
});