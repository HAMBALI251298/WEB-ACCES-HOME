

module.exports = (bankaAPI) => {
  /**
   * @api {get} /api/v1/ API Status
   * @apiGroup Home
   * @apiSuccess {String} status The HTTP success status code.
   * @apiSuccess {String} message The API welcome message.
   * @apiSuccessExample {json} Success Example
   * {
   *    "status": 200,
   *    "message": "Hello and welcome to the Banka API."
   * }
   */
  bankaAPI.get('/api/v1/', (req, res) => {
    const msgData = {
      status: 200,
      message: 'Hello and welcome to the Banka API.',
    };
    res.status(200).json(msgData);
  });
};
