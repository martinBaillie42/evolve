# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
  aaa = document.getElementById('foobar').contentWindow
  open = aaa.XMLHttpRequest.prototype.open
  # http://stackoverflow.com/questions/16959359/intercept-xmlhttprequest-and-modify-responsetext
  aaa.XMLHttpRequest.prototype.open = (method, url, async, user, pass) ->
    # Do some stuff in here to modify the responseText
#    this.addEventListener('readystatechange', ->
#
#      return
#    , false);
    if url.indexOf('http://www.phase-eight.com') == -1
      url = "http://www.phase-eight.com#{url}"
    console.log(url)
    #    console.log(this)
    open.call(this, method, url, async, user, pass)

