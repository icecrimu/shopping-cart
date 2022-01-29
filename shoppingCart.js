import items from "./items.json"
import { formatCurrency } from "./util/formatCurrency"
import addGlobalEventListener from "./util/addGlobalEventListener"
const cartButton = document.querySelector("[data-cart-button]")
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]")
let shoppingCart = []

console.log(shoppingCart)
console.log(loadCart())
const cartItemTemplate = document.querySelector("#cart-item-template")
const cartItemContainer = document.querySelector("[data-cart-item-container]")
const IMAGE_URL = "https://dummyimage.com/210x130/"
const cartQuantity = document.querySelector("[data-cart-quantity]")
const cartTotal = document.querySelector("[data-cart-total]")
const cart = document.querySelector("[data-cart]")
const SESSION_STORAGE_KEY = "SHOPPING_CART-cart"
export function setupShoppingCart() {
  cartButton.addEventListener("click", () => {
    cartItemsWrapper.classList.toggle("invisible")
  })

  addGlobalEventListener("click", "[data-remove-from-cart-button]", e => {
    const id = parseInt(e.target.closest("[data-item]").dataset.itemId)
    removeCartItem(id)
  })
  shoppingCart = loadCart()

  renderCart()
}

export function addToCart(id) {
  const existingItem = shoppingCart.find(entry => entry.id === id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    shoppingCart.push({ id: id, quantity: 1 })
  }
  renderCart()
  saveCart()
}

function removeCartItem(id) {
  const existingItem = shoppingCart.find(entry => entry.id === id)
  if (existingItem == null) return
  shoppingCart = shoppingCart.filter(entry => entry.id !== id)
  renderCart()
  saveCart()
}

function renderCart() {
  if (shoppingCart.length === 0) {
    hideCart()
  } else {
    showCart()
    renderCartItems()
  }
}

function hideCart() {
  cart.classList.add("invisible")
  cartItemsWrapper.classList.add("invisible")
}

function showCart() {
  cart.classList.remove("invisible")
}

function getCartItemsTotal() {
  return shoppingCart.reduce((sum, entry) => {
    const item = items.find(i => entry.id === i.id)
    return sum + item.priceCents * entry.quantity
  }, 0)
}

function renderCartItems() {
  cartItemContainer.innerHTML = ""

  cartQuantity.innerText = shoppingCart.length

  if (shoppingCart.length < 1) {
    cartQuantity.classList.add("invisible")
  } else {
    cartQuantity.classList.remove("invisible")
  }

  const totalCents = getCartItemsTotal()

  cartTotal.innerText = formatCurrency(totalCents / 100)

  shoppingCart.forEach(entry => {
    const item = items.find(i => entry.id === i.id)

    const cartItem = cartItemTemplate.content.cloneNode(true)

    const container = cartItem.querySelector("[data-item]")
    container.dataset.itemId = item.id

    const name = cartItem.querySelector("[data-name]")
    name.innerText = item.name

    const price = cartItem.querySelector("[data-price]")

    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector("[data-quantity]")

      quantity.innerText = `x${entry.quantity}`
    }
    price.innerText = formatCurrency((item.priceCents * entry.quantity) / 100)

    const image = cartItem.querySelector("[data-image]")
    image.src = `${IMAGE_URL}${item.imageColor}/${item.imageColor}`

    cartItemContainer.appendChild(cartItem)
  })
}

function saveCart() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))
}

function loadCart() {
  const cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
  return JSON.parse(cart) || []
}
