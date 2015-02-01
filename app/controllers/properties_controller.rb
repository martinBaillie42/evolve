class PropertiesController < ApplicationController
  before_action :set_token, only: [:index]
  before_action :set_client, only: [:index]
  before_action :set_access_token, only: [:index]
  before_action :set_ga_user, only: [:index]
  # removed destroy, new and edit

  respond_to :html, :xml, :json

  def index
    @ga_user.web_properties.each do |p|
      # TODO ensure user can only see the ones they are authorised to view
      # TODO performance increase by making this a refresh button action?
      @property = Property.find_by_tracking_id(p.id)
      @property_params = {:tracking_id => p.id, :name => p.name, :website_url => p.website_url}
      if @property.nil?
        create
      else
        update
      end
    end
    @properties = Property.all
    respond_with(@properties)
  end

  def create
    @property = Property.new(@property_params)
    @property.save
  end

  def update
    @property.update(@property_params)
  end

  def show
    # TODO ensure a user can only see a web_property if they still have access
    @property = Property.find(params[:id])
    respond_with(@property)
  end

  private
    # TODO Put set_token, set_client, set_access_token, and set_ga_user somewhere better.
    # Probably in it's own controller. Maybe separate model, maybe User model. Probably to helper function(s)
    def set_token
      # TODO if oauth token expired use refresh token to get new one
      @token = current_user.oauth_token
    end

    def set_client
      @client = OAuth2::Client.new(ENV['CLIENT_ID'], ENV['CLIENT_SECRET'], {
                                                      :authorize_url => 'https://accounts.google.com/o/oauth2/auth',
                                                      :token_url => 'https://accounts.google.com/o/oauth2/token'
                                                  })
      @client.auth_code.authorize_url({
                                         :scope => 'https://www.googleapis.com/auth/analytics',
                                         :redirect_uri => 'http://localhost',
                                         :access_type => 'offline'
                                     })
    end

    def set_access_token
      @access_token = OAuth2::AccessToken.from_hash @client, {:access_token => @token}
    end

    def set_ga_user
      @ga_user = Legato::User.new(@access_token)
    end

end
