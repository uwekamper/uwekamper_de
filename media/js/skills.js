var Skill = Backbone.Model.extend({
	defaults: {
		name: null,
		description: null,
		level: null,
		love: null
	}
});

var SkillList = Backbone.Collection.extend({
	model: Skill,
	url: '/skills/skills.json',

	search : function(letters){
		if(letters == "") return this;

		var pattern = new RegExp(letters,"gi");
		return _(this.filter(function(data) {
		  	return pattern.test(data.get("name"));
		}));
	}
});

var Skills = new SkillList();

// var SkillsAppModel = Backbone.Model.extend({
// 	initialize: function() {
// 		this.skills = new Skillset();
// 	},
// 	fetch: function(args) {
// 		this.skills.fetch(args);
// 	}
// });

var SkillView = Backbone.View.extend({
	tagName: "li",
	
	template: _.template( $("#skill_template").html() ),
	
	events: {
		"click .skill_name": "handleNameClick"
	},
	
	initialize: function(){
		this.model.bind('change', this.render, this);
	},
	
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	
	handleNameClick: function() {
		alert("Name clicked!");
	}
	
});

var SkillListView = Backbone.View.extend({
	el: $("skills_list"),
	
	initialize: function() {
		Skills.bind('add', this.addOne, this);
		Skills.bind('reset', this.addAll, this);
		Skills.bind('all', this.render, this);
		
		Skills.fetch();
		
	},
	
	addOne: function(skill) {
		var view = new SkillView({model: skill});
		this.$("#skills_list").append(view.render().el);
	},
	
	addAll: function() {
		Skills.each(this.addOne);
	},
	
	render: function() {
		
	},
	
	search: function(e) {
		var searchterm = $("#searchTask").val();
		this.renderList(this.collection.search(searchterm));
	}
});

// var SkillsAppController = {
// 	init: function(spec){
// 		// default values for the configuration
// 		this.config = {
// 			connect: true
// 		};
// 		
// 		_.extend(this.config, spec);
// 		
// 		this.model = new Skillset();
// 		this.view = new SkillListView({model: this.model});
// 		
// 		return this;
// 	},
// 	run: function() {
// 		this.model.fetch( {success: function() {this.view.render();}} );
// 	}
// }
//var search_view = new SkillsContainerView({ el: $("#skills_container"), collection:mySkillset });

// mySkillset.fetch( {success: function() {search_view.render();} } );
