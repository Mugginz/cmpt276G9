Rails.application.routes.draw do

  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'

  get 'home' => 'statics#home'
  get 'about'=> 'statics#about'
  get 'news' => 'statics#news'
  get 'help' => 'statics#help'
  get 'signup' => 'users#new'
  get 'create' => 'courses#new'
  
<<<<<<< HEAD
  get 'course_twitter' => 'maps#course_twitter'
  get 'course' => 'maps#course'
  post 'course' => 'maps#update'
  patch 'course' => 'maps#update'
  
=======
  get 'map' => 'maps#course'
  post 'map' => 'maps#update'
  patch 'map' => 'maps#update'

  post 'create' => 'courses#create'
>>>>>>> 32241b43c02b01c10572fbe56984cc44ef430ab2

  resources :users
  resources :courses

  root 'statics#home'

  get 'location' => 'maps#location'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
