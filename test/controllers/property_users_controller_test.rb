require 'test_helper'

class PropertyUsersControllerTest < ActionController::TestCase
  setup do
    @property_user = property_users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:property_users)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create property_user" do
    assert_difference('PropertyUser.count') do
      post :create, property_user: { property_id: @property_user.property_id, user_id: @property_user.user_id }
    end

    assert_redirected_to property_user_path(assigns(:property_user))
  end

  test "should show property_user" do
    get :show, id: @property_user
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @property_user
    assert_response :success
  end

  test "should update property_user" do
    patch :update, id: @property_user, property_user: { property_id: @property_user.property_id, user_id: @property_user.user_id }
    assert_redirected_to property_user_path(assigns(:property_user))
  end

  test "should destroy property_user" do
    assert_difference('PropertyUser.count', -1) do
      delete :destroy, id: @property_user
    end

    assert_redirected_to property_users_path
  end
end
