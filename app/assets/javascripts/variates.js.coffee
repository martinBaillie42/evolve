# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

#$(document).ready ->
  $.get('/variates/2.json').success (data) -> console.log data
  $.get('/variates/2.js').success (data) -> console.log data

#  $('.container').html "HELLO"

#  $.ajax
#    url: "http://localhost:3000/variates/2.js"
#    dataType: "js"
#    error: (jqXHR, textStatus, errorThrown) ->
#      $('body').append "AJAX Error: #{textStatus}"
#    success: (data, textStatus, jqXHR) ->
#      console.log data
#      $('body').append "Successful AJAX call: #{data}"
#
#  console.log a