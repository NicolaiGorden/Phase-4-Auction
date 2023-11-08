class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_price, :highest_bid

  has_many :bids

  def highest_bid
      if self.object.bids
        self.object.bids.map{|bid| bid.amount}.max()
      else
        self.object.start_price
      end
  end
end
