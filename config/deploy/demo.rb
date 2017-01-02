set :stage, :demo

server "60.205.142.163", user: "ubuntu", roles: %w{web app db}
set :branch, ENV["REVISION"] || ENV["BRANCH_NAME"] || "master"
set :database_path, "deploy/"
set :deploy_user, 'ubuntu'
set :use_sudo,false
