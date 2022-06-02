import mongoose from 'mongoose';
const { Schema } = mongoose;

const obj = new Schema({
  title: {
    type: String,
    required: [true, 'A object must have a name'],
    unique: true,
    trim: true,
  },
  thumbnail: {
    trending: {
      small: String,
      large: String,
    },
    regular: {
      small: String,
      medium: String,
      large: String,
    },
  },
  year: Number,
  category: {
    type: String,
    default: 'Movie',
    required: [true, 'A object must have a category'],
  },
  rating: String,
  isBookmarked: Boolean,
  isTrending: Boolean,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const objModel = mongoose.model('Obj', obj);

export default objModel;
