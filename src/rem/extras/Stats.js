/**
 * Class for describing performance in this
 * physics engine. Updated automatically each
 * step performed in a world. Everything is in
 * milliseconds, except for FPS count.
 * @author lo-th
 * @author xprogram
 */
OIMO.Stats = function(){
	this.timeBroad = 0;
	this.timeMid = 0;
	this.timeNarrow = 0;
	this.timeSolver = 0;
	this.timeUpdate = 0;
	this.timeTotal = 0;
	this.fps = 0;
};
