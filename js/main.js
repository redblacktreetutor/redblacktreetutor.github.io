var black = "black";
var red = "#c0392b";
// Main
$(document).ready(function() {
	init();
});


// init and draw
function init() {
	drawWorstBinaryTree();
	drawColorFlip();
	drawOuterNode();
	drawInnerNode();
	drawSingleRotation();
	drawDoubleRotation();
}

function drawWorstBinaryTree() {
	var worstBinaryTreeCanvas = $('#worstBinaryTree')[0];
	worstBinaryTreeCanvas.width = $('#worstBinaryTree').parent().outerWidth();
	worstBinaryTreeCanvas.height = screen.height / 2 + 10;

	var ctx = worstBinaryTreeCanvas.getContext('2d');
	ctx.font = '20px Arial';

	var array = [1,2,3,4,5];
	var tree = new BinarySearchTree( array, ctx, 400, 50 );
	tree.addAll();
	tree.draw();
}

function drawColorFlip() {
	var colorFlipCanvas = $('#colorFlip')[0];
	colorFlipCanvas.width = $('#colorFlip').parent().outerWidth();
	colorFlipCanvas.height = 200;

	var ctx = colorFlipCanvas.getContext('2d');
	ctx.font = '20px Arial';

	var array = [5, 3, 7];
	var beforeTree = new BinarySearchTree( array, ctx, 300, 100 );
	beforeTree.addAll();
	beforeTree.setColors( {5: black, 3: red, 7: red});
	beforeTree.draw();
	beforeTree.highlightCurrentNode( 5 );
	beforeTree.setCaption( "Tree before color flip" );

	var afterTree = new BinarySearchTree( array, ctx, 700, 100 );
	afterTree.addAll();
	afterTree.setColors( {5: red, 3: black, 7: black} );
	afterTree.draw();
	afterTree.highlightCurrentNode( 5 );
	afterTree.setCaption( "Tree after color flip" );

	// var p1 = beforeTree.findStartingArrowPosition();
	// var p2 = afterTree.findEndingArrowPosition();
	// arrow(ctx, p1, p2);
}

function drawInnerNode() {
	var innerNodeCanvas = $('#insideNode')[0];
	innerNodeCanvas.width = $('#insideNode').parent().outerWidth();
	innerNodeCanvas.height = 300;
	
	var ctx = innerNodeCanvas.getContext('2d');
	ctx.font = '20px Arial';

	var array1 = [10, 20, 15];
	var firstCaseTree = new BinarySearchTree( array1, ctx, 300, 100 );
	firstCaseTree.addAll();
	firstCaseTree.draw();
	firstCaseTree.setCaption("15 is an inner node");
	firstCaseTree.highlightCurrentNode( 15 );

	var array2 = [10, 5, 8];
	var secondCaseTree = new BinarySearchTree(array2, ctx, 700, 100 );
	secondCaseTree.addAll();
	secondCaseTree.draw();
	secondCaseTree.setCaption("8 is an inner node");
	secondCaseTree.highlightCurrentNode( 8 );
}

function drawOuterNode() {
	var innerNodeCanvas = $('#outsideNode')[0];
	innerNodeCanvas.width = $('#outsideNode').parent().outerWidth();
	innerNodeCanvas.height = 300;
	
	var ctx = innerNodeCanvas.getContext('2d');
	ctx.font = '20px Arial';

	var array1 = [10, 20, 30];
	var firstCaseTree = new BinarySearchTree( array1, ctx, 300, 100 );
	firstCaseTree.addAll();
	firstCaseTree.draw();
	firstCaseTree.setCaption("30 is an outer node");
	firstCaseTree.highlightCurrentNode( 30 );

	var array2 = [10, 5, 3];
	var secondCaseTree = new BinarySearchTree(array2, ctx, 700, 100 );
	secondCaseTree.addAll();
	secondCaseTree.draw();
	secondCaseTree.setCaption("3 is an outer node");
	secondCaseTree.highlightCurrentNode( 3 );
}

function drawSingleRotation() {
	var singleRotationCanvas = $('#singleRotation')[0];
	singleRotationCanvas.width = $('#singleRotation').parent().outerWidth();
	singleRotationCanvas.height = 400;

	var ctx = singleRotationCanvas.getContext('2d');
	ctx.font = '20px Arial';

	var array1 = [10, 5, 20, 15, 30, 25, 35];
	var beforeTree = new BinarySearchTree( array1, ctx, 50, 100 );
	beforeTree.addAll();
	beforeTree.setColors( {10: black, 20: red, 30: red, 5: black, 15: black, 25: black, 35: black} );
	beforeTree.draw();
	beforeTree.setCaption("Tree before rotation");
	beforeTree.highlightCurrentNode( 30 );

	var array2 = [20, 10, 30, 5, 15, 25, 35];
	var afterTree = new BinarySearchTree( array2, ctx, 700, 100 );
	afterTree.addAll();
	afterTree.setColors( {10: red, 5: black, 20: red, 15: black, 30: red, 25: black, 35: black} );
	afterTree.draw();
	afterTree.setCaption("Tree after rotation");
	afterTree.highlightCurrentNode( 30 );

	// var p1 = beforeTree.findStartingArrowPosition();
	// var p2 = afterTree.findEndingArrowPosition();
	// arrow(ctx, p1, p2);
}

function drawDoubleRotation() {
	var doubleRotationCanvas = $('#doubleRotation')[0];
	doubleRotationCanvas.width = $('#doubleRotation').parent().outerWidth();
	doubleRotationCanvas.height = 400;

	var ctx = doubleRotationCanvas.getContext('2d');
	ctx.font = '20px Arial';

	var array1 = [10, 5, 20, 15, 25, 12, 17];
	var beforeTree = new BinarySearchTree( array1, ctx, 50, 100 );
	beforeTree.addAll();
	beforeTree.setColors( {10: black, 5: black, 20: red, 15: red, 25: black, 12: black, 17: black} ); 
	beforeTree.draw();
	beforeTree.setCaption("Tree before rotation");
	beforeTree.highlightCurrentNode( 15 );

	var array2 = [15, 10, 20, 5, 12, 17, 25];
	var afterTree = new BinarySearchTree( array2, ctx, 700, 100 );
	afterTree.addAll();
	afterTree.setColors( {15: black, 10: red, 20: red, 5: black, 12: black, 17: black, 25: black} ); 
	afterTree.draw();
	afterTree.setCaption("Tree after rotation");
	afterTree.highlightCurrentNode( 15 );

	// var p1 = beforeTree.findStartingArrowPosition();
	// var p2 = afterTree.findEndingArrowPosition();
	// arrow(ctx, p1, p2);
}

function arrow(ctx, p1, p2) {
    ctx.save();
    var dist = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#374047';
    ctx.moveTo(p1[0] + 20, p1[1]);
    ctx.lineTo(p2[0] - 20, p2[1]);
    ctx.stroke();

    var angle = Math.acos((p2[1] - p1[1]) / dist);

    if (p2[0] < p1[0]) angle = 2 * Math.PI - angle;

    var size = 6;

    ctx.beginPath();
    ctx.translate(p2[0] - 20, p2[1]);
    ctx.rotate(-angle);
    ctx.fillStyle = '#374047';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#374047';
    ctx.moveTo(0, -size);
    ctx.lineTo(-size, -size);
    ctx.lineTo(0, 0);
    ctx.lineTo(size, -size);
    ctx.lineTo(0, -size);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}
