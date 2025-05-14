
exports.errorHandler = (err, req, res, next) => {
  console.error('🔴 Hata:', err.stack);
  res.status(500).render('error', {
    message: 'Sunucuda bir hata oluştu. Lütfen tekrar deneyin.',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};
