require 'test_helper'

class MapCheckTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "map-page elements" do
	get map_path
	assert_template 'maps/course'
	
	assert_select "div[class=?]", "map"
   	assert_select "div[id=?]", "map"
 end

  test "create-page elements" do
  	get create_path
  	assert_template 'courses/new'

  	assert_select "div[class=?]", "map"
  	assert_select "div[id=?]", "mapcreate"
  end

end
