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
	
	url: 'skills.json',

	search : function(letters) {
		if(letters == "") return this;
	
		var pattern = new RegExp(letters,"i");
		
		return new SkillList(this.filter(
			function(data) {
				return pattern.test(data.get("name"));
			}
		));
	}
});

var Skills = new SkillList();

var SkillView = Backbone.View.extend({
	tagName: "div",
	className: "skill",
	
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
	el: $("#skills_container"),
	
	events: {
		"keyup #skills_search": "search"
	},
	
	initialize: function() {
		Skills.bind('add', this.addOne, this);
		Skills.bind('reset', this.addAll, this);
		Skills.bind('all', this.render, this);
		
		Skills.fetch( {success: function() {$("#load_message").remove();}} );
	},

	search: function(e) {
		var letters = $("#skills_search").val();
		this.$("#skills_list").empty();
		Skills.search(letters).each(this.addOne);
	},
	
	removeLoadMessage: function() {
		
	},
	
	addOne: function(skill) {
		var view = new SkillView({model: skill});
		this.$("#skills_list").append(view.render().el);
	},
	
	addAll: function() {
		Skills.each(this.addOne);
	},
	
});

