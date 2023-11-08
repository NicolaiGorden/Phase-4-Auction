class Bid < ApplicationRecord
    validates :amount, presence: true
    validates :user_id, presence: true
    validates :item_id, presence: true
    validates_uniqueness_of :user_id, scope: [:item_id], message: "already bid!"

    belongs_to :user
    belongs_to :item
end
