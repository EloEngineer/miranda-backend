const ContactSchema = new mongoose.Schema({
  OrderID: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Customer: {
    type: String,
    required: true,
  },
  Mail: {
    type: String,
    required: true,
  },
  Telephone: String,
  Comment: String,
  Action: {
    type: String,
    enum: ["Archive", "Publish"],
    required: true,
  },
  IMG: String,
});

const Contact = mongoose.model("Contact", ContactSchema);
