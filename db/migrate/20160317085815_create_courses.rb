class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :name
      t.string :region
      t.float :coordinates, :array => true

      t.timestamps null: false
    end
  end
end
