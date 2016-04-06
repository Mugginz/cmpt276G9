class AddCompleteToProgresses < ActiveRecord::Migration
  def change
    add_column :progresses, :complete, :boolean, default: false
  end
end
