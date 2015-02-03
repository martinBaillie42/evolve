class PropertyUsersController < ApplicationController
  before_action :set_property_user, only: [:show, :edit, :update, :destroy]

  def index
    @property_users = PropertyUser.all
    respond_with(@property_users)
  end

  def show
    respond_with(@property_user)
  end

  def new
    @property_user = PropertyUser.new
    respond_with(@property_user)
  end

  def edit
  end

  def create
    @property_user = PropertyUser.new(property_user_params)
    @property_user.save
    respond_with(@property_user)
  end

  def update
    @property_user.update(property_user_params)
    respond_with(@property_user)
  end

  def destroy
    @property_user.destroy
    respond_with(@property_user)
  end

  private
    def set_property_user
      @property_user = PropertyUser.find(params[:id])
    end

    def property_user_params
      params.require(:property_user).permit(:property_id, :user_id)
    end
end
