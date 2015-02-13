# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
  aaa = document.getElementById('foobar').contentWindow
  open = aaa.XMLHttpRequest.prototype.open
  # http://stackoverflow.com/questions/16959359/intercept-xmlhttprequest-and-modify-responsetext
  aaa.XMLHttpRequest.prototype.open = (method, url, async, user, pass) ->

#    url = "/proxy_pagetwo"
    url = "/proxy_pagetwo?page%5Burl%5D=#{url}"

    open.call(this, method, url, async, user, pass)

