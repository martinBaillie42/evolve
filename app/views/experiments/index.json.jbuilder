json.array!(@experiments) do |experiment|
  json.extract! experiment, :id, :property_id, :name, :date_from, :date_to, :live, :page_url, :unique_identifier, :js_code
  json.url experiment_url(experiment, format: :json)
end
