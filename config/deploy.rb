# config valid only for current version of Capistrano
lock '3.4.1'

set :application, 'fuxiong'
#set :repo_url, 'git@git.oschina.net:myjacksun/fuxiong_admin.git'

namespace :deploy do
  task :build do
    on roles(:all) do
      run_locally do
        execute "npm run build"
      end
      run_locally do
        execute "cd dist && tar -jcf manage.tar.bz2 manage"
      end
      upload! "dist/manage.tar.bz2", "#{shared_path}/public", :via => :scp
      run_locally do
        execute " rm -rf dist/manage.tar.bz2"
      end
      execute "cd #{shared_path}/public &&  rm -rf manage/*"
      execute "cd #{shared_path}/public && tar -jxf manage.tar.bz2 && rm -rf manage.tar.bz2"
    end
  end
end
