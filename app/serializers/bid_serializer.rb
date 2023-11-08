class BidSerializer < ActiveModel::Serializer
  attributes :id, :amount, :user_id, :item_id
end
