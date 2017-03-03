'use strict'


var act = document.querySelector('#act');
var request = new XMLHttpRequest(),
    response;

var fragment = document.createDocumentFragment();

function getCommits(commits) {
  var messages = [];
  
  if (!commits) return;
  commits.map(function (commit) {
    messages.push('<li>' + commit.message + '</li>');
  })

  return messages;
}

function addData(data) {
  var li = document.createElement('li')
  if (data.payload.commits) {
    var commits = getCommits(data.payload.commits).join('');
  } else {
    var commits = '';
  }

  li.innerHTML = '<div class="act-item">' +
                  '<div class="act-img"><img width="100%" src="' + data.actor.avatar_url + '" /></div>' +
                  '<div class="act-action"><span>' + data.type.split('Event')[0] + '</span> at ' +
                  '<a href="https://github.com/' + data.repo.name + '" target="_blank">' + data.repo.name + '</a> <span class="act-log">[' + data.created_at + ']</span></div>' +
                  '<ul class="act-commits">' + commits  + '</ul>' +
                 '</div>'
  fragment.appendChild(li);
}

request.onreadystatechange = function () {
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
    response.map(function (data) {
      addData(data);
    });
    act.appendChild(fragment);
  }
};

request.open('GET', 'https://api.github.com/users/leaofelipe/events', false);
request.send();

