/**
 * The holder of all things physical. Here
 * you interact with rigid bodies and make them
 * come to life.
 * @author lo-th
 * @author schteppe
 * @author xprogram
 */
OIMO.World = function(broadphase, midphase, solver, stats){
	this.broadphase = broadphase || new OIMO.BRBroadPhase;
	this.midphase = midphase || new OIMO.BRMidPhase;
	this.solver = solver || new OIMO.IteratorSolver;
	this.stats = stats || new OIMO.Stats;
};
