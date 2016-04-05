require 'test_helper'

class CourseListTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  def setup 
  	@courses = Course.all
  end

  test "list generation" do
  	get courses_path
  	@courses.each do |c|
  		assert_select 'input[value=?]', c.name
  	end
  end

end
