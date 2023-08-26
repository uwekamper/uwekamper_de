var Skill = Backbone.Model.extend({
	defaults: {
		id: null,
		name: null,
		description: null,
		long_description: null,	
		type: "lang",
		related: [],
		level: null,
		love: null
	}
});

var SkillList = Backbone.Collection.extend({
	model: Skill,
	url: './skills.json',
	
	comparator: function(item) {
		return item.get('name');
	},
	
	get_by_id : function(the_id) {
		var blub = this.find(
			function(data) {
				return data.id == the_id;
			}
		);
		return blub;
	},
	
	

	search : function(letters) {
		
		var checkedTypes = [];
		$('.skill_type').each( function(index, el) {
			if (el.checked) {
				checkedTypes.push(el.name);
			}
		});
		
		var cleanedLetters = letters.replace(/[^\w\s]/gi, '');
		var pattern = new RegExp(cleanedLetters, "i");

		return new SkillList(this.filter(
			function(data) {
				if(! _.contains(checkedTypes, data.get("type")) ) {
					return false;
				}
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
	
	initialize: function(){
		this.model.bind('change', this.render, this);
	},
	
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	
});

var SkillListView = Backbone.View.extend({
	el: $("#skills_container"),
	
	events: {
		"keyup #skills_search": "search",
		"click .skill_type": "search",
		"click #toggle_all": "toggleAll"
	},
	
	initialize: function(json_url) {
		Skills.bind('add', this.addOne, this);
		Skills.bind('reset', this.render, this);
		// Skills.bind('all', this.render, this);
		Skills.url = json_url;
		Skills.fetch( {success: function() {
			Skills.sort(); 
			$("#load_message").remove(); } 
		} );
	},

	search: function(e) {
		var letters = $("#skills_search").val();
		this.$("#skills_list").empty();
		Skills.search(letters).each(this.addOne);
	},
	
	toggleAll : function(e) {
		// invert all the checkboxes when the "Toggle all" button is clicked.
		$('.skill_type').each(function(index, el) {
			if(el.checked) 
				$(el).attr('checked', false);
			else
				$(el).attr('checked', true);
		});
		this.search(e);
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
	
	render: function() {
		$("#skills_list").html("");
		Skills.each(this.addOne);
	}
});

