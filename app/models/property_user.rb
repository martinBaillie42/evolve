class PropertyUser < ActiveRecord::Base
  belongs_to :property
  belongs_to :user
  validates :property_id, uniqueness: {scope: :user}
end
