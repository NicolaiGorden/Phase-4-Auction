class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_price, :highest_bid
end
