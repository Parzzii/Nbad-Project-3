const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    category: { 
        type: String, 
        required: [true, 'Category is required'],
        validate: {
            validator: function(value) {
                // Allow new category only when "Others" is selected
                return this.category !== 'Others' || (this.category === 'Others' && value); 
            },
            message: 'New category is required when "Others" is selected'
        }
    },
    title: { 
        type: String, 
        required: [true, 'Title is required']
    },
    host: { 
        type: String, 
        required: [true, 'Host is required']
    },
    details: { 
        type: String, 
        required: [true, 'Details is required'], 
        minlength: [10, 'Details must be at least 10 characters']
    },
    where: { 
        type: String, 
        required: [true, 'Where is required']
    },
    startdate: { 
        type: Date, 
        required: [true, 'Start date is required']
    },
    start: { 
        type: String, 
        required: [true, 'Start time is required']
    },
    enddate: { 
        type: Date, 
        required: [true, 'End date is required']
    },
    end: { 
        type: String, 
        required: [true, 'End time is required']
    },
    image: { 
        type: String, 
        required: [true, 'Image is required']
    }
},
{ timestamps: true });

// Collection name is 'connections' in the database
module.exports = mongoose.model('Connection', connectionSchema);
