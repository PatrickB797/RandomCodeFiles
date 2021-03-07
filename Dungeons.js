var roomTemplates = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function roomConnector(room1,room2){
	this.toRoom = room1;
	this.fromRoom = room2;
}

function room(exits){
	this.exits = exits;
	this.entryConnector=0;
	this.connectors = [];
	this.setEntry = function(entry){
		this.entryConnector = entry;
	}
	this.setExits = function(roomNum,currentlag){
		for(i = 0;i<this.exits;i++){
			this.connectors.push(new roomConnector(roomNum,roomNum+currentlag+i));
		}
	}
}

function createRooms(){
	roomTemplates.push(new room(0));
	roomTemplates.push(new room(1));
	roomTemplates.push(new room(2));
	roomTemplates.push(new room(3));
}

function dungeon(name,level,minSize,maxSize){
	this.rooms = [];
	this.remainingExits = 0;
	this.name = name;
	this.level = level;
	this.currentlag = 1;
	this.buildDungeon = function(){
		this.rooms.push(Object.assign({}, roomTemplates[1+getRandomInt(2)]));
		this.remainingExits += this.rooms[this.rooms.length-1].exits;
		while(this.remainingExits>0){
			if(this.rooms.length+this.remainingExits<minSize){
				this.rooms[this.rooms.length-1].setEntry(new roomConnector(this.rooms.length-1,this.rooms.length-1-this.currentlag));
				console.log(this.rooms.length-1);
				console.log(this.rooms[this.rooms.length-1].entryConnector);
				this.currentlag--;
				this.currentlag+=this.rooms[this.rooms.length-1].exits;
				this.remainingExits--;
				this.rooms.push(Object.assign({}, roomTemplates[1+getRandomInt(2)]));
				this.remainingExits += this.rooms[this.rooms.length-1].exits;
			} else if(this.rooms.length+this.remainingExits>=maxSize){
				this.rooms[this.rooms.length-1].setEntry(new roomConnector(this.rooms.length-1,this.rooms.length-1-this.currentlag));
				console.log(this.rooms.length-1);
				console.log(this.rooms[this.rooms.length-1].entryConnector);
				this.currentlag--;
				this.remainingExits--;
				this.rooms.push(Object.assign({}, roomTemplates[0]));
			} else{
				this.rooms[this.rooms.length-1].setEntry(new roomConnector(this.rooms.length-1,this.rooms.length-1-this.currentlag));
				console.log(this.rooms.length-1);
				console.log(this.rooms[this.rooms.length-1].entryConnector);
				this.currentlag--;
				this.currentlag+=this.rooms[this.rooms.length-1].exits;
				this.remainingExits--;
				this.rooms.push(Object.assign({}, roomTemplates[getRandomInt(3)]));
				this.remainingExits += this.rooms[this.rooms.length-1].exits;
			}
			console.log("Current Lag");
			console.log(this.currentlag);
			console.log();
		}
        console.log("Built Rooms:");
        console.log(this.rooms.length);
	}
    this.buildDungeon();
}

createRooms();



