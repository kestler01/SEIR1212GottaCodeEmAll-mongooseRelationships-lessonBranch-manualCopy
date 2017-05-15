// Schema definition with validation:
const someSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  height: Number
})

// Custom validators:
const someSchema = new Schema({
  someEvenValue : {
    type: Number
    validate: {
      validator: function(num){
        return num%2 === 0;
      },
      message: 'Must be even.'
    }
  }
})
