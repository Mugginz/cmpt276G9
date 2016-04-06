require 'test_helper'

class LayoutTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "static elements" do
  	get root_path
  	assert_template 'statics/home'
  	assert_select "a[href=?]", root_path
  	assert_select "a[href=?]", about_path
  	assert_select "a[href=?]", help_path
    assert_select "a[href=?]", news_path
  end

  test "login lements" do
    get root_path
    assert_select "input[value=?]", "Login"
    assert_select "a[href=?]", signup_url
    assert_select "input[type=?]", "checkbox"
  end

  test "game elements" do
    get root_path
    assert_select "a[href=?]", map_path
    assert_select "a[href=?]", courses_path
  end

end
