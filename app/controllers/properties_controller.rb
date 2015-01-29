class PropertiesController < ApplicationController
  before_action :set_property, only: [:show, :edit, :update, :destroy]
  before_action :set_token, only: [:index]
  before_action :set_client, only: [:index]
  before_action :set_access_token, only: [:index]
  before_action :set_ga_user, only: [:index]

  respond_to :html, :xml, :json

  def index
    @properties = Property.all
    respond_with(@properties)
  end

  def show
    respond_with(@property)
  end

  def new
    @property = Property.new
    respond_with(@property)
  end

  def edit
  end

  def create
    @property = Property.new(property_params)
    @property.save
    respond_with(@property)
  end

  def update
    @property.update(property_params)
    respond_with(@property)
  end

  def destroy
    @property.destroy
    respond_with(@property)
  end

  private
    def set_property
      @property = Property.find(params[:id])
    end

    def property_params
      params.require(:property).permit(:tracking_id, :name, :website_url)
    end

    # TODO Put set_token, set_client, set_access_token, and set_ga_user somewhere better
    def set_token
      @token = current_user.oauth_token
    end

    def set_client
      @client = OAuth2::Client.new(ENV['CLIENT_ID'], ENV['CLIENT_SECRET'], {
                                                      :authorize_url => 'https://accounts.google.com/o/oauth2/auth',
                                                      :token_url => 'https://accounts.google.com/o/oauth2/token'
                                                  })
      @client.auth_code.authorize_url({
                                         :scope => 'https://www.googleapis.com/auth/analytics.readonly',
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
