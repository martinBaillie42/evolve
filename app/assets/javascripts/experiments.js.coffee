# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
#document.getElementById('variate').contentWindow.onerror (errorMsg, url, lineNumber)->
#  alert(errorMsg)
#stopError = ->
#  return true;

# TODO Convert to vanilla js. Too much hassle to use coffeescript.

#window.onerror = stopError;
# intercept all ajax calls and update url
class AjaxUriIntercept
  constructor: (@iframeId, @proxy, @domain) ->
    @iframe = @getIframe()
    @xmlHttpRequestOpen = @getOpenPrototype()
    @updateOpenPrototype()

  getIframe: =>
    document.getElementById(@iframeId).contentWindow

  getOpenPrototype: =>
    @iframe.XMLHttpRequest.prototype.open

  getScheme: =>
    if window.location.protocol == 'http:' then 'http:' else 'https:'

  updateOpenPrototype: =>
    proxy = @proxy
    domain = @domain
    scheme = @getScheme()
    @iframe.XMLHttpRequest.prototype.open = (method, url, async, user, pass) ->
      url = "#{proxy}=#{scheme}//#{domain}#{url}"
      @xmlHttpRequestOpen.call(this, method, url, async, user, pass)

#     see this http://stackoverflow.com/questions/4917567/coffeescript-timer-and-this-pointer-on-callback
# This could be put into a proxy class with the AjaxUriIntercept. Or both made sub classes of a main Ajax class.
# Needs to be tested on Heroku to see if media subdomains need to be tested.
pollHTML = (iframeId, proxy, domain, delay = 1000) ->
  scheme = if window.location.protocol == 'http:' then 'http:' else 'https:'
  setTimeout( () ->
    $imgs = $("\##{iframeId}").contents().find('img').filter( (i) ->
      uri = $(@).attr('src')
      if not /^(\/proxy)/.test(uri)
        if /^\/[^\/]/.test(uri)
          $(@).attr('src', "#{proxy}=#{scheme}//#{domain}#{uri}")
          true
      false
    )
    if delay < 10000
      pollHTML(iframeId, proxy, domain, delay * 2)
  ,delay)


$(document).ready ->
  iframeId = 'variate'
  proxyUri = '/proxy_ajax?proxy[uri]'
  pageDomain = window.evolveMvt.pageDomain
  experimentIframe = new AjaxUriIntercept(iframeId, proxyUri, pageDomain)
  pollHTML(iframeId, proxyUri, pageDomain)

#$('iframe').ready ->
#  document.getElementById('variate').onerror = ->
#    return: true
