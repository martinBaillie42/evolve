class Property < ActiveRecord::Base
  has_many :property_users
  has_many :users, through: :property_users
  accepts_nested_attributes_for :property_users, reject_if: :persisted? # http://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html
  validates :tracking_id, uniqueness: { case_sensitive: false }
  # validates :tracking_id, presence: true, on: :update
  # Or maybe http://apidock.com/rails/ActiveRecord/Validations/ClassMethods/validates_uniqueness_of

  # after_update :create_property_user
  #
  # private
  #   def create_property_user
  #     byebug
  #     PropertyUser.create(user_id: 1, property_id: 1)
  #   end
end
