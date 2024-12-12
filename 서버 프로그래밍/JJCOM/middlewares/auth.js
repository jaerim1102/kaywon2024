module.exports = {
   ensureAuthenticated: (req, res, next) => {
      if (req.session && req.session.user) {
         return next(); // 로그인 상태
      }
      res.redirect("/exhibitions/auth/login"); // 로그인 페이지로 리다이렉트
   },
};
