class VariatesController < ApplicationController
  before_action :set_variate, only: [:show, :edit, :update, :destroy]
  before_action :set_experiment, only: [:show, :edit, :update, :destroy]
  respond_to :html, :xml, :json
  respond_to :js, only: [:show, :edit, :update, :create, :destroy]

  def index
    @variates = Variate.all
    respond_with(@variates)
  end

  def show
    respond_to do |format|
      format.js
      format.html { respond_with(@variate) }
    end
  end

  def new
    @variate = Variate.new(variate_params)
    respond_with(@variate)
  end

  def edit
  end

  def create
    @variate = Variate.new(variate_params)
    @variate.save
    redirect_to :controller => 'experiments', :action => 'show', :id => variate_params[:experiment_id]
  end

  def update
    @variate.update(variate_params)
    respond_to do |format|
      format.js { render :nothing => true }
      format.html { respond_with @variate }
    end
  end

  def destroy
    @variate.destroy
    respond_to do |format|
      format.js { redirect_to :controller => 'experiments', :action => 'show', :id => @experiment.id, :status => 303}
      format.html { respond_with @variate }
    end

  end

  private
    def set_variate
      @variate = Variate.find(params[:id])
    end

    def variate_params
      params.require(:variate).permit(:experiment_id, :variate_no, :js_code)
    end

    def set_experiment
      @experiment = @variate.experiment
    end
end
