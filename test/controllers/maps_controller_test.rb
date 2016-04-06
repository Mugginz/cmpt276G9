require 'test_helper'

class MapsControllerTest < ActionController::TestCase
  test "should get map" do
    get :course
    assert_response :success
  end

end
