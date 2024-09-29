// models/visitorModel.js
import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  timestamp: { 
    type: Date, 
    default: Date.now,
    index: true  
  },
  ip: {
    type: String,
    required: true,
    index: true 
  },
  userAgent: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true,
    index: true 
  },
  method: {
    type: String,
    required: true
  },
  referrer: {
    type: String,
    default: ''
  }
});

visitSchema.statics.getStats = async function() {
  const totalVisits = await this.countDocuments();
  const uniqueVisitors = await this.distinct('ip').length;
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [popularPages, recentVisits, visitsPerDay] = await Promise.all([
    this.aggregate([
      { $group: { _id: "$path", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]),
    this.countDocuments({ timestamp: { $gte: last24Hours } }),
    this.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 7 }
    ])
  ]);

  return {
    totalVisits,
    uniqueVisitors,
    popularPages,
    recentVisits,
    visitsPerDay
  };
};

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;