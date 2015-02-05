json.array!(@variates) do |variate|
  json.extract! variate, :id, :experiment_id, :variate_no, :js_code
  json.url variate_url(variate, format: :json)
end
