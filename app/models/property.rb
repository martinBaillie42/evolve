class Property < ActiveRecord::Base
  validates :tracking_id, uniqueness: { case_sensitive: false }
  # validates :tracking_id, presence: true, on: :update
  # Or maybe http://apidock.com/rails/ActiveRecord/Validations/ClassMethods/validates_uniqueness_of
end
