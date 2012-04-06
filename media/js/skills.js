$(function(){

	var Skill = Backbone.Model.extend({
		defaults: {
			name: null,
			description: null,
			level: null,
			love: null
		}
	});

	var Skillset = Backbone.Collection.extend({
		model: Skill,
		url: '/skills/skills.json',
		currentStatus : function(status) {
			return _(this.filter(function(data) {
			  	return data.get("completed") == status;
			}));
		},
		search : function(letters){
			if(letters == "") return this;

			var pattern = new RegExp(letters,"gi");
			return _(this.filter(function(data) {
			  	return pattern.test(data.get("name"));
			}));
		}
	});

	var mySkillset = new Skillset();

	var SkillsContainerView = Backbone.View.extend({
		initialize: function(){
			// this.on("reset", this.render(), this);
		},
		events: {
			"keyup #skills_search": "search"
		},
		render: function(){
			this.renderList(this.collection);
			return this;
		},
		renderList: function(skills) {
			$("#skills_list").html("");
			
			var template = _.template( $("#skills_template").html(), {skills: skills.toJSON()} );
			$("#skills_list").html( template );
			return this;
		},
		search: function(e) {
			var searchterm = $("#searchTask").val();
			this.renderList(this.collection.search(searchterm));
		}
	});

	var search_view = new SkillsContainerView({ el: $("#skills_container"), collection:mySkillset });
	
	mySkillset.fetch( {success: function() {search_view.render();} } );
});