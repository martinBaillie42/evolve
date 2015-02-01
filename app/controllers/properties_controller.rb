class PropertiesController < ApplicationController
  # removed destroy, new and edit

  respond_to :html, :xml, :json

  def index
    ga_user.web_properties.each do |p|
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
    # TODO ga_user, oauth_access_token, oauth_client, oauth_token better as instance variables?
    # TODO ga_user, oauth_access_token, oauth_client, oauth_token move to application controller?

    def ga_user
      Legato::User.new(oauth_access_token)
    end

    def oauth_access_token
      OAuth2::AccessToken.from_hash oauth_client, {:access_token => oauth_token}
    end

    def oauth_client
      client = OAuth2::Client.new(ENV['CLIENT_ID'], ENV['CLIENT_SECRET'], {
                                                      :authorize_url => 'https://accounts.google.com/o/oauth2/auth',
                                                      :token_url => 'https://accounts.google.com/o/oauth2/token'
                                                  })
      client.auth_code.authorize_url({
                                         :scope => 'https://www.googleapis.com/auth/analytics',
                                         :redirect_uri => 'http://localhost',
                                         :access_type => 'offline'
                                     })
      client
    end

    def oauth_token
      # TODO if oauth token expired use refresh token to get new one
      current_user.oauth_token
    end

end
