const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cricket_league2')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// ---Schemas and Models---

// Team Schema and Model
const teamSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    unique: true
   },
  coach: String,
  players: [{
     type: mongoose.Schema.Types.ObjectId,
    ref: 'Player' 
  }],
  achievements: String,
});
const Team = mongoose.model('Team', teamSchema);

// Player Schema and Model
const playerSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
  },
  role: { 
    type: String,
    enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper']
  },
  team: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team'
   },
  stats: {
    matches: Number,
    runs: Number,
    wickets: Number,
    catches: Number,
    strikeRate: Number,
    economy: Number,
  },
});
const Player = mongoose.model('Player', playerSchema);

// Match Schema and Model
const matchSchema = new mongoose.Schema({
  teams: [String],
  scores: [
    {
      team: String, 
      runs: Number,
      wicketsLost: Number,
      overs: Number
    }
  ],

  result: {
    winner: String,
    margin: String
  }
});
const Match = mongoose.model('Match', matchSchema);

// --- ROUTES ---

// Team Routes
app.post('/teams', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

app.get('/teams/:name', async (req, res) => {
  const team = await Team.findOne({ name: req.params.name }).populate('players');
  if (!team) {
    res.status(404).json({ message: 'Team not found' });
    return;
  }
  res.json(team);
});

app.put('/teams/:name', async (req, res) => {
  const team = await Team.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
  if (!team) {
    res.status(404).json({ message: 'Team not found' });
    return;
  }
  res.json(team);
});

app.delete('/teams/:name', async (req, res) => {
  const team = await Team.findOneAndDelete({ name: req.params.name });
  if (!team) {
    res.status(404).json({ message: 'Team not found' });
    return;
  }
  res.json({ message: 'Team deleted' });
});

// Player Routes
app.post('/players', async (req, res) => {
  const { name, role, team, stats } = req.body;
  const teamName = await Team.findOne({ name: team });

  if (!teamName) {
    res.status(404).json({ message: 'Team not found' });
    return;
  }

  const player = new Player({ name, role, team: teamName._id, stats });
  await player.save();

  // Add the player to the team's players array
  teamName.players.push(player._id);
  await teamName.save();

  res.status(201).json(player);
});

app.get('/players/:name', async (req, res) => {
  const player = await Player.findOne({ name: req.params.name }).populate('team');
  if (!player) {
    res.status(404).json({ message: 'Player not found' });
    return;
  }
  res.json(player);
});

app.put('/players/:name', async (req, res) => {
  const player = await Player.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
  if (!player) {
    res.status(404).json({ message: 'Player not found' });
    return;
  }
  res.json(player);
});

app.delete('/players/:name', async (req, res) => {
  const player = await Player.findOneAndDelete({ name: req.params.name });
  if (!player) {
    res.status(404).json({ message: 'Player not found' });
    return;
  }
  res.json({ message: 'Player deleted' });
});

// Match Routes
app.post('/matches', async (req, res) => {
  const { teams, date, location, scores, result } = req.body;

  const match = new Match({
    teams,
    scores,
    result
  });

  await match.save();
  res.status(201).json(match);
});

app.get('/matches', async (req, res) => {
  const matches = await Match.find();
  res.json(matches);
});

// --- SERVER SETUP ---
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
