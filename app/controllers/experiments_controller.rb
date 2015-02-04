class ExperimentsController < ApplicationController
  before_action :set_experiment, only: [:show, :edit, :update]
  before_action :set_property, only: [:show, :edit, :update]

  respond_to :html, :xml, :json

  # TODO These are viewable even when not logged in. Fix this. Or maybe they're not. confused :-s

  def index
    @experiments = Experiment.all
    respond_with(@experiments)
  end

  def show
    respond_with(@experiment)
  end

  def new
    @experiment = Experiment.new(experiment_params)
    respond_with(@experiment)
  end

  def edit
  end

  def create
    @experiment = Experiment.new(experiment_params)
    @experiment.save
    respond_with(@experiment)
  end

  def update
    @experiment.update(experiment_params)
    respond_with(@experiment)
  end

  def destroy
    @experiment.destroy
    respond_with(@experiment)
  end

  private
    def set_experiment
      @experiment = Experiment.find(params[:id])
    end

    def experiment_params
      params.require(:experiment).permit(:property_id, :name, :date_from, :date_to, :live, :page_url, :unique_identifier, :js_code)
    end

    def set_property
      @property = @experiment.property
    end
end
