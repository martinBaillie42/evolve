class Experiment < ActiveRecord::Base
  belongs_to :property
  has_many :variates
end
