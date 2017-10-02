$(document).ready(function(){
  console.log("ready!")

  $(".search-btn").click(function() {
    event.preventDefault();
    var searchInput = $(".search-box").val()

    $.get('http://localhost:3000/api/v1/similars/' + searchInput, function(data) {
        console.log(data)
        var objLength = Object.keys(data).length
        var dataArray = Object.values(data)

        for (var i = 0; i < objLength; i++) {
          $.get("https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?number=" + dataArray[i], function(data) {
            var npi = data.results[0].number;
            var bizName = data.results[0].basic.name;
            var lastName = data.results[0].basic.last_name;
            var firstName = data.results[0].basic.first_name;
            var credential = data.results[0].taxonomies[0].desc;
            var cityState = data.results[0].addresses[0].city + ', ' + data.results[0].addresses[0].state;
            var taxZeroCode = data.results[0].taxonomies[0].code;
            var taxOneCode;
            var yes = data.results[0].hasOwnProperty('taxonomies[1]');
            function taxOneExists() {
              if (yes === true) {
                taxOneCode = data.results[0].taxonomies[1].code;
              } else {
                taxOneCode = 'N/A';
              }
            }
            taxOneExists(yes);
            var soleProp = data.results[0].basic.sole_proprietor;
            var orgSubPart;
            var sub = data.results[0].basic.hasOwnProperty('organizational_subpart');
            function subExists() {
              if (sub === true) {
                orgSubPart = data.results[0].basic.organizational_subpart;
              } else {
                orgSubPart = 'N/A';
              }
            }
            subExists(sub);

            $('.append').append(`<stong><p class="provider-result">${"NPI: " + npi + " | Business Name: " + bizName +
            " | Last Name: " + lastName + " | First Name: " + firstName + " | Credentials: " + credential + " | City & State: " + cityState +
            " | Taxonomy Code One: " + taxZeroCode + " | Taxonomy Code Two: " + taxOneCode + " | Sole Proprietor: " + soleProp +
            " | Organizational Subpart: " + orgSubPart}</p></strong>`)
            console.log(data)
        })
      }
    })

      $(".clear-btn").click(function() {
        event.preventDefault();
        npi = $(".search-box").val("")
        $(".append").empty()
      })
    })
  })

  // 1679576722
  // hello
