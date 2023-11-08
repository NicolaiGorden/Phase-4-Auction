class Bid < ApplicationRecord
    validates :amount, presence: true
    validate :amount, :exceeds_highest
    validates :user_id, presence: true
    validates :item_id, presence: true
    validates_uniqueness_of :user_id, scope: [:item_id], message: "already bid!"

    belongs_to :user
    belongs_to :item

    def exceeds_highest
        if item.bids.map{|bid| bid.amount}.max()
            unless (amount > item.bids.map{|bid| bid.amount}.max())  
                errors.add(:amount, message: "must exceed current highest bid!")
            end
        else
            unless (amount > item.start_price)  
            errors.add(:amount, message: "must exceed current highest bid!")
            end
        end
    end
end

# item.start_price