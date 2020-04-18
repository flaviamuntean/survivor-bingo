class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.save

    # redirect_to bingos_path
  end

  def index
  end

  def show
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
