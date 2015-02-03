class CreatePropertyUsers < ActiveRecord::Migration
  def change
    create_table :property_users do |t|
      t.integer :property_id
      t.integer :user_id

      t.timestamps null: false
    end
    add_index :property_users, :property_id
    add_index :property_users, :user_id
    add_index :property_users, [:property_id, :user_id], unique: true
  end
end
