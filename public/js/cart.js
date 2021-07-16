/* eslint-disable operator-assignment */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}
// Update cart item total value
function updateCartTotal() {
  const cartItems = document.getElementsByClassName('cart-items')[0]
  const cartRows = cartItems.getElementsByClassName('cart-row')
  let total = 0
  for (let i = 0; i < cartRows.length; i++) {
    cartRow = cartRows[i]
    const priceElement = cartRow.getElementsByClassName('cart-price')[0]
    const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0].getElementsByTagName('input')[0]
    const price = parseFloat(priceElement.innerText.replace('$', ''))
    const quantity = quantityElement.value
    total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = `$${total}`
}

// Remove cart item
function removeCartItem(event) {
  Swal.fire({
    title: 'Are you sure?',
    showCancelButton: true,
    confirmButtonText: 'yes',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      buttonClicked = event.target
      buttonClicked.parentElement.parentElement.remove()
      updateCartTotal()
      Swal.fire('Done', '', 'success')
    }
  })
}
// Cart item quantity change
function quantityChanged(event) {
  const input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}
// Quantity add button
function quantityAdd(event) {
  const { target } = event
  const input = target.parentElement.getElementsByTagName('input')[0]
  input.value++
  updateCartTotal()
}
// Quantity sub button
function quantitySub(event) {
  const { target } = event
  const input = target.parentElement.getElementsByTagName('input')[0]
  if (input.value == 1) {
    input.value = 1
  } else {
    input.value--
  }
  updateCartTotal()
}

// Add item to cart
function addItemToCart(id, title, price, img) {
  const cartContainer = document.createElement('tr')
  cartContainer.classList.add('cart-row')
  cartContainer.dataset.itemId = id
  const cartItems = document.getElementsByClassName('cart-items')[0]
  const cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      Swal.fire('This item is already added to the cart')
      return
    }
  }
  const cartContent = `
  <td class="cart-item-img"> 
  <img src="../${img}" width="50px" height="50px" alt="" srcset=""> </td>
  <td class="cart-item-title">${title}</td>
  <td class="cart-price">${price}</td>
  <td class="cart-quantity-input"> <button class="quantity-sub" >-</button> <input type="text" value="1"> <button class="quantity-add" >+</button> </td>
  <td><input class='danger-button' type="image" width="35" height="35" src="../../img/icons/trash.svg"></td>`
  cartContainer.innerHTML = cartContent
  cartItems.append(cartContainer)
  cartContainer.getElementsByClassName('danger-button')[0].addEventListener('click', removeCartItem)
  cartContainer.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
  cartContainer.getElementsByClassName('quantity-add')[0].addEventListener('click', quantityAdd)
  cartContainer.getElementsByClassName('quantity-sub')[0].addEventListener('click', quantitySub)
}

function addToCartClicked(event) {
  const button = event.target
  const orderItem = button.parentElement
  const title = orderItem.getElementsByClassName('order-item-title')[0].innerText
  const price = orderItem.getElementsByClassName('order-item-price')[0].innerText
  const imageSrc = orderItem.getElementsByClassName('order-item-img')[0].src
  const id = orderItem.dataset.itemId
  addItemToCart(id, title, price, imageSrc)
  updateCartTotal()
  openBox()
}
// Stripe payment
const stripeHandler = StripeCheckout.configure({
  key: stripePublicKey,
  locale: 'en',
  token(token) {
    const items = []
    const cartItemContainer = document.getElementsByClassName('cart-items')[0]
    const cartRows = cartItemContainer.getElementsByClassName('cart-row')
    for (let i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i]
      const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0].getElementsByTagName('input')[0]
      const quantity = quantityElement.value
      const id = cartRow.dataset.itemId
      items.push({
        id,
        quantity,
      })
    }

    fetch('/order-purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        stripeTokenId: token.id,
        items,
      }),
    }).then((res) => res.json()).then((data) => {
      Swal.fire({
        icon: 'success',
        title: data.message,
      })
      closeBox()
      const cartItems = document.getElementsByClassName('cart-items')[0]
      while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
      }
      updateCartTotal()
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  },
})
// Purchase clicked
function purchaseClicked() {
  const priceElement = document.getElementsByClassName('cart-total-price')[0]
  const price = parseFloat(priceElement.innerText.replace('$', '')) * 100
  stripeHandler.open({
    amount: price,
  })
}

// Cart elements buttons catch
function ready() {
  const removeCartItemsButtons = document.getElementsByClassName('danger-button')
  for (let i = 0; i < removeCartItemsButtons.length; i++) {
    const button = removeCartItemsButtons[i]
    button.addEventListener('click', removeCartItem)
  }
  const quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }
  const quantityAddButtons = document.getElementsByClassName('quantity-add')
  for (let i = 0; i < quantityAddButtons.length; i++) {
    button = quantityAddButtons[i]
    button.addEventListener('click', quantityAdd)
  }
  const quantitySubButtons = document.getElementsByClassName('quantity-sub')
  for (let i = 0; i < quantitySubButtons.length; i++) {
    button = quantitySubButtons[i]
    button.addEventListener('click', quantitySub)
  }
  const addToCartButtons = document.getElementsByClassName('order-btn')
  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }
  document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked)
}
