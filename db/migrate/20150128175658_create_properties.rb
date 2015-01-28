class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.string :ga_id
      t.string :name
      t.string :website_url

      t.timestamps null: false
    end
  end
end
