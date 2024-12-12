module.exports = {
   ensureAuthenticated: (req, res, next) => {
      const publicRoutes = ["/exhibitions/auth/login", "/exhibitions/auth/register"];
      if (publicRoutes.includes(req.originalUrl)) {
         return next(); // 로그인 페이지와 회원가입 페이지는 통과
      }
      if (req.session && req.session.user) {
         return next(); // 로그인 상태
      }
      res.redirect("/exhibitions/auth/login"); // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
   },
};
