require 'test_helper'

class StaticsControllerTest < ActionController::TestCase
  def setup
    @basetitle = "Group 9"
  end

  test "get home" do
    get :home
    assert_response :success
    assert_select "title", "#{@basetitle} | Home"
  end

  test "get about" do
    get :about
    assert_response :success
    assert_select "title", "#{@basetitle} | About"
  end

  test "get help" do
    get :help
    assert_response :success
    assert_select "title", "#{@basetitle} | Help"
  end

end
