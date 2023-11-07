class ItemsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show, :create]

    def index
        items = Item.all
        render json: items
    end
end