class BidSerializer < ActiveModel::Serializer
  attributes :id, :amount, :user_id, :item_id, :username

  def username
    self.object.user.username
  end

end
