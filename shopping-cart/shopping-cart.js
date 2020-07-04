/**
 * Assignment
 * Shopping Cart App | closures
 *
 * @author  Arsalan Shaikh - Batch#1 CNC25880 <piaic.org>
 * @author  <mascs11@yahoo.com>
 */


 const currency = { symbol: 'Rs.', code: 'PKR'}
 const img_dir = 'images/products/'   // Images path
 const fee_gst = 0.17                 // General sale tax 17%
 const fee_shp = 200                  // shipping charges Rs. 200

/**
* CLOSURE - Shopping cart/wishlist
*/
const cart = () => {
 let items = []
 let fee_shipping = totalItems = total = subtotal = 0

 /**
  * Get all cart items list
  *
  * @params
  * @return array
  */
 function get_items() {
   return items
 }

 /**
  * Get single cart item
  *
  * @params string key
  * @return array
  */
 function get_item(key) {
   let result = items.find( ({ itemKey }) => itemKey === key )
   return result || false
 }

 /**
  * Get cart item key & Generate new one (if key not exists)
  *
  * @params string refId
  * @return string
  */
 function getItemKey(refId) {
   let tmpKey = 'ItemKey_' + refId
   let isKeyExists = findItemKey( tmpKey )
   return isKeyExists ? tmpKey : generateItemKey(refId)
 }

 /**
  * add new item to cart list
  *
  * @params object productObj
  * @params integer itemQty
  * @return array|false
  */
 function add_item(productObj, itemQty){
   if( typeof productObj === 'object' && productObj.hasOwnProperty('id') ){

     let tmpItemKey = getItemKey(productObj.id)
     let tmpObj = get_item(tmpItemKey)
     if( tmpObj ){
       tmpObj.qty = tmpObj.qty + itemQty
       tmpObj.total = tmpObj.total + get_product_price(productObj) * itemQty

       subtotal+= get_product_price(productObj) * itemQty    // update cart total
       totalItems += itemQty                                 // update cart totalItems
     }
     else{
       tmpObj = {
         itemKey: tmpItemKey,
         refCode: productObj.sku,
         title: productObj.title,
         img: productObj.img,
         qty: itemQty,
         unit_price: get_product_price(productObj),
         total: get_product_price(productObj) * itemQty
       }
       items.push(tmpObj)
       subtotal+= tmpObj.total                               // update cart total
       totalItems += itemQty                                 // update cart totalItems
     }

     return items
   }
   else {
     return false
   }

 }

 /**
  * update item to cart list
  *
  * @params object productObj
  * @params integer itemQty
  * @return object|false
  */
 function update_item(productObj, itemQty){

   let tmpItemKey = getItemKey(productObj.id)
   let tmpObj = get_item(tmpItemKey)
   if( tmpObj ){
     tmpObj.qty = tmpObj.qty - itemQty
     tmpObj.total = tmpObj.total - get_product_price(productObj) * itemQty

     subtotal-= get_product_price(productObj) * itemQty        // updating cart total
     totalItems -= itemQty                                     // update cart totalItems
     return tmpObj
   } else {
     return false
   }

 }

 /**
  * remove item to cart list
  *
  * @params object productObj
  * @return array|false
  */
 function remove_item(productObj){

   let tmpItemKey = getItemKey(productObj.id)
   let tmpObj = get_item(tmpItemKey)
   let itemLocation = getItemIndex(tmpItemKey)
   if( tmpObj && itemLocation>-1 ){
     subtotal -= tmpObj.total
     totalItems -= tmpObj.qty
     items.splice(itemLocation, 1)
     return items
   } else {
     return false
   }

 }

 /**
  * get product price
  *
  * @params object productObj
  * @return Number|false
  */
 function get_product_price(productObj) {

   if( typeof productObj != 'object' && ! productObj.hasOwnProperty('regular_price') )
     return false

   return productObj.sale_price ? productObj.sale_price : productObj.regular_price
 }

 // ************************************************************ //

 /**
  * PRIVATE - get index/location of cart item
  *
  * @params string key
  * @return integer|false
  */
 function getItemIndex(key) {
   let result = items.findIndex( (item) => item.itemKey === key )
   return result !== -1 ? result : false
 }

 /**
  * PRIVATE - get total quantity of cart items
  *
  * @return integer|false
  */
 function get_formatted_price(priceValue) {
   return `${currency.symbol} ${Number.parseFloat(priceValue).toFixed(2)}`
 }

 /**
  * PRIVATE - get total quantity of cart items
  *
  * @return integer|false
  */
 function get_total_items() {
   return Number.parseInt( totalItems )
 }

 /**
  * PRIVATE - get cart total amount
  *
  * @return string
  */
 function get_total() {
   //console.log(total)
   // Free Shipping over orders 1500 & above.
   fee_shipping = subtotal>=1500 ? 0 : fee_shp
   //let shipping_charges = subtotal>=1500 ? 0 : fee_shp
   let finalTotal = subtotal + fee_shipping
   return `${currency.symbol} ${Number.parseFloat(finalTotal).toFixed(2)}`
 }

 /**
  * PRIVATE - get shipping fee
  *
  * @return string
  */
 function get_fee_shipping() {
   fee_shipping = subtotal>=1500 ? 0 : fee_shp
   return fee_shipping > 0 ? get_formatted_price(fee_shipping) : 'Free'
 }

 /**
  * PRIVATE - get cart subtotal amount
  *
  * @return string
  */
 function get_subtotal() {
   return `${currency.symbol} ${Number.parseFloat(subtotal).toFixed(2)}`
 }

 /**
  * PRIVATE - generate dynamic cart item key
  *
  * @params string refId
  * @return integer|false
  */
 function generateItemKey(refId) {
   return 'ItemKey_' + refId || false
 }

 /**
  * PRIVATE - filter & return cart item key
  *
  * @params object itemObj
  * @return integer|false
  */
 function filterItemKey(itemObj) {
   return itemObj.itemKey || false
 }

 /**
  * PRIVATE - find cart item key
  *
  * @params string key
  * @return bool
  */
 function findItemKey(key) {
   let result = items.find( ({ itemKey }) => itemKey === key )
   return result ? true : false
 }

 // ************************************************************ //

 /**
  * Export public methods
  */
 return {
   get_item,
   get_items,
   add_item,
   update_item,
   remove_item,
   get_formatted_price,
   get_total_items,
   get_fee_shipping,
   get_total,
   get_subtotal,
 }

}


/**
* CLOSURE - Shopping products
*/
const products = () => {

 const list = [
   {
     id: 'ars_01',
     sku: 'UDMARS-01',
     title: 'Navy Blue Crew Neck T-Shirt',
     excerpt: 'Basic cotton crew neck t-shirt in navy blue knitted fabric. Featuring trimmed crew neck & short sleeves with signature contrasting patch at the bottom.',
     regular_price: 1290,
     sale_price: 999,
     img: img_dir + 'UDMARS-01.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_02',
     sku: 'UDMARS-02',
     title: 'Maroon Crew Neck T-Shirt',
     excerpt: 'Basic cotton crew neck t-shirt in maroon knitted fabric. Featuring trimmed crew neck & short sleeves with signature contrasting patch at the bottom.',
     regular_price: 1500,
     sale_price: null,
     img: img_dir + 'UDMARS-02.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_03',
     sku: 'UDMARS-03',
     title: 'Black Crew Neck T-Shirt',
     excerpt: 'Basic cotton crew neck t-shirt in black knitted fabric. Featuring trimmed crew neck & short sleeves with signature contrasting patch at the bottom',
     regular_price: 1500,
     sale_price: 1199,
     img: img_dir + 'UDMARS-03.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_04',
     sku: 'UDMARS-04',
     title: 'White Crew Neck T-Shirt',
     excerpt: 'Basic cotton crew neck t-shirt in white knitted fabric. Featuring trimmed crew neck & short sleeves with contrasting front pocket.',
     regular_price: 1200,
     sale_price: null,
     img: img_dir + 'UDMARS-04.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_05',
     sku: 'UDMARS-05',
     title: 'Blue Checkered Office Shirt',
     excerpt: 'Bring an added hint of freshness to your look with this blue check shirt. Made with fine fabric, it features button down collar with front pocket & long sleeves.',
     regular_price: 3450,
     sale_price: 2588,
     img: img_dir + 'UDMARS-05.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_06',
     sku: 'UDMARS-06',
     title: 'Blue Geometric Motif Printed Shirt',
     excerpt: 'Standout in style in this versatile shirt featuring a stunning geometric motif print pattern.',
     regular_price: 3980,
     sale_price: null,
     img: img_dir + 'UDMARS-06.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_07',
     sku: 'UDMARS-07',
     title: 'Light Blue Half Sleeve Checkered Shirt',
     excerpt: 'Checks are a major trend this summer season. This stylish light blue half sleeve shirt is perfect for everyday office use.',
     regular_price: 2690,
     sale_price: 2018,
     img: img_dir + 'UDMARS-07.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_08',
     sku: 'UDMARS-08',
     title: 'Orange Large Checkered Shirt',
     excerpt: 'Featuring button down collar with contrasting buttons stitch color.',
     regular_price: 2950,
     sale_price: 2213,
     img: img_dir + 'UDMARS-08.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_09',
     sku: 'UDMARS-09',
     title: 'Blue Structured Blazer',
     excerpt: 'This blue structured blazer is a perfect addition to your wardrobe this season.',
     regular_price: 14050,
     sale_price: 10538,
     img: img_dir + 'UDMARS-09.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_10',
     sku: 'UDMARS-10',
     title: 'Ink Blue Sports Blazer',
     excerpt: 'A luxurious sport coat, this ink blue blazer is crafted with incredible attention to detail.',
     regular_price: 14050,
     sale_price: 10538,
     img: img_dir + 'UDMARS-10.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_11',
     sku: 'UDMARS-11',
     title: 'Black Satin Waistcoat',
     excerpt: 'Solid black waistcoat, an ideal choice for workwear or last-minute wedding-outfit in satin fabric.',
     regular_price: 6440,
     sale_price: null,
     img: img_dir + 'UDMARS-11.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_12',
     sku: 'UDMARS-12',
     title: 'Grey Melange Waistcoat',
     excerpt: 'This grey melange waistcoat is a versatile formal look essential. Ideal for your evening.',
     regular_price: 6440,
     sale_price: null,
     img: img_dir + 'UDMARS-12.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_13',
     sku: 'UDMARS-13',
     title: 'Black Sleeveless Vest',
     excerpt: 'Crafted with fine fabric in quilted design, it features same color buttons, side pockets & contrasting inner lining.',
     regular_price: 4400,
     sale_price: null,
     img: img_dir + 'UDMARS-13.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_14',
     sku: 'UDMARS-14',
     title: 'Navy Blue Quilted Coat',
     excerpt: 'This high-performance navy blue quilted coat is going to be your perfect travel jacket.',
     regular_price: 10500,
     sale_price: 7875,
     img: img_dir + 'UDMARS-14.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_15',
     sku: 'UDMARS-15',
     title: 'Charcoal Cable Knitted Zipper',
     excerpt: 'Chunky cable knit sweater with full front zip style is a must have.',
     regular_price: 4900,
     sale_price: 3675,
     img: img_dir + 'UDMARS-15.jpg',
     brand: 'Brumano'
   },
   {
     id: 'ars_16',
     sku: 'UDMARS-16',
     title: 'Charcoal Sleeveless Sweater',
     excerpt: 'Super soft charcoal cable knitted sleeveless v-neck sweater is a great layering piece',
     regular_price: 2850,
     sale_price: null,
     img: img_dir + 'UDMARS-16.jpg',
     brand: 'Brumano'
   },
   /*
   {
     id: 'ars_',
     sku: 'UDMARS-',
     title: '',
     excerpt: '',
     regular_price: ,
     sale_price: null,
     img: img_dir + 'UDMARS-.jpg',
     brand: 'Brumano'
   },
   */

 ]

 /**
  * Get all products list
  *
  * @return array
  */
 function get_products() {
   return list
 }

 /**
  * Get random products list
  *
  * @return array
  */
 function get_random_products() {
   let randList = [...list]
   randList.sort( () => { return 0.5 - Math.random() } )
   return randList
 }

 /**
  * Get single product
  *
  * @params string prodId
  * @return object|false
  */
 function get_single_product(prodId) {
   let result = list.find( ({ id }) => id === prodId )
   return result || false
 }

 // ************************************************************ //

 /**
  * PRIVATE - get product price
  *
  * @params object productObj
  * @return Number|false
  */
 function get_product_price(productObj) {

   if( typeof productObj != 'object' && ! productObj.hasOwnProperty('regular_price') )
     return false

   return productObj.sale_price ? [ `${currency.symbol} ${Number.parseFloat(productObj.regular_price).toFixed(2)}`, `${currency.symbol} ${Number.parseFloat(productObj.sale_price).toFixed(2)}`] : `${currency.symbol} ${Number.parseFloat(productObj.regular_price).toFixed(2)}`
 }

 // ************************************************************ //

 /**
  * Export public methods
  */
 return {
   get_products,
   get_random_products,
   get_single_product,
   get_product_price,
 }

}


document.addEventListener('DOMContentLoaded', ars_init_shopping_cart)
// DOM render - begin here
function ars_init_shopping_cart() {

  const page_cart     = cart()
  const page_products = products()
  var docBody, cartClose, prodBtns

  // Create & render initial page layout
  ars_build_page_ui(page_products, page_cart)

  docBody     = document.body
  cartClose   = document.getElementById('cart-control')
  prodBtns    = document.querySelectorAll('.product-meta .btn')


  // Create Trigger Event - Product buttons
  prodBtns.forEach((item, i) => {
    item.addEventListener('click', (e)=>{
      if(! e.target.dataset.action || e.target.dataset.action != 'cart')
        return

      page_cart.add_item( page_products.get_single_product( e.target.dataset.refid ), 1 )
      ars_sync_render_cart( page_cart )
    })
  })

  // Create Trigger Event - Remove cart item
  document.addEventListener('click', function(e){
   if( e.target && e.target.classList.contains('remove-cart-item') ){
     e.preventDefault()
     if(! e.target.dataset.refid)
       return

     page_cart.remove_item( page_products.get_single_product(e.target.dataset.refid) )
     ars_sync_render_cart( page_cart )
    }
  })

  // Create Trigger Event - Control cart apperance
  cartClose.addEventListener('click', (e)=>{
    if(! e.target.id)
      return

    switch ( docBody.classList.contains('activate-cart') ) {
      case true:
          docBody.classList.remove('activate-cart')
          e.target.firstChild.textContent = '🛒'
        break
      default:
        docBody.classList.add('activate-cart')
        e.target.firstChild.textContent = '×'
    }
  })

}
// DOM render - ends here


/**
 * Render initial page structure
 *
 * @params object rootEl
 * @return object
 */
function ars_render_page_structure( rootDiv ) {
  let wrapEl = ars_create_new_element('div','', [ ars_get_attr_obj('id', 'page-data'), ars_get_attr_obj('class', 'container') ] )
  let rowEl = ars_create_new_element('div','', [ ars_get_attr_obj('class', 'row justify-content-center') ] )
  let colEl = ars_create_new_element('div','', [ ars_get_attr_obj('class', 'col-lg-10 mt-5') ] )

  ars_render_element(rootDiv, wrapEl)
  ars_render_element(wrapEl, rowEl)
  ars_render_element(rowEl, colEl)

  return colEl
}

/**
 * Create page heading element
 *
 * @params string title
 * @params integer headLevel
 * @return object
 */
function ars_create_page_heading(title, headLevel) {
    let headAttrs=[]
    headAttrs.push( ars_get_attr_obj('class', 'display-4 mb-5 text-center') )
    headAttrs.push( ars_get_attr_obj('id', 'main-head') )
    let headEl = ars_create_new_element('h'+headLevel, title, headAttrs)

    return headEl
}

/**
 * Render initial page structure
 *
 * @params object rootEl
 * @return object
 */
function ars_render_page_heading(pageEl, pageHead) {
  return ars_render_element(pageEl, pageHead)
}


/**
 * update cart ui
 *
 * @params object cart
 */
function ars_sync_render_cart( cart ) {
  let docWrap = document.body
  let cartWrap = document.querySelector('.cart-wrap')
  let itemWrap = cartWrap.querySelector('#cart-item-details')
  let cartListEl = itemWrap.querySelector('.cart-list')

  // Update cart
  if(  ! cartListEl ){
    cartListEl = ars_create_new_element('ul','', [ ars_get_attr_obj('class', 'cart-list media-list') ] )
    itemWrap.innerHTML = ''
    ars_render_element(itemWrap, cartListEl)
  }
  else{
    switch (cart.get_total_items()) {
      case 0:
        cartEmptytEl = ars_create_new_element('p','No products in the cart.', [ ars_get_attr_obj('class', 'text-center m-0') ] )
        itemWrap.innerHTML = ''
        ars_render_element(itemWrap, cartEmptytEl)
        break
      //default:
    }
  }

  cartListEl.innerHTML = ''
  cart.get_items().forEach((item, i) => {

    let cartItemWrap = {
      cItemWrap      : { el: ars_create_new_element('li','', [ ars_get_attr_obj('id', 'citem-'+item.itemKey.replace('ItemKey_','') ), ars_get_attr_obj('class', 'cart-item media') ] ), prevParent:cartListEl },
      cItemLeft      : { el: ars_create_new_element('a','', [ ars_get_attr_obj('href', '#'), ars_get_attr_obj('class', 'media-left') ] ), prevParent:'cItemWrap' },
      cItemThumb     : { el: ars_create_new_element('img','', [ ars_get_attr_obj('alt', item.title), ars_get_attr_obj('src', item.img), ars_get_attr_obj('class', 'media-object') ] ), prevParent:'cItemLeft' },
      cItemBody      : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'media-body') ] ), prevParent:'cItemWrap' },
      cItemTitle     : { el: ars_create_new_element('h4', item.title, [ ars_get_attr_obj('class', 'media-heading') ] ), prevParent:'cItemBody' },
      cItemDel       : { el: ars_create_new_element('a','×', [ ars_get_attr_obj('href', '#'),ars_get_attr_obj('data-refId', item.itemKey.replace('ItemKey_','') ), ars_get_attr_obj('class', 'remove-cart-item') ] ), prevParent:'cItemBody' },
      cItemClear     : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'clearfix') ] ), prevParent:'cItemBody' },
      cItemMeta      : { el: ars_create_new_element('p',''), prevParent:'cItemBody' },
      cItemQty       : { el: ars_create_new_element('span',item.qty, [ ars_get_attr_obj('class', 'item-qty') ]), prevParent:'cItemMeta' },
      cItemTimes     : { el: ars_create_new_element('span','x', [ ars_get_attr_obj('class', 'item-icon-times') ]), prevParent:'cItemMeta' },
      cItemPrice     : { el: ars_create_new_element('span', cart.get_formatted_price(item.unit_price), [ ars_get_attr_obj('class', 'price text-italic') ]), prevParent:'cItemMeta' },
    }
    ars_render_nested_HTML(cartListEl, cartItemWrap)
  })

  // update cart footer
  let cartSubTotal = document.querySelector('.subtotal-row')
  let cartTotal = document.querySelector('.grand-total-row')
  let rowShip = document.querySelector('.shipping-row')
  if( cart.get_total_items() > 0){
    if( ! rowShip ){
      let tmpRow = ars_create_new_element('tr','', [ ars_get_attr_obj('class', 'shipping-row') ] )
      let tmpHead = ars_create_new_element('th','Shipping Charges' )
      let tmpData = ars_create_new_element('td', cart.get_fee_shipping() )

      ars_render_element(cartTotal.parentNode, tmpRow, cartTotal.parentNode)
      ars_render_element(tmpRow, tmpHead)
      ars_render_element(tmpRow, tmpData)
    }
    else{
      rowShip.lastChild.innerText = cart.get_fee_shipping()
    }
  }
  else{
    rowShip.remove()
  }

  cartSubTotal.lastChild.innerText = cart.get_subtotal()
  cartTotal.lastChild.innerText = cart.get_total_items() > 0 ? cart.get_total() : cart.get_formatted_price(0)

  cartWrap.querySelector('#cart-control').lastChild.textContent = cart.get_total_items()
  cartWrap.querySelector('#cart-control').firstChild.textContent = '×'

  // Show Cart Sidebar
  docWrap.classList.add('activate-cart')

}

/**
 * Create & render cart sidebar
 *
 * @params object rootDiv
 * @return object
 */
function ars_render_cart_sidebar( rootDiv ) {
  let cartElements = {
    pageNoteBar   : { el: ars_create_new_element('div','Free Delivery on all orders Rs. 1500 & above.', [ ars_get_attr_obj('id', 'page-topbar'), ars_get_attr_obj('class', 'topbar fixed-top') ] ), prevParent:rootDiv },
    cartSidebar   : { el: ars_create_new_element('div','', [ ars_get_attr_obj('id', 'cart-sidebar'), ars_get_attr_obj('class', 'shopping-cart') ] ), prevParent:rootDiv },
    cartWrap      : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'cart-wrap') ] ), prevParent:'cartSidebar' },
    cartHead      : { el: ars_create_new_element('h5','Cart Details', [ ars_get_attr_obj('class', 'my-3 pb-3 text-center border-bottom') ] ), prevParent:'cartWrap' },
    cartControl   : { el: ars_create_new_element('button','🛒', [ ars_get_attr_obj('id', 'cart-control'), ars_get_attr_obj('class', 'btn btn-sm btn-light') ] ), prevParent:'cartWrap' },
    cartCounter   : { el: ars_create_new_element('span',0, [ ars_get_attr_obj('class', 'ccounter') ] ), prevParent:'cartControl' },
    cItemsWrap    : { el: ars_create_new_element('div','', [ ars_get_attr_obj('id', 'cart-item-details'), ars_get_attr_obj('class', 'item-details') ] ), prevParent:'cartWrap' },
    cartEmpty     : { el: ars_create_new_element('p','No products in the cart.', [ ars_get_attr_obj('class', 'text-center m-0') ] ), prevParent:'cItemsWrap' },
    cartFoot      : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'cart-bottom fixed-bottom') ] ), prevParent:'cartWrap' },

    calcWrap      : { el: ars_create_new_element('table','', [ ars_get_attr_obj('class', 'table table-sm cart-calculations') ] ), prevParent:'cartFoot' },
    calcBody      : { el: ars_create_new_element('tbody','' ), prevParent:'calcWrap' },
    subtotalRow   : { el: ars_create_new_element('tr','', [ ars_get_attr_obj('class', 'subtotal-row') ] ), prevParent:'calcBody' },
    subtotalHead  : { el: ars_create_new_element('th','Subtotal' ), prevParent:'subtotalRow' },
    subtotalData  : { el: ars_create_new_element('td','Rs. 0.00' ), prevParent:'subtotalRow' },
    totalRow      : { el: ars_create_new_element('tr','', [ ars_get_attr_obj('class', 'grand-total-row') ] ), prevParent:'calcBody' },
    totalHead     : { el: ars_create_new_element('th','TOTAL' ), prevParent:'totalRow' },
    totalData     : { el: ars_create_new_element('td','Rs. 0.00' ), prevParent:'totalRow' },

    cBtnWrap      : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'btns-bar') ] ), prevParent:'cartFoot' },
    cBtnCart      : { el: ars_create_new_element('a','View cart', [ ars_get_attr_obj('class', 'btn btn-sm btn-primary'), ars_get_attr_obj('href', '#'), ars_get_attr_obj('role', 'button') ] ), prevParent:'cBtnWrap' },
    cBtnCheck     : { el: ars_create_new_element('button','Proceed Checkout', [ ars_get_attr_obj('class', 'btn btn-sm btn-secondary'), ars_get_attr_obj('href', '#'), ars_get_attr_obj('role', 'button') ] ), prevParent:'cBtnWrap' }
  }
  ars_render_nested_HTML(rootDiv, cartElements)

  return cartElements.cartSidebar.el
}

/**
 * Render product data
 *
 * @params object listEl
 * @params object itemObj
 * @return object|false
 */
function ars_render_product_item_tpl(listEl, itemObj) {
  if( itemObj ){
    let nestedTags  = {
      'itemWrap'      : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'product-wrap') ] ), prevParent:listEl },
    }

    return ars_render_nested_HTML(listEl, nestedTags)
  }
  return false
}

/**
 * Render product list item
 *
 * @params object parentEl
 * @params object childElObj
 * @return object
 */
function ars_render_products_list(parentEl, childElObj) {
  return ars_render_nested_HTML(parentEl, childElObj)
}


/*
 **********************************
 **** BUILDING BLOCK FUNCTIONS ****
 **********************************
*/


/**
 * get attribute object
 *
 * @params string attrName
 * @params string attrValue
 * @return object
 */
function ars_get_attr_obj(attrName, attrValue) {
  return {'attrName':attrName, 'attrValue':attrValue}
}

/**
 * Set element attributes
 *
 * @params object elObj
 * @params object attrObj
 * @return object
 */
function ars_set_element_attributes(elObj, attrObj) {
  if( !elObj instanceof Object || !elObj instanceof Array )
    return

  attrObj.forEach( (arr)=>{
    elObj.setAttribute(arr.attrName, arr.attrValue)
  } )
}

/**
 * Create element with text & attributes
 *
 * @params string tagName
 * @params string textContent
 * @params object tagAttrs
 * @return object
 */
function ars_create_new_element(tagName='p', textContent='', tagAttrs) {
  let tmpEl = document.createElement(tagName)
  let tmpTextNode = document.createTextNode(textContent)

  if(tagAttrs)
    ars_set_element_attributes(tmpEl, tagAttrs)

  ars_render_element(tmpEl, tmpTextNode)
  return tmpEl
}

/**
 * Render element
 *
 * @params object parentNode
 * @params object newNode
 * @params object beforeRootEl
 * @return object
 */
function ars_render_element(parentNode, newNode, beforeRootEl=false) {

  if(beforeRootEl){
    parentNode.insertBefore(newNode, beforeRootEl.childNodes[0])
  }
  else{
    parentNode.appendChild(newNode)
  }

  return parentNode
}

/**
 * Render nested element heirarchy
 *
 * @params object parentNode
 * @params object elementObj
 * @return object
 */
function ars_render_nested_HTML(parentNode, elementObj) {
    for (var elObj in elementObj) {
      let tmpPrepend = typeof elementObj[elObj].prepend != 'undefined' ? elementObj[ elementObj[elObj].prevParent ].el : false
      let tmpPar = elementObj[elObj].prevParent instanceof Object ? elementObj[elObj].prevParent : elementObj[ elementObj[elObj].prevParent ].el
      let tmpParent = ars_render_element(tmpPar, elementObj[elObj].el, tmpPrepend )
    }

    return parentNode
}

// Create & render initial page layout
function ars_build_page_ui(products, cart) {

  const rootEl = document.getElementById('root')
  const cartEl = ars_render_cart_sidebar(rootEl)
  const pageEl = ars_render_page_structure(rootEl)
  let pageHead = ars_create_page_heading( 'Shopping Cart App', 1 )
  let listElements = {
    listWrap      : { el: ars_create_new_element('div','', [ ars_get_attr_obj('id', 'products-data') ] ), prevParent:pageEl },
    listCont      : { el: ars_create_new_element('ul','', [ ars_get_attr_obj('class', 'products list-unstyled row') ] ), prevParent:'listWrap' },
  }
  //let productList = products.get_products()
  let productList = products.get_random_products()

  pageHead = ars_render_page_heading(pageEl, pageHead)

  if( productList ){
    productList.map( (e, i)=>{
      let e_price = products.get_product_price(e)

      listElements['listItem_'+i] = { el: ars_create_new_element('li','', [ ars_get_attr_obj('class', 'col-4 product-item my-3') ] ), prevParent:'listCont' }
      listElements['p_wrap_'+i]   = { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'product-wrap') ] ), prevParent:'listItem_'+i }

      listElements['p_imgw_'+i]   = { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'product-image') ] ), prevParent:'p_wrap_'+i }
      listElements['p_img_'+i]    = { el: ars_create_new_element('img','', [ ars_get_attr_obj('alt', e.title), ars_get_attr_obj('src', e.img), ars_get_attr_obj('class', 'img-fluid center-block') ] ), prevParent:'p_imgw_'+i }

      listElements['p_head_'+i]   = { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'product-head') ] ), prevParent:'p_wrap_'+i }
      listElements['p_titl_'+i]   = { el: ars_create_new_element('h3', e.title ), prevParent:'p_head_'+i }

      listElements['p_meta_'+i]   = { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'product-meta') ] ), prevParent:'p_wrap_'+i }

      if( e_price instanceof Array){
        listElements['p_pric_'+i] = { el: ars_create_new_element('span','', [ ars_get_attr_obj('class', 'price') ] ), prevParent:'p_meta_'+i }
        listElements['p_pedl_'+i] = { el: ars_create_new_element('del',e_price[0] ), prevParent:'p_pric_'+i }
        listElements['p_pins_'+i] = { el: ars_create_new_element('ins', e_price[1] ), prevParent:'p_pric_'+i }
      }
      else{
        listElements['p_pric_'+i] = { el: ars_create_new_element('span',e_price, [ ars_get_attr_obj('class', 'price') ] ), prevParent:'p_meta_'+i }
      }

      listElements['p_bbar_'+i]   = { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'btns-bar') ] ), prevParent:'p_meta_'+i }
      listElements['p_cbtn_'+i]   = { el: ars_create_new_element('button','Add to Cart', [ ars_get_attr_obj('class', 'btn btn-sm btn-outline-primary'), ars_get_attr_obj('data-action', 'cart'), ars_get_attr_obj('data-refId', e.id) ] ), prevParent:'p_bbar_'+i }
      listElements['p_wbtn_'+i]   = { el: ars_create_new_element('button','Add to Wishlist', [ ars_get_attr_obj('class', 'btn btn-sm  btn-outline-secondary'), ars_get_attr_obj('data-action', 'wishlist'), ars_get_attr_obj('data-refId', e.id), ars_get_attr_obj('disabled', 'disabled') ] ), prevParent:'p_bbar_'+i }
      listElements['p_binp_'+i]   = { el: ars_create_new_element('input','', [ ars_get_attr_obj('type', 'hidden'), ars_get_attr_obj('value', e.id) ] ), prevParent:'p_bbar_'+i }

    })

  }

  ars_render_products_list(pageEl, listElements)

}
