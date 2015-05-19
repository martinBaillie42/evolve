require 'test_helper'

class PermittedUsersControllerTest < ActionController::TestCase
  setup do
    @permitted_user = permitted_users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:permitted_users)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create permitted_user" do
    assert_difference('PermittedUser.count') do
      post :create, permitted_user: {  }
    end

    assert_redirected_to permitted_user_path(assigns(:permitted_user))
  end

  test "should show permitted_user" do
    get :show, id: @permitted_user
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @permitted_user
    assert_response :success
  end

  test "should update permitted_user" do
    patch :update, id: @permitted_user, permitted_user: {  }
    assert_redirected_to permitted_user_path(assigns(:permitted_user))
  end

  test "should destroy permitted_user" do
    assert_difference('PermittedUser.count', -1) do
      delete :destroy, id: @permitted_user
    end

    assert_redirected_to permitted_users_path
  end
end
