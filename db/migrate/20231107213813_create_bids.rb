class CreateBids < ActiveRecord::Migration[7.0]
  def change
    create_table :bids do |t|
      t.decimal :amount
      t.integer :user_id
      t.integer :item_id

      t.timestamps
    end
  end
end
