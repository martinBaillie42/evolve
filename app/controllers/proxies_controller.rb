class ProxiesController < ApplicationController

  respond_to :html
  # TODO make any 404s from experiment or variant redirect to current experiment domain
  # http://jerodsanto.net/2014/06/a-step-by-step-guide-to-bulletproof-404s-on-rails/
  # http://zepho.com/rails/books/advanced-rails-recipes_p1_0.pdf catch all 404s

  # Based on http://stackoverflow.com/questions/8891161/rails-proxy-controller-not-pulling-images-through-properly-how-to-modify-approp
  def page

    uri = URI.parse(params.require(:page).permit(:url)[:url])
    # byebug
    response = Net::HTTP.get_response(uri)
    proxy_uri = "#{uri.scheme}://#{uri.host}/"
    # byebug
    # Turn relative uris to absolute
    response.body = response.body.gsub(/(href=")(?<!\/)\/(?!\/)/, "href=\"#{proxy_uri}" )
    response.body = response.body.gsub(/(src=")(?<!\/)\/(?!\/)/, "src=\"#{proxy_uri}" )

    # If the applications scheme is secure then amend the scheme of the uris in the iframe
    if request.scheme == 'https'
      response.body = response.body.gsub("href=\"http://#{uri.host}", "href=\"https://#{uri.host}")
      response.body = response.body.gsub("src=\"http://#{uri.host}", "src=\"https://#{uri.host}")
    end

    # response.body = response.body.gsub('href=\"http://', 'href=\"https://' )
    # response.body = response.body.gsub("href='http://", 'href=\"https://' )
    # response.body = response.body.gsub('src=\"http://', 'src=\"https://' )
    # response.body = response.body.gsub("src='http://", "src='https://" )
    # This is going to need S & R on absolute URLS too.
    render html: response.body.html_safe
  end

  def pagetwo
    path = params.require(:page).permit(:url)[:url]
    path = "http://www.phase-eight.com#{path}"
    uri = URI.parse(path)
    response = Net::HTTP.get_response(uri)
    render text: response.body
  end


  # def assets
  #   uri = URI.parse(params.require(:assets).permit(:url)[:url])
  #   response = Net::HTTP.get_response(uri)
  #   render response.body
  # end
end
