require 'test_helper'

class ProgressValidationsTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  def setup 
  	@u = users(:zero)
  	@p = Progress.new(name: "MyString", user_id: @u.id)
  	@pgood = {name: "sample", user_id: @u.id, status: 1, complete: false}
  	@pbad = {name: ""}
  	@pdone = {name: "eg", user_id: @u.id, status:1, complete: true}
  end

  
  test "progress save" do
  	log_in(@u)
  	pre = Progress.count
  	post :progresses, {:name=>"sample", :count=>1, :done=>false}
    aft = Progress.count
    assert_not_equal(pre, aft)
  end

end
