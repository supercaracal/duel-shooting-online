# Duel Shooting Online

## What's this?

This is a shooting game. You can play on your browser.

## Playground

* [Demo Mode](http://supercaracal.github.io/duel-shooting-online/)
* [Online Mode](http://duel-shooting-online.azurewebsites.net/)
* Offline Mode

## Development

```
$ git clone https://github.com/supercaracal/duel-shooting-online.git
```

```
$ npm install
```

```
$ npm start
# Default play mode is online.
# Get access to http://localhost:8080 via 1st browser
# Get access to http://localhost:8080 via 2nd browser

# You can play as another mode.
$ npm run-script offline
$ npm run-script demo
```

```
# Minified JavaScript and CSS files.
$ grunt watch
```

## Ships

### White Demon

![White Demon](https://github.com/supercaracal/duelshooting_online/raw/master/assets/images/white-demon.gif)

| Action     | Keyboard     | Mouse or Touch    |
|------------|--------------|-------------------|
| Move Right | Cursor Right | Lower part right  |
| Move Left  | Cursor Left  | Lower part left   |
| Wait       | Cursor Down  | Lower part center |
| Attack1    | Cursor Up    | Upper part center |
| Attack2    | F            | Upper part left   |
| Attack3    | M            | Upper part right  |

### Red Comet

![Red Comet](https://github.com/supercaracal/duelshooting_online/raw/master/assets/images/red-comet.gif)

| Action     | Keyboard     | Mouse or Touch    |
|------------|--------------|-------------------|
| Move Right | Cursor Right | Lower part right  |
| Move Left  | Cursor Left  | Lower part left   |
| Avoid      | N            | Lower part center |
| Attack1    | Cursor Up    | Upper part center |
| Attack2    | F            | Upper part left   |
| Barrier    | I            | Upper part right  |

### Dark Emperor

![Dark Emperor](https://github.com/supercaracal/duelshooting_online/raw/master/assets/images/dark-emperor.gif)

| Action      | Keyboard     | Mouse or Touch    |
|-------------|--------------|-------------------|
| Move Right  | Cursor Right | Right area        |
| Move Left   | Cursor Left  | Left area         |
| Attack Main | Cursor Up    | Middle area       |
| Attack Sub1 | A            | unsupported       |
| Attack Sub2 | S            | unsupported       |
| Attack Sub3 | D            | unsupported       |
| Attack Sub4 | F            | unsupported       |
| Attack Sub5 | Z            | unsupported       |
| Attack Sub6 | X            | unsupported       |
| Attack Sub7 | C            | unsupported       |
| Attack Sub8 | V            | unsupported       |
