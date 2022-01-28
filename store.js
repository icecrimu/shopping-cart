import items from "./items.json"
import { formatCurrency } from "./util/formatCurrency.js"
const storeItemTemplate = document.querySelector("#store-item-template")
const storeContainer = document.querySelector("[data-store-container]")
const IMAGE_URL = "https://dummyimage.com/420x260/"

export function setupStore() {
  items.forEach(item => {
    renderStoreItems(item)
  })
}

function renderStoreItems(item) {
  const storeItem = storeItemTemplate.content.cloneNode(true)

  const container = storeItem.querySelector("[data-store-item]")
  container.dataset.itemId = item.id

  const name = storeItem.querySelector("[data-name]")
  name.innerText = item.name

  const category = storeItem.querySelector("[data-category]")
  category.innerText = item.category

  const price = storeItem.querySelector("[data-price]")

  price.innerText = formatCurrency(item.priceCents / 100)

  const image = storeItem.querySelector("[data-image]")
  image.src = `${IMAGE_URL}${item.imageColor}/${item.imageColor}`

  storeContainer.appendChild(storeItem)
}