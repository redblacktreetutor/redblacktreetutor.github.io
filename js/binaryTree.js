function Node(value, color, left, right, parent) {
	this.value = value;
	this.color = color;
	this.left = left;
	this.right= right;
	this.parent = parent;
	this.RADIUS = 30;
}

Node.prototype.setColor = function( color ) {
	this.color = color;
}

Node.prototype.setValue = function( value ) {
    this.value = value;
}

Node.prototype.draw = function( ctx ) {
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1;

	if (this.left !== null ) {
		ctx.beginPath();
		ctx.moveTo( this.x, this.y );
		ctx.lineTo( this.left.x, this.left.y );
		ctx.stroke();
		ctx.closePath();
	}

	if (this.right !== null ) {
		ctx.beginPath();
		ctx.moveTo( this.x, this.y );
		ctx.lineTo( this.right.x, this.right.y );
		ctx.stroke();
		ctx.closePath();
	}

	ctx.beginPath();
	ctx.arc( this.x, this.y, this.RADIUS, 0, 2 * Math.PI, false);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.fillStyle = "white";
	ctx.fillText( this.value, this.x - this.RADIUS / 4 + ((this.value/10)<1?0:-5), this.y + this.RADIUS / 4);
	ctx.closePath();
	if ( this.left !== null ) {
		this.left.draw( ctx );
	}
	if ( this.right !== null ) {
		this.right.draw( ctx );
	}

}

Node.prototype.getDepth = function () {
	if ( this.parent === null ) return 0;
	return 1 + this.parent.getDepth();
}

Node.prototype.traversal = function ( array ) {
	if (this.left !== null )
		array = this.left.traversal( array );
	array.push( this );
	if (this.right !== null ) {
		array = this.right.traversal( array );
	}
	return array;
}

Node.prototype.setPosition = function ( x, y ) {
	this.x = x;
	this.y = y;
	console.log(this.value + " at " + this.x + " " + this.y );
}

Node.prototype.findMaxHeight = function() {
	var maxHeightLeft = (this.left === null) ? 0 : this.left.findMaxHeight();
	var maxHeightRight = (this.right === null) ? 0 : this.right.findMaxHeight();
	return 1 + Math.max( maxHeightRight, maxHeightLeft );
}

Node.prototype.highlight = function ( ctx ) {
	ctx.beginPath();
	ctx.arc( this.x, this.y, this.RADIUS, 0, 2 * Math.PI, false);
	ctx.lineWidth = 10;
	ctx.strokeStyle = "yellow";
	ctx.stroke();
	ctx.closePath();
}


function BinarySearchTree(array, ctx, startX, startY) {
	this.root = null;
	this.GAP_X = 70;
	this.GAP_Y = 70;
	this.array = array;
	this.startX = startX;
	this.startY = startY;
	this.ctx = ctx;
}

BinarySearchTree.prototype.add = function( val ) {
	var node = new Node( val, "#27ae60", null, null, null );
	var current;

	if ( this.root === null ) {
		this.root = node;
	}

	else {
		current = this.root;

		while ( true ) {

			if ( val < current.value ) {
				if ( current.left === null ) {
					node.parent = current;
					current.left = node;
					break;
				}
				else {
					current = current.left;
				}
			}

			else if ( val > current.value ) {
				if ( current.right === null ) {
					node.parent = current;
					current.right = node;
					break;
				}
				else {
					current = current.right;
				}
			}
			else {
				break;
			}
		}
	}
}

BinarySearchTree.prototype.find = function( val ) {
	var foundNode = null;
	var current = this.root;

	while ( true ) {

		if ( val < current.value ) {
			if ( current.left === null ) 
				break;
			else
				current = current.left;
		}
		else if ( val > current.value ) {
			if (current.right === null ) 
				break;
			else
				current = current.right;								
		}
		else {
			foundNode = current;
			break;
		}
	}
	return foundNode;
}

BinarySearchTree.prototype.findMaxHeight = function() {
	return root.findMaxHeight();
}

BinarySearchTree.prototype.setNodeColor = function (val, color) {
	this.find( val ).setColor( color );
}

BinarySearchTree.prototype.setNodeValue = function( val, newVal) {
    this.find( val ).setValue( newVal )
}

BinarySearchTree.prototype.addAll = function () {
	for (var index = 0; index < this.array.length; index ++) {
		this.add( this.array[index] );
	}
	this.setNodePositions();
}

BinarySearchTree.prototype.setNodePositions = function () {
	var x = this.startX;
	var inOrderSequence = this.inOrder();
	for (var i = 0; i < inOrderSequence.length; i++ ) {
		var node = inOrderSequence[i];
		node.setPosition( x, this.startY + node.getDepth() * this.GAP_Y );
		x += this.GAP_X;
	}
}

BinarySearchTree.prototype.inOrder = function() {
	return this.root.traversal( new Array() );		
}

BinarySearchTree.prototype.draw = function () {
	if (this.root !== null)
		this.root.draw( this.ctx );
}

BinarySearchTree.prototype.setColors = function ( colors ) {
	for ( nodeValue in colors ) {
		this.setNodeColor( nodeValue, colors[nodeValue] );
	}
}

BinarySearchTree.prototype.findRightmostLeaf = function () {
	if (this.root === null) return null;	
	var current = this.root;
	while ( current.right !== null ) {
		current = current.right;
	}	
	return current;
}

BinarySearchTree.prototype.findLeftmostLeaf = function () {
	if (this.root === null ) return null;
	var current = this.root;
	while ( current.left !== null ) {
		current = current.left;
	}
	return current;
}

BinarySearchTree.prototype.getWidth = function () {
	var leftMost = this.findLeftmostLeaf();
	var rightMost = this.findRightmostLeaf();
	return (rightMost.x + rightMost.RADIUS) - (leftMost.x - leftMost.RADIUS);
}

BinarySearchTree.prototype.setCaption = function ( text ) {
	var leftMost = this.findLeftmostLeaf();
	var treeWidth = this.getWidth();
	var leftMost = this.findLeftmostLeaf();
	var x = leftMost.x - leftMost.RADIUS + treeWidth/2 - 70;
	var y = this.root.y - 70;
	this.ctx.fillStyle = "#2c3e50";
	this.ctx.fillText( text, x, y );
}

BinarySearchTree.prototype.highlightCurrentNode = function ( currentValue ) {
	this.find( currentValue ).highlight( this.ctx );
}

