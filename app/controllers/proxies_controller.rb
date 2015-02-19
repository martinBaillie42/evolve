class ProxiesController < ApplicationController
  before_action :set_params

  respond_to :html
  # TODO make any 404s from experiment or variant redirect to current experiment domain
  # http://jerodsanto.net/2014/06/a-step-by-step-guide-to-bulletproof-404s-on-rails/
  # http://zepho.com/rails/books/advanced-rails-recipes_p1_0.pdf catch all 404s

  # Based on http://stackoverflow.com/questions/8891161/rails-proxy-controller-not-pulling-images-through-properly-how-to-modify-approp
  # proxy for the iframe html
  def html
    # uri_string and uri action can be concatenated into a method, but need to fix JS first, so that all uris are absolute
    uri_string = @params[:uri]
    uri = construct_uri_object uri_string
    response = network_response uri

    # Turn relative uris to absolute
    domain = "#{uri.scheme}://#{uri.host}/"
    response.body = response.body.gsub(/(href=")(?<!\/)\/(?!\/)/, "href=\"#{domain}" )
    response.body = response.body.gsub(/(src=")(?<!\/)\/(?!\/)/, "src=\"#{domain}" )

    # If the application's scheme is secure then amend the scheme of the uris
    if request.scheme == 'https'
      response.body = response.body.gsub("href=\"http://#{uri.host}", "href=\"https://#{uri.host}")
      response.body = response.body.gsub("src=\"http://#{uri.host}", "src=\"https://#{uri.host}")
    end

    render html: response.body.html_safe
  end

  # proxy for the ajax actions
  def ajax

    uri_string = @params[:uri]
    # uri_string = "http://www.phase-eight.com#{path_string}"
    uri = construct_uri_object uri_string
    response = network_response uri
    logger.debug "XHR response type #{response.content_type}"
    logger.debug "XHR response body #{response.body.html_safe}"
    render text: response.body
  end

  private

    def set_params
      @params = params.require(:proxy).permit(:uri)
    end

    def network_response (uri_object)
      Net::HTTP.get_response uri_object
    end

    def construct_uri_object(uri_string)
      URI.parse uri_string
    end



end
