module UsersHelper
	def avatar_for(u)
		avatar_id = Digest::MD5::hexdigest(u.email.downcase)
		avatar_url = "https://secure.gravatar.com/avatar/#{avatar_id}"
    	image_tag(avatar_url, alt: u.name, class: "avatar")
    end

end
