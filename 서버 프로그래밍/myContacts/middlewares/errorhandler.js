const errorhandeler = (err, req, res, next) => {
    const status = err.status || 500;
    switch (status) {
        // 400: 잘못된 요청
        case 400:
            res.status(status).json({
                title: "Bad Request",
                message: err.message
            });
            break;
        // 401: 권한 없음
        case 401:
            res.status(status).json({
                title: "Unauthorized",
                message: err.message
            });
            break;
        // 403: 금지됨
        case 403:
            res.status(status).json({
                title: "Forbidden",
                message: err.message
            });
            break;
        // 404: 찾을 수 없음
        case 404:
            res.status(status).json({
                title: "Not Found",
                message: err.message
            });
            break;
        // 500: 서버 오류
        case 500:
            res.status(status).json({
                title: "Internal Server Error",
                message: err.message
            });
            break;
        default:
            res.status(status).json({
                message: "No Error!"
            });
            break;
    }
}

module.exports = errorhandeler