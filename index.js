// SET AFID
document.querySelector('#AFID').value = document.referrer.split('AFID=')[1] || '465368'

// TCPA CONSENT 
const agreeInput = document.querySelector('#TCPA')
agreeInput.addEventListener('click', () => document.querySelector('#tcpa_consent').value = 'Yes')

// GLOBAL SELECTORS 
const backBut = document.querySelector('.goBack')
const nextBut = document.querySelector('.next')
const submitBut = document.querySelector('[type=submit]')
const phoneInput = document.querySelector('#phone_home')
const wideInputs = document.querySelectorAll('.wide')
const form = document.querySelector('form')

// EVENT LISTENERS 
submitBut.addEventListener('click', validateAndSubmit)
backBut.addEventListener('click', goBack)
nextBut.addEventListener('click', goToNext)




// GO TO NEXT SLIDE
function  goToNext(e) {
    e.preventDefault()
    const hasEmpty = userInfoValidate()
    if(e.target.id === "check" && hasEmpty){
        alert("All Fields Required")
        return null
    }
    document.querySelector('.slide-container').style.display = 'none'
    document.querySelector('.slide-container-2').classList.add('show')

}

// GO BACK 
function goBack(e) {
    e.preventDefault()
    document.querySelector('.slide-container').style.display = 'block'
    document.querySelector('.slide-container-2').classList.remove('show')
}

// validate phone number
async function validatePhone() {
    const APIKey = ''
    const numToFetch = phoneInput.value
    console.log(numToFetch);
   const result = await fetch(`http://apilayer.net/api/validate?access_key=${APIKey}&number=${numToFetch}
   &country_code=us&format=1`)
    .then(res => res.json())
    .then(data  => {
        return data
    }).catch(error => {
        console.error('phone validation error: ', error)
    return true;
    })
    console.log('phone ran');
    const isValid = await result.valid
    if (isValid) {
        console.log('you may pass');
        phoneInput.nextElementSibling.textContent = ''
        return true
    } 
    // else if (!result.success) {
    //     phoneInput.nextElementSibling.textContent = ''
    //     return true
    // } 
    else {
       phoneInput.nextElementSibling.textContent = 'Please enter a valid phone number'
       return false
    }
}



async function validateAndSubmit(e) {
    e.preventDefault()
    function showNotValid(slide, field) {
        slide.placeholder = `* ${field} Required`
        slide.classList.add('required-input')
        slide.classList.remove('styled-input')
       //  submitBut.disabled = true
   }
   function removeRequired(slide) {
       slide.classList.remove('required-input')
       slide.classList.add('styled-input')
   }

   if (!form.first_name.value) {
        showNotValid(first_name, 'First Name')
    } else {
        removeRequired(first_name)
    }
    if (!form.last_name.value) {
        showNotValid(last_name, 'Last Name')
    } else {
        removeRequired(last_name)
    }
    if (!form.address.value) {
        showNotValid(address, 'Address')
    } else {
        removeRequired(address)
    }
    if (!form.city.value) {
        showNotValid(city, 'City')
    } else {
        removeRequired(city)
    }
    if (!form.state.value) {
        showNotValid(state, 'State')
    } else {
        removeRequired(state)
    }
    if (!form.zip.value) {
        showNotValid(zip, 'Zip Code')
    } else {
        removeRequired(zip)
    }
    if (!form.email_address.value) {
        showNotValid(email_address, 'Email')
    } else {
        removeRequired(email_address)
    }
    let isPhoneValid;
    if (!form.phone_home.value) {
        showNotValid(phone_home, 'Phone Number')
    } else {
        removeRequired(phone_home)
         isPhoneValid = await validatePhone()
    }
    if (!form.TCPA.checked) {
        document.querySelector('.tcpa-required').textContent = '* Required'
        // submitBut.disabled = true
    } else {
        document.querySelector('.tcpa-required').textContent = ''
    }

    if ([...wideInputs].every(input => input.value) && form.TCPA.checked &&  isPhoneValid && emailIsValid(form.email_address.value)) {
        console.log('will submit');
        document.querySelector('.submit-processing').classList.add('show')
    }
}

// validate first slide function

function userInfoValidate(){
    if(
        $("#electric_bill").val() === "" || 
        $("#utility_provider").val() === "" || 
        $("#credit_profile").val() === "" || 
        $("#property_type").val() === "" || 
        $("#property_ownership").val() === "" || 
        $("#roof_shading").val() === ""  
    ) {
        return true;
    }  else {
        return false
    }
}  
