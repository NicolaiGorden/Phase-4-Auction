class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_price


  has_many :bids
end
