module PropertiesHelper

  # TODO refactor the oauth stuff? make it more reusable? May need to go in application helper

  def ga_user(aa)
    Legato::User.new(oauth_access_token(aa))
  end

  def oauth_access_token(bb)
    OAuth2::AccessToken.from_hash oauth_client, {:access_token => oauth_token(bb)}
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

  def oauth_token(cc)
    # TODO if oauth token expired use refresh token to get new one
    cc.oauth_token
  end

end