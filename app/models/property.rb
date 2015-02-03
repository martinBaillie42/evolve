class Property < ActiveRecord::Base
  has_many :property_users
  has_many :users, through: :property_users
  accepts_nested_attributes_for :property_users # http://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html
  validates :tracking_id, uniqueness: { case_sensitive: false }
  # validates :tracking_id, presence: true, on: :update
  # Or maybe http://apidock.com/rails/ActiveRecord/Validations/ClassMethods/validates_uniqueness_of
end
