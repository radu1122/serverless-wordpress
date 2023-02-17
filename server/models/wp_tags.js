import { mongoose  } from 'mongoose';

const wp_tagsSchema = new mongoose.Schema({
	tag_author: {
		type: String,
		required: true,
	},
	tag_value: {
		type: String,
		required: false,
	},
});

const wp_tags = mongoose.model('wp_tags', wp_tagsSchema);

module.exports = wp_tags;
