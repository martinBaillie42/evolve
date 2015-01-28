class ChangeGaIdColumnName < ActiveRecord::Migration
  def change
    rename_column :properties, :ga_id, :tracking_id
  end
end
