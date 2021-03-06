class User < ActiveRecord::Base
  has_many :property_users
  has_many :properties, through: :property_users
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:google_oauth2]

  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)

    data = access_token.info
    #  This PermittedUser test could be much nicer - but will come back to this.
    if PermittedUser.where(:email => data["email"]).exists?
      user = User.where(:email => data["email"]).first
      # Uncomment the section below if you want users to be created if they don't exist
      unless user
        user = User.create(name: data["name"],
          email: data["email"],
          password: Devise.friendly_token[0,20]
        )
      end
      # slightly inelegant but password is required when created, hence lack of DRYness
      user.update(password: Devise.friendly_token[0,20],
          provider: access_token.provider,
          uid: access_token.uid,
          oauth_token: access_token.credentials.token,
          oauth_expires_at: Time.at(access_token.credentials.expires_at)
      )
    end
    user
  end
end
