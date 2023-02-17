import { mongoose  } from 'mongoose';

const wp_usersSchema = new mongoose.Schema({
	user_email: {
		type: String,
		required: true,
	},
	user_pass: {
		type: String,
		required: true,
	},
	user_nicename: {
		type: String,
		required: true,
	},
	user_type: {
		type: String,
		required: true,
	},
	user_status: {
		type: String,
		required: true,
		default: 'active',
	},
	user_registered: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

const wp_users = mongoose.model('wp_users', wp_usersSchema);

module.exports = wp_users;
