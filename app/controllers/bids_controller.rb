class BidsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show, :create, :destroy, :update]
    def index
        bids = Bid.all
        render json: bids
    end

    def create
        bid = Bid.create(bid_params)
        if bid.valid?
            render json: bid, status: :created
        else
            
            render json: { errors: bid.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        bid = Bid.find_by(id: params[:id])
        if bid
            bid.destroy
            head :no_content
        else 
            render json: { error: "bid not found"}, status: :not_found
        end
    end

    def update
        bid = Bid.find_by(id: params[:id])
        if bid
            if bid.update(bid_params)
                bid.update(bid_params)
                render json: bid
            else
                render json: { errors: bid.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: {error: "Bid not found"}, status: :not_found
        end
    end

    private

    def bid_params
        params.permit(:id, :amount, :user_id, :item_id)
    end
end