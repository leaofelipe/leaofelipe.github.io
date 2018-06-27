'use strict'

var act = document.querySelector('#act')
var request = new XMLHttpRequest()
var response
var fragment = document.createDocumentFragment()
var githubURL = 'https://api.github.com/users/leaofelipe/events?per_page=1'

function addData (data) {
  var date = new Date(data.created_at)
  var formatedDate = date.getFullYear() +
  '.' + date.getMonth() +
  '.' + date.getDate()

  var event = data.type.split('Event')[0]
  var repo = data.repo

  var elm = document.createElement('p')
  elm.innerHTML = formatedDate + ': <span class="action">' + event + '</span> at ' +
  '<a target="_blank" href="https://github.com/' + repo.name + '">' + repo.name + '</a>'

  fragment.appendChild(elm)
  act.appendChild(fragment)
}

request.onreadystatechange = function () {
  if (request.status === 200) {
    response = JSON.parse(request.responseText)
    addData(response[0])
  }
}

request.open('GET', githubURL, false)
request.send()
