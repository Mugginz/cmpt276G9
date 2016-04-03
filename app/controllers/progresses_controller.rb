class ProgressesController < ApplicationController

	def create
		name = params[:name]
	  	count = params[:count]
	  	done = params[:done]
		@user = current_u
		unless @user.nil?
			if Progress.exists?(user_id: @user.id, name: name)
				@prog = @user.progresses.find_by_name(name)
				@prog.update_attributes(status: count, complete: done)
			else
				@prog = @user.progresses.build(name: name, status: count)
				@prog.update_attributes(complete: done)
				@prog.save
			end
		end
	end

	def destroy
	end

end
