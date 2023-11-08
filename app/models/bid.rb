class Bid < ApplicationRecord
    validates :amount, presence: true
    validates :user_id, presence: true
    validates :item_id, presence: true

    belongs_to :user
    belongs_to :item
end
