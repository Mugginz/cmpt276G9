ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def logged_in?
  	!session[:uid].nil?
  end

  def integration_test?
      defined?(post_via_redirect)
  end
  
  def log_in(user, options = {})
    password = options[:password] || 'password'
    if integration_test?
      post login_path, session: { email: user.email, password: password }
    else
      session[:user_id] = user.id
    end
  end


end
