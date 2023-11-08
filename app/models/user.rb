class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: {message: "already belongs to another user!"}
    validate :password, :must_contain_uppercase

    has_many :bids
    has_many :items, through: :bids

    def must_contain_uppercase
        if password != nil
            unless password.match(/[[:upper:]]/)
                errors.add(:password, message: "must contain an uppercase character!")
            end
        end
    end
end