class RemoveHighestBidFromItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :items, :highest_bid
  end
end
