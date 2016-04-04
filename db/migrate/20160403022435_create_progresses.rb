class CreateProgresses < ActiveRecord::Migration
  def change
    create_table :progresses do |t|
      t.text :name
      t.references :user, index: true, foreign_key: true
      t.integer :status

      t.timestamps null: false
    end
  end
end
