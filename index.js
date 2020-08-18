'use strict';

const searchUrl = 'https://api.github.com/users/'

function getRepo(search){
  $('#results-list').html("")
  let totalUrl = searchUrl + search + '/repos'
  console.log(totalUrl)
  fetch(totalUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson){
  console.log(responseJson)
  for(let i = 0; i<responseJson.length; ++i){
    console.log(responseJson[i].name)
    $('#results-list').append('<li><a href="' +responseJson[i].html_url + '">'+responseJson[i].name+'</a></li>')
  }

  

}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const search = $('#js-search-user').val();
    const maxResults = 10
    getRepo(search);
  });
}

$(watchForm);