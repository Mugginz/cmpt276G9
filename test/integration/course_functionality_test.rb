require 'test_helper'

class CourseFunctionalityTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  def setup
    @c = courses(:one)
  end

  test "invalid creation" do
    get create_path
    pre = Course.count
    post courses_path, course: { name:  "", region: "", coordinates: [] }
    aft = Course.count
	assert_equal(pre, aft)

    assert_template 'courses/index'
  end


  test "valid creation" do
  	get create_path
  	pre = Course.count
	post courses_path, @c
    aft = Course.count
    assert_not_equal(pre, aft)
  end
 
end
