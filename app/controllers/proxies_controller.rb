class ProxiesController < ApplicationController

  # Based on http://stackoverflow.com/questions/8891161/rails-proxy-controller-not-pulling-images-through-properly-how-to-modify-approp
  def get
    url = URI.parse(params.require(:experiment).permit(:url)[:url])
    response = Net::HTTP.get_response(url)
    byebug
    render html: response.body.html_safe
  end
end
