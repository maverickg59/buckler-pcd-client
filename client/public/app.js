$(document).ready(function() {
  console.log('ready!')

  $('.search-btn').click(runSearch)

  $('.clear-btn').click(function() {
    event.preventDefault()
    npi = $('.search-box').val('')
    $('.append').empty()
  })
})

function processNpi(data) {
  var npi = data[0].number
  var bizName = data[0].basic.name
  var lastName = data[0].basic.last_name
  var firstName = data[0].basic.first_name
  var credential = data[0].taxonomies[0].desc
  var cityState = data[0].addresses[0].city + ', ' + data[0].addresses[0].state
  var taxZeroCode = data[0].taxonomies[0].code
  var taxOneCode
  var yes = data[0].hasOwnProperty('taxonomies[1]')
  function taxOneExists() {
    if (yes === true) {
      taxOneCode = data[0].taxonomies[1].code
    } else {
      taxOneCode = 'N/A'
    }
  }
  taxOneExists(yes)
  var soleProp = data[0].basic.sole_proprietor
  var orgSubPart
  var sub = data[0].basic.hasOwnProperty('organizational_subpart')
  function subExists() {
    if (sub === true) {
      orgSubPart = data[0].basic.organizational_subpart
    } else {
      orgSubPart = 'N/A'
    }
  }
  subExists(sub)

  $('.append').append(
    `<stong><p class="provider-result">${'NPI: ' +
      npi +
      ' | Business Name: ' +
      bizName +
      ' | Last Name: ' +
      lastName +
      ' | First Name: ' +
      firstName +
      ' | Credentials: ' +
      credential +
      ' | City & State: ' +
      cityState +
      ' | Taxonomy Code One: ' +
      taxZeroCode +
      ' | Taxonomy Code Two: ' +
      taxOneCode +
      ' | Sole Proprietor: ' +
      soleProp +
      ' | Organizational Subpart: ' +
      orgSubPart}</p></strong>`
  )
  console.log(data)
}
function runSearch() {
  event.preventDefault()
  var searchInput = $('.search-box').val()

  $.get('http://localhost:3000/api/v1/new-similars/' + searchInput, function(data) {
    console.log(data)
    // var objLength = Object.keys(data).length
    // var dataArray = Object.values(data)

    data.map(row => {
      $.get('https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?number=' + row.similar, function({ results }) {
        processNpi(results)
      })
    })
  })
}
