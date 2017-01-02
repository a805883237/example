#!/usr/bin/env ruby
require 'thor'
require 'rails'
require 'thor/group'
class Ant < Thor
  include Thor::Actions

  def self.source_root
    File.dirname(__FILE__)
  end


  desc "build ant resource", "build"
  argument :name
  class_option :cols, :default => ""


  def build
    current_resource
    @opts.merge!({:cols => options[:cols].force_encoding("ASCII-8BIT")})
    # view
    template('templates/index.js.erb', "../src/views/#{@opts[:path]}/index.js", @opts)
    template('templates/new.js.erb', "../src/views/#{@opts[:path]}/new.js", @opts)
    template('templates/search.js.erb', "../src/views/#{@opts[:path]}/search.js", @opts)
    template("templates/data/index.json", "../src/data/#{@opts[:path]}/index.json", @opts)
    # reducer
    template("templates/reducers/resources.erb", "../src/reducers/#{@opts[:path]}.js", @opts)
    template("templates/reducers/resources_action.erb", "../src/reducers/actions/#{@opts[:path]}.js", @opts)
    # database
    template("templates/data/show.json", "../src/data/#{@opts[:path]}/show.json", @opts)
    build_nav
  end



  desc "build ant nav", "nav"
  def nav
    current_resource
    build_nav
  end

  desc "remove ant resource", "remove"
  def remove
    current_resource
    if yes? "确定删除?"
      remove_file("../src/views/#{@opts[:path]}")
      remove_file("../src/data/#{@opts[:path]}")
      remove_file("../src/reducers/actions/#{@opts[:path]}.js")
      remove_file("../src/reducers/#{@opts[:path]}.js")
      #删除文件中代码
      puts "remove from reducers/index.js"
      target=File.expand_path("../src/reducers/index.js")
      `sed  "/import #{@named_resources}/d" #{target}>temptest.js`
      `mv temptest.js #{target}`
      target=File.expand_path("../src/reducers/index.js")
      `sed  '/\s#{@named_resources},/d' #{target}>temptest.js`
      `mv temptest.js #{target}`
      target=File.expand_path("../src/routes.js")
      `sed  '/#{@opts[:module]+@resources_cap}/d' #{target} >temptest.js`
      `mv temptest.js #{target}`
      puts "remove from routes.js"
      target=File.expand_path("../src/routes.js")
      `sed  '/components={#{@opts[:module]+@resources_cap}Index/d' #{target} >temptest.js`
      `mv temptest.js #{target}`
      puts "remove from App.js"
      target=File.expand_path("../src/views/layouts/App/App.js")
      `sed  '/key="#{@named_resources}"/d' #{target} >temptest.js`
      `mv temptest.js #{target}`
    else
      say "已取消删除", :red
    end
  end

  private
  def build_nav
    insert_into_file "../src/reducers/index.js", ",\n\r  #{@named_resources}", :after => "routing: routerReducer"
    insert_into_file "../src/reducers/index.js", "\n\r import #{@named_resources}  from './#{@opts[:path]}';", :after => "// 自动生成import"
    insert_into_file "../src/routes.js", "\n\r import  #{@opts[:module]+@resources_cap}Index from './views/#{@opts[:path]}/index';", :after => "// ruby自动生成"
    routeIndexView=%{\n\r <Route breadcrumbName="位置暂定" path="#{@opts[:namespace]}/#{@resources}"  components={#{@opts[:module]+@resources_cap}Index}/>}
    insert_into_file "../src/routes.js", routeIndexView, :after => "<IndexRoute component={HomePage}/>"
    menuView=%{\n\r <Menu.Item key="#{@named_resources}" ><Link to="/manage/#{@opts[:namespace]}/#{@resources}"> #{@resources} 信息</Link></Menu.Item>}
    insert_into_file "../src/views/layouts/App/App.js", menuView, :after => '<SubMenu key="automake" title={<span><Icon type="user"/>自动生成页面</span>}>'
  end

  def current_resource
    @opts    ={}
    @resource=name
    if @resource.match(/\//)
      attr             =@resource.split("/")
      @named_resources =attr.join("_").pluralize
      @resource        =attr.slice!(-1)
      @resources       =@resource.pluralize
      @resource_cap    =@resource.camelize
      @resources_cap   =@resource.pluralize.camelize
      @opts[:namespace]=attr.join("/")
      @opts[:module]   =attr.join("_").camelize
      @opts[:path]     ="#{@opts[:namespace]}/#{@resources}"
      @opts[:dir]      = @opts[:namespace].split('/').length.times.map { "../" }.join("")
    else
      @resources       =@resource.pluralize
      @named_resources =@resources
      @resource_cap    =@resource.camelize
      @resources_cap   =@resource.pluralize.camelize
      @opts[:resources]=@resources
      @opts[:path]     =@resources
      @opts[:module]   =""
      @opts[:dir]      =""
    end
    @opts[:resource]       =@resource
    @opts[:resources]      =@resources
    @opts[:resource_cap]   =@resource_cap
    @opts[:resources_cap]  =@resources_cap
    @opts[:named_resources]=@named_resources
  end
end
