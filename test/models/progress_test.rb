require 'test_helper'

class ProgressTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @u = users(:one)
    @p = Progress.new(name: "Eg", user_id: @u.id)
  end

  test "validity" do
    assert @p.valid?
  end

  test "user id presence" do
    @p.user_id = nil
    assert_not @p.valid?
  end

  test "destroy dependants" do
  	@u.progresses.build(name: "sample", status: 1)
  	before = Progress.count
    @u.destroy
    after = Progress.count
    assert (before == after)
  end
  
end
