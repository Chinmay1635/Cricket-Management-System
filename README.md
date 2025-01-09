### Cricket Management System


## Features
- **Teams**: Manage cricket teams with details like name, coach, players, and achievements.
- **Players**: Add and manage players with details like role, stats, and associated team.
- **Matches**: Create and query matches, including team participation, scores, results, and more.
- **Relationships**: Establish relationships between teams, players, and matches for seamless data integration.

---

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) instance running locally or remotely.
- Postman or any API testing tool (optional but recommended).

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Chinmay1635/Cricket-Management-System.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Cricket-Management-System
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
5. Run the application:
   ```bash
   node app.js
   ```
6. Access the application at `http://localhost:5000`.

---

## API Endpoints
### Teams
- **Create Team**: `POST /teams`
  ```json
  {
    "name": "India",
    "coach": "Rahul Dravid",
    "achievements": ["2011 World Cup", "2007 T20 World Cup"]
  }
  ```

- **Get Team by Name**: `GET /teams/:name`

- **Update Team**: `PUT /teams/:name`
  ```json
  {
    "coach": "New Coach Name"
  }
  ```

- **Delete Team**: `DELETE /teams/:name`

### Players
- **Create Player**: `POST /players`
  ```json
  {
    "name": "Virat Kohli",
    "role": "Batsman",
    "team": "India",
    "stats": {
      "matches": 265,
      "runs": 12000,
      "wickets": 4,
      "catches": 125,
      "strikeRate": 92.1,
      "economy": 0
    }
  }
  ```

- **Get Player by Name**: `GET /players/:name`

- **Update Player**: `PUT /players/:name`
  ```json
  {
    "stats": {
      "runs": 12100
    }
  }
  ```

- **Delete Player**: `DELETE /players/:name`

### Matches
- **Create Match**: `POST /matches`
  ```json
  {
    "teams": ["India", "Australia"],
    "date": "2025-01-15T10:00:00.000Z",
    "location": "Melbourne Cricket Ground",
    "scores": [
      {
        "team": "India",
        "runs": 250,
        "wicketsLost": 8,
        "overs": 50
      },
      {
        "team": "Australia",
        "runs": 230,
        "wicketsLost": 10,
        "overs": 48
      }
    ],
    "result": {
      "winner": "India",
      "margin": "20 runs"
    }
  }
  ```

- **Get All Matches**: `GET /matches`

---

## Database Schema
### Team
```javascript
{
  name: String,
  coach: String,
  players: [String], // References player names
  achievements: [String]
}
```

### Player
```javascript
{
  name: String,
  role: String, // Batsman, Bowler, All-Rounder, Wicket-Keeper
  team: String, // References team name
  stats: {
    matches: Number,
    runs: Number,
    wickets: Number,
    catches: Number,
    strikeRate: Number,
    economy: Number
  }
}
```

### Match
```javascript
{
  teams: [String], // References team names
  date: Date,
  location: String,
  scores: [
    {
      team: String, // References team name
      runs: Number,
      wicketsLost: Number,
      overs: Number
    }
  ],
  result: {
    winner: String, // References team name
    margin: String
  }
}
```

---

## Example Data
### Teams
```json
[
  {
    "name": "India",
    "coach": "Rahul Dravid",
    "achievements": ["2011 World Cup", "2007 T20 World Cup"]
  },
  {
    "name": "Australia",
    "coach": "Andrew McDonald",
    "achievements": ["2021 T20 World Cup", "2015 World Cup"]
  }
]
```

### Players
```json
[
  {
    "name": "Virat Kohli",
    "role": "Batsman",
    "team": "India",
    "stats": {
      "matches": 265,
      "runs": 12000,
      "wickets": 4,
      "catches": 125,
      "strikeRate": 92.1,
      "economy": 0
    }
  },
  {
    "name": "Steve Smith",
    "role": "Batsman",
    "team": "Australia",
    "stats": {
      "matches": 150,
      "runs": 8000,
      "wickets": 10,
      "catches": 50,
      "strikeRate": 85.5,
      "economy": 0
    }
  }
]
```

---

