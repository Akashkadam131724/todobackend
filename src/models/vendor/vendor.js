import mongoose from "mongoose";

const { Schema, model } = mongoose;

const VendorSchema = new Schema({
  name: {
    type: String,
  },
});

const Vendor = model("Vendor", VendorSchema);

export default Vendor;

// name
// page_title
// slug
// short_description
// vendor_logo
// status
// is_approved
