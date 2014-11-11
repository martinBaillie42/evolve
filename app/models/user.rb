class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:google_oauth2]

  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
    data = access_token.info
    user = User.where(:email => data["email"]).first
    # Uncomment the section below if you want users to be created if they don't exist
    unless user
      user = User.create(name: data["name"],
        email: data["email"],
        password: Devise.friendly_token[0,20],
        provider: access_token.provider,
        uid: access_token.uid,
        oauth_token: access_token.credentials.token,
        oauth_expires_at: Time.at(access_token.credentials.expires_at)
      )
    end
    user
  end
end
