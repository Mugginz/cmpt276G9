module ApplicationHelper
	def full_title(partial_title = "")
		base_title = "GroupNine"
		if partial_title.empty?
			base_title
		else
			base_title + " | " + partial_title
		end
	end

end
