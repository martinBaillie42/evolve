class CreatePermittedUsers < ActiveRecord::Migration
  def change
    create_table :permitted_users do |t|
      t.string :email

      t.timestamps null: false
    end
  end
end
