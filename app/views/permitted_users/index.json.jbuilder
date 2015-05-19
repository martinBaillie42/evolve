json.array!(@permitted_users) do |permitted_user|
  json.extract! permitted_user, :id
  json.url permitted_user_url(permitted_user, format: :json)
end
