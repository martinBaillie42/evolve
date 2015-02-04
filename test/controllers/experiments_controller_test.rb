require 'test_helper'

class ExperimentsControllerTest < ActionController::TestCase
  setup do
    @experiment = experiments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:experiments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create experiment" do
    assert_difference('Experiment.count') do
      post :create, experiment: { date_from: @experiment.date_from, date_to: @experiment.date_to, js_code: @experiment.js_code, live: @experiment.live, name: @experiment.name, page_url: @experiment.page_url, property_id: @experiment.property_id, unique_identifier: @experiment.unique_identifier }
    end

    assert_redirected_to experiment_path(assigns(:experiment))
  end

  test "should show experiment" do
    get :show, id: @experiment
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @experiment
    assert_response :success
  end

  test "should update experiment" do
    patch :update, id: @experiment, experiment: { date_from: @experiment.date_from, date_to: @experiment.date_to, js_code: @experiment.js_code, live: @experiment.live, name: @experiment.name, page_url: @experiment.page_url, property_id: @experiment.property_id, unique_identifier: @experiment.unique_identifier }
    assert_redirected_to experiment_path(assigns(:experiment))
  end

  test "should destroy experiment" do
    assert_difference('Experiment.count', -1) do
      delete :destroy, id: @experiment
    end

    assert_redirected_to experiments_path
  end
end
