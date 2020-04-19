class AddGameIdToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :game_id, :integer, default: 0
  end
end
