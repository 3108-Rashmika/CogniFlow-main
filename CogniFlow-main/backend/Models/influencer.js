import mongoose from "mongoose";
const Schema = mongoose.Schema;

const influencerSchema = new Schema(
  {
    name: String,
    handle: String,
    platform: String,
    sample_post_url: String,
    followers: String,
    engagement_estimate: String,
    contact: String,
    status: String,
    source: String,
  },
  { timestamps: true }
);

const Influencer = mongoose.model("Influencer", influencerSchema);
export default Influencer;
