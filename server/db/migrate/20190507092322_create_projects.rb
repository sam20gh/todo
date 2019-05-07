class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name
      t.boolean :favourite_status
      t.boolean :archive_status
      t.integer :user_id

      t.timestamps
    end
  end
end
