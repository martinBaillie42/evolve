class ProxiesController < ApplicationController

  # TODO make any 404s from experiment or variant redirect to current experiment domain
  # http://jerodsanto.net/2014/06/a-step-by-step-guide-to-bulletproof-404s-on-rails/
  # http://zepho.com/rails/books/advanced-rails-recipes_p1_0.pdf catch all 404s

  # Based on http://stackoverflow.com/questions/8891161/rails-proxy-controller-not-pulling-images-through-properly-how-to-modify-approp
  def get
    url = URI.parse(params.require(:experiment).permit(:url)[:url])
    response = Net::HTTP.get_response(url)
    response.body = response.body.gsub(/(href=")(?<!\/)\/(?!\/)/, "href=\"#{url}" )
    response.body = response.body.gsub(/(src=")(?<!\/)\/(?!\/)/, "src=\"#{url}" )
    render html: response.body.html_safe
  end
end
