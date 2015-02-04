class CreateExperiments < ActiveRecord::Migration
  def change
    create_table :experiments do |t|
      t.references :property, index: true
      t.string :name
      t.datetime :date_from
      t.datetime :date_to
      t.boolean :live
      t.string :page_url
      t.string :unique_identifier
      t.text :js_code

      t.timestamps null: false
    end

    add_index :experiments, :name
    add_index :experiments, [:property_id, :name], unique: true

  end
end
