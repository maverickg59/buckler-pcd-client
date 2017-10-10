// const NPI_REGISTRY_URL = ''

$(document).ready(function() {
  console.log('ready!')

  $('.search-btn').click(runSearch)

  $('.clear-btn').click(function() {
    event.preventDefault()
    npi = $('.search-box').val('')
    $('.append').empty()
  })
})
function processFirstNpi(data) {
  let npi = data[0].number
  let bizName = data[0].basic.name
  let lastName = data[0].basic.last_name
  let firstName = data[0].basic.first_name
  let credential = data[0].basic.credential
  let cityState = data[0].addresses[0].city + ', ' + data[0].addresses[0].state
  let taxZeroCode = data[0].taxonomies[0].code
  let taxOneCode
  let yes = data[0].hasOwnProperty('taxonomies[1]')
  function taxOneExists() {
    if (yes === true) {
      taxOneCode = data[0].taxonomies[1].code
    } else {
      taxOneCode = 'N/A'
    }
  }
  taxOneExists(yes)
  let soleProp = data[0].basic.sole_proprietor
  let orgSubPart
  let sub = data[0].basic.hasOwnProperty('organizational_subpart')
  function subExists() {
    if (sub === true) {
      orgSubPart = data[0].basic.organizational_subpart
    } else {
      orgSubPart = 'N/A'
    }
  }
  subExists(sub)

  $('.append').append(
    `
    <table style="width:100%">
      <tr>
        <th style="width:10%">Given NPI:</th>
        <th style="width:10%">Business Name:</th>
        <th style="width:10%">Last:</th>
        <th style="width:10%">First:</th>
        <th style="width:10%">Credential:</th>
        <th style="width:10%">City & State:</th>
        <th style="width:10%">Taxonomy One:</th>
        <th style="width:10%">Taxonomy Two:</th>
        <th style="width:10%">Sole Proprietor:</th>
        <th style="width:10%">Org Subpart:</th>
      </tr>
      <tr class="coloredFirst">
        <td style="width:10%">${npi}</td>
        <td style="width:10%">${bizName}</td>
        <td style="width:10%">${lastName}</td>
        <td style="width:10%">${firstName}</td>
        <td style="width:10%">${credential}</td>
        <td style="width:10%">${cityState}</td>
        <td style="width:10%">${taxZeroCode}</td>
        <td style="width:10%">${taxOneCode}</td>
        <td style="width:10%">${soleProp}</td>
        <td style="width:10%">${orgSubPart}</td>
      </tr>
    </table>
    `
  )
  console.log(data)
}
function processNpi(data) {
  let npi = data[0].number
  let bizName = data[0].basic.name
  let lastName = data[0].basic.last_name
  let firstName = data[0].basic.first_name
  let credential = data[0].basic.credential
  let cityState = data[0].addresses[0].city + ', ' + data[0].addresses[0].state
  let taxZeroCode = data[0].taxonomies[0].code
  let taxOneCode
  let yes = data[0].hasOwnProperty('taxonomies[1]')
  function taxOneExists() {
    if (yes === true) {
      taxOneCode = data[0].taxonomies[1].code
    } else {
      taxOneCode = 'N/A'
    }
  }
  taxOneExists(yes)
  let soleProp = data[0].basic.sole_proprietor
  let orgSubPart
  let sub = data[0].basic.hasOwnProperty('organizational_subpart')
  function subExists() {
    if (sub === true) {
      orgSubPart = data[0].basic.organizational_subpart
    } else {
      orgSubPart = 'N/A'
    }
  }
  subExists(sub)

  $('.append').append(
    `
    <table style="width:100%">
      <tr>
        <th style="width:10%">NPI:</th>
        <th style="width:10%">Business Name:</th>
        <th style="width:10%">Last:</th>
        <th style="width:10%">First:</th>
        <th style="width:10%">Credential:</th>
        <th style="width:10%">City & State:</th>
        <th style="width:10%">Taxonomy One:</th>
        <th style="width:10%">Taxonomy Two:</th>
        <th style="width:10%">Sole Proprietor:</th>
        <th style="width:10%">Org Subpart:</th>
      </tr>
      <tr class="coloredSecond">
        <td style="width:10%">${npi}</td>
        <td style="width:10%">${bizName}</td>
        <td style="width:10%">${lastName}</td>
        <td style="width:10%">${firstName}</td>
        <td style="width:10%">${credential}</td>
        <td style="width:10%">${cityState}</td>
        <td style="width:10%">${taxZeroCode}</td>
        <td style="width:10%">${taxOneCode}</td>
        <td style="width:10%">${soleProp}</td>
        <td style="width:10%">${orgSubPart}</td>
      </tr>
    </table>
    `
  )
  console.log(data)
}
function runSearch() {
  event.preventDefault()
  let searchInput = $('.search-box').val()
  $.get('https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?number=' + searchInput, function({ results }) {
    processFirstNpi(results)
  }).then

  $.get('https://cors-anywhere.herokuapp.com/https://buckler-pcd.herokuapp.com/api/v1/new-similars/' + searchInput, function(data) {
    data.map(row => {
      $.get('https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?number=' + row.similar, function({ results }) {
        processNpi(results)
      })
    })
  })
}
