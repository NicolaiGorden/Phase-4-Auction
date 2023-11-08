class BidsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show, :create]

    def index
        bids = Bid.all
        render json: bids
    end
end