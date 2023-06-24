const get = async (req, res) => {
  const game = { gameId: 5678 };

  return res.status(200).json(game);
};

export default { get };
