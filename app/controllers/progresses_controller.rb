class ProgressesController < ApplicationController

	def create
		name = params[:name]
	  	count = params[:count]
		@user = current_u
		unless @user.nil?
			if Progress.exists?(user_id: @user.id, name: name)
				@prog = @user.progresses.find_by_name(name)
				@prog.update_attributes(status: count)
			else
				@prog = @user.progresses.build(name: name, status: count)
				@prog.save
			end
		end
	end

	def destroy
	end

end
