json.array!(@properties) do |property|
  json.extract! property, :id, :ga_id, :name, :website_url
  json.url property_url(property, format: :json)
end
