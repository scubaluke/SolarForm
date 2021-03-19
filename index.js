// SET AFID
document.querySelector('#AFID').value = document.referrer.split('AFID=')[1] || '465368'

// TCPA CONSENT 
const agreeInput = document.querySelector('#TCPA')
agreeInput.addEventListener('click', () => document.querySelector('#tcpa_consent').value = 'Yes')

// NEXT SLIDE
const nextBut = document.querySelector('.next')
nextBut.addEventListener('click', goToNext)

function  goToNext(e) {
    e.preventDefault()
    document.querySelector('.slide-container').style.display = 'none'
    document.querySelector('.slide-container-2').classList.add('show')

}

// go Back
const backBut = document.querySelector('.goBack')
backBut.addEventListener('click', goBack)

function goBack(e) {
    e.preventDefault()
    document.querySelector('.slide-container').style.display = 'block'
    document.querySelector('.slide-container-2').classList.remove('show')
}

// validate phone number
  const phoneInput = document.querySelector('#phone_home')
  phoneInput.addEventListener('blur', validatePhone)
  const submitBut = document.querySelector('[type=submit]')
  submitBut.addEventListener('click', validateAndSubmit)

async function validatePhone() {
    const APIKey = 'pv-d09b6cd0fb52db450f338fd625a61424'
    const numToFetch = phoneInput.value

   const result = await fetch(`https://api.phone-validator.net/api/v2/verify?PhoneNumber=${numToFetch}&CountryCode=us&APIKey=${APIKey}`)
    .then(res => res.json())
    .then(data  => {
        return data
    })
    console.log(result.status);
    if (result.status === 'VALID_CONFIRMED') {
        console.log('you may pass');
        submitBut.disabled = false
    } else {
       console.log( phoneInput.nextElementSibling);
       phoneInput.nextElementSibling.textContent = 'Please enter a valid phone number'
    }
}

function validateAndSubmit(e) {
    e.preventDefault()
   const form = document.querySelector('form')
    if (!form.first_name.value) {
        form.first_name.placeholder  = '* Required'
    }
}