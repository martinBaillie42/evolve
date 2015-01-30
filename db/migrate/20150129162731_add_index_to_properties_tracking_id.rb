class AddIndexToPropertiesTrackingId < ActiveRecord::Migration
  def change
    add_index :properties, :tracking_id, unique: true
  end
end
