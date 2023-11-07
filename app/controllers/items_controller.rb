class ItemsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]

    def index
        items = Item.all
        render json: items
    end

    def show
        item = Item.find_by(id: params[:user_id])
        render json: item
    end

    def create
        item = Item.create(item_params)
        if item.valid?
            render json: item, status: :created
        else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def item_params
        params.permit(:name, :start_price)
    end
end