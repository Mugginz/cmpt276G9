class ProgressesController < ApplicationController

	def create
		name = params[:name]
	  	count = params[:count]
	  	done = params[:done]
		@user = current_u
		unless @user.nil?
			if Progress.exists?(user_id: @user.id, name: name)
				@prog = @user.progresses.find_by_name(name)
				if !(@prog.complete)
					@prog.update_attributes(status: count, complete: done)
				end
			else
				@prog = @user.progresses.build(name: name, status: count)
				@prog.update_attributes(complete: done)
				@prog.save
			end
		end
	end

	def show
		@prog = Progress.find(params[:id])
		@prog.update_attributes(complete: false)
		@user = current_u
		redirect_to @user
	end

end
