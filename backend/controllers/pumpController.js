let pumpState = false;

exports.controlPump = (req, res) => {
  const { state } = req.body;
  pumpState = state; // Set pump state directly
  console.log(`Pump is now ${state ? "ON" : "OFF"}`);
  res.status(200).send(`Pump is now ${state ? "ON" : "OFF"}`);
};

exports.getPumpState = (req, res) => {
  res.status(200).json({ state: pumpState });
};
