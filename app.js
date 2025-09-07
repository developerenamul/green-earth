// common function

const removeClass = (className) => {
  const allBtns = document.getElementsByClassName("btn-tree");
  for (const btn of allBtns) {
    btn.classList.remove("active");
  }
};

// 1. =======> LOAD TREE CATEGORIES <======

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

// 1.=======> DISPLAY TREE CATEGORIES <======
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  //   categoriesContainer.innerHTML = "";
  //   get into categories
  for (const category of categories) {
    const { id, category_name } = category;
    const div = document.createElement("div");
    div.className = "my-2";
    div.innerHTML = `
    <button onclick="loadCategoryTrees(${id})"  id="category${id}" class="btn btn-tree lg:w-full">${category_name}</button>
    `;
    categoriesContainer.appendChild(div);
  }
};
// 1.1 ========== LOAD CATEGORY TREES
const loadCategoryTrees = (id) => {
  console.log(id);
  removeClass("btn-tree");
  const clickedBtn = document.getElementById(`category${id}`);
  clickedBtn.classList.add("active");
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const plants = data.plants;
      displayTrees(plants);
    });
};
// 1.2 ========== DISPLAY CATEGORY TREES
// 2. =========> LOAD ALL TRESS <=========

const loadAllTress = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayTrees(data.plants));
};

// 2. =========> DISPLAY ALL TRESS <=========

const displayTrees = (plants) => {
  const cardsContainer = document.getElementById("tree-cards-container");
  cardsContainer.innerHTML = "";
  //   get into each tree
  for (const plant of plants) {
    const { id, image, name, description, category, price } = plant;
    const div = document.createElement("div");
    div.className = "bg-white shadow-sm p-2 card flex flex-col h-[480px]";

    div.innerHTML = `
    
    <figure class="h-[200px]">
        <img class=" w-full h-full object-cover"
      src="${image}"
      alt="${name}" />
      </figure>
      <div class="flex-1">
    <h2 onclick="loadDetails(${id})" class="card-title cursor-pointer">
      ${name}
    </h2>
    <p>${description ? description.slice(0, 60) : "working on it"}</p>
    <div class="flex justify-between my-4">
      <div class="text-[#15803D] px-3 py-1 rounded-full bg-[#DCFCE7]">${category}</div>
      <div class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price}</div>
    </div>
  </div>
  <button class="btn bg-[#15803D] text-white font-bold w-full rounded-full">Add to Cart</button>
    `;
    cardsContainer.append(div);
  }
};

// all tress button control
document.getElementById("all-trees-btn").addEventListener("click", (e) => {
  removeClass("btn-tree");
  e.target.classList.add("active");
  loadAllTress();
});

// =====> load details <======

const loadDetails = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => diplsyDetails(data.plants));
};

// ======> Display Details <========

const diplsyDetails = (plant) => {
  const { name, image, description, category, price } = plant;
  const modalContainer = document.getElementById("modal-container");
  const modalBtn = document.getElementById("my_modal_5");
  modalContainer.innerHTML = "";

  //   create div
  const div = document.createElement("div");
  div.className = "bg-white shadow-sm p-2 card flex flex-col h-[480px]";

  div.innerHTML = `
    
    <figure class="h-[200px]">
        <img class=" w-full h-full object-cover"
      src="${image}"
      alt="${name}" />
      </figure>
      <div class="flex-1">
    <h2 class="card-title cursor-pointer">
      ${name}
    </h2>
    <p>${description ? description : "working on it"}</p>
    <div class="flex justify-between my-4">
      <div class="text-[#15803D] px-3 py-1 rounded-full bg-[#DCFCE7]">${category}</div>
      <div class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price}</div>
    </div>
  </div>
    `;
  modalContainer.append(div);
  modalBtn.showModal();
};

loadCategories();
loadAllTress();
