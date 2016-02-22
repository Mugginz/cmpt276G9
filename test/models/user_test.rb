require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
	def setup
    	@u = User.new(name: "Ex User", email: "user@eg.com",
    			password: "password", password_confirmation: "password")
	end

	test "user validity" do
		assert @u.valid?
	end

	test "name presence" do
    	@u.name = "     "
    	assert_not @u.valid?
	end

	test "email presence" do
		@u.email = "    "
		assert_not @u.valid?
	end

	test "email max length" do
		@u.email = "x" * 249 + "@eg.com"
		assert_not @u.valid?
	end

	test "name max length" do
		@u.name = "x" * 58 
		assert_not @u.valid?
	end

	test "mame min length" do
		@u.name = "x" * 2
		assert_not @u.valid?
	end

	test "valid email formats" do
		valid_formats = %w[lowcase@eg.com UPCASE@CaMeL.cOm U_nder-score@mul.ti.dot two.name@eg.com con+cat@eg.ca]
		valid_formats.each do |addr|
			@u.email = addr
			assert @u.valid?
		end
	end

	test "email uniqueness" do 
		dup_user = @u.dup
		dup_user.email = @u.email.upcase
		@u.save
		assert_not dup_user.valid?
	end

	test "password presence" do
		@u.password = @u.password_confirmation = " " * 7
		assert_not @u.valid?
	end

	test "password min length" do
		@u.password = @u.password_confirmation = "x" * 6
		assert_not @u.valid?
	end

end
