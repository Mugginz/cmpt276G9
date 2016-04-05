require 'test_helper'

class CourseFunctionalityTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  def setup
    @c = courses(:one)
    @cgood = {name: "sample", region: "", coords: "[[2,3],[4,5]]"}
    @cbad = {name: "", region: "", coordinates: []}
  end

  test "invalid creation" do
    get create_path
    pre = Course.count
    post create_path, @cbad
    aft = Course.count

	assert_equal(pre, aft)
  end

  test "valid creation" do
  	get create_path
  	pre = Course.count
  	post create_path, @cgood
    aft = Course.count

    assert_not_equal(pre, aft)
  end

end