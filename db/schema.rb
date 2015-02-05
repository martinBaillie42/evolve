# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150205130209) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "experiments", force: true do |t|
    t.integer  "property_id"
    t.string   "name"
    t.datetime "date_from"
    t.datetime "date_to"
    t.boolean  "live"
    t.string   "page_url"
    t.string   "unique_identifier"
    t.text     "js_code"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "experiments", ["name"], name: "index_experiments_on_name", using: :btree
  add_index "experiments", ["property_id", "name"], name: "index_experiments_on_property_id_and_name", unique: true, using: :btree
  add_index "experiments", ["property_id"], name: "index_experiments_on_property_id", using: :btree

  create_table "permitted_users", force: true do |t|
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "properties", force: true do |t|
    t.string   "tracking_id"
    t.string   "name"
    t.string   "website_url"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "properties", ["tracking_id"], name: "index_properties_on_tracking_id", unique: true, using: :btree

  create_table "property_users", force: true do |t|
    t.integer  "property_id"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "property_users", ["property_id", "user_id"], name: "index_property_users_on_property_id_and_user_id", unique: true, using: :btree
  add_index "property_users", ["property_id"], name: "index_property_users_on_property_id", using: :btree
  add_index "property_users", ["user_id"], name: "index_property_users_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "variates", force: true do |t|
    t.integer  "experiment_id"
    t.integer  "variate_no"
    t.text     "js_code"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "variates", ["experiment_id", "variate_no"], name: "index_variates_on_experiment_id_and_variate_no", unique: true, using: :btree
  add_index "variates", ["experiment_id"], name: "index_variates_on_experiment_id", using: :btree

end
