source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.1'

# User security features
gem 'devise', '3.4.1'
gem 'omniauth-google-oauth2', '0.2.6'

# Used by Heroku to set the timeout value. TODO May not be needed?
gem 'rack-timeout', '0.1.0'

# Reference https://www.railstutorial.org/book/user_microposts Listing 11.66
# Add fake data. Ref Listing 9.38
# gem 'faker', '1.4.2'
# Enables pagination. Ref Listing 9.40
# gem 'will_paginate', '3.0.7'
# Enables bootstrap pagination styles. Ref Listing 9.40
# gem 'bootstrap-will_paginate', '0.0.10'
# Provides interface between Rails Sass and Bootstraps LESS. Ref Listing 5.3
gem 'bootstrap-sass', '3.3.3'
# Provides bootstrap scaffolding https://github.com/doabit/bootstrap-sass-extras
gem 'bootstrap-sass-extras', '0.0.6'
# Provides jQuery UI functionality. Included for the draggable function
gem 'jquery-ui-rails', '5.0.3'
# Provides jquery cookie functionality
gem 'jquery-cookie-rails'
# Access the GA API
gem 'legato', '0.4.0'
# Use postgresql as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '5.0.0.beta1'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '2.5.3'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '4.0.1'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use jQuery as the JavaScript library
gem 'jquery-rails', '4.0.0.beta2'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks', '2.3.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '2.2.3'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '3.4.0'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '2.0.0.beta3'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring', '1.1.3'
end

group :test do
  gem 'minitest-reporters', '1.0.5'
  gem 'mini_backtrace',     '0.1.3'
  gem 'guard-minitest',     '2.3.1'
end

group :production do
  gem 'rails_12factor'
end

ruby "2.1.2"
