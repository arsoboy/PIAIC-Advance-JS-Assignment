/**
 * Assignment
 * User Information | Object
 *
 * @author  Arsalan Shaikh - Batch#1 CNC25880 <piaic.org>
 * @author  <mascs11@yahoo.com>
 */

document.addEventListener('DOMContentLoaded', ars_init_uinfo_ui)
// DOM render - begin here
function ars_init_uinfo_ui() {
  const rootEl = document.getElementById('root')
  const pageEl = ars_render_page_structure(rootEl)

  // components
  var tabsNav, tabsNavItems, tabsContent, sectionAccount, sectionInfo, sectionCareer
  var radioChoices, choiceEl_education, choiceEl_skills, choiceEl_job, btnEls
  var userProfile = {
    raw: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      cpassword: '',
      contact: '',
      gender: '',
      profession: '',
      address: '',
      city: '',
      province: '',
      zipcode: '',
      education: [],
      skills: [],
      experience: [],
    },
    data: {
      firstname: '',
      lastname: '',
      fullname: '',
      email: '',
      password: '',
      contact: '',
      gender: '',
      profession: '',
      address: '',
      city: '',
      province: '',
      zipcode: '',
      fulladdress: '',
      education: [],
      skills: [],
      experience: []
    },
  }

  // Build elements
  let pageHead = ars_create_page_heading( 'To-Do List!', 1 )
  let tabNavElements = {
    listCont          : { el: ars_create_new_element('ul','', [ ars_get_attr_obj('id', 'sectab-nav'), ars_get_attr_obj('class', 'nav justify-content-center py-2 border-bottom') ] ), prevParent:pageEl },
    listItem_0        : { el: ars_get_navlist_item('Account','user-account', true), prevParent:'listCont' },
    listItem_1        : { el: ars_get_navlist_item('Profile','user-info'), prevParent:'listCont' },
    listItem_2        : { el: ars_get_navlist_item('Career','user-career'), prevParent:'listCont' },
  }
  let tabsContentElements = {
    parentEl          : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'user-form-container my-5') ] ), prevParent:pageEl },
    tabsWrap          : { el: ars_create_new_element('div','', [ ars_get_attr_obj('id', 'sectab'), ars_get_attr_obj('name', 'sectab') ] ), prevParent:'parentEl' },

    formAccount       : { el: ars_create_new_element('form','', [ ars_get_attr_obj('id', 'user-account') ] ), prevParent:'tabsWrap' },
    fieldsetAccount   : { el: ars_create_new_element('fieldset','', [ ars_get_attr_obj('class', 'tab-wrap user-account active') ] ), prevParent:'formAccount' },
    fAccount_email    : { el: ars_get_input_group('Email address', { 'name': 'ufield-email', 'placeholder': 'Enter email', 'type':'email', 'required': true } ), prevParent:'fieldsetAccount' },
    fAccount_pass     : { el: ars_get_input_group('Password', { 'name': 'ufield-password', 'placeholder': 'Enter Password', 'type':'password', 'required': true } ), prevParent:'fieldsetAccount' },
    fAccount_cpass    : { el: ars_get_input_group('Confirm Password', { 'name': 'ufield-cpassword', 'placeholder': 'Re-Type Password', 'type':'password', 'required': true } ), prevParent:'fieldsetAccount' },
    fAccount_btn      : { el: ars_create_new_element('button', 'Continue', [ ars_get_attr_obj('id', 'action-account'), ars_get_attr_obj('class', 'btn btn-primary w-100') ] ), prevParent:'fieldsetAccount' },

    formInfo          : { el: ars_create_new_element('form','', [ ars_get_attr_obj('id', 'user-info') ] ), prevParent:'tabsWrap' },
    fieldsetInfo      : { el: ars_create_new_element('fieldset','', [ ars_get_attr_obj('class', 'tab-wrap user-info'), ars_get_attr_obj('disabled', 'disabled') ] ), prevParent:'formInfo' },
    fInfo_name        : { el:  ars_get_input_group_row([
      { title: 'First Name', name: 'ufield-firstname', type: 'text', placeholder: '', required: true },
      { title: 'Last Name', name: 'ufield-lastname', type: 'text', placeholder: '', required: true },
    ]), prevParent:'fieldsetInfo' },
    fInfo_mobile      : { el: ars_get_input_group( 'Contact Number', { 'name': 'ufield-contact', 'placeholder': 'Landline/Mobile Number', 'required': true } ), prevParent:'fieldsetInfo' },
    fInfo_profession  : { el: ars_get_input_group('Profession',  { 'name': 'ufield-profession', 'default': 'Choose...', 'type':'select', options:['Govt. Employee', 'Pvt. Employee', 'Student', 'Other'], 'required': true, } ), prevParent:'fieldsetInfo' },
    fInfo_gender      : { el: ars_get_input_group('Gender',  { 'name': 'ufield-gender', 'default': 'Male', 'type':'radio', options:['Male', 'Female'], 'required': true, } ), prevParent:'fieldsetInfo' },
    fInfo_address     : { el: ars_get_input_group('Address',  { 'name': 'ufield-address', 'placeholder': '1234 Main St', 'required': true } ), prevParent:'fieldsetInfo' },
    fInfo_addWrap     : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'form-row') ] ), prevParent:'fieldsetInfo' },
    fInfo_city        : { el: ars_get_input_group('City',  { 'name': 'ufield-city', 'required': true }, 'col-md-5' ), prevParent:'fInfo_addWrap' },
    fInfo_province    : { el: ars_get_input_group('Province',  { 'name': 'ufield-province', 'default': 'Choose...', 'type':'select', options:['Balochistan', 'KPK', 'Sindh', 'Punjab' ], 'required': true, }, 'col-md-4' ), prevParent:'fInfo_addWrap' },
    fInfo_zip         : { el: ars_get_input_group('Zip',  { 'name': 'ufield-zip' }, 'col-md-3' ), prevParent:'fInfo_addWrap' },
    fInfo_btn         : { el: ars_create_new_element('button', 'Continue', [ ars_get_attr_obj('id', 'action-info'), ars_get_attr_obj('class', 'btn btn-primary w-100') ] ), prevParent:'fieldsetInfo' },

    formCareer        : { el: ars_create_new_element('form','', [ ars_get_attr_obj('id', 'user-career') ] ), prevParent:'tabsWrap' },
    fieldsetCareer    : { el: ars_create_new_element('fieldset','', [ ars_get_attr_obj('class', 'tab-wrap user-career'), ars_get_attr_obj('disabled', 'disabled') ] ), prevParent:'formCareer' },
    fCareer_eduWrap   : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'education-wrap') ] ), prevParent:'fieldsetCareer' },
    fCareer_eduCtrl   : { el: ars_get_input_group('Add Education',  { 'name': 'ufield-education', 'default': 'Yes', 'type':'radio', options:['Yes', 'No'], 'required': true } ), prevParent:'fCareer_eduWrap' },
    fCareer_eduFwrap  : { el: ars_create_new_element('div','', [ ars_get_attr_obj('id', 'education'), ars_get_attr_obj('class', 'quick-info-form bg-light p-4 mb-4') ] ), prevParent:'fCareer_eduWrap' },
    fCareer_eduTitle  : { el: ars_get_input_group( 'Course Title', { 'name': 'ufield-title', 'placeholder': 'SSC/HSC FA/FSC BSC/BS', 'required': true } ), prevParent:'fCareer_eduFwrap' },
    fCareer_eduInfo   : { el:  ars_get_input_group_row([
      { title: 'Passing year', name: 'ufield-year', required: true },
      { title: 'Grade/CGPA', name: 'ufield-rank', required: true },
    ]), prevParent:'fCareer_eduFwrap' },
    fCareer_eduInst   : { el: ars_get_input_group( 'Institute/Board/Univeristy Name', { 'name': 'ufield-institute', 'required': true } ), prevParent:'fCareer_eduFwrap' },
    fCareer_eduBtn         : { el: ars_create_new_element('button', 'Add Education', [ ars_get_attr_obj('class', 'btn btn-secondary') ] ), prevParent:'fCareer_eduFwrap' },
    fCareer_sklWrap   : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'skills-wrap') ] ), prevParent:'fieldsetCareer' },
    fCareer_sklCtrl   : { el: ars_get_input_group('Add Skills',  { 'name': 'ufield-skills', 'default': 'No', 'type':'radio', options:['Yes', 'No'], 'required': true } ), prevParent:'fCareer_sklWrap' },
    fCareer_sklFwrap  : { el: ars_create_new_element('div','', [ ars_get_attr_obj('id', 'skills'), ars_get_attr_obj('class', 'quick-info-form bg-light p-4 mb-4') ] ), prevParent:'fCareer_sklWrap' },
    fCareer_sklTitle  : { el: ars_get_input_group( 'Skill Title', { 'name': 'ufield-title', 'required': true } ), prevParent:'fCareer_sklFwrap' },
    fCareer_sklBtn    : { el: ars_create_new_element('button', 'Add Skill', [ ars_get_attr_obj('class', 'btn btn-secondary') ] ), prevParent:'fCareer_sklFwrap' },
    fCareer_jobWrap   : { el: ars_create_new_element('div','', [ ars_get_attr_obj('class', 'job-wrap') ] ), prevParent:'fieldsetCareer' },
    fCareer_jobCtrl   : { el: ars_get_input_group('Experience',  { 'name': 'ufield-job', 'default': 'No', 'type':'radio', options:['Yes', 'No'], 'required': true } ), prevParent:'fCareer_jobWrap' },
    fCareer_jobFwrap  : { el: ars_create_new_element('div','', [ ars_get_attr_obj('id', 'experience'), ars_get_attr_obj('class', 'quick-info-form bg-light p-4 mb-4') ] ), prevParent:'fCareer_jobWrap' },
    fCareer_jobTitle  : { el: ars_get_input_group( 'Job Title', { 'name': 'ufield-title', 'required': true } ), prevParent:'fCareer_jobFwrap' },
    fCareer_jobCompany: { el: ars_get_input_group( 'Company Name', { 'name': 'ufield-company', 'required': true } ), prevParent:'fCareer_jobFwrap' },
    fCareer_jobInfo   : { el:  ars_get_input_group_row([
      { title: 'From', name: 'ufield-job-from', type:'date', required: true },
      { title: 'To', name: 'ufield-job-to', type:'date' },
    ]), prevParent:'fCareer_jobFwrap' },
    fCareer_jobBtn    : { el: ars_create_new_element('button', 'Add Record', [ ars_get_attr_obj('class', 'btn btn-secondary') ] ), prevParent:'fCareer_jobFwrap' },

    fCareer_seperator : { el: ars_create_new_element('hr','', [ ars_get_attr_obj('class', 'job-wraps') ] ), prevParent:'fieldsetCareer' },
    fCareer_submitBtn : { el: ars_create_new_element('button', 'Submit & Generate CV', [ ars_get_attr_obj('id', 'action-career'), ars_get_attr_obj('class', 'btn btn-primary w-100') ] ), prevParent:'fieldsetCareer' },
  }

  // Deploy elements.
  ars_render_page_heading(pageEl, pageHead)
  ars_render_nested_HTML(pageEl, tabNavElements)
  ars_render_nested_HTML(pageEl, tabsContentElements)


  tabsNav         = document.querySelector('#sectab-nav')
  tabsNavItems    = tabsNav.querySelectorAll('.nav-link')
  tabsContent     = document.querySelector('#sectab')
  sectionAccount  = document.querySelector('.user-account')
  sectionInfo     = document.querySelector('.user-info')
  sectionCareer   = document.querySelector('.user-career')
  choiceEl_education = document.getElementsByName('ufield-education')
  choiceEl_skills = document.getElementsByName('ufield-skills')
  choiceEl_job    = document.getElementsByName('ufield-job')
  btnEls          = tabsContent.querySelectorAll('button.w-100')
  btnSec          = tabsContent.querySelectorAll('button.btn-secondary')
  radioChoices    = [
    [choiceEl_education, '.education-wrap'],
    [choiceEl_skills, '.skills-wrap'],
    [choiceEl_job, '.job-wrap'],
  ]

  // Show/Hide related form sections
  radioChoices.forEach((item, i) => {
    ars_render_selected_choices(item[0], item[1])    // based on checked values
    ars_choices_ui_controller(item[0], item[1])       // when user click
  })

  // Control tabs visibility
  tabsNavItems.forEach((item, i) => {
    item.addEventListener('click', (e)=>{
      e.preventDefault()
      let refNavs = e.target.closest('ul').querySelectorAll('.nav-link')
      let refTarget = document.querySelector( e.target.getAttribute('href') )
      let refTabs = tabsContent.querySelectorAll('.tab-wrap')

      if( ! refTarget.firstElementChild.disabled ){
        refNavs.forEach((item, i) => { item.classList.remove('active') })
        e.target.classList.add('active')
        refTabs.forEach((item, i) => { item.classList.remove('active') })
        refTarget.firstElementChild.classList.add('active')
      }
    })
  })

  // validate user data & manage sections
  btnEls.forEach((btnItem, i) => {
    btnItem.addEventListener('click', (e)=>{
      e.preventDefault()
      let allowedTypes = ['input', 'checkbox', 'radio', 'select', 'textarea']

      let isError = false
      let tabFormtEl = btnItem.closest('form')
      let tabInputEls = tabFormtEl.querySelectorAll( allowedTypes.join() )

      switch ( btnItem.getAttribute('id') ) {

        // New Case
        case 'action-account':

          let inputEl_email = tabFormtEl.elements['ufield-email']
          let inputEl_pass = tabFormtEl.elements['ufield-password']
          let inputEl_cpass = tabFormtEl.elements['ufield-cpassword']

          tabInputEls.forEach((item, i) => {

            let typeEl = item.getAttribute('type')
            if( !item.value && item.getAttribute('required') ){
              if( ! isError )
                isError = true

              highlight_form_field(item, 'danger')
            }
            else{

              if(typeEl == 'email'){
                if( ! verify_email_address(item.value) ){
                  add_description_el(item, 'Please provide a valid email address.')
                  if( ! isError )
                    isError = true
                }
                else{
                  highlight_form_field(item, 'danger', false)
                }
              }
              else{
                highlight_form_field(item, 'danger')
              }

            }

          })

          if( isError )
            return

          if( inputEl_pass.value != inputEl_cpass.value  ){
            add_description_el(inputEl_pass, 'password unmatched.')
            highlight_form_field(inputEl_pass, 'danger')

            add_description_el(inputEl_cpass, 'password unmatched.')
            highlight_form_field(inputEl_cpass, 'danger')

            if( ! isError )
              isError = true
          }
          else{
            highlight_form_field(inputEl_pass, 'danger', false)
            highlight_form_field(inputEl_cpass, 'danger', false)
          }

          if( ! isError ){

            tabInputEls.forEach((item, i) => {
              let tmpKey = item.name.replace('ufield-', '')
              userProfile.raw[tmpKey] = item.value
              if( tmpKey!='cpassword' && userProfile.raw.hasOwnProperty(tmpKey) )
                userProfile.data[tmpKey] = item.value
            })

            let navActiveItem    = tabsNav.querySelector('.nav-link.active')

            navActiveItem.classList.remove('active')
            navActiveItem.parentNode.nextSibling.firstElementChild.classList.replace('disabled', 'active')
            tabFormtEl.firstElementChild.classList.remove('active')
            tabFormtEl.nextSibling.firstElementChild.disabled = false
            tabFormtEl.nextSibling.firstElementChild.classList.add('active')

          }

          break


        // New Case
        case 'action-info':

          tabInputEls.forEach((item, i) => {
            let typeEl = item.getAttribute('type')

            if( !item.value && item.getAttribute('required') ){
              if( ! isError )
                isError = true

              highlight_form_field(item, 'danger')
            }
            else{
                highlight_form_field(item, 'danger', false)
            }
          })

          if( ! isError ){

            tabInputEls.forEach((item, i) => {
              let tmpKey = item.name.replace('ufield-', '')
              if( userProfile.raw.hasOwnProperty(tmpKey) && userProfile.data.hasOwnProperty(tmpKey) ){
                userProfile.raw[tmpKey] = userProfile.data[tmpKey] = item.value
              }
            })

            userProfile.data.fullname = `${userProfile.data.firstname} ${userProfile.data.lastname}`
            userProfile.data.fulladdress = `${userProfile.data.address}, ${userProfile.data.city} ${userProfile.data.zipcode}, ${userProfile.data.province}`

            let navActiveItem    = tabsNav.querySelector('.nav-link.active')
            navActiveItem.classList.remove('active')
            navActiveItem.parentNode.nextSibling.firstElementChild.classList.replace('disabled', 'active')
            tabFormtEl.firstElementChild.classList.remove('active')
            tabFormtEl.nextSibling.firstElementChild.disabled = false
            tabFormtEl.nextSibling.firstElementChild.classList.add('active')

          }

          break


          // New Case
          case 'action-career':
          let tpl
          if( ! userProfile.raw.education.length > 0){
            alert('You must provide education records.')
            return
          }

          let leTarget = pageEl.parentNode
          leTarget.innerHTML = ''
          tpl = ars_get_resume_tpl_HTML(userProfile.data)
          leTarget.innerHTML = tpl

          break

          //default:

      }

    })
  })

  btnSec.forEach((secBtn, i) => {
    secBtn.addEventListener('click', (e)=>{
      e.preventDefault()
      let allowedTypes = ['input', 'checkbox', 'radio', 'select', 'textarea']

      let isError = false
      let displayBoxEl = secBtn.closest('.quick-info-form')
      let dBoxInputEls = displayBoxEl.querySelectorAll( allowedTypes.join() )
      let refTable, tmpObj = {}

      dBoxInputEls.forEach((field, i) => {
        let typeEl = field.getAttribute('type')
        if( !field.value && field.getAttribute('required') ){
          if( ! isError )
            isError = true
          highlight_form_field(field, 'danger')
        }
        else{
            highlight_form_field(field, 'danger', false)
        }
      })

      if( ! isError ){
        if( userProfile.raw.hasOwnProperty(displayBoxEl.id) && userProfile.data.hasOwnProperty(displayBoxEl.id) ){
          let tableTr=ars_create_new_element('tr','', [ ars_get_attr_obj('class', 'small') ] )
          let tRecs = displayBoxEl.parentNode.querySelectorAll('table tr')
          let recCount = tRecs.length==0 ? tRecs.length+1 : tRecs.length
          ars_render_element( tableTr, ars_create_new_element('th', recCount, [ ars_get_attr_obj('scope', 'row'), ars_get_attr_obj('width', '10%') ] ) )

          dBoxInputEls.forEach((field, i) => {
            let tmpKey = field.name.replace('ufield-', '')
              tmpObj[tmpKey] = field.value
            ars_render_element( tableTr, ars_create_new_element('td',field.value) )
            field.value = null
          })

          // push dynamic object to profile data
          userProfile.raw[displayBoxEl.id].push(tmpObj)
          userProfile.data[displayBoxEl.id].push(tmpObj)

          // render
          refTable = ars_create_ref_table(displayBoxEl)
          ars_render_element(refTable, tableTr)

          dBoxInputEls[0].focus()
        }

      }

    })
  })

}
// DOM render - ends here




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

/**
 * Create Event Trigger - Control selected radio choice's linked elements
 *
 * @params object choiceEl
 * @params object childWrapSelector
 */
function ars_choices_ui_controller(choiceEl, childWrapSelector) {
  choiceEl.forEach((item, i) => {
    item.addEventListener('change', (e)=>{
      e.target.value == 'No'
      ? e.target.closest(childWrapSelector).children[1].classList.add('d-none')
      : e.target.closest(childWrapSelector).children[1].classList.remove('d-none')
    })
  })
}

/**
 * Render pre-selected radio choice's linked elements
 *
 * @params object choiceEl
 * @params object childWrapSelector
 */
function ars_render_selected_choices(choiceEl, childWrapSelector) {
  choiceEl.forEach((item, i) => {
    item.checked && item.value == 'No'
    ? item.closest(childWrapSelector).children[1].classList.add('d-none')
    : item.closest(childWrapSelector).children[1].classList.remove('d-none')
  })
}

/**
 * Create navigation list element
 *
 * @params string email_id
 * @return boolean
 */
function verify_email_address(email_id) {
  let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/
  let valid = String(email_id).search(filter) != -1

  return valid
}

/**
 * Highlight form field
 *
 * @params object formField
 * @params string alertType
 * @params boolean highlightField
 */
function highlight_form_field(formField, alertType='success', highlightField=true) {
  let alertTypeRef = {
    'danger'  : ['text-danger', 'is-invalid'],
    'success' : ['text-success', 'is-valid'],
    'info'    : ['text-info', ''],
  }

  highlightField ? formField.parentElement.classList.add( alertTypeRef[alertType][0]) : formField.parentElement.classList.remove( alertTypeRef[alertType][0])
  highlightField ? formField.classList.add(alertTypeRef[alertType][1]) : formField.classList.remove(alertTypeRef[alertType][1])
}

/**
 * Add/Insert description to field
 *
 * @params object formField
 * @params string msgText
 */
function add_description_el(fieldEl, msgText='') {
  let descEl = ars_create_new_element('div',msgText, [ ars_get_attr_obj('class', 'invalid-feedback') ] )
  ! fieldEl.parentNode.querySelector('.invalid-feedback') ? ars_render_element(fieldEl.parentNode, descEl) : false
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

// ************************************************************ //
// ************************************************************ //

/**
 * Create list item element
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

/**
 * Render list item element
 *
 * @params object listEl
 * @params string itemText
 * @return object|false
 */
function ars_render_list_item(listEl, itemText) {
  if( itemText ){
    return ars_render_element(listEl, ars_get_list_item(itemText) )
  }
  return false
}

/**
 * Create navigation list element
 *
 * @params string title
 * @params string target
 * @params boolean status
 * @return object
 */
function ars_get_navlist_item(title, target, status=false) {
  let tmpItemLi   = ars_create_new_element('li','', [ ars_get_attr_obj('class', 'nav-item') ] )
  let tmpClass    = status ? 'nav-link active' : 'nav-link disabled'
  let nestedTags  = {
    'itemWrap'      : { el: ars_create_new_element('a',title, [ ars_get_attr_obj('href', '#'+target), ars_get_attr_obj('class', tmpClass) ] ), prevParent:tmpItemLi },
  }

  return ars_render_nested_HTML(tmpItemLi, nestedTags)
}

/**
 * Create input group
 *
 * @params string labelTitle
 * @params object fieldAttrs
 * @params string wrapClass
 * @return object
 */
function ars_get_input_group(labelTitle, fieldAttrs, wrapClass='') {
  let tmpElWrap   = ars_create_new_element('div','', [ ars_get_attr_obj('class', 'form-group '+wrapClass ) ] )

  switch (fieldAttrs.type) {
    case 'select':
      return ars_get_dropdown_element(tmpElWrap, labelTitle, fieldAttrs)
      break
    case 'radio':
      return ars_get_radio_element(tmpElWrap, labelTitle, fieldAttrs)
      break
    //default:
  }

  return ars_get_input_element(tmpElWrap, labelTitle, fieldAttrs)
}

/**
 * Create group row element with label & return
 *
 * @params object formElementsObj
 * @return object
 */
function ars_get_input_group_row(formElementsObj) {
  let tmpElWrap   = ars_create_new_element('div','', [ ars_get_attr_obj('class', 'form-group row') ] )
  let tmpColClass = 'col-sm-' + Math.floor( 12 / formElementsObj.length )

  formElementsObj.forEach((item, i) => {
    let tmpColWrap   = ars_create_new_element('div','', [ ars_get_attr_obj('class', tmpColClass) ] )
    let tmpInputEl   = ars_get_input_element(tmpColWrap, item.title, item)
    ars_render_element(tmpElWrap, tmpInputEl)
  })

  return tmpElWrap
}

/**
 * Create input element with label & return
 *
 * @params object parentEl
 * @params string label
 * @params object attrs
 * @return object
 */
function ars_get_input_element(parentEl, label, attrs) {

  let nestedTags, tmpAtts = []
  let fieldDefaultAttrs     = {
    'name': '',
    'type': 'text',
    'placeholder': '',
    'class': 'form-control',
    'required': false,
  }
  let fieldAttrs = Object.assign({...fieldDefaultAttrs}, attrs)
  fieldAttrs.id = fieldAttrs.name
  for (var f_attr in fieldAttrs) {
    if( f_attr=='required' ){
      fieldAttrs[f_attr] ? tmpAtts.push( ars_get_attr_obj(f_attr, f_attr) ) : ''
      continue
    }
    tmpAtts.push( ars_get_attr_obj( f_attr, fieldAttrs[f_attr]) )
  }
  nestedTags  = {
    'labelEl'      : { el: ars_create_new_element('label',label, [ ars_get_attr_obj('for', attrs.name) ]), prevParent:parentEl },
    'inputEl'      : { el: ars_create_new_element('input','', tmpAtts ), prevParent:parentEl },
  }

  return ars_render_nested_HTML(parentEl, nestedTags)
}

/**
 * Create dropdown element with label & return
 *
 * @params object parentEl
 * @params string label
 * @params object attrs
 * @return object
 */
function ars_get_dropdown_element(parentEl, label, attrs) {
  let nestedTags, tmpAtts = []
  let fieldDefaultAttrs     = {
    name      : '',
    type      : 'select',
    default   : '....',
    class     : 'form-control',
    required  : false,
    options   : []
  }
  let fieldAttrs = Object.assign({...fieldDefaultAttrs}, attrs)
  for (var f_attr in fieldAttrs) {
    if( f_attr != 'options' )
      tmpAtts.push( ars_get_attr_obj( f_attr, fieldAttrs[f_attr]) )
  }
  nestedTags  = {
    labelEl      : { el: ars_create_new_element('label',label, [ ars_get_attr_obj('for', attrs.name) ]), prevParent:parentEl },
    selectEl     : { el: ars_create_new_element('select','', tmpAtts ), prevParent:parentEl },
    defaultOpt   : { el: ars_create_new_element('option',fieldAttrs.default, [ ars_get_attr_obj('value', '') ]), prevParent:'selectEl' }
  }

  fieldAttrs.options.forEach((item, i) => {
    nestedTags['option_'+i] = { el: ars_create_new_element('option',item, [ ars_get_attr_obj( 'value', item ) ]), prevParent:'selectEl' }
  })

  return ars_render_nested_HTML(parentEl, nestedTags)
}

/**
 * Create radio element with label & return
 *
 * @params object parentEl
 * @params string label
 * @params object attrs
 * @return object
 */
function ars_get_radio_element(parentEl, label, attrs) {
  let nestedTags, tmpAtts = []
  let fieldDefaultAttrs     = {
    name      : '',
    type      : 'radio',
    default   : 0,
    class     : 'form-check-input',
    required  : false,
    options   : []
  }
  let fieldAttrs = Object.assign({...fieldDefaultAttrs}, attrs)
  for (var f_attr in fieldAttrs) {
    if( f_attr != 'options' && f_attr != 'default' )
      tmpAtts.push( ars_get_attr_obj( f_attr, fieldAttrs[f_attr]) )
  }
  nestedTags  = {
    labelEl      : { el: ars_create_new_element('label',label, [ ars_get_attr_obj('for', attrs.name), ars_get_attr_obj('class', 'd-block') ]), prevParent:parentEl },
  }

  fieldAttrs.options.forEach((item, i) => {
    let blockAttrs = [...tmpAtts]
    blockAttrs.push( ars_get_attr_obj( 'id', fieldAttrs.name+i) )
    blockAttrs.push( ars_get_attr_obj( 'value', item) )
    if( item == fieldAttrs.default ){
      blockAttrs.push( ars_get_attr_obj('checked', 'checked') )
    }
    nestedTags['radioWrap_'+i]  = { el: ars_create_new_element('div','', [ ars_get_attr_obj( 'class', 'form-check form-check-inline small' ) ]), prevParent:parentEl }
    nestedTags['radioInput_'+i] = { el: ars_create_new_element('input','', blockAttrs ), prevParent:'radioWrap_'+i }
    nestedTags['radioLabel_'+i] = { el: ars_create_new_element('label',item, [ ars_get_attr_obj('for', fieldAttrs.name+i), ars_get_attr_obj('class', 'form-check-label') ]), prevParent:'radioWrap_'+i }
  })

  return ars_render_nested_HTML(parentEl, nestedTags)
}

/**
 * Create & Render table structure (if not exists)
 *
 * @params object siblingEl
 * @return object
 */
function ars_create_ref_table(siblingEl) {
  let tableEl, parentEl = siblingEl.parentNode
  if( ! parentEl.querySelector('table > tbody') ){
    let tmpTable = ars_create_new_element('table','', [ ars_get_attr_obj('id', siblingEl.id+'-records'), ars_get_attr_obj('class', 'table table-striped') ] )
    let tableHead = ars_create_new_element('thead','')
    let headRow = ars_create_new_element('tr','')
    let headData = ars_create_new_element('th', siblingEl.id.toUpperCase(), [ ars_get_attr_obj('colspan', '5') ] )
    let tableBody = ars_create_new_element('tbody','')

    ars_render_element( parentEl, tmpTable )
    ars_render_element( tmpTable, tableHead )
    ars_render_element( tableHead, headRow )
    ars_render_element( headRow, headData )
    ars_render_element( tmpTable, tableBody)

    return tableBody
  }

  return parentEl.querySelector('table > tbody')
}

/**
 * Filter & Render data into resume structure
 *
 * @params object data
 * @return string
 */
function ars_get_resume_tpl_HTML(data) {

  let tplString = '<div class="col-lg-8 mt-8"><div id="cv-data" class="container"><table class="table my-5"><thead><tr><th colspan="2" class="h1 m-0 border-0">{{data.fullname}}</th></tr></thead><tbody><tr><td colspan="2" class="font-weight-light border-top-0 pt-0 pb-5">{{data.fulladdress}}</td></tr><tr><th scope="row" class="w-25">Email:</th><td>{{data.email}}</td></tr><tr><th scope="row" class="w-25">Contact:</th><td>{{data.contact}}</td></tr><tr><th scope="row" class="w-25">Gender:</th><td>{{data.gender}}</td></tr><tr><th scope="row" class="w-25">Profession:</th><td>{{data.profession}}</td></tr><tr><th scope="row" class="w-25">Skills:</th><td>{{data.skills}}</ul></td></tr><tr><td colspan="2" class="pys-0 border-top-0"><h4>Education</h4><table class="table table-sm table-striped border-0 text-center my-3"><thead><tr><th>Course Title</th><th>Passing Year</th><th>Grade/CGPA</th><th>Institute</th></tr></thead><tbody>{{data.education}}</tbody></table></td></tr><tr><td colspan="2" class="pys-0 border-top-0"><h4>Experience</h4><table class="table table-sm table-striped border-0 text-center my-3"><thead><tr><th>Job Title</th><th>Employer/Company</th><th>From</th><th>To</th></tr></thead><tbody>{{data.experience}}</tbody></table></td></tr></tbody></table></div></div>'

  for (let j in data) {

    //tplString = tplString.replaceAll(`{{data.${j}}}`, (match)=>{
    tplString = tplString.replace(`{{data.${j}}}`, (match)=>{
      if( typeof data[j]=='string' ){
        return data[j]
      }
      else{
        switch (j) {
          case 'skills':
            let listSkills = data[j].map((val, ind)=>{
              return `<li> ${val.title} </li>`
            })
            return `<ul class="pl-2"> ${listSkills.join('')} </ul>`
            break
          case 'education':
          case 'experience':
            let tableRow = data[j].map((valObj, ind)=>{
              let tableData=[]
              for (var vInd in valObj) {
                tableData.push( `<td> ${valObj[vInd]} </td>` )
              }
              return `<tr> ${tableData.join('')} </tr>`
            })
            return tableRow.join('')
            break
        }
      }
    })

  }

  return tplString
}
