json.array!(@property_users) do |property_user|
  json.extract! property_user, :id, :property_id, :user_id
  json.url property_user_url(property_user, format: :json)
end
