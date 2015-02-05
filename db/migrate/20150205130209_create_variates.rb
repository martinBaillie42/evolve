class CreateVariates < ActiveRecord::Migration
  def change
    create_table :variates do |t|
      t.references :experiment, index: true
      t.integer :variate_no
      t.text :js_code

      t.timestamps null: false

    end
    add_index :variates, [:experiment_id, :variate_no], unique: true
  end
end
