class AddFieldsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :avatar, :string
    add_column :users, :score, :integer, default: 0
  end
end
