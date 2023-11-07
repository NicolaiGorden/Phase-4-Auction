class Item < ApplicationRecord
    validates :name, presence: true
    validates :start_price, presence: true
end
