class Item < ApplicationRecord
    validates :name, presence: true
    validates :start_price, presence: true

    has_many :bids
    has_many :users, through: :bids
end
