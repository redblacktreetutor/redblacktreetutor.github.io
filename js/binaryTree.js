function Node(value, color, left, right, parent) {
	this.value = value;
	this.color = color;
	this.left = left;
	this.right= right;
	this.parent = parent;

	// the this.RADIUS of the circle representing the node
	this.RADIUS = 30;

	this.setColor = function( color ) {
		this.color = color;
	}

	this.setValue = function( value ) {
	    this.value = value;
	}

	this.draw = function( ctx ) {

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
		ctx.fillText( this.value, this.x - this.RADIUS / 4 + ((value/10)<1?0:-5), this.y + this.RADIUS / 4);
		ctx.closePath();
		if ( this.left !== null ) {
			this.left.draw( ctx );
		}
		if ( this.right !== null ) {
			this.right.draw( ctx );
		}

	}

	this.getDepth = function () {
		if ( this.parent === null ) return 0;
		return 1 + this.parent.getDepth();
	}

	this.traversal = function ( array ) {
		if (this.left !== null )
			array = this.left.traversal( array );
		array.push( this );
		if (this.right !== null ) {
			array = this.right.traversal( array );
		}
		return array;
	}

	this.setPosition = function ( x, y ) {
		this.x = x;
		this.y = y;
		console.log(this.value + " at " + this.x + " " + this.y );
	}

	this.findMaxHeight = function() {
		var maxHeightLeft = (this.left === null) ? 0 : this.left.findMaxHeight();
		var maxHeightRight = (this.right === null) ? 0 : this.right.findMaxHeight();
		return 1 + Math.max( maxHeightRight, maxHeightLeft );
	}

	this.highlight = function ( ctx ) {
		ctx.beginPath();
		ctx.arc( this.x, this.y, this.RADIUS, 0, 2 * Math.PI, false);
		ctx.lineWidth = 10;
		ctx.strokeStyle = "yellow";
		ctx.stroke();
		ctx.closePath();
	}
}


function BinarySearchTree(array, ctx, startX, startY) {

	var root = null;
	var GAP_X = 70;
	var GAP_Y = 70;

	function add( val ) {
		var node = new Node( val, "#27ae60", null, null, null );
		var current;

		if ( root === null ) {
			root = node;
		}

		else {
			current = root;

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

	function find ( val ) {
		var foundNode = null, current = root;

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

	function findMaxHeight() {
		return root.findMaxHeight();
	}

	this.setNodeColor = function (val, color) {
		find( val ).setColor( color );
	}

	this.setNodeValue = function( val, newVal) {
	    find( val ).setValue( newVal )
	}

	this.addAll = function () {
		for (var index = 0; index < array.length; index ++) {
			add( array[index] );
		}
		this.setNodePositions();
	}

	this.setNodePositions = function () {
		var x = startX;
		var inOrderSequence = this.inOrder();
		for (var i = 0; i < inOrderSequence.length; i++ ) {
			var node = inOrderSequence[i];
			node.setPosition( x, startY + node.getDepth() * GAP_Y );
			x += GAP_X;
		}
	}

	this.inOrder = function() {
		return root.traversal( new Array() );		
	}
	
	this.draw = function () {
		if (root !== null)
			root.draw( ctx );
	}

	this.setColors = function ( colors ) {
		for ( nodeValue in colors ) {
			this.setNodeColor( nodeValue, colors[nodeValue] );
		}
	}

	this.findRightmostLeaf = function () {
		if (root === null) return null;	
		var current = root;
		while ( current.right !== null ) {
			current = current.right;
		}	
		return current;
	}

	this.findLeftmostLeaf = function () {
		if (root === null ) return null;
		var current = root;
		while ( current.left !== null ) {
			current = current.left;
		}
		return current;
	}

	this.findStartingArrowPosition = function () {
		var rightMost = this.findRightmostLeaf();
		var x = rightMost.x + rightMost.RADIUS;
		var y = root.y + (findMaxHeight() - 1) * GAP_Y / 2 ;
		return [ x, y ];
	}

	this.findEndingArrowPosition = function () {
		var leftMost = this.findLeftmostLeaf();
		var x = leftMost.x - leftMost.RADIUS;
		var y = root.y + (findMaxHeight() - 1) * GAP_Y / 2; 
		return [ x, y ];
	}

	this.setCaption = function ( text ) {
		var leftMost = this.findLeftmostLeaf();
		var x = root.x - 70;
		var y = root.y - 70;
		ctx.fillStyle = "#2c3e50";
		ctx.fillText( text, x, y );
	}

	this.highlightCurrentNode = function ( currentValue ) {
		find( currentValue ).highlight( ctx );
	}
}
