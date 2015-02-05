require 'test_helper'

class VariatesControllerTest < ActionController::TestCase
  setup do
    @variate = variates(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:variates)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create variate" do
    assert_difference('Variate.count') do
      post :create, variate: { experiment_id: @variate.experiment_id, js_code: @variate.js_code, variate_no: @variate.variate_no }
    end

    assert_redirected_to variate_path(assigns(:variate))
  end

  test "should show variate" do
    get :show, id: @variate
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @variate
    assert_response :success
  end

  test "should update variate" do
    patch :update, id: @variate, variate: { experiment_id: @variate.experiment_id, js_code: @variate.js_code, variate_no: @variate.variate_no }
    assert_redirected_to variate_path(assigns(:variate))
  end

  test "should destroy variate" do
    assert_difference('Variate.count', -1) do
      delete :destroy, id: @variate
    end

    assert_redirected_to variates_path
  end
end
