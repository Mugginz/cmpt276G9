require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @u = users(:one)
    @c = Course.new(name: "sample")
  end

  test "validity" do
    assert_not @c.valid?
  end

  test "region agnostic" do
  	@c.coordinates = [[1,2]]
  	@c.region = nil
  	assert @c.valid?
  	@c.region = "string"
  	assert @c.valid?
  end

end
