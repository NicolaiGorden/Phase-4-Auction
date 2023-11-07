Rails.application.routes.draw do
  get '/hello', to: 'application#hello_world'

  #SESSION
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"

  #USERS
  resources :users, only: [:index, :create, :show]

  #ITEMS
  resources :items, only: [:index, :create, :show]

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
