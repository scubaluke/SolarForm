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
const selectInputs = document.querySelectorAll('select')


// EVENT LISTENERS 
submitBut.addEventListener('click', validateAndSubmit)
backBut.addEventListener('click', goBack)
nextBut.addEventListener('click', goToNext)




// GO TO NEXT SLIDE
function  goToNext(e) {
    e.preventDefault()
  
    if (validateSlide1()) {
        document.querySelector('.slide-container').style.display = 'none'
        document.querySelector('.slide-container-2').classList.add('show')
    } 
    return
}

// GO BACK 
function goBack(e) {
    e.preventDefault()
    document.querySelector('.slide-container').style.display = 'block'
    document.querySelector('.slide-container-2').classList.remove('show')
}

// validate phone number
async function validatePhone() {
    try {
        const endPoint = 'https://hidden-meadow-85444.herokuapp.com/lookup/'
        const numToFetch = phoneInput.value
        // console.log(numToFetch);
       const result = await fetch(`${endPoint}?phone=${numToFetch}`)
        .then(res => res.json())
        .then(data  => {
            return data
        }).catch(error => {
            console.error('phone validation error: ', error)
        return true;
        })
        // console.log(result);
        const isValid = await result.phoneNumber
        if (isValid) {
            // strip extra characters from phone number and set it
            phoneInput.value = result.phoneNumber.substring(2)
            console.log(phoneInput.value);
            phoneInput.nextElementSibling.textContent = ''
            return true
        } 
        // else if (!result.success) {
        //     phoneInput.nextElementSibling.textContent = ''
        //     return true
        // } 
        else {
           phoneInput.nextElementSibling.textContent = 'Please enter a valid phone number'
           phoneInput.classList.add('required-input')
           return false
        }
    } catch (error) {
        console.error(error);
        return true
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
        // email validation
function emailIsValid (email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
    if (!emailIsValid(form.email_address.value)) {
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
        document.querySelector('.submit-processing').classList.add('show')
        form.submit()
    }
}

function validateSlide1() {
    function showNotValid(select) {
        select.classList.add('required-input')
        select.classList.remove('styled-input')
   }
   function removeRequired(select) {
    select.classList.remove('required-input')
    select.classList.add('styled-input')
   }

    if(!electric_bill.value) {
        showNotValid(electric_bill)
    } else {
        removeRequired(electric_bill)
    }
    if(!utility_provider.value) {
       
        showNotValid(utility_provider)
    } else {
        removeRequired(utility_provider)
    }

    if(!credit_profile.value) {
        showNotValid(credit_profile)
    } else {
        removeRequired(credit_profile)
    }

    if(!income_amount.value) {
        showNotValid(income_amount)
    } else {
        removeRequired(income_amount)
    }
    if(!employment_type.value) {
        showNotValid(employment_type)
    } else {
        removeRequired(employment_type)
    }
    if(!roof_shading.value) {
        showNotValid(roof_shading)
    } else {
        removeRequired(roof_shading)
    }

    if ([...selectInputs].every(input => input.value) && utility_provider.value) {
        return true
    } else {
        return false
    }
}
