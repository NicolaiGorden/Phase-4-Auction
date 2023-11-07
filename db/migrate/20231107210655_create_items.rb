class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.decimal :start_price
      t.decimal :highest_bid

      t.timestamps
    end
  end
end
