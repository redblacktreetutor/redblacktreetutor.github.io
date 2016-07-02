
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
	var oldTree = new BinarySearchTree( array, ctx, 300, 50 );
	oldTree.addAll();
	oldTree.setColors( {5: "black", 3: "#c0392b", 7: "#c0392b"});
	oldTree.draw();

	var newTree = new BinarySearchTree( array, ctx, 700, 50 );
	newTree.addAll();
	newTree.setColors( {5: "#c0392b", 3: "black", 7: "black"} );
	newTree.draw();

	var p1 = oldTree.findStartingArrowPosition();
	var p2 = newTree.findEndingArrowPosition();
	arrow(ctx, p1, p2);
}

function drawInnerNode() {
	var innerNodeCanvas = $('#innerNode')[0];
	innerNodeCanvas.width = $('#innerNode').parent().outerWidth();
	innerNodeCanvas.height = 300;
	
	var ctx = innerNodeCanvas.getContext('2d');
	ctx.font = '20px Arial';

	var array1 = [10, 20, 15];
	var firstCaseTree = new BinarySearchTree( array1, ctx, 300, 100 );
	firstCaseTree.addAll();
	firstCaseTree.draw();
	firstCaseTree.setCaption("15 is an inner node");

	var array2 = [10, 5, 8];
	var secondCaseTree = new BinarySearchTree(array2, ctx, 700, 100 );
	secondCaseTree.addAll();
	secondCaseTree.draw();
	secondCaseTree.setCaption("8 is an inner node");
}

function drawOuterNode() {
	var innerNodeCanvas = $('#outerNode')[0];
	innerNodeCanvas.width = $('#outerNode').parent().outerWidth();
	innerNodeCanvas.height = 300;
	
	var ctx = innerNodeCanvas.getContext('2d');
	ctx.font = '20px Arial';

	var array1 = [10, 20, 30];
	var firstCaseTree = new BinarySearchTree( array1, ctx, 300, 100 );
	firstCaseTree.addAll();
	firstCaseTree.draw();
	firstCaseTree.setCaption("30 is an outer node");

	var array2 = [10, 5, 3];
	var secondCaseTree = new BinarySearchTree(array2, ctx, 700, 100 );
	secondCaseTree.addAll();
	secondCaseTree.draw();
	secondCaseTree.setCaption("3 is an outer node");
}

function drawSingleRotation() {
	var singleRotationCanvas = $('#singleRotation')[0];
	singleRotationCanvas.width = $('#singleRotation').parent().outerWidth();
	singleRotationCanvas.height = 300;

	var ctx = singleRotationCanvas.getContext('2d');
	ctx.font = '20px Arial';

	var array1 = [10, 20, 30];
	var beforeTree = new BinarySearchTree( array1, ctx, 300, 100 );
	beforeTree.addAll();
	beforeTree.setColors( {10: "black", 20: "#c0392b", 30: "#c0392b"} );
	beforeTree.draw();
	beforeTree.setCaption("Tree before rotation");

	var array2 = [20, 10, 30];
	var afterTree = new BinarySearchTree( array2, ctx, 700, 100 );
	afterTree.addAll();
	afterTree.setColors( {10: "#c0392b", 20: "black", 30: "#c0392b"} );
	afterTree.draw();
	afterTree.setCaption("Tree after rotation");
}

function drawDoubleRotation() {
	var doubleRotationCanvas = $('#doubleRotation')[0];
	doubleRotationCanvas.width = $('#doubleRotation').parent().outerWidth();
	doubleRotationCanvas.height = 300;

	var ctx = doubleRotationCanvas.getContext('2d');
	ctx.font = '20px Arial';

	var array1 = [10, 20, 15];
	var beforeTree = new BinarySearchTree( array1, ctx, 300, 100 );
	beforeTree.addAll();
	beforeTree.setColors( {10: "black", 20: "#c0392b", 15: "#c0392b"} ); 
	beforeTree.draw();
	beforeTree.setCaption("Tree before rotation");

	var array2 = [15, 10, 20];
	var afterTree = new BinarySearchTree( array2, ctx, 700, 100 );
	afterTree.addAll();
	afterTree.setColors( {10: "#c0392b", 20: "#c0392b", 15: "black"} ); 
	afterTree.draw();
	afterTree.setCaption("Tree after rotation");
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
