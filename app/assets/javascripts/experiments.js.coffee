# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


$(document).ready ->
  console.log 'page'
  # intercept all ajax calls and update url
  aaa = document.getElementById('foobar').contentWindow
  open = aaa.XMLHttpRequest.prototype.open
  # http://stackoverflow.com/questions/16959359/intercept-xmlhttprequest-and-modify-responsetext
  aaa.XMLHttpRequest.prototype.open = (method, url, async, user, pass) ->
    url = "/proxy_ajax?proxy%5Buri%5D=#{url}"
    open.call(this, method, url, async, user, pass)

  # check for and update relative urls in img tags. May not need to be polled
#  (pollHTML = (delay = 1000) ->
#    setTimeout( () ->
#
#      $imgs = $('#foobar').contents().find('img').filter( (i) ->
#
#      )
#
#      pollHTML(delay)
#    ,delay)
#  ).call(this);

  setTimeout () ->
    $imgs = $('#foobar').contents().find('img').filter( (i) ->
      oneTrailingSlash = /^\/(?!\/)/
      proxy = /^(\/proxy)/
      if not $(this).attr('src').match(oneTrailingSlash)
        false
      else if not $(this).attr('src').match(proxy)
        $(this).attr('src', "/proxy_ajax?proxy%5Buri%5D=#{$(this).attr('src')}")
        console.log 'URL', $(this).attr('src')
        true
      else
        false
    )

  , 5000
