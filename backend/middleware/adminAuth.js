const adminAuth = async (req, res, next) => {
  try {
    const { isAdmin } = req.body;

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin yetkisi gerekli",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Admin doğrulama hatası",
    });
  }
};

module.exports = adminAuth;
