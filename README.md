# ft_transcendence-42

ft_transcendence project at 42 school

## description
This project is about creating a website for the mighty Pong contest!

# usage

### manual:
```sh
docker-compose up --build
```

### makefile:
```sh
make
```

### dev:
```sh
make db
make back
make front
```

## access
enter http://localhost:3001 in your search bar

click sign in then get token

# languages

<div align="center">
	<img alt="TypeScript" width="100" src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" </img>
	<img alt="CSS" width="110" src="https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"</img>
	<a href="https://reactjs.org/" target="blank"><img alt="React" width="110" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" </img></a>
	<a href="http://nestjs.com/" target="blank"><img alt="nestJS" width="100" src="https://nestjs.com/img/logo-small.svg" </img></a>
	<img alt="PostgreSQL" width="100" src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" </img>
	<img alt="Docker" width="100" src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" </img>
</div>

# features

### security

- password hashed in db
- protected against SQL injections
- server-side validation for forms and any user input

### user account

- login using 42 intranet OAuth
- choose unique username
- upload an avatar, default avatar if none
- 2FA (two-factor authentication)
- friends list
- user status: online, offline, in a game
- stats: win, lose, elo, xp, level
- match history

### chat
- channels type: public, private, protected (proteced by password)
- direct messages
- block user (shadow mute someone from your chat UI)
- channel owner:
	- change channel type
	- add/remove/change password
	- set user as admin
- channel admin:
	- ban user
	- mute user
- challenge other to a pong game through UI
- access profile through UI

### pong
- matchmaking
- 3 game mode
- spectator
