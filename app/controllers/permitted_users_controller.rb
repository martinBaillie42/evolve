class PermittedUsersController < ApplicationController
  before_action :set_permitted_user, only: [:show, :edit, :update, :destroy]
  before_action :is_user_admin

  respond_to :html

  def index
    @permitted_users = PermittedUser.all
    respond_with(@permitted_users)
  end

  def show
    respond_with(@permitted_user)
  end

  def new
    @permitted_user = PermittedUser.new
    respond_with(@permitted_user)
  end

  def edit
  end

  def create
    @permitted_user = PermittedUser.new(permitted_user_params)
    @permitted_user.save
    respond_with(@permitted_user)
  end

  def update
    @permitted_user.update(permitted_user_params)
    respond_with(@permitted_user)
  end

  def destroy
    @permitted_user.destroy
    respond_with(@permitted_user)
  end

  private
    def set_permitted_user
      @permitted_user = PermittedUser.find(params[:id])
    end

    def permitted_user_params
      params[:permitted_user]
    end

    def is_user_admin
      unless current_user.administrator
        redirect_to(:back)
      end
    end
end
