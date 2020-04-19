class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    username = params[:user][:username]

    if @user.save
      @user.update_attributes(game_id: @user.game_id + 1)
      redirect_to user_path(@user)
    else
      existing_user = User.find_by(username: username)
      existing_user.update_attributes(game_id: existing_user.game_id + 1)
      redirect_to user_path(existing_user)
    end
  end

  def index
  end

  def show
    @user = User.find(params[:id])
    @phrases = ["Jeff says 'The tribe has spoken'",
                "A former cast member is referenced",
                "A torch is snuffed by Jeff",
                "A new alliance is formed",
                "A player lies about his/her profession",
                "A live chicken is given as a prize",
                "The medics are called",
                "A player claims to be the swing vote",
                "A player mentions a final two deal",
                "The camera shows a crab",
                "Someone cries about a missing loved one",
                "Someone can't get the fire started",
                "Someone doesn't help around camp",
                "Jeff goes to tally the votes",
                "A player is voted out and has a hidden idol",
                "The players cook something on the fire",
                "Jeff says 'Drop your buffs!'",
                "Someone searches another player's bag",
                "The reward challenge prize is a tarp",
                "Jeff says 'Survivors ready?'",
                "A player says he/she was a fan before competing",
                "An idol is played for someone else",
                "The water well appears",
                "Someone says the word 'rice'",
                "Someone drinks from a water bottle",
                "Jeff says 'the challenge is on.'",
                "A player mentions a final three deal",
                "The camera shows a snake",
                "Someone chooses eating over playing",
                "Jeff says 'it is...time to vote.'",
                "A fake immunity idol is played",
                "Jeff says 'I got nothing for you'",
                "Someone catches a fish",
                "Survivors plot while sitting in water",
                "Spa day reward",
                "A player finds the idol in a tree hole",
                "Someone says 'We have the numbers on our side'"]
  end

  private

  def username
  end

  def user_params
    params.require(:user).permit(:username)
  end
end
