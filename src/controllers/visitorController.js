import Visit from '../database/models/visitor.js';

export const trackVisit = async (req, res, next) => {
  try {
    const visit = new Visit({
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path,
      method: req.method,
      referrer: req.get('Referrer') || ''
    });
    await visit.save();
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
  next();
};

export const getVisitorStats = async (req, res) => {
  try {
    const stats = await Visit.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getVisitLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const [visits, total] = await Promise.all([
      Visit.find()
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit),
      Visit.countDocuments()
    ]);

    res.json({
      visits,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalVisits: total
    });
  } catch (error) {
    console.error('Error fetching visit logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
