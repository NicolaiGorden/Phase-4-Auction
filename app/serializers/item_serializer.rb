class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_price, :highest_bid

  has_many :bids
  has_many :users

  def highest_bid
      if self.object.bids.length > 0
        self.object.bids.map{|bid| bid.amount}.max()
      else
        self.object.start_price
      end
  end
end
