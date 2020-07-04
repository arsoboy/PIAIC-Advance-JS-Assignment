/**
 * Assignment
 * Todo UI | DOM
 *
 * @author  Arsalan Shaikh - Batch#1 CNC25880 <piaic.org>
 * @author  <mascs11@yahoo.com>
 */

document.addEventListener('DOMContentLoaded', ars_init_todo_ui);
function ars_init_todo_ui() {
  const rootEl = document.getElementById('root')
  const pageEl = ars_render_page_structure(rootEl)

  let pageHead = ars_create_page_heading( 'To-Do List!', 1 )
  let inputForm, listContainer
  let formElements = {
    parentEl      : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'form-container my-5') ] ), prevParent:pageEl },
    formEl        : { el: ars_create_new_element('form'), prevParent:'parentEl' },
    formDiv       : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'col-auto') ] ), prevParent:'formEl' },
    formLabel     : { el: ars_create_new_element('label', 'What to do?', [ ars_get_attr_obj('class', 'sr-only'), ars_get_attr_obj('for', 'inlineFormInputGroup') ] ), prevParent:'formDiv' },
    inputTextDiv  : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'input-group my-3') ] ), prevParent:'formDiv' },
    fieldIconWrap : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'input-group-prepend') ] ), prevParent:'inputTextDiv' },
    fieldIconDiv  : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'input-group-text') ] ), prevParent:'fieldIconWrap' },
    fieldIcon     : { el: ars_create_new_element('i','', [ ars_get_attr_obj('class', 'fas fa-list-ul') ] ), prevParent:'fieldIconDiv' },
    fieldInput    : { el: ars_create_new_element('input','', [ ars_get_attr_obj('type', 'text'), ars_get_attr_obj('class', 'form-control'), ars_get_attr_obj('id', 'inlineFormInputGroup'), ars_get_attr_obj('placeholder', 'What to do?')  ] ), prevParent:'inputTextDiv' },
    formButton    : { el: ars_create_new_element('button', 'ADD', [ ars_get_attr_obj('class', 'btn btn-primary w-100') ] ), prevParent:'formDiv' },
  }
  let listElements = {
    listWrap      : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'list-items-container') ] ), prevParent:pageEl },
    listCont      : { el: ars_create_new_element('ul','', [ ars_get_attr_obj('class', 'list-group') ] ), prevParent:'listWrap' },
    listItem_0    : { el: ars_get_list_item('Coffee'), prevParent:'listCont' },
    listItem_1    : { el: ars_get_list_item('Milk'), prevParent:'listCont' },
    listItem_2    : { el: ars_get_list_item('Eggs'), prevParent:'listCont' },
    listItem_3    : { el: ars_get_list_item('Sugar'), prevParent:'listCont' },
  }

  pageHead      = ars_render_page_heading(pageEl, pageHead)
  inputForm     = ars_render_input_form(pageEl, formElements)
  listContainer = ars_render_todo_list(pageEl, listElements)

}


/**
 * Render initial page structure
 *
 * @params object rootEl
 * @return object
 */
function ars_render_page_structure( rootEl ) {
  let rowEl = ars_create_new_element('div')
  let colEl = ars_create_new_element('div')

  rowEl.setAttribute('class', 'row justify-content-center')
  colEl.setAttribute('class', 'col-lg-5 mt-5')

  rootEl.classList.add('container')
  ars_render_element(rootEl, rowEl)
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
    headAttrs.push( ars_get_attr_obj('class', 'text-center') )
    headAttrs.push( ars_get_attr_obj('id', 'main-head') )
    let headEl = ars_create_new_element('h'+headLevel, title, headAttrs)

    return headEl;
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
 * Render input form structure
 *
 * @params object parentEl
 * @params object childElementsHeirarchy
 * @return object
 */
function ars_render_input_form(parentEl, childElementsHeirarchy) {
  return ars_render_nested_HTML(parentEl, childElementsHeirarchy)
}

/**
 * Render todolist structure
 *
 * @params object parentEl
 * @params object childElementsHeirarchy
 * @return object
 */
function ars_render_todo_list(parentEl, childElementsHeirarchy) {
  return ars_render_nested_HTML(parentEl, childElementsHeirarchy)
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
  return {'attrName':attrName, 'attrValue':attrValue};
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
    return;

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
    parentNode.insertBefore(newNode, beforeRootEl.childNodes[0]);
  }
  else{
    parentNode.appendChild(newNode);
  }

  return parentNode;
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

    return parentNode;
}

/**
 * Render nested element heirarchy
 *
 * @params string title
 * @return object
 */
function ars_get_list_item(title) {
  let tmpItemLi   = ars_create_new_element('li','', [ ars_get_attr_obj('class', 'list-group-item d-flex justify-content-between align-items-center') ] )
  let nestedTags  = {
    'itemWrap'      : { el: ars_create_new_element('span',title, [ ars_get_attr_obj('class', 'd-inline-block') ] ), prevParent:tmpItemLi },
    'itemEdit'      : { el: ars_create_new_element('i','', [ ars_get_attr_obj('class', 'fas fa-check mr-2 action-event') ] ), prevParent:'itemWrap', 'prepend':true },
    'itemRemove'    : { el: ars_create_new_element('i','', [ ars_get_attr_obj('class', 'fas fa-trash-alt action-event') ] ), prevParent:tmpItemLi },
  }

  return ars_render_nested_HTML(tmpItemLi, nestedTags)
}
